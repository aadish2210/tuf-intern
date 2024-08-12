import React from "react";
import { Button } from "@nextui-org/react";
import AddFlashCardModal from "./AddFlashCardModal";

const Admin = () => {
  return (
    <div className="flex justify-center gap-5">
      <AddFlashCardModal/>
      <Button color="secondary" variant="ghost">
        Edit
      </Button>
      <Button color="secondary" variant="ghost">
        Delete
      </Button>
    </div>
  );
};

export default Admin;
