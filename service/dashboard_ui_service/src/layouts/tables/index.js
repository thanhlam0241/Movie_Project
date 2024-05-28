// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Tab
import MDTab from "components/MDTab";

// Tables
import MovieTable from "./tabs/movie";
import TableAccount from "./tabs/account";
import Table from "./data/table";

function Tables() {
  const tabs = [
    {
      label: "Account",
      element: <TableAccount />,
    },
    {
      label: "Movie",
      element: <MovieTable />,
    },
    {
      label: "Table",
      element: <Table />,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTab tabs={tabs} />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
