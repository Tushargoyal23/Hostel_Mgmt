import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './Screen/Home';
import Complain from './Screen/Complain/Complain';
import Response from './Screen/Response';
import Mess from './Screen/Mess';
import Hostel from './Screen/Hostel/Hostel';
import Login from './components/Login';
import Signup from './components/SignUp';
import Complainform from './components/Complainform/Complainform';
import Open from './Screen/Open/Open';
import Rules from './Screen/HostelRules/Rules';
import ResForm from './components/ResForm/ResForm';
import Mycomplain from './Screen/My Complains/Mycomplain';
import Users from './components/Users/Users';
import Fullcomp from './Screen/Full Complain/Fullcomp';
import Additem from './components/addItem/Additem';
import Review from './components/Review/Review';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Open></Open>}></Route>
          <Route exact path='/home' element={<Home></Home>}></Route>
          <Route exact path='/complain' element={<Complain></Complain>}></Route>
          <Route exact path='/response' element={<Response></Response>}></Route>
          <Route exact path='/mess' element={<Mess></Mess>}></Route>
          <Route exact path='/hostel' element={<Hostel></Hostel>}></Route>
          <Route exact path='/login' element={<Login></Login>}></Route>
          <Route exact path='/createuser' element={<Signup></Signup>}></Route>
          <Route exact path='/complainform' element={<Complainform></Complainform>}></Route>
          <Route exact path='/rules' element={<Rules></Rules>}></Route>
          <Route exact path='/resform/:id' element={<ResForm></ResForm>}></Route>
          <Route exact path='/full-comp/:id' element={<Fullcomp></Fullcomp>}></Route>
          <Route exact path='/mycomp' element={<Mycomplain></Mycomplain>}></Route>
          <Route exact path='/users' element={<Users></Users>}></Route>
          <Route exact path='/additem' element={<Additem></Additem>}></Route>
          <Route exact path='/review/:day' element={<Review></Review>}></Route>
          <Route exact path='/aboutus' element={<AboutUs></AboutUs>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
