import { useSelector } from "react-redux";
import { selectAllUsers } from "../redux/features/usersSlice";

const PostUser = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  // eslint-disable-next-line eqeqeq
  const author = users.find((user) => user.id == userId);

  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default PostUser;
