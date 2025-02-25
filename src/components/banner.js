"use client"; // Required in Next.js 13+ for hooks

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Banner() {
  const [bgImage, setBgImage] = useState("/banner-bg.webp");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth < 768) {
        setBgImage("/banner-bg-mobile.webp");
      } else {
        setBgImage("/banner-bg.webp");
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div
      className="z-10 bg-center bg-no-repeat w-full min-h-[500px] bg-cover flex items-center justify-center md:justify-start text-white px-5"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Center content in small devices and align left in larger screens */}
      <div className="text-center md:text-left max-w-lg ml-0 md:ml-32 ">
        <h2 className="text-4xl md:text-5xl font-semibold">
          SOLVE & GET <span className="text-red-600">SOLVED </span>
        </h2>
        <p className="md:text-xl mt-5">
          A rider can submit an issue and a manager can update its status by solving
          or denying it & a lot more.
        </p>
        <div className="mt-5">
          <Button variant="outline" className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white">SUBMIT A ISSUE</Button>
        </div>
      </div>
    </div>
  );
}
