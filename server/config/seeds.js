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
            name: 'ROMANIAN DEADLIFT',
            description: 'FOCUS ON KEEPING YOUR SPINE NEUTRAL, ANTERIOR PELVIC TILT DURING THE ECCENTRIC',
            sets: 3,
            reps: 8,
            muscleGroup: 'Legs'
        },
        {
            name: 'PAUSE BARBELL HIP THRUST',
            description: '3-SECOND PAUSE. TUCK YOUR CHIN AND RIB CAGE DOWN, ONLY MOVE YOUR HIPS. USE A PAD',
            sets: 2,
            reps: 10,
            muscleGroup: 'Legs'
        },
        {
            name: 'SLOW ECCENTRIC GOBLET SQUAT',
            description: '3-SECOND LOWERING PHASE. SIT DOWN, KNEES OUT, TORSO UPRIGHT (PER LEG)',
            sets: 2,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'CABLE ROPE PULLTHROUGH',
            description: 'FOCUS ON SQUEEZING YOUR GLUTES TO MOVE THE WEIGHT',
            sets: 2,
            reps: 20,
            muscleGroup: 'Legs'
        },
        {
            name: 'SMITH MACHINE REVERSE LUNGE',
            description: 'SIT BACK, START WITH YOUR WEAKER LEG',
            sets: 2,
            reps: 15,
            muscleGroup: 'Legs'
        },
        {
            name: 'ENHANCED-ECCENTRIC LYING LEG CURL',
            description: 'HAVE A TRAINING PARTNER PUSH DOWN ON THE PAD DURING THE ECCENTRIC',
            sets: 2,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'ENHANCED-ECCENTRIC LEG EXTENSION',
            description: 'HAVE A TRAINING PARTNER PUSH DOWN ON THE PAD DURING THE ECCENTRIC',
            sets: 2,
            reps: 12,
            muscleGroup: 'Legs'
        },
        {
            name: 'LATERAL BAND WALK',
            description: 'OR MACHINE HIP ABDUCTION, FOCUS ON DRIVING YOUR KNEES OUT',
            sets: 2,
            reps: 15,
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
            name: 'CLOSE-GRIP SMITH MACHINE PRESS',
            description: 'SHOULDER WIDTH GRIP, ELBOWS DOWN AT YOUR SIDES',
            sets: 2,
            reps: 15,
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
            name: 'ARNOLD PRESS',
            description: 'START YOUR SHOULDERS INTERNALLY ROTATED, GRADUALLY EXTERNALLY ROTATE THEM AS YOU PRESS UP',
            sets: 2,
            reps: 12,
            muscleGroup: 'Shoulders'
        },
        {
            name: 'EGYPTIAN LATERAL RAISE',
            description: 'LEAN AWAY FROM THE CABLE, FOCUS ON SQUEEZING YOUR DELTS',
            sets: 2,
            reps: 15,
            muscleGroup: 'Shoulders'
        },
        {
            name: 'MILITARY PRESS / PUSH PRESS COMPLEX',
            description: 'FIRST 4 REPS MILITARY PRESS, LAST 4 REPS PUSH PRESS (USE LEG DRIVE)',
            sets: 3,
            reps: 8,
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
        {
            name: '1 ARM LAT PULL-IN',
            description: 'LIGHT SETS, DRIVE ELBOW DOWN AND IN TOWARD SIDE, LATERALLY FLEX INTO THE DIRECTION OF PULL',
            sets: 2,
            reps: 20,
            muscleGroup: 'Back'
        },
        {
            name: 'PULL-UP',
            description: 'PULL YOUR ELBOWS DOWN AND IN, MINIMIZE SWINGING',
            sets: 4,
            reps: 8,
            muscleGroup: 'Back'
        },
        {
            name: 'PENDLAY ROW',
            description: 'INITIATE THE MOVEMENT WITH SCAPULAR RETRACTION, PULL TO YOUR LOWER CHEST, KEEP YOUR TORSO MOTIONLESS',
            sets: 3,
            reps: 10,
            muscleGroup: 'Back'
        },
        {
            name: 'MACHINE HIGH ROW',
            description: 'FOCUS ON SQUEEZING YOUR LATS',
            sets: 3,
            reps: 12,
            muscleGroup: 'Back'
        },
        {
            name: 'SEATED FACE PULL',
            description: 'PULL YOUR ELBOWS UP AND OUT, RETRACT YOUR SCAPULA',
            sets: 3,
            reps: 20,
            muscleGroup: 'Back'
        },
        {
            name: 'NEUTRAL-GRIP PULLDOWN',
            description: 'PULL YOUR ELBOWS DOWN AGAINST YOUR SIDES',
            sets: 3,
            reps: 12,
            muscleGroup: 'Back'
        },
        {
            name: 'CABLE SEATED ELBOWS OUT ROW',
            description: 'FOCUS ON SCAPULAR RETRACTION, PULL WITH YOUR ELBOWS UP AND OUT',
            sets: 3,
            reps: 10,
            muscleGroup: 'Back'
        },
        {
            name: 'CABLE SEATED ROW',
            description: 'FOCUS ON SCAPULAR RETRACTION, PULL WITH YOUR ELBOWS DOWN AND IN',
            sets: 3,
            reps: 10,
            muscleGroup: 'Back'
        },
        {
            name: 'KNEELING STRAIGHT-ARM CABLE PULL-OVER',
            description: 'LEAN YOUR TORSO AT A 45° ANGLE, FOCUS ON PULLING THE WEIGHT STRAIGHT DOWN, NOT "IN"',
            sets: 3,
            reps: 15,
            muscleGroup: 'Back'
        },
        {
            name: 'SNATCH GRIP BARBELL SHRUG',
            description: 'USE A 1.5X SHOULDER WIDTH GRIP, CONTROL THE WEIGHT AND "SHRUG UP TO YOUR EARS"',
            sets: 3,
            reps: 15,
            muscleGroup: 'Back'
        },
        {
            name: 'CABLE REVERSE FLYE',
            description: 'FOCUS ON SWEEPING THE WEIGHT OUT LATERALLY',
            sets: 3,
            reps: 20,
            muscleGroup: 'Back'
        },
        {
            name: 'SINGLE-ARM CABLE CURL',
            description: 'STAND UPRIGHT, KEEP YOUR ELBOW BEHIND YOUR TORSO',
            sets: 3,
            reps: 12,
            muscleGroup: 'Bicep'
        },
        {
            name: 'HAMMER CURL',
            description: 'FOCUS ON SQUEEZING YOUR BICEPS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 8,
            muscleGroup: 'Bicep'
        },
        {
            name: 'REVERSE GRIP EZ BAR CURL',
            description: 'ARCH THE BAR "OUT", NOT "UP". FOCUS ON SQUEEZING YOUR FOREARMS',
            sets: 3,
            reps: 20,
            muscleGroup: 'Bicep'
        },
        {
            name: 'SUPINATED EZ BAR CURL',
            description: 'ARCH THE BAR "OUT", NOT "UP". FOCUS ON SQUEEZING YOUR BICEPS',
            sets: 3,
            reps: 15,
            muscleGroup: 'Bicep'
        },
        {
            name: 'DUMBBELL PREACHER CURL',
            description: 'FOCUS ON SQUEEZING YOUR BICEPS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 12,
            muscleGroup: 'Bicep'
        },
        {
            name: 'DUMBBELL PRONATED CURL',
            description: 'ARCH THE DUMBBELL "OUT", NOT "UP". FOCUS ON SQUEEZING YOUR FOREARMS',
            sets: 4,
            reps: 8,
            muscleGroup: 'Bicep'
        },
        {
            name: 'DUMBBELL SUPINATED CURL',
            description: 'ARCH THE DUMBBELL "OUT", NOT "UP". FOCUS ON SQUEEZING YOUR BICEPS',
            sets: 4,
            reps: 8,
            muscleGroup: 'Bicep'
        },
        {
            name: 'TRICEPS V-BAR PRESSDOWN',
            description: 'FOCUS ON SQUEEZING YOUR TRICEPS TO MOVE THE WEIGHT',
            sets: 3,
            reps: 15,
            muscleGroup: 'Tricep'
        },
        {
            name: 'ROPE OVERHEAD TRICEPS EXTENSION',
            description: 'FOCUS ON STRETCHING YOUR TRICEPS AT THE BOTTOM OF THE MOVEMENT',
            sets: 2,
            reps: 15,
            muscleGroup: 'Tricep'
        },
        {
            name: 'DUMBBELL ISOLATERAL SKULL CRUSHER',
            description: 'USE 1 DUMBBELL IN EACH HAND. KEEP YOUR ELBOWS IN A FIXED POSITION INLINE WITH THE TOP OF YOUR HEAD, PRESS THE DUMBBELL OVER YOUR HEAD (NOT IN FRONT OF YOUR FACE)',
            sets: 3,
            reps: 12,
            muscleGroup: 'Tricep'
        },
        {
            name: 'CABLE TRICEPS KICKBACK',
            description: 'STAND UPRIGHT, KEEP YOUR ELBOWS BEHIND YOUR TORSO',
            sets: 3,
            reps: 20,
            muscleGroup: 'Tricep'
        },
        
    ]);

    console.log(`seeded ${exercises.length} exercises`);

    process.exit();
});


/*

{
    name: '',
    description: '',
    sets: ,
    reps: ,
    muscleGroup: ''
},

*/