import { AboutScreenRoute, HomeRoute, LoginSignupScreenRoute, MemberRequestScreenRoute, SocietiesScreenRoute, SocietyDetailScreenRoute } from "./routes";
import LoginSignupScreen from "./Screens/loginSignupScreen"
import Home from "./Screens/HomeScreen"
import AboutScreen from "./Screens/AboutScreen"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocietiesScreen from "./Screens/SocietiesScreen";
import SocietyDetailsScreen from "./Screens/SocietyDetailsScreen";
import MemberRequestScreen from "./Screens/MemberRequestScreen";
import HomeScreen from "./Screens/HomeScreen";
function App() {

  return (
    <Router>
      <Routes>
        <Route path={LoginSignupScreenRoute} element={<LoginSignupScreen />} />
        <Route path={HomeRoute} element={<Home />} />
        <Route path={AboutScreenRoute} element={<AboutScreen />} />
        <Route path={SocietiesScreenRoute} element={<SocietiesScreen />} />
        <Route path={SocietyDetailScreenRoute} element={<SocietyDetailsScreen />} />
        <Route path={MemberRequestScreenRoute} element={<MemberRequestScreen />} />
        <Route path={HomeRoute} element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App
