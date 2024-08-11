import React from "react";
import ReactCardFlip from "react-card-flip";

const FlashCard = ({ question, answer }) => {
  const [flipped, setFlipped] = React.useState(false);
  const flip = () => {
    setFlipped(!flipped);
  };
  return (
    <div>
    <div className="cursor-pointer">
      <ReactCardFlip
        isFlipped={flipped}
        flipSpeedFrontToBack={1.5}
        flipSpeedBackToFront={1.5}
      >
        <div
          onClick={flip}
          className=" flex items-center justify-center p-3 sm:w-[500px] w-[250px] bg-white min-h-[400px] rounded-lg shadow-lg shadow-red-700 hover:shadow-red-600"
        >
          <h1 className="text-black text-center">
            {question}
          </h1>
        </div>
        <div
          onClick={flip}
          className="p-3 flex justify-center items-center sm:w-[500px] w-[250px] bg-white min-h-[400px] rounded-lg shadow-lg shadow-green-700 hover:shadow-green-600"
        >
          <h1 className="text-black font-semibold text-xl">{answer}</h1>
        </div>
      </ReactCardFlip>
    </div>
    </div>
  );
};

export default FlashCard;
