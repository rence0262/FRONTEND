// Global state
let currentUserType = '';

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showRoleSelection() {
    showPage('role-selection');
}

function showAdminLogin() {
    showPage('admin-login');
    currentUserType = 'admin';
}

function showProfessorLogin() {
    showPage('professor-login');
    currentUserType = 'professor';
}

// Login
function adminLogin(e) {
    e.preventDefault();
    showPage('admin-dashboard');
    adminGoToHome();
}

function professorLogin(e) {
    e.preventDefault();
    showPage('professor-dashboard');
    profGoToHome();
}

function logout() {
    showPage('role-selection');
    closeSidebar();
}

// Sidebar Toggle
function toggleSidebar() {
    if (currentUserType === 'admin') {
        document.getElementById('admin-sidebar').classList.toggle('active');
        document.getElementById('admin-overlay').classList.toggle('active');
    } else {
        document.getElementById('professor-sidebar').classList.toggle('active');
        document.getElementById('professor-overlay').classList.toggle('active');
    }
}

function closeSidebar() {
    document.querySelectorAll('.sidebar').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.sidebar-overlay').forEach(o => o.classList.remove('active'));
}

// Update Active Nav
function updateAdminNav(index) {
    document.querySelectorAll('#admin-sidebar .nav-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function updateProfNav(index) {
    document.querySelectorAll('#professor-sidebar .nav-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// ADMIN NAVIGATION FUNCTIONS
function adminGoToHome() {
    const content = `
        <h1 class="dashboard-header">Admin Dashboard</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Total Professors</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Total Students</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">12</div>
                <div class="stat-label">Attendance Today</div>
            </div>
        </div>
        <div class="quick-actions">
            <h2 class="section-title">Quick Actions</h2>
            <div class="action-buttons">
                <button class="action-btn" onclick="adminGoToProfessor()">Add Professor</button>
                <button class="action-btn" onclick="adminGoToClasses()">Manage Classes</button>
                <button class="action-btn" onclick="adminGoToReports()">Generate Reports</button>
            </div>
        </div>
        <div class="recent-activity">
            <h2 class="section-title">Recent Activity</h2>
            <div class="activity-item">[10:12] - Prof. Cruz started attendance for EE101 - Section A</div>
            <div class="activity-item">[09:45] - Unknown face detected in CS202</div>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
    updateAdminNav(0);
}

function adminGoToProfessor() {
    const content = `
        <div class="professor-panel">
            <h1 class="dashboard-header">Professor Management</h1>
            <div class="management-container add-professor">
                <h2 class="section-title">Add Professor</h2>
                <div class="add-form">
                    <input type="text" placeholder="Name" id="prof-name">
                    <input type="text" placeholder="Username" id="prof-user">
                    <input type="password" placeholder="Password" id="prof-pass">
                    <button class="btn-save" onclick="addProfessor()">Save</button>
                </div>
            </div>
            <div class="management-container existing-professors">
                <h2 class="section-title">Existing Professors</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="prof-table">
                        <tr>
                            <td>Lawrence Lagos</td>
                            <td>lawrencelagos</td>
                            <td>mamamoblue123456</td>
                            <td>
                                <button class="btn-edit">Edit</button>
                                <button class="btn-delete" data-action="delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
    updateAdminNav(1);
}

function addProfessor() {
    const name = document.getElementById('prof-name').value;
    const user = document.getElementById('prof-user').value;
    const pass = document.getElementById('prof-pass').value;
    
    if (name && user && pass) {
        const table = document.getElementById('prof-table');
        const row = table.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${user}</td>
            <td>${pass}</td>
            <td>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" data-action="delete">Delete</button>
            </td>
        `;
        document.getElementById('prof-name').value = '';
        document.getElementById('prof-user').value = '';
        document.getElementById('prof-pass').value = '';
        alert('Professor added successfully!');
    } else {
        alert('Please fill all fields');
    }
}

function adminGoToClasses() {
    const content = `
        <div class="classes-panel">
            <h1 class="dashboard-header">Class Management</h1>
            <p style="color: #6b7280; margin-bottom: 20px;">Add new classes or manage existing ones. When ready, use the trigger to start a face-recognition session.</p>
            <div class="management-container add-class">
                <h2 class="section-title">Add Class (Admin/Professor)</h2>
                <div class="add-form">
                    <input type="text" placeholder="Course Code" id="course-code">
                    <input type="text" placeholder="Course Name" id="course-name">
                    <input type="text" placeholder="Section" id="course-section">
                    <input type="text" placeholder="Schedule" id="course-schedule">
                    <button class="btn-save" onclick="addClass()">Save</button>
                </div>
            </div>
            <div class="management-container existing-classes">
                <h2 class="section-title">Existing Classes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Schedule</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="class-table">
                        <tr>
                            <td>EE101 — Intro to Circuits</td>
                            <td>A</td>
                            <td>Mon/Wed 9:00-10:30</td>
                            <td>
                                <button class="btn-edit" onclick="viewClassStudents('EE101')">Edit</button>
                                <button class="btn-delete" data-action="delete">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>CS202 — Data Structures</td>
                            <td>B</td>
                            <td>Tue/Thu 13:00-14:30</td>
                            <td>
                                <button class="btn-edit" onclick="viewClassStudents('CS202')">Edit</button>
                                <button class="btn-delete" data-action="delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
    updateAdminNav(2);
}

function addClass() {
    const code = document.getElementById('course-code').value;
    const name = document.getElementById('course-name').value;
    const section = document.getElementById('course-section').value;
    const schedule = document.getElementById('course-schedule').value;
    
    if (code && name && section && schedule) {
        const table = document.getElementById('class-table');
        const row = table.insertRow();
        row.innerHTML = `
            <td>${code} — ${name}</td>
            <td>${section}</td>
            <td>${schedule}</td>
            <td>
                <button class="btn-edit" onclick="viewClassStudents('${code}')">Edit</button>
                <button class="btn-delete" data-action="delete">Delete</button>
            </td>
        `;
        document.getElementById('course-code').value = '';
        document.getElementById('course-name').value = '';
        document.getElementById('course-section').value = '';
        document.getElementById('course-schedule').value = '';
        alert('Class added successfully!');
    } else {
        alert('Please fill all fields');
    }
}

function viewClassStudents(courseCode) {
    const content = `
        <div class="class-header">
            <h1 class="dashboard-header">Existing Classes<br><span style="font-size: 20px; color: #6b7280;">${courseCode} — Intro to Circuits</span></h1>
            <button class="btn-add" onclick="showAddStudentModal()">Add Student</button>
        </div>
        <div class="management-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Section</th>
                        <th>Scanned Face</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ABELLA, Jabigail</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>AVELLANA, Claries Mae</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>BERMAS, Thanzyrach Ukiel</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>CABUS, Christina Karel</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>CHICO, Shanell Ashley</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>DELGADO, Nicole Anne</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>GARCIA, Mark Anthony</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>LAGOS, Lawrence Rhafael</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>PANES, Antone</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>RETIZA, Liahona Joyce</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div id="student-modal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-left">
                    <div class="camera-preview" style="background:#000; width:100%; height:360px; border-radius:6px;"></div>
                    <button type="button" class="btn-submit scan wide" onclick="scanFace()">SCAN FACE</button>
                    <button type="button" class="btn-submit cancel wide" onclick="closeStudentModal()">CANCEL</button>
                </div>
                <div class="modal-right">
                    <h2 class="modal-title">ADD STUDENT</h2>
                    <form onsubmit="addStudent(event)">
                        <div class="form-group full">
                            <label>Name</label>
                            <input type="text" placeholder="Enter Name" id="student-name">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Sex</label>
                                <input type="text" placeholder="Enter Sex" id="student-sex">
                            </div>
                            <div class="form-group">
                                <label>Birthdate</label>
                                <input type="text" placeholder="MM/DD/YEAR" id="student-bday">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Contact No.</label>
                                <input type="text" placeholder="Enter Contact No." id="student-contact">
                            </div>
                            <div class="form-group">
                                <label>Student No.</label>
                                <input type="text" placeholder="Enter Student No." id="student-no">
                            </div>
                        </div>
                        <div class="modal-actions">
                            <button type="submit" class="btn-submit primary">ADD</button>
                            <button type="button" class="btn-submit cancel" onclick="closeStudentModal()">CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
}

function showAddStudentModal() {
    document.getElementById('student-modal').classList.add('active');
}

function closeStudentModal() {
    document.getElementById('student-modal').classList.remove('active');
}

function scanFace() {
    // Only for professor part: show scan modal matching pasted image
    if (currentUserType === 'professor') {
        const scanModal = document.createElement('div');
        scanModal.id = 'prof-scan-modal';
        scanModal.className = 'modal active';
        scanModal.innerHTML = `
                <div class="modal-content">
                <div style="font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 0; color: #134254; text-align: center;">Scan Face</div>
                <div class="scan-preview"></div>
                <div class="scan-actions">
                    <button class="scan-action-btn green" onclick="seeAttendance()">See Attendance</button>
                    <button class="scan-action-btn yellow" onclick="exportPDF()">Export PDF</button>
                    <button class="scan-action-btn red" onclick="closeProfScanModal()">Stop Scanning</button>
                </div>
            </div>
        `;
        document.body.appendChild(scanModal);
    } else {
        alert('Face scanning initiated...');
    }
}

function closeProfScanModal() {
    const modal = document.getElementById('prof-scan-modal');
    if (modal) modal.remove();
}

function seeAttendance() {
    // Only for professor part: show attendance summary modal matching pasted image
    if (currentUserType === 'professor') {
        closeProfScanModal();
        const attModal = document.createElement('div');
        attModal.id = 'prof-attendance-modal';
        attModal.className = 'modal active';
        attModal.innerHTML = `
            <div class="modal-content">
                <div class="attendance-card">
                    <div class="attendance-header">ATTENDANCE</div>
                    <div class="attendance-meta">
                        <div>
                            <div>DATE:</div>
                            <div>YEAR &amp; SECTION:</div>
                            <div>ROOM NO.:</div>
                        </div>
                        <div style="text-align: right;">
                            <div>COURSE CODE:</div>
                            <div>COURSE NAME:</div>
                            <div>COURSE PROFESSOR:</div>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>YEAR &amp; SECTION</th>
                                <th>DATE &amp;TIME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td></td><td></td><td></td></tr>
                            <tr><td></td><td></td><td></td></tr>
                            <tr><td></td><td></td><td></td></tr>
                            <tr><td></td><td></td><td></td></tr>
                        </tbody>
                    </table>
                    <div class="att-actions">
                        <button class="scan-action-btn yellow" onclick="exportPDF()">Export PDF</button>
                        <button class="scan-action-btn red" onclick="closeProfAttendanceModal()">Stop Scanning</button>
                        <button class="scan-action-btn gradient" onclick="scanFaceAgain()">SCAN FACE AGAIN</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(attModal);
    } else {
        alert('Show attendance summary (implement as needed)');
    }
}

function closeProfAttendanceModal() {
    const modal = document.getElementById('prof-attendance-modal');
    if (modal) modal.remove();
}

function scanFaceAgain() {
    closeProfAttendanceModal();
    scanFace();
}


function exportPDF() {
    alert('Export PDF (implement as needed)');
}

function showStartAttendanceModal() {
    const el = document.getElementById('start-attendance-modal');
    if (el) el.classList.add('active');
}

function closeStartAttendanceModal() {
    const el = document.getElementById('start-attendance-modal');
    if (el) el.classList.remove('active');
}

function addStudent(e) {
    e.preventDefault();
    alert('Student added successfully!');
    closeStudentModal();
}

function adminGoToHistory() {
    const content = `
        <h1 class="dashboard-header">History Classes</h1>
        <div class="management-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Course</th>
                        <th>Time</th>
                        <th>Room No.</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2025-11-11</td>
                        <td>EE101 A</td>
                        <td>08:00</td>
                        <td>R201</td>
                        <td>24 present / 2 unknown</td>
                    </tr>
                    <tr>
                        <td>2025-11-10</td>
                        <td>CS202 B</td>
                        <td>13:00</td>
                        <td>R201</td>
                        <td>18 present / 0 unknown</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
    updateAdminNav(3);
}

function adminGoToReports() {
    const content = `
        <div class="reports-panel">
            <h1 class="dashboard-header">Attendance Reports</h1>
            <div class="report-filters">
                <div class="filter-item">
                    <input type="text" placeholder="mm/dd/yyyy" class="filter-input date-input">
                </div>
                <div class="filter-to">to</div>
                <div class="filter-item">
                    <input type="text" placeholder="mm/dd/yyyy" class="filter-input date-input">
                </div>
                <div class="filter-item">
                    <select class="filter-input section-select">
                        <option>All Sections</option>
                    </select>
                </div>
                <div class="filter-actions">
                    <button class="btn-filter">Filter</button>
                    <button class="btn-export">Export PDF</button>
                </div>
            </div>
            <div class="management-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2025-11-20</td>
                        <td>Juan Dela Cruz</td>
                        <td>20201234</td>
                        <td>08:01</td>
                        <td><span class="status-badge">Present</span></td>
                    </tr>
                    <tr>
                        <td>2025-11-19</td>
                        <td>Maria Santos</td>
                        <td>20204567</td>
                        <td>-</td>
                        <td><span class="status-badge absent">Absent</span></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    `;
    document.getElementById('admin-content').innerHTML = content;
    updateAdminNav(4);
}

// PROFESSOR NAVIGATION FUNCTIONS

function profStartAttendance() {
    // Show the start attendance modal or page for professor
    if (typeof showStartAttendanceModal === 'function') {
        showStartAttendanceModal();
    } else {
        alert('Start Attendance (implement modal/page as needed)');
    }
}
function profGoToHome() {
    const content = `
        <div class="prof-home-header">
            <h1 class="dashboard-header">Professor Dashboard</h1>
            <div class="prof-home-actions">
                <button class="btn-start-attendance" onclick="showStartAttendanceModal()">Start Attendance</button>
            </div>
        </div>

        <div class="management-container prof-class-today">
            <h2 class="section-title">Your Class Today:</h2>
            <div class="class-cards">
                <div class="class-card">
                    <div class="card-title">EE101 — Intro to Circuits</div>
                    <div class="card-date">November 20, 2025</div>
                    <div class="card-time">1:00 pm - 3:00 pm</div>
                </div>
                <div class="class-card">
                    <div class="card-title">CMPE 204 — Intro to Circuits</div>
                    <div class="card-date">November 20, 2025</div>
                    <div class="card-time">1:00 pm - 3:00 pm</div>
                </div>
            </div>
        </div>

        <div class="recent-classes">
            <h2 class="section-title">Recent Classes</h2>
            <div class="recent-class-item">
                <div>
                    <div class="recent-class-title">EE101 - Session 1</div>
                    <div class="recent-class-info">March 15, 2024 • 9:00-10:30 AM</div>
                </div>
                <div class="recent-action"><button class="attendance-rate">85% Attendance</button></div>
            </div>
            <div class="recent-class-item">
                <div>
                    <div class="recent-class-title">CS202 - Session 1</div>
                    <div class="recent-class-info">March 14, 2024 • 1:00-2:30 PM</div>
                </div>
                <div class="recent-action"><button class="attendance-rate">92% Attendance</button></div>
            </div>
        </div>

        <div id="start-attendance-modal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-left">
                    <div class="camera-preview" style="background:#000; width:100%; height:420px; border-radius:6px;"></div>
                </div>
                <div class="modal-right">
                    <h2 class="modal-title">Select to Start!</h2>
                    <form onsubmit="event.preventDefault(); alert('Attendance started'); closeStartAttendanceModal()">
                        <div class="form-group">
                            <label>Course Name</label>
                            <select class="filter-input" id="start-course">
                                <option>Select Course</option>
                                <option>EE101 — Intro to Circuits</option>
                                <option>CS202 — Data Structures</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Section</label>
                            <select class="filter-input" id="start-section">
                                <option>Select Section</option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Room No.</label>
                            <input type="text" placeholder="Enter Room No." id="start-room" class="filter-input">
                        </div>
                        <div style="margin-top:18px;">
                            <button type="button" class="btn-submit scan wide" onclick="scanFace()">SCAN FACE</button>
                            <button type="button" class="btn-submit cancel wide" onclick="closeStartAttendanceModal()">CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('professor-content').innerHTML = content;
    updateProfNav(0);
}

function profGoToClasses() {
    const content = `
        <div class="classes-panel">
            <h1 class="dashboard-header">Class Management</h1>
            <p style="color: #6b7280; margin-bottom: 20px;">Add new classes or manage existing ones. When ready, use the trigger to start a face-recognition session.</p>

            <div class="management-container add-class">
                <h2 class="section-title">Add Class (Admin/Professor)</h2>
                <div class="add-form">
                    <input type="text" placeholder="Course Code" id="prof-course-code">
                    <input type="text" placeholder="Course Name" id="prof-course-name">
                    <input type="text" placeholder="Section" id="prof-course-section">
                    <input type="text" placeholder="Schedule" id="prof-course-schedule">
                    <button class="btn-save" onclick="profAddClass()">Save</button>
                </div>
            </div>

            <div class="management-container existing-classes">
                <h2 class="section-title">Existing Classes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Schedule</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="prof-class-table">
                        <tr>
                            <td>EE101 — Intro to Circuits</td>
                            <td>A</td>
                            <td>Mon/Wed 9:00-10:30</td>
                            <td>
                                <button class="btn-edit" onclick="profViewStudents('EE101')">Edit</button>
                                <button class="btn-delete" data-action="delete">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>CS202 — Data Structures</td>
                            <td>B</td>
                            <td>Tue/Thu 13:00-14:30</td>
                            <td>
                                <button class="btn-edit" onclick="profViewStudents('CS202')">Edit</button>
                                <button class="btn-delete" data-action="delete">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.getElementById('professor-content').innerHTML = content;
    updateProfNav(1);
}

function profAddClass() {
    const code = document.getElementById('prof-course-code').value;
    const name = document.getElementById('prof-course-name').value;
    const section = document.getElementById('prof-course-section').value;
    const schedule = document.getElementById('prof-course-schedule').value;
    
    if (code && name && section && schedule) {
        const table = document.getElementById('prof-class-table');
        const row = table.insertRow();
        row.innerHTML = `
            <td>${code} — ${name}</td>
            <td>${section}</td>
            <td>${schedule}</td>
            <td>
                <button class="btn-scan" onclick="profViewStudents('${code}')">Scan</button>
                <button class="btn-edit">Edit</button>
                <button class="btn-delete" data-action="delete">Delete</button>
            </td>
        `;
        document.getElementById('prof-course-code').value = '';
        document.getElementById('prof-course-name').value = '';
        document.getElementById('prof-course-section').value = '';
        document.getElementById('prof-course-schedule').value = '';
        alert('Class added successfully!');
    } else {
        alert('Please fill all fields');
    }
}

function profViewStudents(courseCode) {
    const content = `
        <div class="class-header">
            <h1 class="dashboard-header">Existing Classes<br><span style="font-size: 20px; color: #6b7280;">${courseCode} — Intro to Circuits</span></h1>
            <div style="display:flex; gap:12px; align-items:center;">
                <button class="btn-start-attendance" onclick="showStartAttendanceModal()">Start Attendance</button>
                <button class="btn-add" onclick="showProfStudentModal()">Add Student</button>
            </div>
        </div>
        <div class="management-container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Section</th>
                        <th>Scanned Face</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ABELLA, Jabigail</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>AVELLANA, Claries Mae</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>BERMAS, Thanzyrach Ukiel</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>CABUS, Christina Karel</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>CHICO, Shanell Ashley</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>DELGADO, Nicole Anne</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>GARCIA, Mark Anthony</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>LAGOS, Lawrence Rhafael</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>PANES, Antone</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>RETIZA, Liahona Joyce</td>
                        <td><span class="status-badge">ENROLLED</span></td>
                        <td>BSCpE 4-1</td>
                        <td><a href="#" class="image-link">See Image</a></td>
                        <td><button class="btn-delete" data-action="delete">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div id="prof-student-modal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-left">
                    <div class="camera-preview" style="background:#000; width:100%; height:420px; border-radius:6px;"></div>
                    <button type="button" class="btn-submit scan wide" onclick="scanFace()">SCAN FACE</button>
                    <button type="button" class="btn-submit cancel wide" onclick="closeProfStudentModal()">CANCEL</button>
                </div>
                <div class="modal-right">
                    <h2 class="modal-title">ADD STUDENT</h2>
                    <form onsubmit="profAddStudent(event)">
                        <div class="form-group full">
                            <label>Name</label>
                            <input type="text" placeholder="Enter Name" id="prof-student-name">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Sex</label>
                                <input type="text" placeholder="Enter Sex" id="prof-student-sex">
                            </div>
                            <div class="form-group">
                                <label>Birthdate</label>
                                <input type="text" placeholder="MM/DD/YEAR" id="prof-student-bday">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Contact No.</label>
                                <input type="text" placeholder="Enter Contact No." id="prof-student-contact">
                            </div>
                            <div class="form-group">
                                <label>Student No.</label>
                                <input type="text" placeholder="Enter Student No." id="prof-student-no">
                            </div>
                        </div>
                        <div class="modal-actions">
                            <button type="submit" class="btn-submit primary">ADD</button>
                            <button type="button" class="btn-submit cancel" onclick="closeProfStudentModal()">CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div id="start-attendance-modal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-left">
                    <div class="camera-preview" style="background:#000; width:100%; height:420px; border-radius:6px;"></div>
                </div>
                <div class="modal-right">
                    <h2 class="modal-title">Select to Start!</h2>
                    <form onsubmit="event.preventDefault(); alert('Attendance started'); closeStartAttendanceModal()">
                        <div class="form-group">
                            <label>Course Name</label>
                            <select class="filter-input" id="start-course">
                                <option>${courseCode} — Intro to Circuits</option>
                                <option>CS202 — Data Structures</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Section</label>
                            <select class="filter-input" id="start-section">
                                <option>Select Section</option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Room No.</label>
                            <input type="text" placeholder="Enter Room No." id="start-room" class="filter-input">
                        </div>
                        <div style="margin-top:18px; display:flex; gap:12px;">
                            <button type="button" class="btn-submit scan wide" onclick="scanFace()">SCAN FACE</button>
                            <button type="button" class="btn-submit cancel wide" onclick="closeStartAttendanceModal()">CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    document.getElementById('professor-content').innerHTML = content;
}

function showProfStudentModal() {
    document.getElementById('prof-student-modal').classList.add('active');
}

function closeProfStudentModal() {
    document.getElementById('prof-student-modal').classList.remove('active');
}

function profAddStudent(e) {
    e.preventDefault();
    alert('Student added successfully!');
    closeProfStudentModal();
}

function profGoToHistory() {
    const content = `
        <h1 class="dashboard-header">Your History Classes</h1>
        <div class="management-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Course Name</th>
                        <th>Time</th>
                        <th>Room No.</th>
                        <th>No. of Students</th>
                        <th>Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>9/08/2025</td>
                        <td>EE101 — Intro to Circuits</td>
                        <td>1:00 pm - 3:00 pm</td>
                        <td>R201</td>
                        <td>45</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>9/08/2025</td>
                        <td>CS202 — Data Structures</td>
                        <td>1:00 pm - 3:00 pm</td>
                        <td>R201</td>
                        <td>50</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>November 20, 2025</td>
                        <td>EE101 — Intro to Circuits</td>
                        <td>1:00 pm - 3:00 pm</td>
                        <td>R201</td>
                        <td>45</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>November 20, 2025</td>
                        <td>CS202 — Data Structures</td>
                        <td>1:00 pm - 3:00 pm</td>
                        <td>R201</td>
                        <td>50</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('professor-content').innerHTML = content;
    updateProfNav(2);
}

function profGoToReports() {
        const content = `
        <div class="reports-panel prof-reports-panel">
            <h1 class="dashboard-header" style="font-family: 'Inter', sans-serif; font-size: 48px; font-weight: 800; margin-bottom: 24px;">Attendance Reports</h1>
            <div class="report-filters" style="display: flex; gap: 24px; align-items: center; margin-bottom: 32px;">
                <div class="filter-group" style="display: flex; align-items: center; gap: 12px;">
                    <div class="filter-box" style="background: #fff; border: 4px solid #888; border-radius: 12px; padding: 18px 32px; font-size: 22px; font-family: 'Inter', sans-serif; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                        mm/dd/yyyy <span style="font-size: 22px; margin-left: 8px;">📅</span>
                    </div>
                    <span style="font-size: 22px; font-family: 'Inter', sans-serif; font-weight: 600;">to</span>
                    <div class="filter-box" style="background: #fff; border: 4px solid #888; border-radius: 12px; padding: 18px 32px; font-size: 22px; font-family: 'Inter', sans-serif; font-weight: 600; display: flex; align-items: center; gap: 10px;">
                        mm/dd/yyyy <span style="font-size: 22px; margin-left: 8px;">📅</span>
                    </div>
                </div>
                <div class="filter-box" style="background: #fff; border: 4px solid #888; border-radius: 12px; padding: 18px 32px; font-size: 22px; font-family: 'Inter', sans-serif; font-weight: 600; display: flex; align-items: center; gap: 10px; min-width: 220px;">
                    All Sections <span style="font-size: 22px; margin-left: 8px;">▼</span>
                </div>
                <button class="btn-filter" style="background: #46822a; color: #fff; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; border-radius: 10px; border: none; padding: 18px 54px; margin-left: 12px; cursor: pointer;">Filter</button>
                <button class="btn-export" style="background: #ffe23a; color: #222; font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 700; border-radius: 10px; border: none; padding: 18px 54px; margin-left: 12px; cursor: pointer;">Export PDF</button>
            </div>
            <div class="report-table-container" style="background: #fff; border-radius: 12px; border: 2px solid #e0e0e0; padding: 24px; margin-top: 12px;">
                <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 22px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e0e0e0;">
                            <th style="text-align: left; padding: 10px 0; font-weight: 700;">Name</th>
                            <th style="text-align: left; padding: 10px 0; font-weight: 700;">ID</th>
                            <th style="text-align: left; padding: 10px 0; font-weight: 700;">Time</th>
                            <th style="text-align: left; padding: 10px 0; font-weight: 700;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px 0;">Juan Dela Cruz</td>
                            <td style="padding: 10px 0;">20201234</td>
                            <td style="padding: 10px 0;">08:01</td>
                            <td style="padding: 10px 0;"><span style="color: #46822a; font-weight: 700;">Present</span></td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0;">Maria Santos</td>
                            <td style="padding: 10px 0;">20204567</td>
                            <td style="padding: 10px 0;">-</td>
                            <td style="padding: 10px 0;"><span style="color: #ff4444; font-weight: 700;">Absent</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `;
    document.getElementById('professor-content').innerHTML = content;
    updateProfNav(3);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showPage('landing-page');
});

// Delegated delete handler for dynamic tables (professors, classes, students)
function handleDeleteClick(e) {
    const btn = e.target.closest('[data-action="delete"]');
    if (!btn) return;
    // confirmation
    if (!confirm('Are you sure you want to delete this item?')) return;
    const tr = btn.closest('tr');
    if (!tr) return;
    const table = tr.closest('table');
    const tbody = tr.parentElement;
    tr.remove();

    // If this table uses row numbers (#) in the first column, renumber remaining rows
    if (table) {
        const firstTh = table.querySelector('thead th');
        if (firstTh && firstTh.textContent && firstTh.textContent.includes('#')) {
            const rows = Array.from(tbody.querySelectorAll('tr'));
            rows.forEach((r, i) => {
                const firstTd = r.querySelector('td');
                if (firstTd) firstTd.textContent = (i + 1).toString();
            });
        }
    }
}

document.addEventListener('click', handleDeleteClick);