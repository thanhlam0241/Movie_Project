import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import GenreForm from "../forms/genre";

const columns = [
  { id: "id", label: "Id", minWidth: 70, data_field: "id" },
  { id: "name", label: "Name", minWidth: 500, data_field: "name" },
];

function createData(id, name) {
  return { id, name };
}

const rows = [
  createData(1, "Action"),
  createData(2, "Adventure"),
  createData(3, "Comedy"),
  createData(4, "Drama"),
  createData(5, "Horror"),
  createData(6, "Mystery"),
  createData(7, "Romance"),
  createData(8, "Sci-Fi"),
  createData(9, "Thriller"),
  createData(10, "Western"),
];

// Data
function Table() {
  const [formState, setFormState] = useState({
    open: false,
    account: null,
  });

  const openForm = (account = null) => {
    setFormState({
      open: true,
      account,
    });
  };

  const closeForm = () => {
    setFormState({
      open: false,
      account: null,
    });
  };

  const loadData = async () => {
    return new Promise((resolve) => {
      resolve({ data: rows });
    });
  };

  const deleteData = async (row) => {
    console.log("Delete data", row);
    return new Promise((resolve) => {
      resolve({ data: rows });
    });
  };

  const updateData = async (row) => {
    console.log("Update data", row);
    return new Promise((resolve) => {
      resolve({ data: rows });
    });
  };

  return (
    <Fragment>
      {formState.open && <GenreForm open={formState.open} onClose={closeForm} />}
      <BaseTable
        title="Manage genres"
        loadData={loadData}
        deleteData={deleteData}
        updateData={updateData}
        addData={openForm}
        columns={columns}
      />
    </Fragment>
  );
}

export default Table;
