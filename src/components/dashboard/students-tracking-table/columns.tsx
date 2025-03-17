import { SortableColumnHeader } from "@/components/ui/sortable-column-header";
import { Student } from "@/lib/types/AuthTypes";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Student>[] = [
  {
    header: ({ column }) => (
      <SortableColumnHeader column={column} title="Nom" />
    ),
    accessorKey: "lastName",
  },
  { header: "Prénom", accessorKey: "firstName" },
];
