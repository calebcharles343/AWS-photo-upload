import { Outlet } from "react-router-dom";
import Profile from "./Profile";

// import Sidebar from "./Sidebar";

export default function Applayout() {
  return (
    <div className="flex flex-col items-center text-gray-200 bg-[#191e27] min-h-screen">
      <Profile />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
