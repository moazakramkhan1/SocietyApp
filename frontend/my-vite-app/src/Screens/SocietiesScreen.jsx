import SocietyComponent from "../components/SocietyComponent"
import SideNavbar from "../components/SideNavbar"
import '../styles/SocietiesScreen.css'
function SocietiesScreen() {
    return (
        <div className="societies-screen">
          <SideNavbar />
          <div className="content">
            <h1 className="page-title">Societies</h1>
            <SocietyComponent />
          </div>
        </div>
      );
}

export default SocietiesScreen;