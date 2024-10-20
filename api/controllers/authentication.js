const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

const register=async(req,res)=>{
    if(!req.body.email || !req.body.password || !req.body.name){
        return res.status(400).send('All fields are required');}
        const user=new User({
            email: req.body.email,
            password: '',
            name: req.body.name
        });
        user.setPassword(req.body.password);
        const q=await user.save();
        if(!q){
            return res.status(404).json(err).send('No user added');
        }
        const token=user.generateJWT();
        return res.status(200).json(token);
}

const login=async(req,res)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).send('All fields are required');
    }
    passport.authenticate('local',function(err,user,info){
        if(err){
            return res.status(401).json(err);
        }
        if(user){
            const token=user.generateJWT();
            res.status(200).json({token});
        }else{
            res.status(401).json(info);
        }
    })(req,res);
}

module.exports={register,login}