import Circle from './components/circle';
import Title from './components/title';
import './App.css';

function App() {

  return (
    <div className="App">
      <Title />
      <Circle color="#EC4E3D" />
      <Circle color="#2E7CF6" />
      <Circle color="#F8CD46" />
      <Circle color="red" />
      <Circle color="green" />
      <Circle color="blue" />
      <Circle color="gray" />
      <Circle color="whitesmoke" />
    </div>
  );
}

export default App;
