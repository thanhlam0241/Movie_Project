import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropsType from "prop-types";
import Loading from "components/MDLoading/index";
import useHandleForm from "composables/usehandleform.js";

export default function FormDialog({
  fullWidth = true,
  maxWidth = "lg",
  open,
  handleClose,
  title,
  children,
  api,
  keyId,
  customParams,
}) {
  const [loading, setLoading] = useState(false);

  console.log(keyId);
  const start = () => {
    setLoading(true);
  };

  const end = () => {
    setLoading(false);
  };

  const { onInsertRow, onUpdateRow } = useHandleForm(api, keyId, start, handleClose, null, end);

  const onSave = (param) => {
    if (customParams && typeof customParams === "function") {
      customParams(param);
    }
    if (!keyId) {
      onInsertRow(param);
    } else {
      onUpdateRow(param);
    }
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          onSave(formJson);
        },
      }}
    >
      <Loading open={loading} />
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

FormDialog.propTypes = {
  open: PropsType.bool,
  handleClose: PropsType.func,
  children: PropsType.node,
  title: PropsType.string,
  fullWidth: PropsType.bool,
  keyId: PropsType.oneOfType([PropsType.string, PropsType.number]),
  api: PropsType.object,
  maxWidth: PropsType.oneOf(["xs", "sm", "md", "lg", "xl"]),
  customParams: PropsType.func,
};
