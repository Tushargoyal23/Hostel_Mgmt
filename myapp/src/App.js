import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './Screen/Home';
import Complain from './Screen/Complain';
import Response from './Screen/Response';
import Mess from './Screen/Mess';
import Hostel from './Screen/Hostel';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/complain' element={<Complain></Complain>}></Route>
          <Route exact path='/response' element={<Response></Response>}></Route>
          <Route exact path='/mess' element={<Mess></Mess>}></Route>
          <Route exact path='/hostel' element={<Hostel></Hostel>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
