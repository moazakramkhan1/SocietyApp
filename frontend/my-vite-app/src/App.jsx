import { HomeRoute, LoginSignupScreenRoute } from "./routes";
import LoginSignupScreen from "./Screens/loginSignupScreen"
import Home from "./Screens/HomeScreen"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <Router>
      <Routes>
        <Route path={LoginSignupScreenRoute} element={<LoginSignupScreen />} />
        <Route path={HomeRoute} element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
