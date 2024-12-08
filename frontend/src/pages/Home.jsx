import React, { useEffect, useRef } from "react";
import { FaAngleDown, FaLocationArrow } from "react-icons/fa";
import { useState } from "react";
// import {useGSAP} from "@gsap/react";
import gsap from "gsap";


const Home = () => {
  
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen , setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

   
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
   
  

    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 1, duration: 0.5 });
    } else {
      gsap.to(panelRef.current, { height: "0%", duration: 0.5 });
      gsap.to(panelCloseRef.current, { opacity: 0, duration: 0.5 });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative">
      <h1 className="text-[1.6rem] font-bold absolute top-5 left-5 text-black z-10">Drivio.-</h1>
      <div className="h-screen w-full">
        {/* Image for temporary purpose */}
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
          alt="Trip background"
        />
      </div>
      <div className="absolute  flex flex-col justify-end top-0 h-screen z-10  w-full ">
        <div className="h-[30%] bg-white p-6 rounded-t-lg  relative">
          <FaAngleDown ref={panelCloseRef} onClick={() => setPanelOpen(!panelOpen)} className={`absolute right-6 top-8 text-2xl cursor-pointer ${
              panelOpen ? "opacity-1 duration-300" : "opacity-0 "
            }`} />
          <h4 className="text-[1.6rem]  font-bold mb-5">Find a trip</h4>
             <form onClick={(e)=>{
              submitHandler(e);
             }}>
              
          <div className="relative">
            <input
              className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Add a pickup location"
              onFocus={(e) => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            
          </div>
          <div className="absolute z-40 h-16 top-[43%] left-10 rounded-full   w-1 bg-gradient-to-b from-zinc-300 to-zinc-800 "></div>
          <div className="relative mt-3">
            <input
              className="w-full p-4 pl-10 bg-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Add a destination"
              onFocus={(e) => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            
          </div>
             </form>
        </div>
        <div ref={panelRef} className="h-[0%] bg-red-500   ">

        </div>
      </div>
    </div>
  );
};

export default Home;
