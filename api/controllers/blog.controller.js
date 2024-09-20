import multer from 'multer';
import path from 'path';
import Post from '../models/blog.model.js'; // Adjust the import based on your project structure
import {errorHandler} from '../utils/error.js'; // Adjust the import based on your project structure

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Path to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Creating a unique filename
  }
});

// Check file type (image only)
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

// Initialize multer to handle any file fields
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit image size to 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'blogImage', maxCount: 1 },
  { name: 'sections[0][image]', maxCount: 1 },
  { name: 'sections[1][image]', maxCount: 1 },
  { name: 'sections[2][image]', maxCount: 1 },
  { name: 'sections[3][image]', maxCount: 1 },
  { name: 'sections[4][image]', maxCount: 1 },
  { name: 'sections[5][image]', maxCount: 1 },
  // Add more fields if necessary for additional sections
]);

export const create = async (req, res, next) => {
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

    // Safely handle sections field
    const sections = req.body.sections;
    const parsedSections = typeof sections === 'string' ? JSON.parse(sections) : sections;

    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      slug,
      userId: req.user.id,
      image: req.files['blogImage'] ? req.files['blogImage'][0].filename : null,
      sections: parsedSections.map((section, index) => ({
        image: req.files[`sections[${index}][image]`] ? req.files[`sections[${index}][image]`][0].filename : null,
        text: section.text,
      })),
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