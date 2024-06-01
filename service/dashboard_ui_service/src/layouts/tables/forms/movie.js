import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";

const MovieForm = ({ open, onClose, movie = null }) => {
  return (
    <MDPopup open={open} handleClose={onClose} title="Movie">
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </MDPopup>
  );
};

MovieForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  movie: PropsType.object,
};

export default MovieForm;
