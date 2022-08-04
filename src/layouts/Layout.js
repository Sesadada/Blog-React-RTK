import { Outlet } from "react-router-dom";
import Header from "./Header";
const Layout = () => {
  return (
    <>
      <Header />
      <main className="flex md:gap-x-8 p-8 w-full  items-center flex-col">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
