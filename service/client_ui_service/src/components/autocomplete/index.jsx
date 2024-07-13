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
