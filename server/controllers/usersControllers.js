const { request } = require('express');
const users = require('../models/userSchema.js');
const user = require('../models/userSchema.js')
const csv = require('fast-csv')
const fs = require('fs')
const BASE_URL = process.env.BASE_URL;
exports.userpost = async(req, res) =>{
    const file = req.file.filename;
    console.log(file)
    const {fname, lname, email, mobile, gender, status} = req.body
    if(!fname || !lname || !email || !mobile || !gender || !status){
        res.status(401).json("All inputs are required");
    }
    try{
        const preuser = await user.findOne({email: email});
        if(preuser){
            res.status(401).json("User already registered");
        }else{
            const userData = new user({
                fname, lname, email, mobile, gender, status, profile:file
            })
            await userData.save();
            res.status(200).json(userData);

        }

    }catch(error){
        console.log(error);
    }
}


// get all users detials
exports.userget = async(req, res)=>{
    const search = req.query.search || ''
    const gender = req.query.gender || ''
    const status = req.query.status || ''
    const sort = req.query.sort || ''
    const query = {
        fname : {$regex: search, $options: 'i'}
    }
    if(gender !== 'All'){
        query.gender = gender;
    }
    if(status !== 'All'){
        query.status = status;
    }
    try {
        console.log(req.query)
        const userData = await users.find(query).sort({createdAt:sort =="new"?-1:1});
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json(error);
    }
}


exports.singleuserget = async(req, res)=>{
    try {
        const {id} = req.params;
        const userData = await users.findOne({_id:id});
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.userEdit = async(req, res) =>{
    try {
        const {id} = req.params;
        const {fname, lname, email, mobile, gender, status, user_profile} = req.body
        const file  = req.file ? req.file.filename : user_profile;
        const userUpdate = await user.findByIdAndUpdate({_id: id}, {
            fname, lname, email, mobile, gender, status, profile:file
        }, {new: true})
                
        res.status(200).json(userUpdate);
    
        
    } catch (error) {
        res.status(401).json("Something went wrong...")
    }
}

exports.userDelete = async(req, res)=>{
    const {id} = req.params;
    try {
        const deleteUser = await user.findByIdAndDelete({_id: id});
        res.status(200).json("User deleted successfully");
    } catch (error) {
        res.status(401).jons("Someting went wrong")
    }
}

exports.userStatus = async(req, res)=>{
    const {id} = req.params;
    const {data} = req.body;
    try {
        const userStatusUpdate = await user.findByIdAndUpdate({_id:id},{status:data}, {new: true});
        res.status(200).json(userStatusUpdate);
    } catch (error) {
        res.status(401).jons("Someting went wrong")
    }
}


exports.userExport = async(req, res) =>{
    try {
        const userData = await users.find();
        const csvStream = csv.format({headers: true})
        if(!fs.existsSync("public/files/export")){
            if(!fs.existsSync("public/files")){
                fs.mkdirSync("public/files/");
            }
            if(!fs.existsSync("public/files/export")){
                fs.mkdirSync("./public/files/export")
            }
        }
        const writeablestream = fs.createWriteStream(
            "public/files/export/users.csv"
        )
        csvStream.pipe(writeablestream);
        writeablestream.on("finish", function(){
            res.json({
                downloadUrl: `${BASE_URL}/files/export/users.csv`
            })
        })
        if(userData.length> 0){
            userData.map((user)=>{
                csvStream.write({
                    FirstName: user.fname? user.fname: "-",
                    LastName: user.lname? user.lname: "-",
                    Email: user.email? user.email: "-",
                    Phone: user.mobile? user.mobile: "-",
                    Gender: user.gender? user.gender: "-",
                    Status: user.status? user.status: "-",
                    Profile: user.profile? user.profile: "-",
                    createdAt: user.createdAt? user.createdAt: "-",
                    updatedAt: user.updatedAt? user.updatedAt: "-"
                })
            })
        }

        csvStream.end();
        writeablestream.end();
    } catch (error) {
        res.status(401).json("Someting went wrong")
    }
}