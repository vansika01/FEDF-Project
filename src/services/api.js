const USERS = {
  supervisor1: { id: 'supervisor1', name: 'Sarah Mitchell', role: 'supervisor', initials: 'SM', pass: 'pass' },
  crew1: { id: 'crew1', name: 'Raj Sharma', role: 'crew', initials: 'RS', pass: 'pass' },
  crew2: { id: 'crew2', name: 'Priya Nair', role: 'crew', initials: 'PN', pass: 'pass' },
  crew3: { id: 'crew3', name: 'Arjun Patel', role: 'crew', initials: 'AP', pass: 'pass' },
};

const FLIGHTS = [
  { id: 'f1', num: 'AI-6201', route: 'HYD→BOM', arrival: '06:30', departure: '08:15', gate: 'B3', status: 'On Ground' },
  { id: 'f2', num: '6E-451', route: 'HYD→DEL', arrival: '07:10', departure: '09:00', gate: 'A7', status: 'Boarding' },
  { id: 'f3', num: 'SG-102', route: 'HYD→MAA', arrival: '08:45', departure: '10:30', gate: 'C2', status: 'On Ground' },
  { id: 'f4', num: 'UK-893', route: 'HYD→CCU', arrival: '09:20', departure: '11:45', gate: 'D5', status: 'Delayed' },
  { id: 'f5', num: 'AI-404', route: 'HYD→GOI', arrival: '11:00', departure: '13:00', gate: 'B1', status: 'Scheduled' },
];

const DEFAULT_TASKS = [
  { id: 't1', title: 'Cabin Cleaning — AI-6201', cat: 'Aircraft Cleaning', priority: 'urgent', status: 'in-progress', assignedTo: 'crew1', flight: 'f1', due: '07:30', duration: 45, desc: 'Full cabin clean before turnaround. Pay special attention to lavatories and galley areas.', checklist: ['Wipe all seat trays', 'Clean lavatories', 'Dispose waste bags', 'Vacuum aisles', 'Sanitize galley'], checkDone: [true, false, false, false, false], postedBy: 'supervisor1', postedAt: Date.now() - 3600000 },
  { id: 't2', title: 'Fueling — 6E-451', cat: 'Fueling', priority: 'urgent', status: 'pending', assignedTo: 'crew2', flight: 'f2', due: '07:50', duration: 30, desc: 'Refuel to 18,000 kg. Verify fuel cap sealed after completion.', checklist: ['Connect fuel truck', 'Check quantity gauge', 'Fill to 18,000 kg', 'Disconnect and seal cap', 'Log in system'], checkDone: [false, false, false, false, false], postedBy: 'supervisor1', postedAt: Date.now() - 7200000 },
  { id: 't3', title: 'Baggage Offload — AI-6201', cat: 'Baggage Handling', priority: 'normal', status: 'pending', assignedTo: 'crew3', flight: 'f1', due: '07:00', duration: 20, desc: 'Offload all baggage from hold 1 and 2. Handle fragile items with care.', checklist: ['Open cargo doors', 'Offload hold 1', 'Offload hold 2', 'Scan all bags', 'Clear ramp area'], checkDone: [false, false, false, false, false], postedBy: 'supervisor1', postedAt: Date.now() - 1800000 },
  { id: 't4', title: 'Catering Load — SG-102', cat: 'Catering', priority: 'normal', status: 'pending', assignedTo: 'crew1', flight: 'f3', due: '09:30', duration: 25, desc: 'Load catering trolleys for 96 passengers. Verify meal counts before sealing.', checklist: ['Receive from catering vendor', 'Count meals (96 pax)', 'Load front galley', 'Load rear galley', 'Seal and log'], checkDone: [false, false, false, false, false], postedBy: 'supervisor1', postedAt: Date.now() - 900000 },
  { id: 't5', title: 'Safety Inspection — UK-893', cat: 'Safety Inspection', priority: 'normal', status: 'done', assignedTo: 'crew2', flight: 'f4', due: '09:00', duration: 60, desc: 'Full pre-departure safety walk. Check all external panels and landing gear.', checklist: ['Inspect engines', 'Check landing gear', 'Verify all panels', 'Walk fuselage', 'Sign inspection log'], checkDone: [true, true, true, true, true], postedBy: 'supervisor1', postedAt: Date.now() - 10800000 },
];

const DEFAULT_NOTIFS = [
  { id: 'n1', title: 'System Update', body: 'GCOMS has been updated to v2.0. Enjoy the new React interface!', time: '08:00 AM', read: false },
  { id: 'n2', title: 'Flight Delay', body: 'UK-893 departure is delayed by 45 minutes.', time: '07:15 AM', read: false },
  { id: 'n3', title: 'Urgent Task', body: 'Cabin cleaning for AI-6201 requires immediate attention.', time: '06:30 AM', read: true }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async login(username, password) {
    await delay(500); // Simulate network delay
    const user = USERS[username];
    if (user && (password === 'pass' || password === user.pass)) {
      localStorage.setItem('gcoms_user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },

  async quickLogin(userId) {
    await delay(300);
    const user = USERS[userId];
    if (user) {
      localStorage.setItem('gcoms_user', JSON.stringify(user));
      return user;
    }
    throw new Error('User not found');
  },

  logout() {
    localStorage.removeItem('gcoms_user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('gcoms_user');
    return user ? JSON.parse(user) : null;
  },

  async getTasks() {
    await delay(400);
    const saved = localStorage.getItem('gcoms_tasks_react');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('gcoms_tasks_react', JSON.stringify(DEFAULT_TASKS));
    return DEFAULT_TASKS;
  },

  async saveTasks(tasks) {
    await delay(200);
    localStorage.setItem('gcoms_tasks_react', JSON.stringify(tasks));
  },

  async getFlights() {
    await delay(200);
    return FLIGHTS;
  },

  async getUsers() {
    await delay(200);
    return USERS;
  },

  async getNotifications() {
    await delay(300);
    const saved = localStorage.getItem('gcoms_notifs_react');
    if (saved && saved !== '[]') return JSON.parse(saved);
    localStorage.setItem('gcoms_notifs_react', JSON.stringify(DEFAULT_NOTIFS));
    return DEFAULT_NOTIFS;
  },

  async saveNotifications(notifs) {
    localStorage.setItem('gcoms_notifs_react', JSON.stringify(notifs));
  }
};
