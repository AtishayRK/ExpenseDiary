const express=require("express");
const item=require('../models/item');
const router=express.Router();
const jwt=require("jsonwebtoken");
const md5=require('md5');
const user=require("../models/user");
const profile= require('../models/profiles')
var async=require("async")
function verifyToken(req,res,next){
    if(!req.headers.authorization)
    {
        return res.status(401).send('unauthorized');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token===null)
    {   
        return res.status(401).send('unauthorized');
    }
    else{
        
        let verify = jwt.verify(token,'secretKey')
        if(!verify)
        return res.status(401).send('unauthorized');
        req.userid = verify.subject;
        next()
    }
}
router.post('/register',(req,res,next)=>{
    let newUser= new user(
    {
    name : req.body.name,
    password: md5(req.body.password)
    }
    );
    newUser.save((err,User)=>{
        if(err)
        {
            res.json({msg :err});
        }
        else
        {
            let payload ={subject : User._id};
                let token = jwt.sign(payload,'secretKey');
                res.status(200).send({token});
        }
    })
    });
    router.post('/login',(req,res)=>{
        user.find({$and : [{name: req.body.name},{password:req.body.password}]},(err,result)=>{
            if(err)
            {
                res.status(401).send("invalid login");
                res.json({msg: "invalid"});
            }
            else{
                let payload ={subject : result._id};
                let token = jwt.sign(payload,'secretKey');
                res.status(200).send({token});
            }
        });
    });

router.post('/insert',verifyToken,(req,res)=>{
    const date=new Date( req.body.year,req.body.month,req.body.day+1);
    console.log(date);
const newItem =new item({
    item : req.body.item,
    amt : req.body.amt,
    date : date,
    profile : req.body.profile,
    name : req.body.name
})
newItem.save((err,result)=>{
    if(err)
    res.json({"err":"err in save"});
    else
    res.json({"res" : "save complete"});
})
})


router.get('/getitem',(req,res)=>{
    let files=[]
    var count=0;
   var obj=JSON.parse(req.query.myobj)
   var date1=new Date(obj.year1,obj.month1,obj.day1);
   var date2=new Date(obj.year2,obj.month2,obj.day2);
    var name = obj.name
    var profile =obj.profile
  item.find({$and : [{name: name},{date:{ $lte : date2,$gt : date1}},{profile : profile}]},(err,result)=>{

    if(err)
      res.status(404).json({"msg":"err in search"});
      //console.log(result)
      result.forEach((p)=>{
            files[count++]={
                item : p.item,
                amt : p.amt,
                date : p.date
            }
      })
      res.json(files);
   })



}

)
router.post('/profiles',(req,res)=>{
    profile.find({name : req.body.name},(err,result)=>{
        if(err)
     {    
         console.log("not added");
            res.json({"err" : "not added"});
    }    
        if(result.length===0)
        {
            let newProfile=new profile({
                name : req.body.name,
                profiles : [req.body.profile]
            })
            newProfile.save((err,ans)=>{
                if(err)
                {    
                    console.log("not added");
                       res.json({"err" : "not added"});
               }   
                else
                {    
                    console.log(" added");
                       res.json({"res" : "added"});
               }   
            })
        }
        else{
            profile.updateOne(
                {name : req.body.name},
                {$addToSet : {profiles : req.body.profile}},(err,result)=>{
                    if(err)
                {    
                    console.log("not upated");
                       res.json({"err" : "not upated"});
               }   
                else
                {    
                    console.log(" updated");
                       res.json({"res" : "upated"});
               }   
                }
            )
        }

    })
})
router.get('/getprofiles/:name',(req,res)=>{
    let nameid=req.params.name;
  //  console.log(nameid+"  jsdn")
    let list=[]
    let con=0;
    profile.findOne({name: nameid},(err,result)=>{
        if(err)
         console.log("erron in search")
         
        // console.log(result)
         if(result) 
         {
            
            {
             list=result.profiles
         }
        }
         res.json(list);
        }
    )
})
  router.delete('/deleteProfile',(req,res)=>{
      let data=JSON.parse(req.query.profile);
      let names=data.name
      let profilename=data.profilename
      profile.update(
          {name: names},
          {
              $pull :{ profiles : profilename }
          },
          (err,result)=>{
            if(err)
            console.log("err in delete");
            else
            console.log("deleted")

          }
      )
      res.json({msg:"deleted"})
  })

module.exports=router;