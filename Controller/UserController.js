
const User = require ("../Model/UserModel");
const md5 = require ("md5");
const jwt = require ('jwt-simple');



exports.login = async (req,res) => {
    try{
        let founduser = await User.findOne({email:req.body.email, password:md5(req.body.password)});
        if(founduser){
            let token = jwt.encode(founduser,'soundar@02');
            res.send({ststus:true,messange:"Successfully loggedIn",token:token});
            
        } else {
            res.send({ststus:false,message:"Email Or Password Wrong"});

        }
    }catch(e){
        console.log(e)
        res.send({ststus:false,message:"Error Occurred"});
    }
}

exports.User_create = async function (req, res) {
    let foundName = await User.findOne ({name:req.body.name})
    if(foundName){
        return res.send({status:false,message:"Name already exists"});
    }
    let foundemail = await User.findOne ({email:req.body.email})
    if(foundemail){
        return res.send({status:false,message:"email already exist"})
    }
    let added = await User.create(req.body);
    res.send({status:true, message:"User added", data:added});
}

exports.getUser_details = async(req,res) => {
    try{
        let skip = 0
        let limit = req.query.limit
        let page = req.query.page
        if (page != 1) {
            skip = (page - 1) * parseInt(limit)
        }
        let found 
        if(req.query.searchQuery){
            found = await User.find({name:{ $regex: req.query.searchQuery, $options: "i" },isActive:true});
        }else{
            found = await User.find({isActive:true});
        }
        res.send({status:true, message:"User list", data:found});
    } catch(e) {
        console.log(e);
        res.send({status:false, message:"error occurred"});
    }
}


exports.User_update = async function (req, res) {
    let update = await User.findOneAndUpdate({_id:req.body.id},req.body);
    let found = await User.findOne({_id:req.body.id});
    res.send({status:true,message:"User update",data:found});
};

exports.deleteUser = async(req,res) => {
    try{
        let deleted = await User.deleteOne({_id:req.query.id});
        if(deleted.deletedCount>0) {
            res.send({status:true, message:"User deleted"});
        } else {
            res.send({status:false, message:"User not deleted"});
        }
    } catch(e) {
        res.send({status:false, message:"error occurred"});
    }
}

exports.getOneUser = async(req,res) => {
    try{
        let found = await User.findOne({_id:req.query.userId});
        if(found) {
        res.send({status:true, message:"User detail", data:found});
        } else {
            res.status(404).json({status:false, message:"User detail not found"})
        }
    }catch(e) {
        console.log(e)
        res.send({status:false, message:"error occurred"});

    } 
}