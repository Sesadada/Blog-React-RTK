import { useSelector } from "react-redux";
import { selectAllPosts, getBlogStatus } from "../redux/features/blogsSlice";
import BlogExcerpt from "./BlogExcerpt";

const Posts = () => {
  const blogs = useSelector(selectAllPosts);
  const blogsStatus = useSelector(getBlogStatus);

  let content;
  if (blogsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (blogsStatus === "succeeded") {
    const orderedBlogs = blogs
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedBlogs.map((blog) => (
      <BlogExcerpt key={blog.id} blog={blog} />
    ));
  } else if (blogsStatus === "failed") {
    content = <p>Error!!</p>;
  }
  return <section className="flex justify-center flex-col">{content}</section>;
};

export default Posts;
