"use client";
import Link from "next/link";
import React, { useState } from "react";
import Login from "./login/page";
import Registration from "./registration/page";
// import Login from "./login/page";
// import Registration from "./registration/page";
import logo from "../../../public/mainLogo.png"
import Image from "next/image";

export default function LogReg() {
  const [log, setLogin] = useState(true);
function updateLogRegState(state) {
  setLogin(state);
}
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center w-full flex-1 px-5 md:px-20 text-center ">
        <div className=" bg-white rounded-2xl shadow-2xl flex w-full md:w-2/3 ">
          <div className="w-full md:w-3/5 p-5">
            <h4 className="">
              <Image src={logo} width={150} alt="logReg image" className="mx-auto"></Image>
            </h4>
           

            {log ? (
              <>
                <Login updateLogRegState={updateLogRegState}></Login>
              </>
            ) : (
              <>
                <Registration updateLogRegState={updateLogRegState}></Registration>
              </>
            )}
          </div>
          <div className="md:block hidden py-20 w-2/5 bg-blue-900 p-5 rounded-tr-2xl rounded-br-2xl text-white">
            <h1 className="mt-10 text-3xl text-white font-semibold">
              Hello There...
            </h1>
            <div className=" mx-auto my-2 bg-white w-12 bg-white border-2 rounded-md "></div>
            <p className="text-lg mt-6 mb-10">
              Fill up details and start exploring.Safety is for everyone .
            </p>
            {/* <Link className="btn btn-outline px-10 rounded-3xl outline-white outline-1 mt-28" href={"/"}>Signup</Link> */}
            <button
              className="btn btn-outline px-10 rounded-3xl outline-white outline-1 mt-28"
              onClick={() => setLogin(!log)}
            >
              {log ? <span>Sign up</span> : <span>Sign in</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
