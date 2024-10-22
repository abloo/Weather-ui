import './App.css';
import WeatherApp from './Components/WeatherApp';
import AppBarComponent from './Components/Header/AppBarHeader';

function App() {
  return (
    <div className="App">
      <AppBarComponent/>
      <WeatherApp/>
    </div>
  );
}

export default App;
