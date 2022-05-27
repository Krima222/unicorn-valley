import { useState, useEffect } from 'react';
import FormPage from './component/pages/formPage/formPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Registration from './component/registration/registration';
import Login from './component/login/login';
import Homepage from './component/pages/homePage/homePage';
import idContext from './component/idContext/idContext';
import './app.scss';

function App() {
  const [{token}] = useCookies(['token']);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  const getId = () => {
    setLoading(true)
    fetch('http://localhost:5000/autification', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res.json()).then(data => {
        if (data.id) {
            setId(data.id);
        } else {
            console.log(data);
        }
        setLoading(false);
    })
  }
  useEffect(() => {
    getId()
  }, [token])

  return (
      <idContext.Provider value={id}>
          <Router>
                {!loading ? <Routes>
                    <Route path='/form' element={<FormPage/>}>
                        <Route path='registration' element={<Registration/>}/>
                        <Route path='login' element={<Login/>}/>
                    </Route>
                    <Route path='/' element={id ? <Navigate to="/homepage/courses"/> : <Navigate to="/form/login"/>}/>
                    <Route path='/homepage/*' element={id ? <Homepage/> : <Navigate to="/form/login"/>}/>
                </Routes> : null}
        </Router>
      </idContext.Provider>
  );
}

export default App;
