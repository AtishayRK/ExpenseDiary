const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const routes = require('./routes/routes');
mongoose.connect("mongodb://atishay:passwordatishay@cluster0-shard-00-00-8i13z.mongodb.net:27017,cluster0-shard-00-01-8i13z.mongodb.net:27017,cluster0-shard-00-02-8i13z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{useNewUrlParser : true});

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected');
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connection' +err);
})
const data=new Date();
//console.log(data.getFullYear());
app.use(bodyParser.json());

app.use(cors());

app.use('/apis',routes);
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(4000,(err)=>{
    if(err)
    {
        console.log(err);

    }
    else{
        console.log("connecting at port 3000");

    }
});