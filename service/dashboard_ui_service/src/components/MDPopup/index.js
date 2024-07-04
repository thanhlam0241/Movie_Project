import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropsType from "prop-types";

export default function FormDialog({
  fullWidth = true,
  maxWidth = "lg",
  open,
  handleClose,
  handleSave,
  title,
  children,
}) {
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          console.log(event.currentTarget);
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
          handleClose();
        },
      }}
    >
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
  handleSave: PropsType.func,
  children: PropsType.node,
  title: PropsType.string,
  fullWidth: PropsType.bool,
  maxWidth: PropsType.oneOf(["xs", "sm", "md", "lg", "xl"]),
};
