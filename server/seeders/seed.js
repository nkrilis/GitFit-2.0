const db = require('../config/connection');
const { User, Exercise, WorkoutPlan } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeed.json');
const workoutPlanSeeds = require('./testingseeds.json');

db.once('open', async () => {
  try {
    await Exercise.deleteMany({});
    await WorkoutPlan.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Exercise.create(exerciseSeeds);
    await WorkoutPlan.create(workoutPlanSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
