import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";

const GenreForm = ({ open, onClose, genre = null }) => {
  return (
    <MDPopup open={open} handleClose={onClose} title="Movie">
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </MDPopup>
  );
};

GenreForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  genre: PropsType.object,
};

export default GenreForm;
