let currentUser = null;
let subjects = [];
let attendanceSheetData = [];

function $(id) { return document.getElementById(id); }

function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return (ctx || document).querySelectorAll(sel); }

function toast(message, type = 'info') {
  const container = $('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}<button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>`;
  container.appendChild(el);
  setTimeout(() => { if (el.isConnected) { el.style.opacity = '0'; setTimeout(() => el.remove(), 300); } }, 3500);
}

function togglePassword() {
  const pwd = $('login-password');
  pwd.type = pwd.type === 'password' ? 'text' : 'password';
}

function showView(viewId) {
  qsa('.view').forEach(v => v.classList.remove('active'));
  const el = $(viewId);
  if (el) el.classList.add('active');
  const titles = {
    'view-dashboard': 'Dashboard',
    'view-dashboard-admin': 'Admin Dashboard',
    'view-subjects': 'Subjects',
    'view-activity': 'Activity',
    'view-roster': 'Student Roster',
    'view-manage': 'Manage',
    'view-attendance-faculty': 'Mark Attendance'
  };
  const title = titles[viewId] || 'Dashboard';
  $('page-title').textContent = title;
}

function switchNav(viewId) {
  qsa('.nav-item[data-view]').forEach(n => n.classList.remove('active'));
  qsa(`.nav-item[data-view="${viewId}"]`).forEach(n => n.classList.add('active'));
  const viewMap = {
    dashboard: currentUser?.role === 'admin' ? 'view-dashboard-admin' : 'view-dashboard',
    subjects: 'view-subjects',
    activity: 'view-activity',
    roster: 'view-roster',
    manage: 'view-manage',
    attendance: 'view-attendance-faculty'
  };
  showView(viewMap[viewId] || 'view-dashboard');
}

document.addEventListener('DOMContentLoaded', async () => {
  await DB.init();
  setTimeout(() => {
    $('splash').classList.add('fade-out');
    setTimeout(() => {
      $('splash').classList.add('hidden');
      $('login-screen').classList.remove('hidden');
    }, 500);
  }, 1200);

  subjects = await DB.getSubjects();
  setupLogin();
  setupSidebar();
  setupManageTabs();
  setupHamburger();
});

function setupLogin() {
  qsa('.login-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.login-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const email = $('login-email');
      const pwd = $('login-password');
      if (tab.dataset.role === 'student') { email.value = 'mayur.sonawane@student.edu'; pwd.value = 'pass123'; }
      else if (tab.dataset.role === 'faculty') { email.value = 'ramesh.kumar@faculty.edu'; pwd.value = 'pass123'; }
      else if (tab.dataset.role === 'admin') { email.value = 'admin@attend.edu'; pwd.value = 'pass123'; }
    });
  });

  $('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('login-email').value.trim();
    const password = $('login-password').value.trim();
    const errorEl = $('login-error');
    const btn = $('login-btn');

    if (!email || !password) {
      showLoginError('Please enter email and password.');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';

    const user = await DB.authenticate(email, password);
    if (!user) {
      showLoginError('Invalid email or password. Please try again.');
      btn.disabled = false;
      btn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
      return;
    }

    currentUser = user;
    hideLoginError();
    $('login-screen').classList.add('hidden');
    $('app-shell').classList.remove('hidden');
    afterLogin();
    btn.disabled = false;
    btn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
    toast(`Welcome, ${user.name}!`, 'success');
  });
}

function showLoginError(msg) {
  const el = $('login-error');
  el.classList.remove('hidden');
  el.querySelector('span').textContent = msg;
}

function hideLoginError() {
  $('login-error').classList.add('hidden');
}

