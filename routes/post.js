const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const upload = require('../middleware/postUpload')

router.post('/create/post/',upload.single('posts'),postController.createPost)
router.delete('/delete/post',postController.deletePost)
router.put('/edit/post',postController.editPost)
router.get('/details/post/',postController.details)
router.get('/list/myfeeds',postController.listMyfeed)

module.exports = router;
