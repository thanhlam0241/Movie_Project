import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import MovieForm from "../forms/movie";

const columns = [
  { id: "id", label: "Id", minWidth: 20, data_field: "id" },
  { id: "title", label: "Movie name", minWidth: 200, data_field: "title" },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    align: "right",
    data_field: "release_date",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    data_field: "status",
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 170,
    align: "right",
    data_field: "vote_average",
  },
  {
    id: "revenue",
    label: "Revenue",
    minWidth: 170,
    align: "right",
    data_field: "revenue",
  },
  {
    id: "budget",
    label: "Budget",
    minWidth: 170,
    align: "right",
    data_field: "budget",
  },
];

const rows = [];

for (let i = 0; i < 10; i++) {
  rows.push({
    id: i,
    title: `Movie ${i}`,
    release_date: new Date().toLocaleString("vi-VN"),
    status: "Released",
    vote_average: Math.floor(Math.random() * 10),
    revenue: Math.floor(Math.random() * 1000000),
    budget: Math.floor(Math.random() * 1000000),
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
      {formState.open && <MovieForm open={formState.open} onClose={closeForm} />}
      <BaseTable
        title="Manage movies"
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
