import profileImg from "../assets/img/colorful.jpg";

export default function Profile() {
  return (
    <div className="flex flex-col items-center w-56 p-5 gap-3">
      <div className="flex flex-col items-center w-full bg-[#28303e] p-4 rounded-xl text-center gap-2">
        <img
          className="h-16 w-16 rounded-full mb-2"
          src={profileImg}
          alt="profile"
        />
        <p className="">Charles Caleb</p>
        <span className="text-[#999]">Software Engineer</span>
      </div>
    </div>
  );
}
