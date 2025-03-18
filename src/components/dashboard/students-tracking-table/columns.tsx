import { Button } from "@/components/ui/button";
import { SortableColumnHeader } from "@/components/ui/sortable-column-header";
import { Student } from "@/lib/types/AuthTypes";
import { ColumnDef } from "@tanstack/react-table";
import { BookOpenCheck, FileUser } from "lucide-react";

export const columns: ColumnDef<Student>[] = [
  {
    header: ({ column }) => (
      <SortableColumnHeader
        column={column}
        title="Nom"
        ascLabel="A-Z"
        descLabel="Z-A"
      />
    ),
    accessorKey: "lastName",
  },
  { header: "Prénom", accessorKey: "firstName" },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 text-xs text-white">
          <Button>
            <BookOpenCheck className="mr-2" />
            Dernière réunion
          </Button>
          <Button>
            <FileUser className="mr-2" />
            Fiche étudiant
          </Button>
        </div>
      );
    },
  },
];
