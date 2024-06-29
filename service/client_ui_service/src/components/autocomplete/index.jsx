import { useState, Fragment } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { debounce } from "@mui/material";

export default function Asynchronous({
  loadAutocomplete,
  onClickAutocomplete,
  keyId,
  onEnter,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableLoad, setDisableLoad] = useState(false);
  const [clearBlur, setClearBlur] = useState(false);

  const onClickValue = (_, newValue) => {
    setDisableLoad(true);
    if (
      keyId &&
      onClickAutocomplete &&
      typeof onClickAutocomplete === "function" &&
      newValue[keyId]
    ) {
      onClickAutocomplete(newValue[keyId]);
      setClearBlur(true);
      setDisableLoad(false);
    }
  };

  const onChange = debounce((e, newValue) => {
    if (!newValue || disableLoad) return;
    setLoading(true);
    loadAutocomplete(newValue)
      .then((data) => {
        setClearBlur(false);
        setOptions(data);
      })
      .finally(() => setLoading(false));
  }, 500);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      onEnter(e.target.value);
    }
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      size="small"
      sx={{ width: 400, backgroundColor: "#fff", borderRadius: 2 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      freeSolo
      filterOptions={(x) => x}
      onChange={onClickValue}
      onInputChange={onChange}
      clearOnBlur={clearBlur}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title ?? ""}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          autoFocus
          onKeyDown={onKeyDown}
          placeholder="Search movie"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: <Fragment></Fragment>,
          }}
        />
      )}
    />
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: "The Shawshank Redemption", id: 1994 },
  { title: "The Godfather", id: 1972 },
  { title: "The Godfather: Part II", id: 1974 },
  { title: "The Dark Knight", id: 2008 },
  { title: "12 Angry Men", id: 1957 },
  { title: "Schindler's List", id: 1993 },
  { title: "Pulp Fiction", id: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    id: 2003,
  },
  { title: "The Good, the Bad and the Ugly", id: 1966 },
  { title: "Fight Club", id: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    id: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    id: 1980,
  },
  { title: "Forrest Gump", id: 1994 },
  { title: "Inception", id: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    id: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", id: 1975 },
  { title: "Goodfellas", id: 1990 },
  { title: "The Matrix", id: 1999 },
  { title: "Seven Samurai", id: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    id: 1977,
  },
  { title: "City of God", id: 2002 },
  { title: "Se7en", id: 1995 },
  { title: "The Silence of the Lambs", id: 1991 },
  { title: "It's a Wonderful Life", id: 1946 },
  { title: "Life Is Beautiful", id: 1997 },
  { title: "The Usual Suspects", id: 1995 },
  { title: "Léon: The Professional", id: 1994 },
  { title: "Spirited Away", id: 2001 },
  { title: "Saving Private Ryan", id: 1998 },
  { title: "Once Upon a Time in the West", id: 1968 },
  { title: "American History X", id: 1998 },
  { title: "Interstellar", id: 2014 },
];
