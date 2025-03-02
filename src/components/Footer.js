import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import Image from "next/image";
import logo from "../app/favicon.ico";
export default function Footer() {
  return (
    <footer className="bg-[#0b0d21] text-gray-300 py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center">
            <Image src={logo} alt="logo" className="text-white w-24" />
            <div>
              <h4>RIDER</h4>
              <h5>ISSUE SOLVER</h5>
            </div>
          </div>

          <p className="mt-4 text-sm">
           An ultimate solution for rider management and solving riders issue efficiently
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/sabbir1144" target="blank">
                            <Facebook className="text-red-500 cursor-pointer" />
            </a>

            <Twitter className="text-red-500 cursor-pointer" />
            <Youtube className="text-red-500 cursor-pointer" />
            <Instagram className="text-red-500 cursor-pointer" />
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold">Contact Info</h3>
          <p className="mt-2 text-sm">Rajshahi, 6001</p>
          <p className="mt-2 text-sm">0170-0000001</p>
          <p className="mt-2 text-sm">info@example.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Features</li>
            <li>Clients</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Our Service */}
        <div>
          <h3 className="text-white text-lg font-semibold">Our Service</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li>Website develop</li>
            <li>Rider support</li>
            <li>Rider support</li>
            <li>Rider support</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        Copyright &copy; Rider Issue Solver | Powered by MD. SABBIR ALAM PIAL
      </div>
    </footer>
  );
}
