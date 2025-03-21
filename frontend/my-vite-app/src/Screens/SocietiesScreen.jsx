import SocietyComponent from "../components/SocietyComponent"
import SideNavbar from "../components/SideNavbar"
import '../styles/SocietiesScreen.css'
import { useSelector } from 'react-redux'
function SocietiesScreen() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="societies-screen">
      <SideNavbar />
      <div className="content">
        <h1 className="page-title">Societies</h1>
        {user?.role === 'admin' &&
          <div className="admin-actions">
            <button className="createSociety-btn">Create Society </button>
            <button className="editSociety-btn">Edit Society </button>
            <button className="DeleteSociety-btn">Delete Society </button>
          </div>}
        <SocietyComponent />
      </div>
    </div>
  );
}

export default SocietiesScreen;