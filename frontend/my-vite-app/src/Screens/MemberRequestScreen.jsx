import MemberRequestComponent from '../components/MemberRequestComponent';
import Navbar from '../components/Navbar';
import SideNavbar from '../components/SideNavbar';

function MemberRequestScreen() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideNavbar />
                <div style={{ flex: 1 }}>
                    <MemberRequestComponent />
                </div>
            </div>
        </div>
    );
}

export default MemberRequestScreen;
