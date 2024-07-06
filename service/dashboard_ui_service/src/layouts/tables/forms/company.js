import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import companyApi from "api/movie/companyapi";
import useHandleForm from "composables/usehandleform";

const CompanyForm = ({ open, onClose, company = null }) => {
  const { onInsertRow } = useHandleForm(companyApi, "id");
  return (
    <MDPopup open={open} handleClose={onClose} title="Account">
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </MDPopup>
  );
};

CompanyForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  company: PropsType.object,
};

export default CompanyForm;
