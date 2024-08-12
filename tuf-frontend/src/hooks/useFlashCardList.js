import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import config from "../../config";

const URL = config.apiUrl+"/flashcards";

const useFlashCardList = () => {

  async function getFlashCardList() {
    try {
      const response = await axios.get(URL);
      return response.data.data;
    } catch (error) {
      return error;
    }
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["flashcardlist"],
    queryFn: getFlashCardList,
  });

  return {
    flashCardData: data,
    flashCardListError: error,
    flashCardListIsLoading: isLoading,
  };
};

export default useFlashCardList;
