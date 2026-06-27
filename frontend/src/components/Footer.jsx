// import { Link } from "react-router-dom";
// import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
// import footerIcon from '../assets/logo4.png' 


// export default function Footer() {
//     return (
//         <footer className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">

//             <div className="max-w-7xl mx-auto px-6 py-8">

//                 {/* Top Section */}
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">

//                     {/* Logo + Tagline */}
//                     {/* <div className="text-center md:text-left">
//             <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
//               💙 Heal Together
//             </h2>
//             <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
//               Your journey to mental wellness starts here.
//             </p>
//           </div> */}

//                     <div className="text-center md:text-left">

//                         {/* LOGO IMAGE */}
//                         <img
//                             src={footerIcon}
//                             alt="Heal Together"
//                             className="mx-auto md:mx-0 h-30 mb-2"
//                         />

                        

//                     </div>
//                     {/* Links */}
//                     <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-700 dark:text-slate-300">
//                         <Link to="/#about" className="hover:text-teal-600">About</Link>
//                         <Link to="/#features" className="hover:text-teal-600">Features</Link>
//                         <Link to="/" className="hover:text-teal-600">Privacy</Link>
//                         <Link to="/" className="hover:text-teal-600">Terms</Link>
//                         <Link to="/" className="hover:text-teal-600">Contact</Link>
//                         <Link to="/" className="hover:text-teal-600">Help Center</Link>
//                     </div>

//                     {/* Social Icons */}
//                     <div className="flex gap-4 text-slate-600 dark:text-slate-400">
//                         <a href="#" className="hover:text-teal-600">
//                             <FaTwitter />
//                         </a>
//                         <a href="#" className="hover:text-teal-600">
//                             <FaInstagram />
//                         </a>
//                         <a href="#" className="hover:text-teal-600">
//                             <FaFacebookF />
//                         </a>
//                         <a href="#" className="hover:text-teal-600">
//                             <FaYoutube />
//                         </a>
//                     </div>

//                 </div>

//                 {/* Bottom Section */}
//                 <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
//                     © {new Date().getFullYear()} Heal Together. All rights reserved.
//                 </div>

//             </div>
//         </footer>
//     );
// }


import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import footerIcon from "../assets/logo4.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-slate-50 via-cyan-50 to-green-50">

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src={footerIcon}
                alt="HealTogether"
                className="h-16 w-16 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-green-500">Heal</span>
                  <span className="text-cyan-600">Together</span>
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your journey to mental wellness starts here.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
              A safe and supportive platform providing AI assistance,
              community support, and mental wellness resources for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              <Link
                to="/#about"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                About
              </Link>

              <Link
                to="/#features"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                Features
              </Link>

              <Link
                to="/privacy"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                Terms
              </Link>

              <Link
                to="/contactus"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                Contact
              </Link>

              <Link
                to="/help"
                className="text-slate-600 hover:text-cyan-600 transition"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Connect With Us
            </h3>

            <div className="flex gap-4">
              {[
                FaTwitter,
                FaInstagram,
                FaFacebookF,
                FaYoutube,
              ].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="
                    flex h-12 w-12 items-center justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    hover:text-cyan-600
                  "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-white/80 p-4 shadow-sm">
              <p className="text-sm text-slate-600">
                💙 Together we heal,
                <br />
                one conversation at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} HealTogether. All rights reserved.
          </p>

          <p>
            Built with 💚 for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  );
}