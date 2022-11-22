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
    console.log(post.status_post)
    if(post.status_text || post.status_post){
        post.save()
        .then(status => {
            const resdata = {
                "status": "OK",
                "message": "create status successfully",
                "result": status,
                "error":"{}"
            }
            res.json(resdata)
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result":"{}",
                "error": err
            }
            res.json(resdata)
        })
    }else{
        const resdata = {
            "status": "ERROR",
            "message": "Please insert correctly",
            "result":"{}",
            "error":"{}"
        }
        res.json(resdata)
    }
}

const deletelStatus = (req, res, next) => {
    var id = req.body.status_id
    var user_id = req.body.user_id

    Status.findOneAndRemove({$and :[{_id:id},{user_id:user_id}]})
    .then(status=>{
        status.remove()
        const resdata = {
            "status": "OK",
            "message": "status deleted successfully",
            "result": status,
            "error":"{}"
        }
        res.json(resdata)
   })
   .catch(err=>{
    const resdata = {
        "status": "ERROR",
        "message": "Please enter valid id",
        "result":"{}",
        "error": err
    }
    res.json(resdata)
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
            status.view_details.push(id)
            status.save()
            console.log("successfully Viewed")
            // if (status.view_details.indexOf(id) !== -1) {
            //     console.log("already Viewed")
            // } else {
            //     status.view_details.push(id)
            //     status.save()
            //     console.log("successfully Viewed")
            // }
        })
        .catch(err => {
            const resdata = {
                "status": "ERROR",
                "message": "Something went wrong",
                "result":"{}",
                "error": err
            }
            res.json(resdata)
           })

}

const allstatusDetails=(req,res,next)=>{
    Status.find()
    .then(status=>{
        const resdata = {
            "status": "OK",
            "message": "All status viewed successfully",
            "data": status,
            "error":"{}"
        }
        res.json(resdata)
    })
    .catch(err => {
        const resdata = {
            "status": "ERROR",
            "message": "Something went wrong",
            "result":"{}",
            "error": err
        }
        res.json(resdata)
       })
}

const statusDeails=(req,res,next)=>{
    var id = req.body.user_id
    Status.find({ user_id: id })
    .then(status=>{
        if(status!=0){
            const resdata = {
                "status": "OK",
                "message": "Status successfully Viewed", 
                "result": status,
                "error":"{}"
            }
            res.json(resdata)
        }else{
            const resdata = {
                "status": "ERROR",
                "message": "No status available",
                "error":"{}"
            }
            res.json(resdata)
        }
    })
    .catch(err => {
        const resdata = {
            "status": "ERROR",
            "message": "Something went wrong",
            "result":"{}",
            "error": err
        }
        res.json(resdata)
    })
}

module.exports = {
    createStatus,
    deletelStatus,
    userviewStatus,
    allstatusDetails,
    statusDeails
}