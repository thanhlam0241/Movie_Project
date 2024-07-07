import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/account/userapi.js";

const AccountForm = ({ open, onClose, data = null }) => {
  return (
    <MDPopup isAddForm={data == null} api={api} open={open} handleClose={onClose} title="Account">
      <TextField
        defaultValue={data?.username || ""}
        margin="dense"
        id="username"
        name="username"
        label="Username"
        disabled
        fullWidth
      />
      {/* {data !== null && (
        <TextField
          defaultValue={data?.name || ""}
          margin="dense"
          id="name"
          name="password"
          label="Password"
          type="password"
          fullWidth
        />
      )} */}
      <TextField
        defaultValue={data?.name || ""}
        margin="dense"
        disabled
        id="name"
        name="name"
        label="Name"
        fullWidth
      />
      <TextField
        defaultValue={data?.email || ""}
        margin="dense"
        disabled
        id="email"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
      />
      <TextField
        defaultValue={data?.country || ""}
        margin="dense"
        disabled
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