function afterLogin() {
  const initials = currentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  $('sidebar-avatar').textContent = initials;
  $('sidebar-user-name').textContent = currentUser.name;
  $('sidebar-user-role').textContent = currentUser.role;

  $('topbar-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const nav = $('sidebar-nav');
  nav.innerHTML = '';
  const isStudent = currentUser.role === 'student';
  const isFaculty = currentUser.role === 'faculty';
  const isAdmin = currentUser.role === 'admin';

  if (isStudent) {
    addNavItem('dashboard', 'fa-th-large', 'Dashboard');
    addNavItem('subjects', 'fa-book', 'Subjects');
    addNavItem('activity', 'fa-history', 'Activity');
  } else if (isFaculty) {
    addNavItem('dashboard', 'fa-th-large', 'Dashboard');
    addNavItem('attendance', 'fa-clipboard-list', 'Mark Attendance');
    addNavItem('roster', 'fa-users', 'Roster');
  } else if (isAdmin) {
    addNavItem('dashboard', 'fa-th-large', 'Dashboard');
    addNavItem('manage', 'fa-cog', 'Manage');
  }

  if (isStudent) renderStudentDashboard();
  else if (isFaculty) renderFacultyDashboard();
  else if (isAdmin) renderAdminDashboard();

  switchNav('dashboard');
}

function addNavItem(view, icon, label) {
  const btn = document.createElement('button');
  btn.className = 'nav-item';
  btn.dataset.view = view;
  btn.innerHTML = `<i class="fas ${icon}"></i> ${label}`;
  btn.addEventListener('click', () => switchNav(view));
  $('sidebar-nav').appendChild(btn);
}

function setupSidebar() {
  $('sidebar-nav').addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item[data-view]');
    if (!item) return;
    if (window.innerWidth <= 768) $('sidebar').classList.remove('open');
  });
}

function setupHamburger() {
  $('hamburger').addEventListener('click', () => {
    $('sidebar').classList.toggle('open');
  });
}

function setupManageTabs() {
  qsa('.manage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      qsa('.manage-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      qsa('.manage-panel').forEach(p => p.classList.remove('active'));
      $(`manage-${tab.dataset.manage}`).classList.add('active');
    });
  });
}

async function logout() {
  currentUser = null;
  $('app-shell').classList.add('hidden');
  $('login-screen').classList.remove('hidden');
  $('alert-banner').classList.add('hidden');
  $('login-error').classList.add('hidden');
  $('login-password').value = '';
  qsa('.login-tab').forEach(t => t.classList.remove('active'));
  qs('.login-tab').classList.add('active');
  toast('You have been logged out.', 'info');
}

/* ========== STUDENT DASHBOARD ========== */

async function renderStudentDashboard() {
  const summary = await DB.getStudentAttendanceSummary(currentUser.id);
  renderStudentMetrics(summary);
  renderSubjectTable(summary);
  renderActivityFeed();
  checkStudentAlerts(summary.percentage);
}

function renderStudentMetrics(summary) {
  const grid = $('metrics-grid');
  const subjectsAtRisk = Object.values(summary.subjects).filter(s => s.percentage < 75).length;
  grid.innerHTML = `
    <div class="metric-card">
      <div class="metric-icon indigo"><i class="fas fa-chart-pie"></i></div>
      <div class="metric-label">Overall Attendance</div>
      <div class="metric-value">${summary.percentage}%</div>
      <div class="metric-sub">${summary.present} / ${summary.total} classes</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon emerald"><i class="fas fa-calendar-check"></i></div>
      <div class="metric-label">Total Classes</div>
      <div class="metric-value">${summary.total}</div>
      <div class="metric-sub">Across all subjects</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon amber"><i class="fas fa-check-circle"></i></div>
      <div class="metric-label">Attended</div>
      <div class="metric-value">${summary.present}</div>
      <div class="metric-sub">Classes present</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon rose"><i class="fas fa-exclamation-triangle"></i></div>
      <div class="metric-label">Subjects at Risk</div>
      <div class="metric-value">${subjectsAtRisk}</div>
      <div class="metric-sub">Below 75% threshold</div>
    </div>
  `;
}

