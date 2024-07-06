import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PropsType from "prop-types";

const DivInput = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "5px",
});

const FileName = styled("span")({
  width: "200px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "&:hover": {
    cursor: "pointer",
  },
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ label, onChange, file, onClickName }) {
  return (
    <DivInput>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        style={{
          color: "#fff !important",
        }}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {label || "Upload file"}
        <VisuallyHiddenInput onChange={onChange} type="file" />
      </Button>
      {file && file.name && <FileName onClick={onClickName}>{file.name}</FileName>}
    </DivInput>
  );
}

InputFileUpload.propTypes = {
  label: PropsType.string,
  onChange: PropsType.func,
  file: PropsType.object,
  onClickName: PropsType.func,
};

export default InputFileUpload;
