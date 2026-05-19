const DB_NAME = 'PresentiaDB';
const DB_VERSION = 1;

const STUDENTS = [
  { name: 'Sakshi Rajput', email: 'sakshi.rajput@student.edu', enrollment: 'STU001', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Priya Patel', email: 'priya.patel@student.edu', enrollment: 'STU002', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Aarav Sharma', email: 'aarav.sharma@student.edu', enrollment: 'STU003', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Ananya Singh', email: 'ananya.singh@student.edu', enrollment: 'STU004', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Rohan Verma', email: 'rohan.verma@student.edu', enrollment: 'STU005', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Isha Gupta', email: 'isha.gupta@student.edu', enrollment: 'STU006', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Arjun Nair', email: 'arjun.nair@student.edu', enrollment: 'STU007', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Kavya Reddy', email: 'kavya.reddy@student.edu', enrollment: 'STU008', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Vikram Joshi', email: 'vikram.joshi@student.edu', enrollment: 'STU009', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Neha Kapoor', email: 'neha.kapoor@student.edu', enrollment: 'STU010', section: 'A', batch: '2024-25', password: 'pass123' },
  { name: 'Rahul Deshmukh', email: 'rahul.deshmukh@student.edu', enrollment: 'STU011', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Sneha Kulkarni', email: 'sneha.kulkarni@student.edu', enrollment: 'STU012', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Aditya Mehta', email: 'aditya.mehta@student.edu', enrollment: 'STU013', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Pooja Yadav', email: 'pooja.yadav@student.edu', enrollment: 'STU014', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Karan Thakur', email: 'karan.thakur@student.edu', enrollment: 'STU015', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Divya Saxena', email: 'divya.saxena@student.edu', enrollment: 'STU016', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Manoj Tiwari', email: 'manoj.tiwari@student.edu', enrollment: 'STU017', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Ritu Agarwal', email: 'ritu.agarwal@student.edu', enrollment: 'STU018', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Harsh Vardhan', email: 'harsh.vardhan@student.edu', enrollment: 'STU019', section: 'B', batch: '2024-25', password: 'pass123' },
  { name: 'Nidhi Shah', email: 'nidhi.shah@student.edu', enrollment: 'STU020', section: 'B', batch: '2024-25', password: 'pass123' }
];

const FACULTY = [
  { name: 'Ramesh Kumar', email: 'ramesh.kumar@faculty.edu', employeeId: 'FAC001', password: 'pass123', subjects: [1, 2] },
  { name: 'Sunita Verma', email: 'sunita.verma@faculty.edu', employeeId: 'FAC002', password: 'pass123', subjects: [3, 5] },
  { name: 'Anil Mehta', email: 'anil.mehta@faculty.edu', employeeId: 'FAC003', password: 'pass123', subjects: [4, 6] },
  { name: 'Deepa Iyer', email: 'deepa.iyer@faculty.edu', employeeId: 'FAC004', password: 'pass123', subjects: [1] },
  { name: 'Vijay Patil', email: 'vijay.patil@faculty.edu', employeeId: 'FAC005', password: 'pass123', subjects: [2, 3] },
  { name: 'Kiran Rao', email: 'kiran.rao@faculty.edu', employeeId: 'FAC006', password: 'pass123', subjects: [5] },
  { name: 'Suresh Gupta', email: 'suresh.gupta@faculty.edu', employeeId: 'FAC007', password: 'pass123', subjects: [4] },
  { name: 'Lata Krishnan', email: 'lata.krishnan@faculty.edu', employeeId: 'FAC008', password: 'pass123', subjects: [6, 1] },
  { name: 'Mohan Das', email: 'mohan.das@faculty.edu', employeeId: 'FAC009', password: 'pass123', subjects: [3] },
  { name: 'Geeta Nair', email: 'geeta.nair@faculty.edu', employeeId: 'FAC010', password: 'pass123', subjects: [2] },
  { name: 'Rajesh Khanna', email: 'rajesh.khanna@faculty.edu', employeeId: 'FAC011', password: 'pass123', subjects: [5, 6] },
  { name: 'Shweta Joshi', email: 'shweta.joshi@faculty.edu', employeeId: 'FAC012', password: 'pass123', subjects: [1, 4] },
  { name: 'Prakash Rao', email: 'prakash.rao@faculty.edu', employeeId: 'FAC013', password: 'pass123', subjects: [3, 5] },
  { name: 'Nalini Shah', email: 'nalini.shah@faculty.edu', employeeId: 'FAC014', password: 'pass123', subjects: [2, 6] },
  { name: 'Dinesh Patel', email: 'dinesh.patel@faculty.edu', employeeId: 'FAC015', password: 'pass123', subjects: [4] },
  { name: 'Archana Singh', email: 'archana.singh@faculty.edu', employeeId: 'FAC016', password: 'pass123', subjects: [1, 3] },
  { name: 'Gautam Bose', email: 'gautam.bose@faculty.edu', employeeId: 'FAC017', password: 'pass123', subjects: [5] },
  { name: 'Pallavi Kulkarni', email: 'pallavi.kulkarni@faculty.edu', employeeId: 'FAC018', password: 'pass123', subjects: [6, 2] },
  { name: 'Sanjay Mishra', email: 'sanjay.mishra@faculty.edu', employeeId: 'FAC019', password: 'pass123', subjects: [3, 4] },
  { name: 'Rekha Agarwal', email: 'rekha.agarwal@faculty.edu', employeeId: 'FAC020', password: 'pass123', subjects: [1, 5] },
  { name: 'Tarun Batra', email: 'tarun.batra@faculty.edu', employeeId: 'FAC021', password: 'pass123', subjects: [2] },
  { name: 'Kavita Menon', email: 'kavita.menon@faculty.edu', employeeId: 'FAC022', password: 'pass123', subjects: [6, 3] },
  { name: 'Arvind Chauhan', email: 'arvind.chauhan@faculty.edu', employeeId: 'FAC023', password: 'pass123', subjects: [4, 1] },
  { name: 'Sheela Bhat', email: 'sheela.bhat@faculty.edu', employeeId: 'FAC024', password: 'pass123', subjects: [5, 2] }
];

const SUBJECTS = [
  { name: 'Mathematics', code: 'MTH101' },
  { name: 'Physics', code: 'PHY101' },
  { name: 'Computer Science', code: 'CSC101' },
  { name: 'English Literature', code: 'ENG101' },
  { name: 'Chemistry', code: 'CHM101' },
  { name: 'Electronics', code: 'ELC101' }
];

const ADMINS = [
  { name: 'System Admin', email: 'admin@attend.edu', password: 'pass123' }
];

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('students')) {
        db.createObjectStore('students', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('faculty')) {
        db.createObjectStore('faculty', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('admins')) {
        db.createObjectStore('admins', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('subjects')) {
        db.createObjectStore('subjects', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('attendance')) {
        const store = db.createObjectStore('attendance', { keyPath: 'id', autoIncrement: true });
        store.createIndex('studentId', 'studentId', { unique: false });
        store.createIndex('subjectId', 'subjectId', { unique: false });
        store.createIndex('date', 'date', { unique: false });
      }
    };
  });
}

