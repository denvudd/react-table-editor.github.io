import React from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { deleteRow } from "@/actions/delete-row";
import { Button } from "./ui/Button";
import { XCircle } from "lucide-react";

interface DeleteRowButtonProps {
  rowId: number;
}

const DeleteRowButton: React.FC<DeleteRowButtonProps> = ({ rowId }) => {
  const router = useRouter();

  const onDeleteRow = async () => {
    const deletedRow = await deleteRow(rowId);

    if (typeof deletedRow === "object") {
      toast.success(`Row with ID ${rowId} deleted successfully`);
      router.refresh();
    } else {
      toast.error(deletedRow);
      router.refresh();
    }
  };
  return (
    <Button
      className="absolute top-4 -left-12 opacity-0 transition-opacity group-hover:opacity-100"
      variant="destructive"
      size="icon"
      onClick={onDeleteRow}
    >
      <XCircle className="w-4 h-4" />
    </Button>
  );
};

export default DeleteRowButton;
