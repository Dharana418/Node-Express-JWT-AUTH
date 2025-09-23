const User=require('../models/User.js');
const jwt=require('jsonwebtoken');

//handle errors
const handleErrors=(err)=>{
  console.log(err.message,err.code);
  let error={email:'',password:''};

  //duplicate error code
  if(err.code===11000){
    error.email='that email is already registered';
    return error;
  }

  //validation errors
  if(err.message.includes('user validation failed')){
    console.log(Object.values(err.errors).forEach(({properties})=>{
      error[properties.path]=properties.message;
    }));
  }
}
const maxAge=3*24*60*60;
const createToken=(id)=>{
  return jwt.sign({id},'net ninja secret',{
    expiresIn:maxAge
  });
}
module.exports.signup_get = (req, res) => {
  res.render('signup');
}
module.exports.login_get = (req, res) => {
  res.send('signup post');
}
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try{
    const user=await User.create({email,password});
    const token=createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
    res.status(201).json({user});
  }
  catch(err){
    console.log(err);
    res.status(400).send('error,user not created');
  }
}
module.exports.login_post = async(req, res) => {
    const { email, password } = req.body;
    res.send('login post');
}









