import express from 'express';
import { getdata, postdata } from '../controllers/posts.js'; 

const router = express.Router();

router.get("/images", getdata); // Add this route to get images
router.post("/", postdata);

export default router; 