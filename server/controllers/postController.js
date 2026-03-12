import Post from '../models/Post.js';

const createHttpError = (statusCode, message) => ({ statusCode, message });

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res, next) => {
  try {
    const { title, content, category, status } = req.body;

    if (!title?.trim()) {
      return next(createHttpError(400, 'Title is required'));
    }

    if (!content?.trim()) {
      return next(createHttpError(400, 'Content is required'));
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      category,
      status,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get posts with pagination
// @route   GET /api/posts?page=1&limit=10
// @access  Private
export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name email');

    const total = await Post.countDocuments({ author: req.user._id });
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, "You don't have permission to delete this post"));
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const { title, content, category, status } = req.body;

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, "You don't have permission to perform this action"));
    }

    if (!title?.trim()) {
      return next(createHttpError(400, 'Title is required'));
    }

    if (!content?.trim()) {
      return next(createHttpError(400, 'Content is required'));
    }

    post.title = title.trim();
    post.content = content.trim();
    if (category) post.category = category;
    if (status) post.status = status;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');

    if (!post) {
      return next(createHttpError(404, 'Post not found'));
    }

    if (post.author._id.toString() !== req.user._id.toString()) {
      return next(createHttpError(403, "You don't have permission to perform this action"));
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};