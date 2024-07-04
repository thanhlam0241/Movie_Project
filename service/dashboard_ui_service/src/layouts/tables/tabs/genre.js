import { Fragment, useState } from "react";

import BaseTable from "../base/table";
import GenreForm from "../forms/genre";
import genreApi from "api/movie/genreApi";

const columns = [
  { id: "id", label: "Id", minWidth: 70, data_field: "id" },
  { id: "name", label: "Name", minWidth: 500, data_field: "name" },
];

// Data
function Table() {
  const [formState, setFormState] = useState({
    open: false,
    genre: null,
  });

  const openForm = (genre = null) => {
    setFormState({
      open: true,
      genre,
    });
  };

  const closeForm = () => {
    setFormState({
      open: false,
      genre: null,
    });
  };

  return (
    <Fragment>
      {formState.open && (
        <GenreForm data={formState.genre} open={formState.open} onClose={closeForm} />
      )}
      <BaseTable
        title="Manage genres"
        api={genreApi}
        deleteData={deleteData}
        updateData={updateData}
        addData={openForm}
        columns={columns}
      />
    </Fragment>
  );
}

export default Table;
