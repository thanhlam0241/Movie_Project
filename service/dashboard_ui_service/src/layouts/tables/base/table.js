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
import { Sledding } from "@mui/icons-material";
import { toast } from "react-toastify";
import { changeReload } from "store/appslice.js";
import { useDispatch } from "react-redux";

// Data
function BaseTable({
  columns = [],
  havingAdd = true,
  openForm,
  title = "Manage Data",
  api,
  keyId = "id",
  customParams,
}) {
  const dispatch = useDispatch();
  const [tableConfig, setTableConfig] = useState({
    totalRows: 0,
    currentPage: 0,
    rowsPerPage: 10,
    totalPage: 0,
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    status: "success",
    message: "",
  });

  const { stringSearch, reload } = useSelector((state) => state.app);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reload) {
      fetchData();
      dispatch(changeReload());
    }
  }, [reload]);

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

  const errorMess = (mes) => {
    toast.error(mes ?? "Something error");
  };

  const fetchData = () => {
    if (api && typeof api.searchText === "function") {
      setLoading(true);
      api
        .searchText(
          stringSearch,
          tableConfig.currentPage + 1,
          tableConfig.rowsPerPage,
          customParams
        )
        .then((res) => {
          setData(res.results);
          setTableConfig((prev) => ({
            ...prev,
            totalRows: res.total_results,
            totalPage: res.total_pages,
          }));
        })
        .catch((ex) => console.log(ex))
        .finally(() => {
          setLoading(false);
        });
    } else {
      errorMess();
    }
  };

  const onCloseDialog = () => {
    setDialogState({ ...dialogState, open: false });
  };

  const deleteRow = async (row) => {
    if (!api || typeof api.delete !== "function") {
      return;
    }
    setLoading(true);
    if (!row[keyId]) {
      errorMess();
      return;
    }
    await api
      .delete(row[keyId])
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

  const onDeleteRow = (row) => {
    setDialogState({
      open: true,
      title: "Delete",
      message: `Are you sure to delete this item?`,
      agree: async () => {
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
            onClick={() => openForm()}
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
        onUpdateRow={openForm}
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
  updateData: PropsType.func,
  openForm: PropsType.func,
  title: PropsType.string,
  havingAdd: PropsType.bool,
  api: PropsType.object,
  keyId: PropsType.string,
  customParams: PropsType.object,
};

export default BaseTable;
