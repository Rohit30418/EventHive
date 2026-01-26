import Footer from "./Footer"
import Header from "./Header"
import OrgniserDashboard from "./OrganizerAdmin/OrganizerDashboard"
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard"

const MainDashboard = () => {
  return (
    <div>
      <Header></Header>
      <OrgniserDashboard></OrgniserDashboard>
      <SuperAdminDashboard></SuperAdminDashboard>
      <Footer></Footer>
    </div>
  )
}

export default MainDashboard