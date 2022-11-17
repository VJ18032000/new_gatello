const Status = require('../models/statusPost')

const createStatus = (req, res, next) => {
    const post = new Status({
        user_id: req.body.user_id,
        status_text: req.body.status_text,
        font_style: req.body.font_style,
        background_color: req.body.background_color,
        font_color:req.body.font_color
    })
    if (req.file) {
        post.status_post = req.file.path
    }
    if(post.status_text||post.status_post){
        post.save()
        .then(status => {
            const resdata = {
                "status": "OK",
                "message": "create status successfully",
                "result": `${status}`
            }
            res.json(resdata)
        })
        .catch(err => {
            res.json({ err })
        })
    }else{
        res.json("please insert post")
        console.log("please insert post")
    }
}

const deletelStatus = (req, res, next) => {
    var id = req.body.status_id
    var user_id = req.body.user_id

    Status.findOneAndRemove({$and :[{_id:id},{user_id:user_id}]})
    .then(status=>{
        status.remove()
       res.send({message:"status deleted successfull"})
   })
   .catch(err=>{
       res.json(`please enter valid id ${err}`)
   })
}

const userviewStatus = (req, res, next) => {
    var id = req.body.user_id
    var status_id = req.body.status_id

    Status.findById({ _id: status_id })
        .then(status => {
            if (status.status_post) {
                const resdata = {
                    "status": "OK",
                    "message": "status_post",
                    "result": status,
                    "error": {}
                }
                res.json(resdata)
            } else {
                const resdata = {
                    "status": "OK",
                    "message": "status_text",
                    "result": status,
                    "error": {}
                }
                res.json(resdata)
            }
            if (status.view_details.indexOf(id) !== -1) {
                console.log("already Viewed")
            } else {
                status.view_details.push(id)
                status.save()
                console.log("successfully Viewed")
            }
        })
        .catch(err => {
            res.json({ err })
        })

}

const allstatusDetails=(req,res,next)=>{
    Status.find()
    .then(status=>{
        const resdata = {
            "status": "OK",
            "message": "All status successfully",
            "data": status
        }
        res.json(status)
    })
    .catch(err => {
        res.json({ err })
    })
}

const statusDeails=(req,res,next)=>{
    var id = req.body.user_id

    Status.find({ user_id: id })
    .then(status=>{
        if(status!=0){
            const resdata = {
                "status": "OK",
                "message": "Status successfully send", 
                "result": status
            }
            res.json(resdata)
        }else{
            const resdata = {
                "status": "ERROR",
                "message": "Please Enter Valid Userid",
              
            }
            res.json(resdata)
        }
       
    })
    .catch(err => {
        res.json({ err })
    })
}

module.exports = {
    createStatus,
    deletelStatus,
    userviewStatus,
    allstatusDetails,
    statusDeails
}