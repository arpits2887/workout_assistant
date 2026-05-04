class PPLApp {
  constructor() {
    this.db = null;
    this.currentDay = 0;
    this.checkin = {};
    this.initDB();
    this.bindEvents();
    this.loadData();
  }

  async initDB() {
    const request = indexedDB.open('PPLTracker', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore('workouts', { keyPath: 'date' });
      db.createObjectStore('program', { keyPath: 'id' });
      db.createObjectStore('checkins', { autoIncrement: true });
    };
    this.db = await new Promise((res) => { request.onsuccess = () => res(request.result); });
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelector('.tab.active').classList.remove('active');
        document.querySelector('.tab-content.active').classList.remove('active');
        e.target.classList.add('active');
        document.getElementById(e.target.dataset.tab).classList.add('active');
      });
    });

    // Today: Start workout
    document.getElementById('start-workout').addEventListener('click', () => this.startWorkout());

    // Program save
    document.getElementById('save-program').addEventListener('click', () => this.saveProgram());

    // Check-in
    document.getElementById('submit-checkin').addEventListener('click', () => this.submitCheckin());

    // Logger
    document.getElementById('log-set').addEventListener('click', () => this.logSet());

    // Export
    document.getElementById('export-csv').addEventListener('click', () => this.exportCSV());
  }

  async loadData() {
    // Seed if empty
    const tx = this.db.transaction('workouts', 'readonly');
    const store = tx.objectStore('workouts');
    if ((await store.count()).value === 0) {
      PROGRAM_DATA.sample_history.forEach(async (h) => {
        await this.db.transaction('workouts', 'readwrite').objectStore('workouts').add(h);
      });
    }
    this.renderToday();
    this.renderHistory();
  }

  getNextWorkout() {
    const cycle = PROGRAM_DATA.cycle[this.currentDay % PROGRAM_DATA.cycle.length];
    return { workout: cycle, template: PROGRAM_DATA.workouts[cycle] };
  }

  async startWorkout() {
    const next = this.getNextWorkout();
    document.getElementById('current-sets').innerHTML = next.template.map(ex => 
      `<div class="set-item">${ex.exercise} ${ex.sets}x${ex.reps} @${ex.rpe} (est ${ex.weight}lbs)</div>`
    ).join('');
    document.getElementById('today-goal').textContent = `Next: ${next.workout}`;
    this.currentDay++;
  }

  async saveProgram() {
    const program = {
      id: 'current',
      goal: document.getElementById('goal').value,
      split: document.getElementById('split').value,
      duration: document.getElementById('duration').value
    };
    await this.db.transaction('program', 'readwrite').objectStore('program').put(program);
    document.getElementById('current-program').textContent = JSON.stringify(program, null, 2);
  }

  async submitCheckin() {
    const checkin = {
      date: new Date().toISOString(),
      pain: document.getElementById('pain').value,
      fatigue: document.getElementById('fatigue').value,
      time: document.getElementById('time').value,
      equipment: document.getElementById('equipment').value
    };
    await this.db.transaction('checkins', 'readwrite').objectStore('checkins').add(checkin);
    this.checkin = checkin;
    // Adjust progression: e.g., if fatigue >7, reduce weight 5-10%
  }

  async logSet() {
    const set = {
      exercise: document.querySelector('.set-item')?.textContent.split(' ')[0] || 'Unknown',
      weight: parseFloat(document.getElementById('log-weight').value),
      reps: parseInt(document.getElementById('log-reps').value),
      rpe: parseInt(document.getElementById('log-rpe').value)
    };
    // Save to current workout
    const today = new Date().toISOString().split('T')[0];
    const tx = this.db.transaction('workouts', 'readwrite');
    const current = await tx.objectStore('workouts').get(today);
    if (current) {
      current.sets.push(set);
      await tx.objectStore('workouts').put(current);
    } else {
      await tx.objectStore('workouts').add({ date: today, workout: this.getNextWorkout().workout, sets: [set] });
    }
    this.renderHistory();
  }

  async renderToday() {
    const next = this.getNextWorkout();
    document.getElementById('today-goal').innerHTML = `<strong>${next.workout}</strong><br>${next.template[0].exercise}`;
    // Last session from history
  }

  async renderHistory() {
    const tx = this.db.transaction('workouts');
    const history = await tx.objectStore('workouts').getAll();
    document.getElementById('history-list').innerHTML = history.map(h => 
      `<div class="set-item">${h.date}: ${h.workout} - ${h.sets.length} sets</div>`
    ).join('');
  }

  exportCSV() {
    // Simple CSV from history
    const history = []; // fetch from DB
    const csv = 'Date,Workout,Exercise,Weight,Reps,RPE\n' + history.flatMap(h => h.sets.map(s => `${h.date},${h.workout},${s.exercise},${s.weight},${s.reps},${s.rpe}`)).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'ppl-history.csv'; a.click();
  }
}

new PPLApp();
