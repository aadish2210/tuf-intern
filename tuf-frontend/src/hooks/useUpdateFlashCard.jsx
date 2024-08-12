import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

const URL = config.apiUrl;

const useUpdateFlashcard = ({onOpenChange}) => {
  const queryClient = useQueryClient();

  const updateFlashCardMutation = useMutation({
    mutationFn: async (updatedCard) => {
      const { id, question, answer } = updatedCard;
      const response = await axios.post(`${URL}/${id}`, { question, answer });
      return response;
    },
    onSuccess: () => {
      toast("Successfully Edited!");
      queryClient.invalidateQueries(["flashcardlist"]);
      onOpenChange(false)
    },
  });

  return updateFlashCardMutation;
};

export default useUpdateFlashcard;
