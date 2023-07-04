
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import RoutesFile from './RoutesFile';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
     <Header />
     <RoutesFile />
     <Footer />
    </div>
  );
}

export default App;
