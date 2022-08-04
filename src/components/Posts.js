import { useSelector } from "react-redux";
import {
  selectAllPosts,
  getBlogError,
  getBlogStatus,
} from "../redux/features/blogsSlice";
import BlogExcerpt from "./BlogExcerpt";

const Posts = () => {
  const blogs = useSelector(selectAllPosts);
  const blogsStatus = useSelector(getBlogStatus);
  const blogsError = useSelector(getBlogError);

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

/*
    <section className="flex justify-center flex-col w-2/4">
      <h1 className="text-5xl font-black text-center mb-6">POSTS</h1>
      {posts.map((post) => (
        <article
          key={post.id}
          className="rounded-lg bg-slate-100 p-4 mt-4 border-2 border-slate-900"
        >
          <h3 className="text-yellow-500 font-semibold text-xl uppercase mb-3">
            {post.title}
          </h3>
          <p>{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
*/
