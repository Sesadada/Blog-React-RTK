import BlogForm from "./components/BlogForm";
import Posts from "./components/Posts";
import SingleBlog from "./components/SingleBlog";
import Layout from "./layouts/Layout";
import { Routes, Route } from "react-router-dom";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="blog">
          <Route index element={<BlogForm />} />
          <Route path=":blogId" element={<SingleBlog />} />
          <Route path="edit/:blogId" element={<EditBlog />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

/*
    <div className="flex md:gap-x-8 p-8 w-full md:flex-row md:items-start  items-center flex-col">
      <div className="lg:w-[50%] w-[90%]">
        <Posts />
      </div>
      <div className="lg:w-[50%] w-[90%]">
        <BlogForm />
      </div>
    </div>

*/
