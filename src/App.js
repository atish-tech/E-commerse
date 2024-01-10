import './App.css';
import Login from './Component/Auth/Login';
import { Register } from './Component/Auth/Register';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
