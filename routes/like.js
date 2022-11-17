const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')

router.post('/create/like/',likeController.like);
router.delete('/unlike',likeController.unLike);
router.get('/list/liked_users',likeController.likedUser);


module.exports = router;
