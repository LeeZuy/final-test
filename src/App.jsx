import './App.css'
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeScreen />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
