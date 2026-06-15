import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import footerIcon from '../assets/logo4.png' 


export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo + Tagline */}
                    {/* <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center justify-center md:justify-start gap-2">
              💙 Heal Together
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Your journey to mental wellness starts here.
            </p>
          </div> */}

                    <div className="text-center md:text-left">

                        {/* LOGO IMAGE */}
                        <img
                            src={footerIcon}
                            alt="Heal Together"
                            className="mx-auto md:mx-0 h-30 mb-2"
                        />

                        

                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-700 dark:text-slate-300">
                        <Link to="/" className="hover:text-teal-600">About</Link>
                        <Link to="/" className="hover:text-teal-600">Privacy</Link>
                        <Link to="/" className="hover:text-teal-600">Terms</Link>
                        <Link to="/" className="hover:text-teal-600">Contact</Link>
                        <Link to="/" className="hover:text-teal-600">Help Center</Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 text-slate-600 dark:text-slate-400">
                        <a href="#" className="hover:text-teal-600">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-teal-600">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-teal-600">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-teal-600">
                            <FaYoutube />
                        </a>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()} Heal Together. All rights reserved.
                </div>

            </div>
        </footer>
    );
}