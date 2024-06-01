import MDTable from "components/MDTable";
import { useEffect, useState, Fragment } from "react";
import MDDialog from "components/MDDialog";
import PropsType from "prop-types";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import Button from "components/MDButton";

// Data
function BaseTable({
  columns = [],
  havingAdd = true,
  loadData,
  deleteData,
  updateData,
  addData,
  title = "Manage Data",
}) {
  const [tableConfig, setTableConfig] = useState({
    totalRows: 100,
    currentPage: 1,
    rowsPerPage: 10,
    totalPage: 1,
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    status: "success",
    message: "",
  });

  const { stringSearch } = useSelector((state) => state.app);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dialogState, setDialogState] = useState({
    open: false,
    title: "",
    message: "",
    agree: () => {},
    disagree: () => {},
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar((prev) => ({ ...prev, open: false }));
  };

  const fetchData = () => {
    if (typeof loadData === "function") {
      setLoading(true);
      loadData({
        page: tableConfig.currentPage,
        rowsPerPage: tableConfig.rowsPerPage,
        searchString: tableConfig.searchString,
      })
        .then((res) => {
          setData(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onCloseDialog = () => {
    setDialogState({ ...dialogState, open: false });
  };

  const deleteRow = async (row) => {
    if (typeof deleteData !== "function") {
      return;
    }
    setLoading(true);
    await deleteData(row)
      .then((res) => {
        setSnackBar((prev) => ({
          ...prev,
          open: true,
          status: "success",
          message: "Delete successfully!",
        }));
      })
      .catch((err) => {
        setSnackBar((prev) => ({
          ...prev,
          open: true,
          status: "error",
          message: "Delete failed!",
        }));
      })
      .finally(() => {
        fetchData();
        onCloseDialog();
      });
  };

  const onUpdateRow = (row) => {
    if (typeof updateData !== "function") {
      return;
    }
    updateData(row);
  };

  const onDeleteRow = (row) => {
    setDialogState({
      open: true,
      title: "Delete",
      message: `Are you sure to delete this item?`,
      agree: () => {
        deleteRow(row);
      },
      disagree: () => {
        onCloseDialog();
      },
    });
  };

  useEffect(() => {
    // Fetch data
    console.log("Change");
    fetchData();
  }, [tableConfig.currentPage, tableConfig.rowsPerPage, stringSearch]);

  return (
    <Fragment>
      {dialogState.open && (
        <MDDialog
          handleClose={onCloseDialog}
          open={dialogState.open}
          title={dialogState.title}
          message={dialogState.message}
          agree={dialogState.agree}
          disagree={dialogState.disagree}
        />
      )}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: title ? "space-between" : "flex-start",
          alignItems: "center",
          padding: "0px 20px",
          gap: 10,
        }}
      >
        <h3>{title}</h3>
        {havingAdd && (
          <Button
            onClick={addData}
            variant="outlined"
            color="info"
            size="small"
            endIcon={<AddIcon />}
          >
            Add
          </Button>
        )}
      </div>
      <MDTable
        tableConfig={tableConfig}
        changeTableConfig={setTableConfig}
        columns={columns}
        data={data}
        action
        loading={loading}
        onDeleteRow={onDeleteRow}
        onUpdateRow={onUpdateRow}
      />
      {snackBar.open && (
        <Snackbar
          autoHideDuration={6000}
          open={snackBar.open}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackBar.status}
            variant="filled"
            sx={{ width: "100%", color: "#fff" }}
          >
            {snackBar.message}
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
}

BaseTable.propTypes = {
  columns: PropsType.array,
  rows: PropsType.array,
  loadData: PropsType.func,
  deleteData: PropsType.func,
  updateData: PropsType.func,
  addData: PropsType.func,
  title: PropsType.string,
  havingAdd: PropsType.bool,
};

export default BaseTable;
