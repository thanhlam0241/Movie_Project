import TextField from "@mui/material/TextField";

function Info() {
  return (
    <form>
      <TextField margin="dense" id="title" name="title" label="Title" fullWidth />
      <TextField margin="dense" id="description" name="description" label="Description" fullWidth />
    </form>
  );
}

export default Info;
