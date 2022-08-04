import PostUser from "./PostUser";
import Reactions from "./Reactions";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";

const BlogExcerpt = ({ blog }) => {
  return (
    <article className="rounded-lg bg-slate-100 p-4 mt-4 border-2 border-slate-900">
      <h3 className="text-pink-500 font-semibold text-xl uppercase mb-3">
        {blog.title}
      </h3>

      <p>
        {blog.body.substring(0, 75)}...
        <Link className="text-pink-400" to={`blog/${blog.id}`}>
          view post
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

export default BlogExcerpt;
