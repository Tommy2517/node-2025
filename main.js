const express = require('express');
const {userService} = require("./src/services/user.service");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const data = await userService.getAll()
    res.json(data);
})
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data)
})
app.post('/users', async (req, res) => {
    const user = req.body
    const data = await userService.create(user)
    res.json(data)
})
app.put('/users/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const data = await userService.update(id, body)
    res.json(data);
})
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await userService.delete(id);
    res.json('user is deleted')
})

app.listen(5000)