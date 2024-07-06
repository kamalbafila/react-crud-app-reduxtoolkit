import { Provider } from "react-redux";
import "./App.css";
import DataGridDemo from "./components/DataGridDemo";
import { ConfirmProvider } from "material-ui-confirm";

function App() {
  return (
    <div className="App">
      <ConfirmProvider>
        <h1>Redux App</h1>
        <DataGridDemo></DataGridDemo>
      </ConfirmProvider>
    </div>
  );
}

export default App;
