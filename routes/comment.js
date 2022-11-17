const express = require('express')
const router = express.Router()

const  commentController= require('../controllers/commentController')

router.post('/create/comment',commentController.createComment)
router.post('/reply/comment',commentController.replyComment)
router.get('/list/comments',commentController.listComment)



module.exports=router