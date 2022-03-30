import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header'
import AddressCall from './components/AddressCall'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/address" element={<AddressCall />} />
     </Routes>
    </div>
  );
}

export default App;
