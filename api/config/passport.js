
const mongoose=require('mongoose');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Users=require('../models/user');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
    {usernameField:'email'},
    async(email,password,done)=>{
        const q = await User.findOne({email:email}).exec();
        if(!q){
            return done(null,false, {message:"Incorrect Username"});
        }
        if(!q.validPassword(password)){
            return done(null,false, {message:"Incorrect Password"});
        }
        return done(null,q);
    }
));