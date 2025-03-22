import { AboutScreenRoute, HomeRoute, LoginSignupScreenRoute, SocietiesScreenRoute, SocietyDetailScreenRoute } from "./routes";
import LoginSignupScreen from "./Screens/loginSignupScreen"
import Home from "./Screens/HomeScreen"
import AboutScreen from "./Screens/AboutScreen"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SocietiesScreen from "./Screens/SocietiesScreen";
import SocietyDetailsScreen from "./Screens/SocietyDetailsScreen";
function App() {

  return (
    <Router>
      <Routes>
        <Route path={LoginSignupScreenRoute} element={<LoginSignupScreen />} />
        <Route path={HomeRoute} element={<Home />} />
        <Route path={AboutScreenRoute} element={<AboutScreen />} />
        <Route path={SocietiesScreenRoute} element={<SocietiesScreen />} />
        <Route path={SocietyDetailScreenRoute} element={<SocietyDetailsScreen />} />
      </Routes>
    </Router>
  )
}

export default App
