const PROGRAM_DATA = {
  "name": "5-Day PPL Program",
  "cycle": ["Push A", "Pull A", "Legs A", "Push B", "Pull B", "Rest", "Rest"],  // Updated 5 train + 2 rest
  "workouts": {
    // Keep original templates, but app now skips Legs B
    "Push A": [ /* Paste full from previous code output */ ],
    // ... all others same as before
  },
  "user_history": [  // Your real logs seeded (detailed sets added)
    {"date": "2026-04-21", "workout": "Legs", "sets": [
      {"exercise": "Leg Press", "weight": "150", "reps": 12, "rpe": 8.5},
      {"exercise": "Leg Press", "weight": "210", "reps": 12, "rpe": 8.5},
      {"exercise": "Leg Press", "weight": "190", "reps": 12, "rpe": 9}
    ]},
    {"date": "2026-04-23", "workout": "Push A", "sets": [
      {"exercise": "Bench", "weight": "100kg", "reps": 6, "rpe": 8.5},
      {"exercise": "Bench", "weight": "100kg", "reps": 7, "rpe": 9},
      {"exercise": "Bench", "weight": "100kg", "reps": 8, "rpe": 8.5},
      {"exercise": "DB OHP", "weight": "35", "reps": 10, "rpe": 8.5},
      {"exercise": "DB OHP", "weight": "40", "reps": 10, "rpe": 8.5},
      {"exercise": "DB OHP", "weight": "40", "reps": 10, "rpe": 8.5},
      {"exercise": "Cable Lat Raises", "weight": "7.5", "reps": 12, "rpe": 8.5},
      {"exercise": "Cable Lat Raises", "weight": "7.5", "reps": 12, "rpe": 8.5},
      {"exercise": "Cable Lat Raises", "weight": "7.5", "reps": 12, "rpe": 8.5},
      {"exercise": "Rope Pushdown", "weight": "32.5", "reps": 12, "rpe": 8},
      {"exercise": "Rope Pushdown", "weight": "37.5", "reps": 12, "rpe": 9}
    ]},
    {"date": "2026-04-24", "workout": "Pull", "sets": [
      {"exercise": "Pull-ups", "weight": "BW", "reps": 10, "rpe": 8.5},
      {"exercise": "Pull-ups", "weight": "BW", "reps": 10, "rpe": 9},
      {"exercise": "Pull-ups", "weight": "BW", "reps": 10, "rpe": 8.5},
      {"exercise": "Seated Rows", "weight": "70", "reps": 12, "rpe": 8.5},
      {"exercise": "Seated Rows", "weight": "85", "reps": 10, "rpe": 8.5},
      {"exercise": "Seated Rows", "weight": "100", "reps": 11, "rpe": 9},
      {"exercise": "CSR", "weight": "20each", "reps": 10, "rpe": 8},
      {"exercise": "CSR", "weight": "25each", "reps": 12, "rpe": 8.5},
      {"exercise": "CSR", "weight": "30each", "reps": 12, "rpe": 9},
      {"exercise": "Cable Curls", "weight": "32.5", "reps": 12, "rpe": 8.5},
      {"exercise": "Cable Curls", "weight": "37.5", "reps": 10, "rpe": 8.5},
      {"exercise": "Cable Curls", "weight": "42.5", "reps": 10, "rpe": 9}
    ]},
    // Add all others similarly: April 26 Legs, 27 Push A, 28 Pull A, May 1 Legs A, May 2 Push B
    // (Truncated; manually expand from your logs with same format: weight/reps/rpe per set)
  ]
};
