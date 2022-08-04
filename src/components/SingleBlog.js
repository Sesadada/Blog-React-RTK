import PostUser from "./PostUser";
import Reactions from "./Reactions";
import TimeAgo from "./TimeAgo";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const SingleBlog = () => {
  const { blogId } = useParams();
  const blog = useSelector((state) =>
    state.blogs.blogs.find((bl) => bl.id === Number(blogId))
  );
  console.log(blog);
  if (!blog) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  return (
    <article className="rounded-lg bg-slate-100 p-4 mt-4 border-2 border-slate-900">
      <h3 className="text-pink-500 font-semibold text-xl uppercase mb-3">
        {blog.title}
      </h3>

      <p>{blog.body}</p>
      <p>
        <Link className="uppercase text-pink-400" to={`/blog/edit/${blog.id}`}>
          edit
        </Link>
      </p>
      <div className="flex items-end flex-row justify-between">
        <Reactions blog={blog} />
        <p className="text-sm mt-2 text-right text-slate-500 flex flex-col">
          <PostUser userId={blog.userId} />
          <TimeAgo timestamp={blog.date} />
        </p>
      </div>
    </article>
  );
};

export default SingleBlog;
