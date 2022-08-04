import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog, deleteBlog } from "../redux/features/blogsSlice";
import { selectAllUsers } from "../redux/features/usersSlice";

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((blog) => blog.id === Number(blogId))
  );
  const users = useSelector(selectAllUsers);
  const [title, setTitle] = useState(blog?.title);
  const [content, setContent] = useState(blog?.body);
  const [userId, setUserId] = useState(blog?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");
  const dispatch = useDispatch();

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  if (!blog) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleUser = (e) => {
    setUserId(e.target.value);
  };

  const updatingBlog = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updateBlog({
            id: blog.id,
            title,
            body: content,
            userId,
            reactions: blog.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/blog/${blogId}`);
      } catch (error) {
        console.log(error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const UsersOptions = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
  };
  console.log(users);

  const deletingBlog = (e) => {
    e.preventDefault();
    try {
      setRequestStatus("pending");
      dispatch(deleteBlog({ id: blog.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.error("failed to delete post");
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section className="mt-8 md:mt-0">
      <h1 className="text-5xl font-black text-center mb-10">Edit Post</h1>

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
          {<UsersOptions />}
        </select>

        <label className="text-pink-600">Content</label>
        <textarea
          className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={content}
          onChange={handleContent}
        />
        <button
          className={`bg-pink-300 ${
            !canSave && "bg-pink-200"
          } h-10 rounded-lg mb-2`}
          type="buttons"
          onClick={updatingBlog}
          disabled={!canSave}
        >
          Save
        </button>
        <button
          className={`bg-pink-300 ${!canSave && "bg-pink-200"} h-10 rounded-lg`}
          type="buttons"
          onClick={deletingBlog}
          disabled={!canSave}
        >
          Delete
        </button>
      </form>
    </section>
  );
};

export default EditBlog;
