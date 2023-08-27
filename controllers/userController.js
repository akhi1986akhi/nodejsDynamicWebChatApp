const User = require('../models/userModal');

const bcrypt = require('bcrypt');



const registerLoad = async (req,res)=>{

try{
res.render('register');
}catch(error){
    console.log(error.message);
}

}




const register = async(req,res)=>{
    try{

        const passwordHash = await bcrypt.hash(req.body.password,10);

     const user =    new User({
            name:req.body.name,
            email:req.body.email,
            image:"images/"+req.file.filename,
            password:passwordHash
        })


        await user.save();

        res.render('register',{message:"Registration Successfully!"})
    }catch(error){
        console.log(error.message);
    }
}



const loadLogin = async (req,res)=>{
    try{
        res.render('login');
    }catch(e){
        console.log(e.message)
    }
}


const login = async (req,res)=>{
    try{

        const {email, password}=req.body;

        const userData = await User.findOne({email:email});
    
        if(userData){

          const passwordMatch= await bcrypt.compare(password,userData.password);



          if(passwordMatch){
            req.session.user=userData;

            res.redirect('/dashboard');
        }else{
              res.render('login',{message:'Email & Password incorrect'})

          }
        }else{
            res.render('login',{message:'Email & Password incorrect'})
        }

    }catch(e){
        console.log("Error:",e.message)
    }
}


const logout = async (req,res)=>{
    try{
req.session.destroy();
res.redirect('/')
    }catch(e){
        console.log(e.message)
    }
}



const loadDashboard = async (req,res)=>{
    try{

        res.render('dashboard',{user:req.session.user})

    }catch(e){
        console.log(e.message)
    }
}


module.exports = {
    registerLoad,register,loadDashboard,loadLogin,login,logout
}