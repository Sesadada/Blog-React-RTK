import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
//import { blogs as initialState } from "../../data";
import axios from "axios";
import { sub } from "date-fns";

const BLOGS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  blogs: [],
  status: "idle", //"idle" - "loading" - "succeeded" - "failed"
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  try {
    const response = await axios.get(BLOGS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewBlog = createAsyncThunk(
  "blogs/addNewPost",
  async (initialBlog) => {
    try {
      const response = await axios.post(BLOGS_URL, initialBlog);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (initialBlog) => {
    const { id } = initialBlog;
    try {
      const response = await axios.put(`${BLOGS_URL}/${id}`, initialBlog);
      return response.data;
    } catch (error) {
      return initialBlog; //only for testing redux
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (initialBlog) => {
    const { id } = initialBlog;
    try {
      const response = await axios.delete(`${BLOGS_URL}/${id}`, initialBlog);
      if (response?.status === 200) return initialBlog;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: {
      reducer(state, action) {
        state.blogs.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              thumbsDown: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
    addReaction(state, action) {
      const { blogId, reaction } = action.payload;
      // eslint-disable-next-line eqeqeq
      const existingPost = state.blogs.find((blog) => blog.id == blogId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        //adding date and reactions
        let min = 1;
        const loadedBlogs = action.payload.map((blog) => {
          blog.date = sub(new Date(), { minutes: min++ }).toISOString();
          blog.reactions = {
            thumbsUp: 0,
            thumbsDown: 0,
            wow: 0,
            heart: 0,
          };
          return blog;
        });
        state.blogs = loadedBlogs;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBlog.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          thumbsDown: 0,
          wow: 0,
          heart: 0,
        };
        console.log(action.payload);
        state.blogs.push(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        state.blogs = [...blogs, action.payload];
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const blogs = state.blogs.filter((blog) => blog.id !== id);
        state.blogs = blogs;
      });
  },
});

export const selectAllPosts = (state) => state.blogs.blogs;
export const getBlogStatus = (state) => state.blogs.status;

export const getBlogError = (state) => state.blogs.error;

export const { addBlog, addReaction } = blogsSlice.actions;

export default blogsSlice.reducer;
