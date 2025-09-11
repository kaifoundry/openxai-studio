"use client";
import React, { useState } from "react";
import Filter from "./filter";
import Deployed_models from "./Deployed_models";

const DeployedApps = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          show ? "w-[35%] opacity-100" : "w-0 opacity-0"
        } overflow-hidden`}
      >
        <Filter />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          show ? "w-[65%]" : "w-full"
        }`}
      >
        <Deployed_models setShow={setShow} show={show} />
      </div>
    </div>
  );
};

export default DeployedApps;
