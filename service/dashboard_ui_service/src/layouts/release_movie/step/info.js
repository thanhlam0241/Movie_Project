import TextField from "@mui/material/TextField";
import { useEffect, useState, useRef } from "react";
import MultipleSelectChip from "components/MDSelect";
import PropsType from "prop-types";

function Info({ onChange, formDetail, genres }) {
  const [valueGenre, setValueGenre] = useState(formDetail.genres);

  const refTitle = useRef(null);
  const refDes = useRef(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValueGenre(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    onChange("genres", value);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <TextField
        inputRef={refTitle}
        defaultValue={formDetail.title}
        margin="dense"
        onChange={(e) => onChange("title", e.target.value)}
        id="title"
        name="title"
        label="Title"
        fullWidth
      />
      <TextField
        inputRef={refDes}
        onChange={(e) => onChange("description", e.target.value)}
        defaultValue={formDetail.description}
        margin="dense"
        id="description"
        name="description"
        label="Description"
        fullWidth
      />
      {genres && (
        <MultipleSelectChip
          name="genres"
          sx={{ marginTop: 1, height: "44px !important" }}
          keylabel="name"
          keyValue="id"
          label="Genres"
          data={genres}
          valueSelected={valueGenre}
          fullWidth
          handleChange={handleChange}
        />
      )}
    </form>
  );
}

Info.propTypes = {
  onChange: PropsType.func,
  formDetail: PropsType.object,
  genres: PropsType.array,
};

export default Info;
