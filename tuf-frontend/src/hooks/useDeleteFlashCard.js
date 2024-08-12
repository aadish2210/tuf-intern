import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";

const URL = config.apiUrl+"/flashcards";

const useDeleteFlashcard = () => {
  const queryClient = useQueryClient();

  const deleteFlashCardMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${URL}/${id}`);
      return response;
    },
    onSuccess: () => {
      toast("Successfully Deleted!");
      queryClient.invalidateQueries(["flashcardlist"]);
    },
  });

  return deleteFlashCardMutation;
};

export default useDeleteFlashcard;
