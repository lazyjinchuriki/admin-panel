import { useSession, signIn } from "next-auth/react";
import Nav from "./Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  console.log(session);

  if (!session) {
    return (
      <div className={"bg-highlight w-screen h-screen flex items-center "}>
        <div className={"text-center w-full "}>
          <h1>Only Authorized Users Can Login.</h1>
          <p>
            If you wish to be an Authorized user, please contact `
            <b>
              <a href="mailto: rahulkhushalani@proton.me">
                rahulkhushalani@proton.me
              </a>
            </b>
            `
          </p>
          <br />
          <button
            className={
              "bg-white p-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-all"
            }
            onClick={() => signIn("google")}
          >
            <img
              src="https://freesvg.org/img/1534129544.png"
              alt="googleIcon"
              className="w-8 h-8 inline-block mr-2"
            />
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 bg-background min-h-screen">
      <div className="block md:hidden flex items-center ">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-8">
          <Logo />
        </div>
      </div>
      <div className={"flex"}>
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
