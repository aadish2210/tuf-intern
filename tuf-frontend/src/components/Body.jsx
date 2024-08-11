import React from "react";
import FlashCard from "./FlashCard";
import { Input } from "@nextui-org/input";
const Body = () => {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] mt-8 gap-8">
      <FlashCard question={"What is worst case time complexity of quick sort algorithm?"}  answer={"O(n^2)"} />
      <Input color="danger" isClearable type="email" label="Enter Your Answer" className="sm:w-[500px] w-[250px]" onValueChange={setValue}/>
    </div>
  );
};

export default Body;
