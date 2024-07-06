import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import Form from "../forms/person";
import peopleApi from "api/movie/peopleapi";

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

// Data
function Table() {
  const [formState, setFormState] = useState({
    open: false,
    person: null,
  });

  const openForm = (person = null) => {
    setFormState({
      open: true,
      person,
    });
  };

  const closeForm = () => {
    setFormState({
      open: false,
      person: null,
    });
  };

  return (
    <Fragment>
      {formState.open && <Form data={formState.person} open={formState.open} onClose={closeForm} />}
      <BaseTable title="Manage people" api={peopleApi} openForm={openForm} columns={columns} />
    </Fragment>
  );
}

export default Table;
