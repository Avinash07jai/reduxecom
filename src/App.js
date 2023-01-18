import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import Cards from './component/Cards';
import CardsDetail from './component/CardsDetail';


function App() {
  return (
    <div className="App">
    <Header />
    <Routes>
      <Route path='/' element={<Cards />} />
        <Route path='/cart/:id' element={<CardsDetail />} />
    </Routes>
    </div>
  );
}

export default App;
