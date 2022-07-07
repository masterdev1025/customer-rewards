import RewardsTable from './components/RewardsTable';
import './App.css';
import { configureFakeBackend } from './utils/helpers';
configureFakeBackend();

function App() {
  return (
    <div className="App">
      <RewardsTable/>
    </div>
  );
}

export default App;
