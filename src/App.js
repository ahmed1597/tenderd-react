import logo from './logo.svg';
import './App.css';
import './firebase/config';
import './pages/Signup';
import { Route , Switch , BrowserRouter } from "react-router-dom";
import Signup from './pages/Signup';
import { UserProvider } from './firebase/UserProvider';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <div className="ui grid container">
            <Switch>
              <Route exact path="/signup" component={Signup}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
    
  );
}

export default App;
