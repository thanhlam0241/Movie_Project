import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import AccountForm from "../forms/account";

const columns = [
  { id: "username", label: "Username", minWidth: 170, data_field: "username" },
  { id: "name", label: "Full name", minWidth: 100, data_field: "name" },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
    data_field: "created_at",
  },
];

function createData(username, name, created_at) {
  return { username, name, created_at };
}

const rows = [
  createData("john_doe", "John Doe", "2021-09-01"),
  createData("jane_doe", "Jane Doe", "2021-09-02"),
  createData("joe_doe", "Joe Doe", "2021-09-03"),
  createData("jane_smith", "Jane Smith", "2021-09-04"),
  createData("john_smith", "John Smith", "2021-09-05"),
  createData("joe_smith", "Joe Smith", "2021-09-06"),
  createData("jane_jones", "Jane Jones", "2021-09-07"),
  createData("john_jones", "John Jones", "2021-09-08"),
  createData("joe_jones", "Joe Jones", "2021-09-09"),
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
      {formState.open && <AccountForm open={formState.open} onClose={closeForm} />}
      <BaseTable
        title="Manage Accounts"
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
