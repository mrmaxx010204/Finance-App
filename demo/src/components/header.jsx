import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "../css/nav.css"

export default function Header() {

  return (
    <header className="px-5 py-5 navbar fixed top-0 w-full z-10 mt-0 shadow-md">
      <div className="grid grid-cols-1">
        <Link to={"/"} className="flex gap-2 items-center">
          <img
            className="object-scale-down h-14 w-15"
            src="/logoo.png"
            alt="img"
          />
          {/* <div className="text-gray-900 font-serif text-2xl">
            JEEVAN LAV
          </div> */}
        </Link>
      </div>
      <div>
        <Navbar />
      </div>
    </header>
  );
}
