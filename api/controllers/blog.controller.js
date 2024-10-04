import multer from 'multer';
import Post from '../models/blog.model.js'; // Adjust the import based on your project structure
import { errorHandler } from '../utils/error.js'; // Adjust the import based on your project structure
import { Blob } from '@vercel/blob';

// Set up multer (no need for disk storage since we are using Vercel Blob)
const upload = multer({
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
  { name: 'sections[6][image]', maxCount: 1 },
  { name: 'sections[7][image]', maxCount: 1 },
]);

// Check file type (image only)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(file.originalname.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Function to upload files to Vercel Blob
async function uploadToVercelBlob(file) {
  const blob = new Blob();
  const result = await blob.upload(file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  return result.url; // Return the file URL
}

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

    const sections = req.body.sections;
    const parsedSections = typeof sections === 'string' ? JSON.parse(sections) : sections;

    // Process file uploads using Vercel Blob
    const baseUrl = 'https://code-melding-website.vercel.app/uploads/'; // Replace with your actual Vercel project URL

    let blogImageUrl = null;
    if (req.files['blogImage']) {
      blogImageUrl = await uploadToVercelBlob(req.files['blogImage'][0]);
    }

    const sectionImages = await Promise.all(
      parsedSections.map(async (section, index) => {
        if (req.files[`sections[${index}][image]`]) {
          return await uploadToVercelBlob(req.files[`sections[${index}][image]`][0]);
        }
        return null;
      })
    );

    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      slug,
      userId: req.user.id,
      image: blogImageUrl,
      sections: parsedSections.map((section, index) => ({
        image: sectionImages[index],
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

  export const updatepost = async (req, res, next) => {
    // Use multer to handle file uploads
    upload(req, res, async function (err) {
        if (err) {
            return next(errorHandler(400, err.message));
        }

        try {
            // Check if the user has permission to update the post
            if (!req.user.isAdmin && req.user.id !== req.params.userId) {
                return next(errorHandler(403, 'You are not allowed to update this post'));
            }

            // Find the post by ID
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return next(errorHandler(404, 'Post not found'));
            }

            // Update post fields
            post.title = req.body.title || post.title; // Keep existing title if not provided
            post.content = req.body.content || post.content; // Keep existing content if not provided
            post.category = req.body.category || post.category; // Keep existing category if not provided

            // Handle image update if a new image is uploaded
            if (req.files['blogImage']) {
                post.image = req.files['blogImage'][0].filename; // Update image with new upload
            }

            // Safely handle sections field
            // const sections = req.body.sections;
            // const parsedSections = typeof sections === 'string' ? JSON.parse(sections) : sections;

            // // Update sections
            // post.sections = parsedSections.map((section, index) => ({
            //     image: req.files[`sections[${index}][image]`] ? req.files[`sections[${index}][image]`][0].filename : post.sections[index]?.image,
            //     text: section.text,
            // }));

            // Save the updated post
            const updatedPost = await post.save();
            res.status(200).json(updatedPost);
        } catch (error) {
            next(error);
        }
    });
};
