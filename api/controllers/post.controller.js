import { errorHandler } from "../utils/error.js";
import Post from '../models/post.model.js';
import multer from 'multer';
import path from 'path';


// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuration and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, 
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('blogImage'); 

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Create post route
export const create = async (req, res, next) => {
  // Use multer upload middleware
  upload(req, res, async function (err) {
    if (err) {
      return next(errorHandler(400, err.message));
    }
    
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }
    if (!req.body.title) {
      return next(errorHandler(400, "Please Enter Your Title"));
    }
    
    const postId = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');
    
      const slug = postId;
  
    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      slug,
      userId: req.user.id,
      image: req.file ? req.file.filename : null 
    });
    
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  });
};



export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order ==='asc' ? 1 : -1;
    const posts = await Post.find ({
      ...(req.query.userId && {userId: req.query.userId}),
      ...(req.query.category && {category: req.query.category}),
      ...(req.query.slug && {slug: req.query.slug}),
      ...(req.query.postId && {_id: req.query.postId}),
      ...(req.query.searchTerm && {

        $or: [
          {title: {$regex: req.query.searchTerm, $options: 'i' } },
          {content: {$regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
   } ).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

  const totalPosts =await Post.countDocuments();

  const now = new Date();
  const onMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthPosts = await Post.countDocuments({
    createdAt: {$gte: onMonthAgo},
  });

  res.status(200).json({
    posts,
    totalPosts,
    lastMonthPosts,
  })

  }catch (error) {
    next(error)
  }
}

export const deletepost = async (req, res, next) => {
  try {
      console.log("Request Params:", req.params); // Log request params
      console.log("User:", req.user); // Log user for debugging

      // Check if the user is an admin or the owner of the post
      if (!req.user || (!req.user.isAdmin && req.user.id !== req.params.userId)) {
          return next(errorHandler(403, 'You are not allowed to delete this post'));
      }

      // Attempt to find and delete the post by its ID
      const post = await Post.findById(req.params.postId);
      
      // If post doesn't exist, return a 404 error
      if (!post) {
          return next(errorHandler(404, 'Post not found'));
      }

      // If post is found, delete it
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json('The post has been deleted');
  } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error in deleting post:", error); // Log error
      next(error);
  }
};

export const updatepost = async (req, res,next ) => {
  try {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
}
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $set: {
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        image:req.body.image,
      }
    }, {new:true}
  )
  res.status(200).json(updatedPost);
}
  catch (error) {
    next(error);
  }
}
