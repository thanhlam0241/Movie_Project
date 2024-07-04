import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/account/userApi";
import useHandleForm from "composables/useHandleForm";

const AccountForm = ({ open, onClose, data = null }) => {
  const { onInsertRow } = useHandleForm(api, "id");
  return (
    <MDPopup open={open} handleClose={onClose} title="Account">
      <TextField
        defaultValue={data?.username || ""}
        margin="dense"
        id="username"
        name="username"
        label="Name"
        fullWidth
      />
      <TextField
        defaultValue={data?.name || ""}
        margin="dense"
        id="name"
        name="name"
        label="Name"
        fullWidth
      />
      <TextField
        defaultValue={data?.email || ""}
        margin="dense"
        id="email"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
      />
      <TextField
        defaultValue={data?.country || ""}
        margin="dense"
        id="country"
        name="country"
        label="Country"
        fullWidth
      />
    </MDPopup>
  );
};

AccountForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
};

export default AccountForm;
