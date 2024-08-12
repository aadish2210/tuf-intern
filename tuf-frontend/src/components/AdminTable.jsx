import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { columns } from "../utils/data";
import { Spinner, Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import useFlashCardList from "../hooks/useFlashCardList";
import UpdateFlashCardModal from "./UpdateFlashCardModal";
import useDeleteFlashcard from "../hooks/useDeleteFlashCard";
import AddFlashCardModal from "./AddFlashCardModal";

export default function AdminTable() {
  const deleteFlashcardMutation = useDeleteFlashcard();
  const { flashCardData, flashCardListIsLoading } = useFlashCardList();
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "question":
        return <h1 className="text-black">{user.question}</h1>;
      case "answer":
        return (
          <p className="text-bold text-sm capitalize text-default-400">
            {user.answer}
          </p>
        );
      case "actions":
        return (
          <div className="flex justify-center gap-5">
            <UpdateFlashCardModal data={user} />
            <Button
              color="secondary"
              variant="ghost"
              onClick={() => deleteFlashcardMutation.mutate(user.id)}
            >
              Delete
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 7;

  const pages = Math.ceil(flashCardData?.data?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return flashCardData?.data.slice(start, end);
  }, [page, flashCardData?.data]);

  if (flashCardListIsLoading || items == undefined) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner color="secondary" />
      </div>
    );
  }
  if (!flashCardListIsLoading && flashCardData.count == 0) {
    return (
      <div className="m-[50px]">
        <h1 className="text-[#ee4b2b] text-3xl p-5 pl-0">Admin Dashboard</h1>
        <div className="flex flex-col justify-evenly">
          <h1 className="text-white text-xl">No FlashCard In the List!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="m-[50px]">
      <div className="flex gap-5 justify-between items-center mx-4">
      <h1 className="text-[#ee4b2b] text-2xl p-5 pl-0">Admin Dashboard</h1>
      <AddFlashCardModal/>
      </div>
      
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </div>
  );
}
