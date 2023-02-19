import "./Listnormaluser.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Normaluser from "../../components/Normalusertable/Normaluser"

const Listnormaluser = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Normaluser/>
      </div>
    </div>
  )
}

export default Listnormaluser