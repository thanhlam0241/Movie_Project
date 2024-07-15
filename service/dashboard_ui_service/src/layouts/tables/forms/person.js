import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/movie/peopleapi";

const PersonForm = ({ open, onClose, data = null }) => {
  return (
    <MDPopup api={api} keyId={data?.id} open={open} handleClose={onClose} title="Movie">
      <TextField
        autoFocus
        margin="dense"
        id="name"
        defaultValue={data?.name}
        label="Name"
        name="name"
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="job"
        defaultValue={data?.job}
        label="Job"
        name="job"
        fullWidth
      />
      <TextField
        autoFocus
        margin="dense"
        id="place_of_birth"
        defaultValue={data?.place_of_birth}
        label="Place of birth"
        name="place_of_birth"
        fullWidth
      />
    </MDPopup>
  );
};

PersonForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
};

export default PersonForm;
