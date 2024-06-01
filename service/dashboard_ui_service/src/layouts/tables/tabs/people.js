import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import GenreForm from "../forms/genre";

const columns = [
  { id: "id", label: "Id", minWidth: 70, data_field: "id" },
  { id: "name", label: "Name", minWidth: 100, data_field: "name" },
  {
    id: "birthday",
    label: "Birthday",
    minWidth: 170,
    align: "right",
    data_field: "birthday",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "right",
    data_field: "gender",
    format: (value) => {
      return value === 1 ? "Male" : value === 2 ? "Female" : "Other";
    },
  },
  {
    id: "job",
    label: "Job",
    minWidth: 170,
    align: "right",
    data_field: "job",
  },
  {
    id: "place_of_birth",
    label: "Place_of_birth",
    minWidth: 170,
    align: "right",
    data_field: "place_of_birth",
  },
];

const rows = [];

for (let i = 0; i < 100; i++) {
  rows.push({
    id: i,
    name: `Person ${i}`,
    birthday: "2021-10-10",
    gender: i % 3,
    job: `Job ${i}`,
    place_of_birth: `Place ${i}`,
  });
}
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
        title="Manage people"
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
