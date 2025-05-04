import express,{Request,Response} from "express";
import mongoose from "mongoose";
import {userService} from "./services/user.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/users', async (req:Request, res:Response)=> {
    const data = await userService.getAll();
    res.json(data)
});
app.get('users/:id', (req:Request, res:Response)=>{
    const id = req.params.id
    const data = userService.getById(id);
    res.json(data);
})
app.post('users', (req:Request, res:Response)=>{
    const body = req.body
    const data = userService.create(body);
    res.json(data);
})
app.put('users/:id', (req:Request, res:Response)=>{
    const id = req.params.id
    const body = req.body
    const data = userService.updateById(id, body);
    res.json(data);
})
app.delete('users/:id', (req:Request, res:Response)=>{
    const id = req.params.id
    const data = userService.deleteById(id);
    res.json(data);
})

const dbConnection = async ()=>{
    let dbCon = false;

    while(!dbCon){
        try{
            console.log('Connection to db')
            await mongoose.connect('mongodb+srv://admin:admin@cluster0.r1ifg.mongodb.net/nodejs-express-db')
            dbCon = true
            console.log('Connection is available')
        }catch(e){
            console.log('Connection is unavailable wait 3 s')
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}


const start = async ()=>{
    await dbConnection();
    app.listen(5000, ()=>{
        console.log('Server start on port 5000')
    })
}

start();