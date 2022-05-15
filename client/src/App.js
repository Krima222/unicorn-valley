import './App.css';
import FormPage from './component/pages/formPage/formPage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Registration from './component/registration/registration';
import Login from './component/login/login'
import Header from './component/header/header';

function App() {
  return (
    <Router>
        <Routes>
            <Route path='/form' element={<FormPage/>}>
                <Route path='registration' element={<Registration/>}/>
                <Route path='login' element={<Login/>}/>
            </Route>
            <Route path='/homepage' element={<Header/>}/>
        </Routes>
    </Router>
  );
}

export default App;
