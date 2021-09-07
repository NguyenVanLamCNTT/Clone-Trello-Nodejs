require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/',(req,res) => {
    res.send('Clone Trello');
});
//Connect mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.log('Mongodb connected'))
    .catch(err => console.log(err));
//Router
const RegisterRouter = require('./server/routers/api/register');
const LoginRouter = require('./server/routers/api/login');
app.use('/api/auth/register', RegisterRouter);
app.use('/api/auth/login', LoginRouter);
const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
})
