import { useState } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Tab
import MDTab from "components/MDTab";

// Tables
import MovieTable from "./tabs/movie";
import TableAccount from "./tabs/account";
import PeopleTable from "./tabs/people";
import GenreTable from "./tabs/genre";

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
      label: "People",
      element: <PeopleTable />,
    },
    {
      label: "Genre",
      element: <GenreTable />,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDTab tabs={tabs} />
    </DashboardLayout>
  );
}

export default Tables;
