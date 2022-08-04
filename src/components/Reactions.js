import { useDispatch } from "react-redux";
import { addReaction } from "../redux/features/blogsSlice";
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHeart,
  BsEmojiDizzy,
} from "react-icons/bs";

const emoji = {
  thumbsUp: <BsHandThumbsUp />,
  thumbsDown: <BsHandThumbsDown />,
  wow: <BsEmojiDizzy />,
  heart: <BsHeart />,
};

const Reactions = ({ blog }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(emoji).map(([name, emo]) => {
    return (
      <button
        className="pr-4"
        key={name}
        type="button"
        onClick={() =>
          dispatch(addReaction({ blogId: blog.id, reaction: name }))
        }
      >
        <p className="flex flex-row items-center gap-1">
          {emo}
          {blog.reactions[name]}
        </p>
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default Reactions;