function transaction(db, storeName, mode) {
  const tx = db.transaction(storeName, mode);
  const store = tx.objectStore(storeName);
  return { tx, store };
}

function getAll(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function getByKey(store, key) {
  return new Promise((resolve, reject) => {
    const req = store.get(key);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function addRecord(store, value) {
  return new Promise((resolve, reject) => {
    const req = store.add(value);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function putRecord(store, value) {
  return new Promise((resolve, reject) => {
    const req = store.put(value);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function deleteRecord(store, key) {
  return new Promise((resolve, reject) => {
    const req = store.delete(key);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

function getByIndex(store, indexName, value) {
  return new Promise((resolve, reject) => {
    const idx = store.index(indexName);
    const req = idx.getAll(value);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
  });
}

async function seedDatabase(db) {
  const studentCount = await new Promise((res) => {
    const req = db.transaction('students', 'readonly').objectStore('students').count();
    req.onsuccess = () => res(req.result);
  });
  if (studentCount > 0) return;

  const subjTx = db.transaction('subjects', 'readwrite');
  for (const s of SUBJECTS) {
    subjTx.objectStore('subjects').add(s);
  }
  await new Promise((res) => { subjTx.oncomplete = res; });

  const studTx = db.transaction('students', 'readwrite');
  for (const s of STUDENTS) {
    studTx.objectStore('students').add(s);
  }
  await new Promise((res) => { studTx.oncomplete = res; });

  const facTx = db.transaction('faculty', 'readwrite');
  for (const f of FACULTY) {
    facTx.objectStore('faculty').add(f);
  }
  await new Promise((res) => { facTx.oncomplete = res; });

  const admTx = db.transaction('admins', 'readwrite');
  for (const a of ADMINS) {
    admTx.objectStore('admins').add(a);
  }
  await new Promise((res) => { admTx.oncomplete = res; });

  const now = new Date();
  const attTx = db.transaction('attendance', 'readwrite');
  const attStore = attTx.objectStore('attendance');
  for (let day = 0; day < 30; day++) {
    const d = new Date(now);
    d.setDate(d.getDate() - day);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    const dateStr = d.toISOString().split('T')[0];
    for (let s = 1; s <= 6; s++) {
      const presentCount = 13 + Math.floor(Math.random() * 5);
      const indices = Array.from({ length: 20 }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const presentSet = new Set(indices.slice(0, presentCount));
      for (let st = 0; st < 20; st++) {
        attStore.add({
          studentId: st + 1,
          subjectId: s,
          date: dateStr,
          status: presentSet.has(st) ? 'present' : 'absent',
          markedBy: 1 + Math.floor(Math.random() * 24)
        });
      }
    }
  }
  await new Promise((res) => { attTx.oncomplete = res; });
}

const DB = {
  async init() {
    const db = await openDB();
    await seedDatabase(db);
    db.close();
  },

  async authenticate(email, password) {
    const db = await openDB();
    let tx = db.transaction('students', 'readonly');
    let store = tx.objectStore('students');
    let users = await getAll(store);
    let user = users.find(u => u.email === email && u.password === password);
    if (user) { db.close(); return { role: 'student', ...user }; }

    tx = db.transaction('faculty', 'readonly');
    store = tx.objectStore('faculty');
    users = await getAll(store);
    user = users.find(u => u.email === email && u.password === password);
    if (user) { db.close(); return { role: 'faculty', ...user }; }

    tx = db.transaction('admins', 'readonly');
    store = tx.objectStore('admins');
    users = await getAll(store);
    user = users.find(u => u.email === email && u.password === password);
    if (user) { db.close(); return { role: 'admin', ...user }; }

    db.close();
    return null;
  },

  async getSubjects() {
    const db = await openDB();
    const tx = db.transaction('subjects', 'readonly');
    const subjects = await getAll(tx.objectStore('subjects'));
    db.close();
    return subjects;
  },

  async getStudents() {
    const db = await openDB();
    const tx = db.transaction('students', 'readonly');
    const students = await getAll(tx.objectStore('students'));
    db.close();
    return students;
  },

  async getFaculty() {
    const db = await openDB();
    const tx = db.transaction('faculty', 'readonly');
    const faculty = await getAll(tx.objectStore('faculty'));
    db.close();
    return faculty;
  },

  async addStudent(student) {
    const db = await openDB();
    const tx = db.transaction('students', 'readwrite');
    const id = await addRecord(tx.objectStore('students'), student);
    await new Promise((res) => { tx.oncomplete = res; });
    db.close();
    return id;
  },

  async deleteStudent(id) {
    const db = await openDB();
    const tx = db.transaction('students', 'readwrite');
    await deleteRecord(tx.objectStore('students'), id);
    await new Promise((res) => { tx.oncomplete = res; });
    db.close();
  },

  async addFaculty(member) {
    const db = await openDB();
    const tx = db.transaction('faculty', 'readwrite');
    const id = await addRecord(tx.objectStore('faculty'), member);
    await new Promise((res) => { tx.oncomplete = res; });
    db.close();
    return id;
  },

  async deleteFaculty(id) {
    const db = await openDB();
    const tx = db.transaction('faculty', 'readwrite');
    await deleteRecord(tx.objectStore('faculty'), id);
    await new Promise((res) => { tx.oncomplete = res; });
    db.close();
  },

  async getAttendanceForStudent(studentId) {
    const db = await openDB();
    const tx = db.transaction('attendance', 'readonly');
    const records = await getByIndex(tx.objectStore('attendance'), 'studentId', studentId);
    db.close();
    return records;
  },

  async getAttendanceForSubject(subjectId) {
    const db = await openDB();
    const tx = db.transaction('attendance', 'readonly');
    const records = await getByIndex(tx.objectStore('attendance'), 'subjectId', subjectId);
    db.close();
    return records;
  },

  async getRecentAttendance(limit = 30) {
    const db = await openDB();
    const tx = db.transaction('attendance', 'readonly');
    const all = await getAll(tx.objectStore('attendance'));
    db.close();
    all.sort((a, b) => b.id - a.id);
    return all.slice(0, limit);
  },

  async markAttendance(records) {
    const db = await openDB();
    const tx = db.transaction('attendance', 'readwrite');
    const store = tx.objectStore('attendance');
    if (records.length > 0) {
      const subjectId = records[0].subjectId;
      const date = records[0].date;
      const existing = await getByIndex(store, 'subjectId', subjectId);
      const toDelete = existing.filter(r => r.date === date);
      for (const r of toDelete) {
        await deleteRecord(store, r.id);
      }
    }
    for (const r of records) {
      await addRecord(store, r);
    }
    await new Promise((res) => { tx.oncomplete = res; });
    db.close();
  },

  async getStudentAttendanceSummary(studentId) {
    const records = await this.getAttendanceForStudent(studentId);
    const subjects = await this.getSubjects();
    const summary = {};
    let total = 0, present = 0;

    for (const sub of subjects) {
      const subRecords = records.filter(r => r.subjectId === sub.id);
      const subPresent = subRecords.filter(r => r.status === 'present').length;
      const subTotal = subRecords.length;
      summary[sub.id] = {
        subject: sub,
        total: subTotal,
        present: subPresent,
        percentage: subTotal > 0 ? Math.round((subPresent / subTotal) * 100) : 0
      };
      total += subTotal;
      present += subPresent;
    }

    return {
      total,
      present,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0,
      subjects: summary
    };
  },

  async getStudentsByFacultySubjects(facultySubjects) {
    const students = await this.getStudents();
    const allAttendance = [];
    const db = await openDB();
    const tx = db.transaction('attendance', 'readonly');
    const all = await getAll(tx.objectStore('attendance'));
    db.close();

    return students.map(student => {
      const studentRecords = all.filter(r => r.studentId === student.id && facultySubjects.includes(r.subjectId));
      const total = studentRecords.length;
      const present = studentRecords.filter(r => r.status === 'present').length;
      return {
        ...student,
        total,
        present,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0
      };
    });
  },

  async getAllAttendance() {
    const db = await openDB();
    const tx = db.transaction('attendance', 'readonly');
    const records = await getAll(tx.objectStore('attendance'));
    db.close();
    return records;
  },

  async getStudentsWithAlerts() {
    const students = await this.getStudents();
    const records = await this.getAllAttendance();
    const subjects = await this.getSubjects();

    const alerts = [];
    for (const student of students) {
      const studentRecords = records.filter(r => r.studentId === student.id);
      for (const sub of subjects) {
        const subRecords = studentRecords.filter(r => r.subjectId === sub.id);
        const total = subRecords.length;
        const present = subRecords.filter(r => r.status === 'present').length;
        const pct = total > 0 ? (present / total) * 100 : 0;
        if (total > 0 && pct < 75) {
          alerts.push({
            student,
            subject: sub,
            percentage: Math.round(pct),
            status: pct < 70 ? 'critical' : 'at_risk'
          });
        }
      }
    }
    return alerts;
  }
};
