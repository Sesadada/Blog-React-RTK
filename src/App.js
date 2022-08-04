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
