import MDPopup from "components/MDPopup";
import TextField from "@mui/material/TextField";
import PropsType from "prop-types";
import api from "api/account/adminapi.js";
import { useSelector } from "react-redux";

const AdminForm = ({ open, onClose, data = null, isAdd }) => {
  const { username } = useSelector((state) => state.auth);
  const customParams = (param) => {
    param.createdBy = username;
  };
  return (
    <MDPopup
      isAddForm={isAdd}
      api={api}
      open={open}
      handleClose={onClose}
      customParams={customParams}
      title="Account admin"
    >
      <TextField
        defaultValue={data?.username || ""}
        margin="dense"
        id="username"
        name="username"
        label="Username"
        disabled={data != null}
        fullWidth
      />
      {data == null && (
        <TextField
          defaultValue={data?.name || ""}
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
        />
      )}
      <TextField
        defaultValue={data?.name || ""}
        margin="dense"
        disabled={data != null}
        id="name"
        name="name"
        label="Name"
        fullWidth
      />
      <TextField
        defaultValue={data?.email || ""}
        margin="dense"
        disabled={data != null}
        id="email"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
      />
      <TextField
        defaultValue={data?.country || ""}
        margin="dense"
        disabled={data != null}
        id="country"
        name="country"
        label="Country"
        fullWidth
      />
    </MDPopup>
  );
};

AdminForm.propTypes = {
  open: PropsType.bool,
  onClose: PropsType.func,
  data: PropsType.object,
  isAdd: PropsType.bool,
};

export default AdminForm;
