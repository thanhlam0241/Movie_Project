import { Fragment, useState } from "react";

import BaseTable from "../base/table.js";
import MovieForm from "../forms/movie.js";

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

import movieAPI from "api/movie/movieapi";

// Data
function Table() {
  const [formState, setFormState] = useState({
    open: false,
    movie: null,
  });

  const openForm = (movie = null) => {
    setFormState({
      open: true,
      movie,
    });
  };

  const closeForm = () => {
    setFormState({
      open: false,
      movie: null,
    });
  };

  return (
    <Fragment>
      {formState.open && (
        <MovieForm data={formState.movie} open={formState.open} onClose={closeForm} />
      )}
      <BaseTable title="Manage movies" api={movieAPI} openForm={openForm} columns={columns} />
    </Fragment>
  );
}

export default Table;
