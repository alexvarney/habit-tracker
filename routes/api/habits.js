const express = require('express');
const auth = require('../../middleware/auth')
const Habit = require('../../models/Habit')

const router = express.Router()
router.use(auth({role: ['user']}))

//GET all user habits
router.get('/', async (req, res) => {

    res.send(await Habit.find({user: req.user._id}))

})

//POST new user habit
router.post('/', async (req, res) => {
    
    const newHabit = new Habit({
        ...req.body,
        user: req.user._id,
    });

    res.send(await newHabit.save());

})

router.put('/:id', async (req, res) => {
    const habit = await Habit.findById(req.params.id);
    
    if(habit.user.toString() !== req.user._id.toString()){
        return res.status(403).send('You do not have permission to access this resource.')
    }
    
    res.send(await habit.update(req.body))
})

//PATCH update to Habit
//Accepts a timestamp JSON paramater, 
router.patch('/:id', async (req, res) => {

    const {id} = req.params

    habit = await Habit.findById(id)

    if(habit.user.toString() !== req.user._id.toString()){
        return res.status(403).send('You do not have permission to access this resource.')
    }

    if(req.body.timestamp){
        habit.occurrences.push(new Date(req.body.timestamp))
    } else {
        habit.occurrences.push(Date.now())
    }
    
    
    res.send(await habit.save())

})


module.exports = router;