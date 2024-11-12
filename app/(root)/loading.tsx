import React from "react";
import { FadeLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-lvh">
      <FadeLoader />
    </div>
  );
};

export default loading;
