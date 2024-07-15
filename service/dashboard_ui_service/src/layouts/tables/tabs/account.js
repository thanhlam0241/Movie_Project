import { Fragment, useState } from "react";

import BaseTable from "../base/table.js";
import AccountForm from "../forms/account.js";

const columns = [
  { id: "username", label: "Username", minWidth: 170, data_field: "username" },
  { id: "name", label: "Full name", minWidth: 100, data_field: "name" },
  { id: "email", label: "Email", minWidth: 100, data_field: "email" },
  { id: "country", label: "Country", minWidth: 100, data_field: "country" },
];

import userApi from "api/account/userapi";

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

  return (
    <Fragment>
      {formState.open && (
        <AccountForm data={formState.account} open={formState.open} onClose={closeForm} />
      )}
      <BaseTable
        havingAdd={false}
        title="Manage Accounts"
        api={userApi}
        openForm={openForm}
        columns={columns}
      />
    </Fragment>
  );
}

export default Table;
