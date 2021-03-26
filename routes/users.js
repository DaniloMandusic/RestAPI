const express = require('express');
const { uuid } = require('uuidv4');

const router = express.Router();

let users = [];

router.get('/', (req,res) => {
    res.send(users);

});

router.post('/', (req,res) => {
    const user = req.body;

    const userId = uuid();

    const userWithId = {
        ...user,
        id: userId

    }

    users.push(userWithId)

    console.log("userAdded")

    res.send('POST ROUTE REACHED')

});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id == id);

    res.send(findUser);

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send('User removed');
});

router.patch('/:id', (req,res) =>{
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);

    if(firstName){
        user.firstName = firstName;
    }
    if(lastName){
        user.lastName = lastName;
    }
    if(age){
        user.age = age;
    }

    res.send("user updated");
});

module.exports = router;