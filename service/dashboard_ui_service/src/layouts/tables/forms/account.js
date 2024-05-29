import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";

const AccountForm = ({ open, onClose, account = null }) => {
  return (
    <MDPopup open={open} handleClose={onClose} title="Account">
      <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth />
    </MDPopup>
  );
};

AccountForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  account: PropsType.object,
};

export default AccountForm;
