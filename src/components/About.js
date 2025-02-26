"use client"

import React from "react";
import riderImg from "/public/rider_img.jpg";
import Image from "next/image";
function About() {
  return (
    <div className="block md:flex justify-center md:mx-20 my-10 p-8 items-center">
      <div>
        <h2 className=" text-2xl md:text-5xl md:my-10 font-semibold">
          How to use this website
        </h2>
        <div className="text-gray-500 ">
          <p className="md:me-36">
            If you are a rider, you can submit your problem by clicking on
            'submit a issue' button. Than you will be redirect to a page where
            you will be able to fill e form using your problem details etc.
          </p>
          <p>
            You can see all of your previous problems status by clicking on
            'Issues' button.
          </p>
          <br></br>
          <p className="md:me-36">
            If you are a manager, you can solve riders and let rider know about
            their issue status by checking their update.
          </p>
          <br/>
          <p  className="md:me-36">
            Manager can give important update on this website. Both rider and manager will have a useful dashboard.
          </p>
         
        </div>
      </div>
      <div className="hidden md:block">
        <Image src={riderImg} className="w-4/5" alt="rider image"></Image>
      </div>
    </div>
  );
}

export default About;
