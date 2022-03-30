const db = require('./connection');
const { Exercise, WorkoutPlan, User } = require('../models');

db.once('open', async () => 
{
    await Exercise.deleteMany();

    const exercises = await Exercise.insertMany([
        {
            name: 'BACK SQUAT',
            description: 'SIT BACK AND DOWN, 15° TOE FLARE, DRIVE YOUR KNEES OUT LATERALLY',
            sets: 4,
            reps: 5,
            muscleGroup: 'Legs'
        },
        {
            name: 'DEADLIFT',
            description: 'BRACE YOUR LATS, CHEST TALL, HIPS HIGH, PULL THE SLACK OUT OF THE BAR PRIOR TO MOVING IT OFF THE GROUND',
            sets: 2,
            reps: 8,
            muscleGroup: 'Legs'
        },
        {
            name: 'BARBELL HIP THRUST',
            description: 'TUCK YOUR CHIN AND RIB CAGE DOWN, ONLY MOVE YOUR HIPS. USE A PAD',
            sets: 3,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'DUMBBELL WALKING LUNGE',
            description: 'TAKE MEDIUM STRIDES, MINIMIZE THE AMOUNT YOU PUSH OFF YOUR REAR LEG (Reps are per leg)',
            sets: 2,
            reps: 20,
            muscleGroup: 'Legs'
        },
        {
            name: 'LEG EXTENSION',
            description: 'FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 15,
            muscleGroup: 'Legs'
        },
        {
            name: 'SEATED LEG CURL',
            description: 'FOCUS ON SQUEEZING YOUR HAMSTRINGS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 15,
            muscleGroup: 'Legs'
        },
        {
            name: 'STANDING CALF RAISE',
            description: "PRESS ALL THE WAY UP TO YOUR TOES, STRETCH YOUR CALVES AT THE TO BOTTOM, DON'T BOUNCE",
            sets: 3,
            reps: 10,
            muscleGroup: 'Legs'
        },
        {
            name: 'FRONT SQUAT',
            description: 'SIT DOWN, 15° TOE FLARE, DRIVE YOUR KNEES OUT LATERALLY',
            sets: 3,
            reps: 8,
            muscleGroup: 'Legs'
        },
        {
            name: 'CABLE PULL THROUGH',
            description: 'FOCUS ON ANTERIORLY TILTING YOUR PELVIS DURING THE ECCENTRIC, POSTERIORLY DURING THE CONCENTRIC',
            sets: 3,
            reps: 20,
            muscleGroup: 'Legs'
        },
        {
            name: 'SINGLE-LEG LEG PRESS',
            description: 'HIGH FOOT PLACEMENT',
            sets: 3,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'SINGLE-LEG LEG EXTENSION',
            description: 'START WITH YOUR WEAKER LEG, FOCUS ON SQUEEZING YOUR QUADS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 15,
            muscleGroup: 'Legs'
        },
        {
            name: 'SWISS BALL SINGLE-LEG LEG CURL',
            description: 'START WITH YOUR WEAKER LEG, PREVENT YOUR HIPS FROM TOUCH THE GROUND',
            sets: 3,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'BARBELL BENCH PRESS',
            description: 'TUCK ELBOWS AT A 45° ANGLE, SQUEEZE YOUR SHOULDER BLADES AND STAY FIRM ON THE BENCH',
            sets: 3,
            reps: 4,
            muscleGroup: 'Chest'
        },
        {
            name: 'WEIGHTED DIP',
            description: 'TUCK YOUR ELBOWS AT A 45° ANGLE, LEAN YOUR TORSO FORWARD 15°, KEEP YOUR SCAPULAE RETRACTED',
            sets: 3,
            reps: 10,
            muscleGroup: 'Chest'
        },
        {
            name: 'LOW-TO-HIGH CABLE FLYE',
            description: 'START EXTERNALLY ROTATED WITH YOUR ELBOWS DOWN AND OUT, PULL YOUR ELBOWS (NOT HANDS) UP AND IN WHILE SLIGHTLY INTERNALLY ROTATING YOUR SHOULDER',
            sets: 3,
            reps: 15,
            muscleGroup: 'Chest'
        },
        {
            name: 'CLOSE-GRIP BENCH PRESS',
            description: 'SHOULDER WIDTH GRIP, ELBOWS DOWN AT YOUR SIDES',
            sets: 3,
            reps: 6,
            muscleGroup: 'Chest'
        },
        {
            name: 'DUMBBELL INCLINE PRESS',
            description: 'KEEP YOUR SCAPULAE RETRACTED AND DEPRESSED',
            sets: 3,
            reps: 12,
            muscleGroup: 'Chest'
        },
        {
            name: 'PEC DECK',
            description: 'FOCUS ON BRINGING YOUR INNER ELBOWS TOGETHER - NOT YOUR HANDS',
            sets: 3,
            reps: 15,
            muscleGroup: 'Chest'
        },
        {
            name: 'DUMBBELL SEATED SHOULDER PRESS',
            description: 'BRING THE DUMBBELL ALL THE WAY DOWN, KEEP YOUR TORSO UPRIGHT',
            sets: 3,
            reps: 10,
            muscleGroup: 'Shoulders'
        },
        {
            name: 'MILITARY PRESS',
            description: 'SQUEEZE YOUR GLUTES TO KEEP YOUR TORSO UPRIGHT, CLEAR YOUR HEAD OUT OF THE WAY, PRESS UP AND SLIGHTLY BACK',
            sets: 3,
            reps: 5,
            muscleGroup: 'Shoulders'
        },
        {
            name: 'CABLE LATERAL RAISE',
            description: 'FOCUS ON SQUEEZING YOUR LATERAL DELT TO MOVE THE WEIGHT',
            sets: 3,
            reps: 8,
            muscleGroup: 'Shoulders'
        },
        {
            name: 'DUMBBELL LATERAL RAISE',
            description: 'TILT THE DUMBBELL SUCH THAT YOUR PINKY COMES UP FIRST',
            sets: 3,
            reps: 15,
            muscleGroup: 'Shoulders'
        },
       
    ]);

    console.log(`seeded ${exercises.length} exercises`);

    process.exit();
});