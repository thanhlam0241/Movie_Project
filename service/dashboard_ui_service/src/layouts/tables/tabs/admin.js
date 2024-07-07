import { Fragment, useState } from "react";

import BaseTable from "../base/table.js";
import Form from "../forms/admin.js";
import { useSelector } from "react-redux";

const columns = [
  { id: "username", label: "Username", minWidth: 170, data_field: "username" },
  { id: "name", label: "Full name", minWidth: 100, data_field: "name" },
  { id: "email", label: "Email", minWidth: 100, data_field: "email" },
  { id: "country", label: "Country", minWidth: 100, data_field: "country" },
];

import api from "api/account/adminapi.js";

// Data
function Table() {
  const auth = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    open: false,
    account: null,
    isAdd: true,
  });

  const openForm = (data = null) => {
    console.log(data);
    setFormState({
      open: true,
      account: data,
      isAdd: !data ? true : false,
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
        <Form
          isAdd={formState.isAdd}
          data={formState.account}
          open={formState.open}
          onClose={closeForm}
        />
      )}
      {auth.username && (
        <BaseTable
          customParams={{ username: auth.username }}
          title="Manage Accounts"
          api={api}
          openForm={openForm}
          columns={columns}
        />
      )}
    </Fragment>
  );
}

export default Table;
