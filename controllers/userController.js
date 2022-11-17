const User = require('../models/userModel')


const register = (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        member: req.body.member,
        phone: req.body.phone,
        user_id: req.body.user_id,
        dob:req.body.dob,
        designation:req.body.designation,
        city:req.body.city,
        company:req.body.company,
        high_school:req.body.high_school,
        interest:req.body.interest,
        relationship_status:req.body.relationship_status,
        about:req.body.about,
        job:req.body.job,
        college:req.body.college,
        gender:req.body.gender,
        language_known:req.body.language_known,
        website:req.body.website,
        companyName:req.body.companyName,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        skills:req.body.skills,
    })
    if (req.file) {
        user.profile_url = req.file.path
    }
    user.save()
        .then(user => {
            const resdata = {
                "status": "OK",
                "message": "signed up successfully",
                "result": {
                    "inserted_id": `${user.id}`
                },
                "error": {}
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "OK",
                "message": "",
                "result": {},
                "errors": {
                    "errors": {
                        "message": `${err.message}`,
                        "type": `${err.name}`
                    }
                }
            }
            res.json(resdata)
        })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ username: username }, { phone: username }] })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    const resdata = {
                        "status": "OK",
                        "message": "loggedin successfully",
                        "result": {
                            "user_id": `${user.user_id}`,
                            "email": `${user.email}`,
                            "root_folder_id": `${user.root_folder_id}`
                        },
                        "error": {}
                    }
                    user.is_Logged_in = 1
                    user.save()
                    res.send(resdata)
                } else {
                    const resdata = {
                        "status": "ERROR",
                        "message": "invalid password",
                        "result": {},
                        "error": {}
                    }
                    res.json(resdata)
                }
            } else {
                const resdata = {
                    "status": "ERROR",
                    "message": "invalid phonenumber",
                    "result": {},
                    "error": {}
                }
                res.send(resdata)
            }
        })
}

const logout = (req, res, next) => {
    var user_id = req.body.user_id

    User.findOne({ user_id: user_id })
        .then(user => {
            if (user) {
                const resdata = {
                    "status": "OK",
                    "message": "user logged out",
                    "result": {},
                    "errors": {}
                }
                user.is_Logged_in = 0
                user.save()
                res.send(resdata)
            } else {
                res.send({ message: "Please check User id" })
            }
        })
}

const forgotpassword = (req, res, next) => {
    var user_id = req.body.user_id
    
       User.findOne({user_id:user_id})
        .then(user=>{
            if(user){
                user.password=req.body.password
                user.save()
                const resdata = {
                    "status": "OK",
                    "message": "password updated successfully",
                    "result": {},
                    "errors": {}
                }
                res.send(resdata)
            }else{
                res.send({ message: "Please check User id & change password" })  
            }
        })
}

const editprofile=(req,res,next)=>{
    const user_id =req.body.user_id
    const work_experience={  
        work_experience:req.body.work_experience,
        companyName:req.body.companyName,
        startDate:req.body.startDate,
        endDate:req.body.endDate
    }
    const user={ 
        name:req.body.name,
        email: req.body.email,
        member:req.body.member,
        phone:req.body.phone,
        dob:req.body.dob,
        designation:req.body.designation,
        city:req.body.city,
        company:req.body.company,
        high_school:req.body.high_school,
        interest:req.body.interest,
        relationship_status:req.body.relationship_status,
        about:req.body.about,
        job:req.body.job,
        college:req.body.college,
        gender:req.body.gender,
        language_known:req.body.language_known,
        website:req.body.website,
        skills:req.body.skills,
        ...work_experience
}
    User.updateMany({user_id},{$set:user})
    .then(result=>{
        const resdata={
            "status": "OK",
            "message": "profile details updated successfully",
            "result": {},
            "error": {}
        }
        res.send(resdata)
    }).catch(err=>{
        res.send(err)
    })
}

const userdetails=(req,res,next)=>{

    User.findOne({user_id:req.body.user_id})
    .then(user=>{
        const resdata={
            "status": "OK",
            "message": "user details",
            "result": {
                "_id": `${user.id}`,
                "user_id": `${user.user_id}`,
                "profile_url": `${user.profile_url}`,
                "username": `${user.username}`
            },
            "error": {}
        }
     res.json(resdata)
    })
    .catch(err=>{
        res.json({err})
    })
}

const updateuser=(req,res,next)=>{
    var user_id = req.body.user_id
    
    User.findOne({user_id:user_id})
     .then(user=>{
         if(user){
             user.username=req.body.username
             user.save()
             const resdata = {
                "status": "OK",
                "message": "profile details updated successfully",
                "result": {},
                "error": {}
            }
             res.send(resdata)
         }else{
             res.send({ message: "Please check User id & change password" })  
         }
     })
}

const updateimage=(req,res,next)=>{
    const user_id=req.body.user_id
    User.findOne({user_id:user_id})
    .then(user=>{
        user.profile_url=req.file.path
        user.save()
        res.send({message:"successfully updated profile picture"})

    }).catch(err=>{
        res.send({message:"something is error...!"})
    })  
}

const verifyUser=(req,res,next)=>{
    var username=req.body.username;
    var email =req.body.email;
    var phone =req.body.phone;

    User.findOne()
    .then(data=>{

    if(data.username===username && data.email===email && data.phone===phone){
        const resdata= {
            "status": "ERROR",
            "message": "username / email / phone already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username!==username && data.email!==email && data.phone===phone){
        const resdata= {
            "status": "ERROR",
            "message": "phone already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username===username && data.email!==email && data.phone!==phone){
        const resdata= {
            "status": "ERROR",
            "message": "username already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username!==username && data.email===email && data.phone!==phone){
        const resdata= {
            "status": "ERROR",
            "message": "email already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username!==username && data.email===email && data.phone===phone){
        const resdata= {
            "status": "ERROR",
            "message": "email/phone already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username===username && data.email!==email && data.phone===phone){
        const resdata= {
            "status": "ERROR",
            "message": "username/phone already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else if(data.username===username && data.email===email && data.phone!==phone){
        const resdata= {
            "status": "ERROR",
            "message": "username/email already exits",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }else{
        const resdata={
            "status": "OK",
            "message": "successfully verified",
            "result": {},
            "error": {}
        }
        res.json(resdata)
    }
    }).catch(err=>res.json(err))
}


module.exports = {
    register,
    login,
    logout,
    forgotpassword,
    editprofile,
    userdetails,
    updateuser,
    updateimage,
    verifyUser
}