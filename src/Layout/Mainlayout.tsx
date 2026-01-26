import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Mainlayout:React.FC = () => {
  return (
    <div>
        <Header/>
         <Outlet></Outlet>
        <Footer/>
    </div>
  )
}

export default Mainlayout