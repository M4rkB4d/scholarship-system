
import './App.css';
import NavBar from './components/NavBar';

const useStyles = () => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#e0e0e0"
  }
});

function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
