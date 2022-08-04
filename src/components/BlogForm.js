import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "../redux/features/blogsSlice";
import { selectAllUsers } from "../redux/features/usersSlice";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleUser = (e) => {
    setUserId(e.target.value);
  };

  const addToBlogs = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewBlog({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section className="mt-8 md:mt-0">
      <h1 className="text-5xl font-black text-center mb-10">Add New Blog</h1>

      <form className="flex flex-col p-4 border-2 border-pink-600 rounded-lg">
        <label className="text-pink-600">Title</label>
        <input
          className="mb-4 block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={title}
          onChange={handleTitle}
        />
        <label className="text-pink-600">Author</label>
        <select
          className="mb-4 h-10 text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="blogAuthor"
          value={userId}
          onChange={handleUser}
        >
          <option value=""></option>
          {userOptions}
        </select>

        <label className="text-pink-600">Content</label>
        <textarea
          className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={content}
          onChange={handleContent}
        />
        <button
          className={`bg-pink-300 ${!canSave && "bg-pink-200"} h-10 rounded-lg`}
          type="buttons"
          onClick={addToBlogs}
          disabled={!canSave}
        >
          Save
        </button>
      </form>
    </section>
  );
};

export default BlogForm;

/*
  const onSavePost = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      );
      
    }
  };

*/
