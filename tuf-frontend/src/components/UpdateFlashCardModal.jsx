import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import useUpdateFlashcard from "../hooks/useUpdateFlashCard";

export default function UpdateFlashCardModal({ data }) {
  
  UpdateFlashCardModal.propTypes = {
    data: PropTypes.object.isRequired,
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = React.useState(data.question);
  const [answer, setAnswer] = React.useState(data.answer);
  const updateFlashcard = useUpdateFlashcard({onOpenChange : onOpenChange}); 

  const handleSubmit = () => {
    const newCard = {...data, question, answer };
    updateFlashcard.mutate(newCard); 

  };

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="ghost">
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ee4b2b]">
                Edit Card
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => e.preventDefault}
                >
                  <Input
                    isRequired
                    isClearable
                    color="secondary"
                    type="text"
                    label="Enter Question"
                    className="h-[200px] border border-[#ee4b2b] border-solid rounded-lg"
                    onValueChange={setQuestion}
                    value={question}
                  />
                  <Input
                    isRequired
                    isClearable
                    color="secondary"
                    type="text"
                    label="Enter Answer"
                    className="h-[200px] border border-[#ee4b2b] border-solid rounded-lg"
                    onValueChange={setAnswer}
                    value={answer}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  variant="ghost"
                  onPress={handleSubmit}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
