import "./style.scss";
import { deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

function getLastName(string) {
  if (typeof string === "string") {
    const arr = string.split(" ");
    return arr[arr.length - 1];
  }
  return "";
}

export default function Header() {
  const auth = useSelector((state) => state.auth);
  const data = {
    fullName: "Nguyễn Văn A",
  };

  return (
    <div className="account-view">
      <div style={{ position: "relative" }}>
        <Avatar
          sx={{
            width: "20vw",
            margin: "0 auto",
            height: "20vw",
            fontSize: "5vw",
            bgcolor: deepOrange[500],
          }}
        >
          {getLastName(data.fullName)}
        </Avatar>
      </div>
      <h3>{data.fullName}</h3>
      <div className="info-container">
        <span>
          <b>Tên đăng nhập</b>: {auth.username}
        </span>
        <hr />
      </div>
    </div>
  );
}
