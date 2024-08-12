import React from "react";
import ReactCardFlip from "react-card-flip";
import Lottie from "lottie-react";
import celebrateAnimation from "../animations/celebrate.json"; // Replace with your animation JSON file
import PropTypes from "prop-types"

const FlashCard = ({ question, answer }) => {
  FlashCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  };
  const [flipped, setFlipped] = React.useState(false);
  const [showCelebration, setShowCelebration] = React.useState(false);

  const flip = () => {
    setFlipped(!flipped);
    if (!flipped) {
      triggerCelebration();
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  return (
    <div className="relative">
      {showCelebration && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center pointer-events-none">
          <Lottie
            animationData={celebrateAnimation}
            loop={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
      <div className="cursor-pointer">
        <ReactCardFlip
          isFlipped={flipped}
        >
          <div
            onClick={flip}
            className="flex items-center justify-center p-3 sm:w-[500px] w-[250px] bg-white min-h-[400px] rounded-lg shadow-lg shadow-[#ee4b2b] hover:shadow-[#f05d40]"
          >
            <h1 className="text-black text-center text-lg">{question}</h1>
          </div>
          <div
            onClick={flip}
            className="p-3 flex justify-center items-center sm:w-[500px] w-[250px] bg-white min-h-[400px] rounded-lg shadow-lg shadow-green-700 hover:shadow-green-600"
          >
            <h1 className="text-black font-semibold text-xl text-center">
              {answer}
            </h1>
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
};

export default FlashCard;
