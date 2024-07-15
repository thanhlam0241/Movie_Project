// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <iframe
        style={{ border: 0, width: "100%", height: "2000px" }}
        src="https://lookerstudio.google.com/embed/reporting/db2d9839-c5d1-4fc2-8e7b-e973f303c290/page/T014D"
      ></iframe>
    </DashboardLayout>
  );
}

export default Dashboard;
