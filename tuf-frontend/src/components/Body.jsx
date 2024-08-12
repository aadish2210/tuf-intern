import {useState} from "react";
import FlashCard from "./FlashCard";
import { Pagination,Spinner } from "@nextui-org/react";
import { ToastContainer } from 'react-toastify';
import useFlashCardList from "../hooks/useFlashCardList";
import Admin from "./Admin";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {flashCardData,flashCardListIsLoading , flashCardListError} = useFlashCardList();
  // console.log({flashCardData,flashCardListIsLoading , flashCardListError})
  
  // console.log(currentPage)
  if(flashCardListIsLoading) {
    return (
    <div className="flex justify-center items-center h-[80vh]">
     <Spinner color="secondary"/>
    </div>)
  }
  if(!flashCardListIsLoading && flashCardData.count==0){
    return (
      <div className="flex flex-col justify-evenly items-center h-[80vh]">
        <h1 className="text-white">Nothing to show here!</h1>
        <Admin/>
        <ToastContainer />
      </div>
    )
  }
  return !flashCardListIsLoading && (
    <div className="flex flex-col justify-center items-center h-[80vh] mt-8 gap-8">
      <FlashCard
        question={flashCardData.data[currentPage-1].question}
        answer={flashCardData.data[currentPage-1].answer}
      />
      <Pagination
        onChange={setCurrentPage}
        classNames={{
          wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
          item: "w-8 h-8 text-small rounded-none bg-white",
          cursor:
            "bg-gradient-to-b shadow-lg from-[#ee4b2b] to-[#f05d40] dark:from-default-300 dark:to-default-100 text-white font-bold",
        }}
        isCompact
        showControls
        total={flashCardData.count}
        initialPage={1}
      />
      <Admin/>
      <ToastContainer />
    </div>
  );
};

export default Body;
