import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],
    currentBlog: null,
    error: null,
    loading: false
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        fetchBlogsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBlogsSuccess: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchBlogsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchBlogByIdStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBlogByIdSuccess: (state, action) => {
            state.currentBlog = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchBlogByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createBlogStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createBlogSuccess: (state, action) => {
            state.blogs.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        createBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteBlogStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteBlogSuccess: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
            state.loading = false;
            state.error = null;
        },
        deleteBlogFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    fetchBlogsStart,
    fetchBlogsSuccess,
    fetchBlogsFailure,
    fetchBlogByIdStart,
    fetchBlogByIdSuccess,
    fetchBlogByIdFailure,
    createBlogStart,
    createBlogSuccess,
    createBlogFailure,
    deleteBlogStart,
    deleteBlogSuccess,
    deleteBlogFailure
} = blogSlice.actions;

export const fetchBlogs = () => async (dispatch) => {
    try {
        dispatch(fetchBlogsStart());
        const response = await fetch('/api/post/getposts'); 
        if (!response.ok) {
            throw new Error('Failed to fetch blogs'); 
        }
        const data = await response.json(); 
        dispatch(fetchBlogsSuccess(data.posts));
    } catch (error) {
        dispatch(fetchBlogsFailure(error.message));
    }
};

export default blogSlice.reducer;
