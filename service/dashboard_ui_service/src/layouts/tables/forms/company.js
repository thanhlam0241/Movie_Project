import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/movie/companyapi";

const CompanyForm = ({ open, onClose, data = null }) => {
  return (
    <MDPopup api={api} keyId={data?.id} open={open} handleClose={onClose} title="Company">
      <TextField
        defaultValue={data?.name}
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        name="name"
        fullWidth
      />
      <TextField
        defaultValue={data?.headquarters}
        margin="dense"
        id="headquarters"
        name="headquarters"
        label="headquarters"
        fullWidth
      />
      <TextField
        defaultValue={data?.origin_country}
        margin="dense"
        id="country"
        name="origin_country"
        label="Country"
        fullWidth
      />
      <TextField
        defaultValue={data?.homepage}
        margin="dense"
        id="homepage"
        name="homepage"
        label="Homepage"
        fullWidth
      />
    </MDPopup>
  );
};

CompanyForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
};

export default CompanyForm;
