getNextWorkout() {
  const cycleIndex = this.currentDay % PROGRAM_DATA.cycle.length;
  let workout = PROGRAM_DATA.cycle[cycleIndex];
  if (workout === "Rest") return { workout: "Rest Day - Recover!" };
  // Skip Legs B logic: cycle is now 5 train +2 rest
  return { workout, template: PROGRAM_DATA.workouts[workout] || [] };
}

async submitCheckin() {
  // Your process: fatigue>7? deload 5-10%
  this.checkin = { /* inputs */ };
  // Adjust next template weights based on last log RPE
}

logSet() {
  // Log format: Exercise,Set#,Weight,Reps,RPE
  // Auto-progress: if RPE<=8.5 && reps>=target min, next +2 reps or +2.5-5lbs
}

// In loadData(): Seed user_history instead of sample
PROGRAM_DATA.user_history.forEach(h => this.db.transaction('workouts', 'readwrite').objectStore('workouts').add(h));
