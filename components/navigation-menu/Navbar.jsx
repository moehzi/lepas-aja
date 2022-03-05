import Link from "next/link";
import Dropdown from "./Dropdown";
import { useUser } from "../../context/user";

const Navbar = () => {
  const { uid } = useUser();

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap p-8 border-b-[3px] border-red">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/">
            <a className="text-3xl font-semibold tracking-tight text-red">LepasAja</a>
          </Link>
        </div>

        <div className="flex-grow block w-full text-center lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow text-red">
            <Link href="/">
              <a className="block mt-4 mr-4 text-lg lg:inline-block lg:mt-0 hover:underline underline-offset-8">Home</a>
            </Link>

            <a href="#responsive-header" className="block mt-4 mr-4 text-lg lg:inline-block lg:mt-0 hover:underline underline-offset-8">
              About
            </a>
            <a href="#responsive-header" className="block mt-4 mr-4 text-lg lg:inline-block lg:mt-0 hover:underline underline-offset-8">
              Blog
            </a>
            <a href="#responsive-header" className="block mt-4 text-lg lg:inline-block lg:mt-0 hover:underline underline-offset-8">
              Know How
            </a>
          </div>
          {uid ? (
            <Dropdown />
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <a className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border border-white rounded bg-red hover:border-red hover:text-red hover:bg-white lg:mt-0">Login</a>
              </Link>
              <Link href="/register">
                <a className="inline-block px-4 py-2 mt-4 text-sm leading-none border rounded text-red border-red hover:border-transparent hover:text-white hover:bg-red lg:mt-0">Sign Up</a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
