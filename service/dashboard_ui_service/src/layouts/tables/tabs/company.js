import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import CompanyForm from "../forms/company";
import companyApi from "api/movie/companyapi";

const columns = [
  { id: "id", label: "Id", minWidth: 70, data_field: "id" },
  { id: "name", label: "Name", minWidth: 200, data_field: "name" },
  { id: "headquarters", label: "Headquarters", minWidth: 200, data_field: "headquarters" },
  { id: "origin_country", label: "Country", minWidth: 200, data_field: "origin_country" },
  { id: "homepage", label: "homepage", minWidth: 100, data_field: "homepage", type: "link" },
];

// Data
function Table() {
  const [formState, setFormState] = useState({
    open: false,
    company: null,
  });

  const openForm = (company = null) => {
    setFormState({
      open: true,
      company,
    });
  };

  const closeForm = () => {
    setFormState({
      open: false,
      company: null,
    });
  };

  return (
    <Fragment>
      {formState.open && (
        <CompanyForm data={formState.company} open={formState.open} onClose={closeForm} />
      )}
      <BaseTable title="Manage companies" api={companyApi} openForm={openForm} columns={columns} />
    </Fragment>
  );
}

export default Table;
