import MDTable from "components/MDTable";
import { useEffect, useState } from "react";

const columns = [
  { id: "title", label: "Name", minWidth: 170, data_field: "name" },
  { id: "name", label: "Full name", minWidth: 100, data_field: "name" },
  {
    id: "created_at",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
    data_field: "created_at",
  },
];

function createData(username, name, created_at) {
  return { username, name, created_at };
}

const rows = [];

// Data
function Table() {
  const [tableConfig, setTableConfig] = useState({
    totalRows: 100,
    currentPage: 1,
    rowsPerPage: 10,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setLoading(true);
    let a = setTimeout(() => {
      setData(rows);
      setLoading(false);
    }, 5000);
    return () => clearTimeout(a);
  }, [tableConfig.totalRows, tableConfig.currentPage, tableConfig.rowsPerPage]);

  return (
    <MDTable
      tableConfig={tableConfig}
      changeTableConfig={setTableConfig}
      columns={columns}
      data={data}
      action
      loading={loading}
    />
  );
}

export default Table;
