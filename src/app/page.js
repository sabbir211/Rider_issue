import About from "@/components/About";
import Banner from "@/components/banner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <About></About>
      <FAQ></FAQ>
      <Footer></Footer>
    </div>
  );
}
