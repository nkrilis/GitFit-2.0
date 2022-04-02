const db = require('../config/connection');
const { User, Exercise } = require('../models');
const userSeeds = require('./userSeeds.json');
const exerciseSeeds = require('./exerciseSeed.json');

db.once('open', async () => {
  try {
    await Exercise.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Exercise.create(exerciseSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
