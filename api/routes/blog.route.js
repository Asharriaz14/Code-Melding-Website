import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create, getposts , deletepost, updatepost} from '../controllers/blog.controller.js';
const router =express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId' , verifyToken, updatepost)

// router.get("/get-ip", (req, res) => {
//     const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//     res.json({ ip: clientIp });
//   });
export default router;