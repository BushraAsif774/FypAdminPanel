import "./ListAdmin.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Admin from "../../components/Admintable/Admin"

const ListAdmin = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Admin/>
      </div>
    </div>
  )
}

export default ListAdmin