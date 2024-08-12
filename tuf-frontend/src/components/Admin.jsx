import { Button } from "@nextui-org/react";
import AddFlashCardModal from "./AddFlashCardModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateFlashCardModal from "./UpdateFlashCardModal";
import PropTypes from "prop-types";
const URL = config.apiUrl;

const Admin = ({ id, count, data }) => {
  Admin.propTypes = {
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
  };
  function notify() {
    toast("Sucessfully Deleted!");
  }
  const queryClient = useQueryClient();

  const deleteFlashCardMutation = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(`${URL}/${id}`);
        return response; // Return the response data
      } catch (error) {
        return error; // Return the error object
      }
    },
    onSuccess: () => {
      notify();
      queryClient.invalidateQueries(["flashcardlist"]);
    },
  });

  const handleDelete = () => {
    deleteFlashCardMutation.mutate(id);
  };

  return (
    <div className="flex justify-center gap-5">
      <AddFlashCardModal />
      {count > 0 && <UpdateFlashCardModal data={data} />}
      <Button color="secondary" variant="ghost" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default Admin;
