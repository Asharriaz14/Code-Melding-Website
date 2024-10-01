import express from 'express';
import {create , getcategories, deletecategory , updatecategory} from '../controllers/categories.controller.js'
const router = express.Router();

router.post('/create', create);
router.get('/getcategory/:categoryId?', getcategories);
router.delete('/deletepost/:categoryId', deletecategory);
router.put('/getcategory/:categoryId', updatecategory)

export default router;