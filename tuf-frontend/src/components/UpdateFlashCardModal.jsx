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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import config from "../../config";
const URL = config.apiUrl;
import PropTypes from "prop-types";
export default function UpdateFlashCardModal({ data }) {
  UpdateFlashCardModal.propTypes = {
    data: PropTypes.object.isRequired,
  };
  function notify() {
    toast("Sucessfully Edited!");
  }
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = React.useState(data.question);
  const [answer, setAnswer] = React.useState(data.answer);

  const addFlashCardMutation = useMutation({
    mutationFn: async (newCard) => {
      try {
        const response = await axios.post(`${URL}/${data.id}`, newCard);
        return response; // Return the response data
      } catch (error) {
        return error; // Return the error object
      }
    },
    onSuccess: () => {
      notify();
      queryClient.invalidateQueries(["flashcardlist"]);
      onOpenChange(false); // Close the modal on success
    },
  });

  const handleSubmit = () => {
    const newCard = { question, answer };
    addFlashCardMutation.mutate(newCard); // Trigger mutation on submit
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
