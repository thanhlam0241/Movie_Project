import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/movie/movieapi";

const MovieForm = ({ open, onClose, data = null }) => {
  return (
    <MDPopup api={api} keyId={data?.id} open={open} handleClose={onClose} title="Movie">
      <TextField
        autoFocus
        margin="dense"
        defaultValue={data?.title}
        id="title"
        label="Movie name"
        name="title"
        fullWidth
      />
      <TextField
        defaultValue={data?.revenue}
        margin="dense"
        id="revenue"
        label="Revenue"
        name="revenue"
        fullWidth
      />
      <TextField
        defaultValue={data?.budget}
        margin="dense"
        id="budget"
        label="Budget"
        name="budget"
        fullWidth
      />
    </MDPopup>
  );
};

MovieForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
};

export default MovieForm;
