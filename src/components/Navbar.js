"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/mainLogo.png";
import { Button } from "./ui/button";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            <Image
              src={logo}
              className="dark:invert"
              width={200}
              height={200}
            ></Image>
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/issues"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Issues
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </Link>
            <span>|</span>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                SUBMIT A ISSUE
              </Button>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
               LOGIN
              </Button>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                REGISTER
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-gray-700 dark:text-gray-300"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg p-5 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="mt-8 space-y-4">
          <Link
            href="/"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/issues"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Issues
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                SUBMIT A ISSUE
              </Button>
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                LOGIN
              </Button>
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Button
                variant="outline"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                REGISTER
              </Button>
          </Link>
         
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
