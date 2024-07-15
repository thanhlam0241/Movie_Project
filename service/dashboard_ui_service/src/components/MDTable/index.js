import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropsType from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";

export default function StickyHeadTable({
  columns,
  data,
  tableConfig,
  changeTableConfig,
  action = true,
  loading = false,
  onDeleteRow,
  onUpdateRow,
  maxHeight = 500,
}) {
  const isEmpty =
    !Array.isArray(columns) || columns.length === 0 || !Array.isArray(data) || data.length === 0;
  const isAction = action && !isEmpty;

  const handleChangePage = (event, newPage) => {
    changeTableConfig((config) => {
      return {
        ...config,
        currentPage: newPage,
      };
    });
  };

  const handleChangeRowsPerPage = (event) => {
    changeTableConfig((config) => {
      return {
        ...config,
        rowsPerPage: parseInt(event.target.value, 10),
        currentPage: 0,
      };
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Array.isArray(columns) &&
                columns.length > 0 &&
                columns.map((column) => {
                  return (
                    <TableCell
                      sx={{ backgroundColor: "#000", color: "#fff" }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
              {isAction && (
                <TableCell
                  sx={{ backgroundColor: "#000", color: "#fff" }}
                  key="action"
                  align="right"
                  style={{ minWidth: 170 }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          {loading && (
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={"row" + i}>
                    {columns.map((_, index) => {
                      return (
                        <TableCell key={index + "row" + i}>
                          <Skeleton height={50} variant="rectangular" />
                        </TableCell>
                      );
                    })}
                    {isAction && (
                      <TableCell key="action" align="right">
                        <Skeleton height={50} variant="rectangular" />
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
          {!loading && !isEmpty && (
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={"row" + index}>
                    {columns.map((column, index) => {
                      const value = row[column.data_field];
                      return (
                        <TableCell key={column.data_field + "-" + index} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.type && column.type == "link" && value ? (
                            <a rel="noreferrer" target="_blank" href={value}>
                              {value}
                            </a>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    {isAction && (
                      <TableCell key="action" align="right">
                        <div>
                          <IconButton
                            color="success"
                            onClick={() => onUpdateRow(row)}
                            aria-label="update"
                            size="small"
                          >
                            <CreateIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => onDeleteRow(row)}
                            aria-label="delete"
                            size="small"
                            sx={{ color: pink[500] }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
          {!loading && isEmpty && (
            <TableBody>
              <TableRow>
                <TableCell sx={{ height: 450 }} colSpan={columns.length + 1} align="center">
                  No data found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!loading && !isEmpty && (
        <TablePagination
          sx={{ display: "flex", justifyContent: "flex-start" }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableConfig.totalRows}
          rowsPerPage={tableConfig.rowsPerPage}
          page={tableConfig.currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {loading && <Skeleton variant="rectangular" width="100%" height={450} />}
    </Paper>
  );
}

StickyHeadTable.propTypes = {
  columns: PropsType.array.isRequired,
  data: PropsType.array.isRequired,
  tableConfig: PropsType.object.isRequired,
  changeTableConfig: PropsType.func.isRequired,
  action: PropsType.bool,
  loading: PropsType.bool,
  onDeleteRow: PropsType.func,
  onUpdateRow: PropsType.func,
  maxHeight: PropsType.number,
};
