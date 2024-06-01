import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";

const PersonForm = ({ open, onClose, person = null }) => {
  return (
    <MDPopup open={open} handleClose={onClose} title="Movie">
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </MDPopup>
  );
};

PersonForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  person: PropsType.object,
};

export default PersonForm;
