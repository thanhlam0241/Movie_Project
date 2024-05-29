import MDTable from "components/MDTable";
import { useEffect, useState } from "react";

const columns = [
  { id: "username", label: "Username", minWidth: 170, data_field: "username" },
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

const rows = [
  createData("john_doe", "John Doe", "2021-09-01"),
  createData("jane_doe", "Jane Doe", "2021-09-02"),
  createData("joe_doe", "Joe Doe", "2021-09-03"),
  createData("jane_smith", "Jane Smith", "2021-09-04"),
  createData("john_smith", "John Smith", "2021-09-05"),
  createData("joe_smith", "Joe Smith", "2021-09-06"),
  createData("jane_jones", "Jane Jones", "2021-09-07"),
  createData("john_jones", "John Jones", "2021-09-08"),
  createData("joe_jones", "Joe Jones", "2021-09-09"),
];

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
    }, 3000);
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
