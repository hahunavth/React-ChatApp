import "./App.css";
import Login from "./components/Login";
import {
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  HashRouter,
} from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
import { Provider } from "react-redux";
import store from "./Store";
import MemberListModal from "./components/Modals/MemberListModal";
// import ThemeProvider from "./Context/ThemeProvider";
import { useState, useContext } from "react";
import { colorScheme, ThemeContext } from "./Context/ThemeProvider";
import { AuthContext } from "./Context/AuthProvider";
import { ThemeProvider } from "styled-components";
import PrivateRoute from "./components/PrivateRoute";

function ThemeBtn({ theme, setTheme }) {
  const handleClick = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return <button onClick={handleClick}>Change theme</button>;
}

function App() {
  const [theme, setTheme] = useState("light");
  // const { user } = useContext(AuthContext);

  return (
    <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <AppProvider>
            {/* <ThemeContext.Provider value={colorScheme[theme]}> */}
            <ThemeProvider theme={colorScheme[theme]}>
              <>
                <ThemeBtn theme={theme} setTheme={setTheme} />
                <Switch>
                  <Route component={Login} path="/react_chat-app/login" />
                  <PrivateRoute
                    component={ChatRoom}
                    path="/react_chat-app"
                    exact
                  />
                  {/* <Route path="/">
                    <Redirect to="/react_chat-app" />
                  </Route> */}
                  <Route path="*">
                    <Redirect to="/react_chat-app" />
                  </Route>
                </Switch>
                <AddRoomModal />
                <InviteMemberModal />
                <MemberListModal />
              </>
              {/* </ThemeContext.Provider> */}
            </ThemeProvider>
          </AppProvider>
        </AuthProvider>
      </HashRouter>
    </Provider>
  );
}

export default App;
