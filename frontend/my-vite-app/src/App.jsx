import { AboutScreenRoute, HomeRoute, LoginSignupScreenRoute, SocietiesScreenRoute, SocietyDetailsScreenRoute } from "./routes";
import LoginSignupScreen from "./Screens/loginSignupScreen"
import Home from "./Screens/HomeScreen"
import AboutScreen from "./Screens/AboutScreen"
import SocietyDetailsScreen from "./Screens/SocietyDetailsScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocietiesScreen from "./Screens/SocietiesScreen";
function App() {

  return (
    <Router>
      <Routes>
        <Route path={LoginSignupScreenRoute} element={<LoginSignupScreen />} />
        <Route path={HomeRoute} element={<Home />} />
        <Route path={AboutScreenRoute} element={<AboutScreen />} />
        <Route path={SocietiesScreenRoute} element={<SocietiesScreen />} />
        <Route path={SocietyDetailsScreenRoute} element={<SocietyDetailsScreen />} />
      </Routes>
    </Router>
  )
}

export default App
