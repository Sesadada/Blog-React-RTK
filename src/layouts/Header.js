import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between p-6 bg-pink-300 items-center">
      <h1 className="font-bold text-4xl">
        <Link to="/">Blogosphere</Link>
      </h1>
      <nav>
        <ul className="flex">
          <li className="mx-6 ">
            <Link to="/">BLOGS</Link>
          </li>
          <li className="mx-6 ">
            {" "}
            <Link to="blog">POST</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
