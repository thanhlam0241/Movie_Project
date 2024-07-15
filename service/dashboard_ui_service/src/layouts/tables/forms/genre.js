import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/movie/genreapi";

const GenreForm = ({ open, onClose, data = null }) => {
  return (
    <MDPopup api={api} keyId={data?.id} open={open} handleClose={onClose} title="Genre">
      <TextField
        autoFocus
        defaultValue={data?.name}
        margin="dense"
        id="name"
        label="Genre name"
        name="name"
        fullWidth
      />
    </MDPopup>
  );
};

GenreForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
};

export default GenreForm;
