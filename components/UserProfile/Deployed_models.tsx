import React from "react";
import { Input } from "../ui/input";
import { ListFilter, ChevronsLeft } from "lucide-react";
import Deployed_Model_listing from "./Deployed_Model_listing";

interface Deployed_models_props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Deployed_models = ({ show, setShow }: Deployed_models_props) => {
  return (
    <div className="h-full transition-all duration-700 ease-in-out">
     
      <div className="flex gap-4">
        <div
          className="border border-[#A3A3A3] cursor-pointer p-2 w-14 rounded-md flex justify-center items-center"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <ChevronsLeft className="text-[#A3A3A3] transition-transform duration-500 ease-in-out" />
          ) : (
            <ListFilter className="text-[#A3A3A3] transition-transform duration-500 ease-in-out" />
          )}
        </div>
        <Input
          placeholder="Search Apps"
          className="w-full rounded-md focus:outline-none outline-none bg-transparent border border-[#A3A3A3] text-[#A3A3A3] px-2 py-3"
        />
      </div>

      <Deployed_Model_listing show={show}/>
    </div>
  );
};

export default Deployed_models;
