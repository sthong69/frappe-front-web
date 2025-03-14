import Page from "@/components/Page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Student } from "@/lib/types/AuthTypes";
import { useState } from "react";
import { columns } from "./columns";

interface StudentsTrackingTableProps {
  students: Student[];
}

const StudentsTrackingTable = (props: StudentsTrackingTableProps) => {
  const [search, setSearch] = useState("");

  const filterStudents = (student: Student) => {
    const studentLastName = student.lastName.toLowerCase();
    const studentFirstName = student.firstName.toLowerCase();
    const searchLower = search.toLowerCase();

    return (
      search === "" ||
      studentLastName.includes(searchLower) ||
      studentFirstName.includes(searchLower)
    );
  };

  return (
    <Page title="VOS RENDEZ-VOUS">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-end space-x-2 py-2">
            <Input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={props.students}
            filterFn={filterStudents}
          />
        </CardContent>
      </Card>
    </Page>
  );
};

export default StudentsTrackingTable;