function renderSubjectTable(summary) {
  const tbody = $('subject-table-body');
  tbody.innerHTML = '';
  for (const sub of Object.values(summary.subjects)) {
    const pct = sub.percentage;
    let statusClass = 'safe', statusLabel = 'Safe';
    if (pct < 70) { statusClass = 'critical'; statusLabel = 'Critical'; }
    else if (pct < 75) { statusClass = 'at-risk'; statusLabel = 'At Risk'; }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${sub.subject.name}</strong></td>
      <td>${sub.subject.code}</td>
      <td>${sub.total}</td>
      <td>${sub.present}</td>
      <td>
        <div style="display:flex;align-items:center;gap:.75rem;">
          <div class="progress-bar" style="flex:1;max-width:120px;">
            <div class="fill ${statusClass}" style="width:${pct}%"></div>
          </div>
          <span style="font-weight:600;font-size:.8rem;">${pct}%</span>
        </div>
      </td>
      <td><span class="badge badge-${statusClass}">${statusLabel}</span></td>
    `;
    tbody.appendChild(tr);
  }
}

async function renderActivityFeed() {
  const tbody = $('activity-table-body');
  const records = await DB.getAttendanceForStudent(currentUser.id);
  const subjectMap = {};
  subjects.forEach(s => subjectMap[s.id] = s);
  records.sort((a, b) => b.id - a.id);
  const recent = records.slice(0, 30);
  tbody.innerHTML = '';
  for (const r of recent) {
    const sub = subjectMap[r.subjectId];
    const tr = document.createElement('tr');
    const date = new Date(r.date + 'T00:00:00');
    tr.innerHTML = `
      <td>${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
      <td>${sub ? sub.name : 'Unknown'}</td>
      <td><span class="badge badge-${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
    `;
    tbody.appendChild(tr);
  }
}

async function renderFullLedger() {
  const tbody = $('ledger-table-body');
  const records = await DB.getAttendanceForStudent(currentUser.id);
  const subjectMap = {};
  subjects.forEach(s => subjectMap[s.id] = s);
  const facultyMap = {};
  const allFaculty = await DB.getFaculty();
  allFaculty.forEach(f => facultyMap[f.id] = f);
  records.sort((a, b) => b.id - a.id);
  tbody.innerHTML = '';
  for (const r of records) {
    const sub = subjectMap[r.subjectId];
    const fac = facultyMap[r.markedBy];
    const tr = document.createElement('tr');
    const date = new Date(r.date + 'T00:00:00');
    tr.innerHTML = `
      <td>${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
      <td>${sub ? sub.name : 'Unknown'}</td>
      <td><span class="badge badge-${r.status}">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span></td>
      <td>${fac ? fac.name : 'Unknown'}</td>
    `;
    tbody.appendChild(tr);
  }
}

function checkStudentAlerts(pct) {
  const banner = $('alert-banner');
  const text = $('alert-banner-text');
  if (pct < 75) {
    text.textContent = `Your overall attendance is ${pct}% — below the mandatory 75% threshold. Please attend more classes!`;
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }
}

/* ========== FACULTY DASHBOARD ========== */

async function renderFacultyDashboard() {
  renderFacultyMetrics();
  await renderFacultyAttendanceSheet();
}

async function renderFacultyMetrics() {
  const grid = $('metrics-grid');
  const students = await DB.getStudents();
  const allRecords = await DB.getAllAttendance();
  const facultySubjects = currentUser.subjects || [];
  const filtered = allRecords.filter(r => facultySubjects.includes(r.subjectId));
  const totalClasses = filtered.length;
  const presentCount = filtered.filter(r => r.status === 'present').length;

  const allFaculty = await DB.getFaculty();
  grid.innerHTML = `
    <div class="metric-card">
      <div class="metric-icon indigo"><i class="fas fa-users"></i></div>
      <div class="metric-label">Total Students</div>
      <div class="metric-value">${students.length}</div>
      <div class="metric-sub">Across all sections</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon emerald"><i class="fas fa-book-open"></i></div>
      <div class="metric-label">Subjects Assigned</div>
      <div class="metric-value">${facultySubjects.length}</div>
      <div class="metric-sub">Teaching load</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon amber"><i class="fas fa-clipboard-list"></i></div>
      <div class="metric-label">Total Records</div>
      <div class="metric-value">${totalClasses}</div>
      <div class="metric-sub">Attendance logged</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon rose"><i class="fas fa-percentage"></i></div>
      <div class="metric-label">Avg. Attendance</div>
      <div class="metric-value">${totalClasses > 0 ? Math.round(presentCount / totalClasses * 100) : 0}%</div>
      <div class="metric-sub">In your subjects</div>
    </div>
  `;
}

async function renderFacultyAttendanceSheet() {
  const facultySubjects = currentUser.subjects || [];
  const subSelect = $('faculty-subject');
  subSelect.innerHTML = '<option value="">Select Subject</option>';
  for (const s of subjects) {
    if (facultySubjects.includes(s.id)) {
      subSelect.innerHTML += `<option value="${s.id}">${s.name} (${s.code})</option>`;
    }
  }
  $('faculty-date').value = new Date().toISOString().split('T')[0];

  subSelect.addEventListener('change', loadAttendanceSheet);
  $('faculty-batch').addEventListener('change', loadAttendanceSheet);
  $('faculty-date').addEventListener('change', loadAttendanceSheet);
}

async function loadAttendanceSheet() {
  const subjectId = parseInt($('faculty-subject').value);
  const batch = $('faculty-batch').value;
  const date = $('faculty-date').value;
  const tbody = $('attendance-sheet-body');

  if (!subjectId || !batch || !date) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--slate-500);">Please select subject, batch, and date.</td></tr>';
    return;
  }

  const students = await DB.getStudents();
  const filtered = students.filter(s => s.section === batch);
  const existingRecords = await DB.getAttendanceForSubject(subjectId);
  const existingMap = {};
  existingRecords.forEach(r => { if (r.date === date) existingMap[r.studentId] = r.status; });

  attendanceSheetData = filtered.map(s => ({
    student: s,
    status: existingMap[s.id] || 'absent'
  }));

  let html = '';
  attendanceSheetData.forEach((item, idx) => {
    const s = item.student;
    html += `
      <tr>
        <td>${idx + 1}</td>
        <td>${s.enrollment}</td>
        <td><strong>${s.name}</strong></td>
        <td>${s.section}</td>
        <td>
          <div class="status-toggle">
            <button class="status-btn ${item.status === 'present' ? 'active-present' : ''}" onclick="setAttendanceStatus(${idx}, 'present')"><i class="fas fa-check"></i> Present</button>
            <button class="status-btn ${item.status === 'absent' ? 'active-absent' : ''}" onclick="setAttendanceStatus(${idx}, 'absent')"><i class="fas fa-times"></i> Absent</button>
          </div>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html || '<tr><td colspan="5" style="text-align:center;color:var(--slate-500);">No students found.</td></tr>';
}

function setAttendanceStatus(idx, status) {
  attendanceSheetData[idx].status = status;
  loadAttendanceSheet();
}

function markAllPresent() {
  attendanceSheetData.forEach(item => item.status = 'present');
  loadAttendanceSheet();
}

function markAllAbsent() {
  attendanceSheetData.forEach(item => item.status = 'absent');
  loadAttendanceSheet();
}

async function submitAttendance() {
  const subjectId = parseInt($('faculty-subject').value);
  const date = $('faculty-date').value;
  if (!subjectId || !date || !attendanceSheetData.length) {
    toast('Please configure all fields before submitting.', 'error');
    return;
  }

  const records = attendanceSheetData.map(item => ({
    studentId: item.student.id,
    subjectId,
    date,
    status: item.status,
    markedBy: currentUser.id
  }));

  await DB.markAttendance(records);
  toast(`Attendance recorded for ${records.length} students!`, 'success');
  loadAttendanceSheet();
}

/* ========== FACULTY ROSTER ========== */

document.addEventListener('viewChanged', async (viewId) => {
  if (viewId === 'view-roster' && currentUser?.role === 'faculty') {
    await renderFacultyRoster();
  }
});

async function renderFacultyRoster() {
  const tbody = $('roster-table-body');
  const facultySubjects = currentUser.subjects || [];
  const students = await DB.getStudentsByFacultySubjects(facultySubjects);
  students.sort((a, b) => a.percentage - b.percentage);

  let html = '';
  for (const s of students) {
    let statusClass = 'safe';
    if (s.percentage < 70) statusClass = 'critical';
    else if (s.percentage < 75) statusClass = 'at-risk';
    html += `
      <tr>
        <td>${s.enrollment}</td>
        <td><strong>${s.name}</strong></td>
        <td>${s.section}</td>
        <td>${s.total}</td>
        <td>${s.present}</td>
        <td>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <div class="progress-bar" style="flex:1;max-width:100px;">
              <div class="fill ${statusClass}" style="width:${s.percentage}%"></div>
            </div>
            <span style="font-weight:600;font-size:.8rem;">${s.percentage}%</span>
          </div>
        </td>
        <td><span class="badge badge-${statusClass}">${statusClass === 'safe' ? 'Safe' : statusClass === 'at-risk' ? 'At Risk' : 'Critical'}</span></td>
      </tr>
    `;
  }
  tbody.innerHTML = html || '<tr><td colspan="7" style="text-align:center;color:var(--slate-500);">No data available.</td></tr>';
}

/* ========== VIEW RENDER HOOK ========== */

const originalShowView = showView;
showView = function(viewId) {
  originalShowView(viewId);
  if (viewId === 'view-roster' && currentUser?.role === 'faculty') {
    renderFacultyRoster();
  }
  if (viewId === 'view-dashboard' && currentUser?.role === 'student') {
    renderStudentDashboard();
  }
  if (viewId === 'view-dashboard' && currentUser?.role === 'faculty') {
    renderFacultyDashboard();
  }
  if (viewId === 'view-dashboard-admin') {
    renderAdminDashboard();
  }
  if (viewId === 'view-manage') {
    renderManageStudents();
    renderManageFaculty();
  }
  if (viewId === 'view-subjects' && currentUser?.role === 'student') {
    renderSubjectsView();
  }
  if (viewId === 'view-activity' && currentUser?.role === 'student') {
    renderFullLedger();
  }
};

/* ========== SUBJECTS VIEW ========== */

async function renderSubjectsView() {
  const tbody = $('subjects-table-body');
  const summary = await DB.getStudentAttendanceSummary(currentUser.id);
  tbody.innerHTML = '';
  let idx = 0;
  for (const sub of Object.values(summary.subjects)) {
    idx++;
    const pct = sub.percentage;
    let statusClass = 'safe';
    if (pct < 70) statusClass = 'critical';
    else if (pct < 75) statusClass = 'at-risk';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx}</td>
      <td><strong>${sub.subject.name}</strong></td>
      <td>${sub.subject.code}</td>
      <td>
        <div style="display:flex;align-items:center;gap:.75rem;">
          <div class="progress-bar" style="flex:1;max-width:200px;">
            <div class="fill ${statusClass}" style="width:${pct}%"></div>
          </div>
          <span style="font-weight:600;">${pct}%</span>
          <span class="badge badge-${statusClass}">${pct < 70 ? 'Critical' : pct < 75 ? 'At Risk' : 'Safe'}</span>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

/* ========== ADMIN DASHBOARD ========== */

async function renderAdminDashboard() {
  const students = await DB.getStudents();
  const faculty = await DB.getFaculty();
  const alerts = await DB.getStudentsWithAlerts();
  const allRecords = await DB.getAllAttendance();

  const grid = $('admin-metrics');
  grid.innerHTML = `
    <div class="metric-card">
      <div class="metric-icon indigo"><i class="fas fa-user-graduate"></i></div>
      <div class="metric-label">Total Students</div>
      <div class="metric-value">${students.length}</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon emerald"><i class="fas fa-chalkboard-teacher"></i></div>
      <div class="metric-label">Total Faculty</div>
      <div class="metric-value">${faculty.length}</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon amber"><i class="fas fa-book"></i></div>
      <div class="metric-label">Active Subjects</div>
      <div class="metric-value">${subjects.length}</div>
    </div>
    <div class="metric-card">
      <div class="metric-icon rose"><i class="fas fa-exclamation-triangle"></i></div>
      <div class="metric-label">Shortage Alerts</div>
      <div class="metric-value">${alerts.length}</div>
      <div class="metric-sub">Students below 75%</div>
    </div>
  `;

  renderAlertTable(alerts);
}

async function renderAlertTable(alerts) {
  const tbody = $('alert-table-body');
  tbody.innerHTML = '';
  if (!alerts.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--slate-500);">No shortage alerts. All students are above 75%.</td></tr>';
    return;
  }
  for (const a of alerts) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${a.student.name}</strong></td>
      <td>${a.student.section}</td>
      <td>${a.subject.name}</td>
      <td>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <div class="progress-bar" style="flex:1;max-width:80px;">
            <div class="fill ${a.status}" style="width:${a.percentage}%"></div>
          </div>
          <span style="font-weight:600;">${a.percentage}%</span>
        </div>
      </td>
      <td><span class="badge badge-${a.status}">${a.status === 'critical' ? 'Critical' : 'At Risk'}</span></td>
    `;
    tbody.appendChild(tr);
  }
}

/* ========== MANAGE (ADMIN CRUD) ========== */

async function renderManageStudents() {
  const tbody = $('manage-student-body');
  const students = await DB.getStudents();
  tbody.innerHTML = '';
  for (const s of students) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.enrollment}</td>
      <td><strong>${s.name}</strong></td>
      <td>${s.email}</td>
      <td>${s.section}</td>
      <td>${s.batch}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteStudentRecord(${s.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

async function renderManageFaculty() {
  const tbody = $('manage-faculty-body');
  const faculty = await DB.getFaculty();
  const subjectMap = {};
  subjects.forEach(s => subjectMap[s.id] = s);
  tbody.innerHTML = '';
  for (const f of faculty) {
    const subNames = (f.subjects || []).map(id => subjectMap[id]?.name).filter(Boolean).join(', ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.employeeId}</td>
      <td><strong>${f.name}</strong></td>
      <td>${f.email}</td>
      <td>${subNames || 'N/A'}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteFacultyRecord(${f.id})"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  }
}

async function deleteStudentRecord(id) {
  if (!confirm('Are you sure you want to delete this student?')) return;
  await DB.deleteStudent(id);
  toast('Student deleted.', 'success');
  renderManageStudents();
}

async function deleteFacultyRecord(id) {
  if (!confirm('Are you sure you want to delete this faculty member?')) return;
  await DB.deleteFaculty(id);
  toast('Faculty deleted.', 'success');
  renderManageFaculty();
}

/* ========== MODAL ========== */

function showModal(type) {
  const overlay = $('modal-overlay');
  const title = $('modal-title');
  const body = $('modal-body');
  overlay.classList.remove('hidden');

  if (type === 'student') {
    title.textContent = 'Add Student';
    body.innerHTML = `
      <div class="input-group">
        <label>Full Name</label>
        <input type="text" name="name" required placeholder="Enter student name">
      </div>
      <div class="input-group">
        <label>Email</label>
        <input type="email" name="email" required placeholder="student@example.edu">
      </div>
      <div class="input-group">
        <label>Enrollment Number</label>
        <input type="text" name="enrollment" required placeholder="STU021">
      </div>
      <div class="input-group">
        <label>Section</label>
        <select name="section" required>
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>
      <div class="input-group">
        <label>Batch</label>
        <input type="text" name="batch" value="2024-25" required>
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="text" name="password" value="pass123" required>
      </div>
    `;
  } else {
    title.textContent = 'Add Faculty';
    body.innerHTML = `
      <div class="input-group">
        <label>Full Name</label>
        <input type="text" name="name" required placeholder="Enter faculty name">
      </div>
      <div class="input-group">
        <label>Email</label>
        <input type="email" name="email" required placeholder="faculty@faculty.edu">
      </div>
      <div class="input-group">
        <label>Employee ID</label>
        <input type="text" name="employeeId" required placeholder="FAC025">
      </div>
      <div class="input-group">
        <label>Assign Subjects (hold Ctrl to select multiple)</label>
        <select name="subjects" multiple required style="min-height:100px;">
          ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
        </select>
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="text" name="password" value="pass123" required>
      </div>
    `;
  }
}

function closeModal() {
  $('modal-overlay').classList.add('hidden');
}

async function saveModal(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const isStudent = $('modal-title').textContent.includes('Student');

  if (isStudent) {
    const student = {
      name: data.get('name'),
      email: data.get('email'),
      enrollment: data.get('enrollment'),
      section: data.get('section'),
      batch: data.get('batch'),
      password: data.get('password')
    };
    if (!student.name || !student.email || !student.enrollment || !student.section) {
      toast('Please fill all required fields.', 'error');
      return;
    }
    await DB.addStudent(student);
    toast('Student added successfully!', 'success');
    renderManageStudents();
  } else {
    const selected = Array.from(form.querySelector('select[name="subjects"]').selectedOptions).map(o => parseInt(o.value));
    const faculty = {
      name: data.get('name'),
      email: data.get('email'),
      employeeId: data.get('employeeId'),
      subjects: selected,
      password: data.get('password')
    };
    if (!faculty.name || !faculty.email || !faculty.employeeId || !faculty.subjects.length) {
      toast('Please fill all required fields.', 'error');
      return;
    }
    await DB.addFaculty(faculty);
    toast('Faculty added successfully!', 'success');
    renderManageFaculty();
  }

  closeModal();
}
