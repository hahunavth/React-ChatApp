import "./App.css";
import Login from "./components/Login";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";
import { Provider } from "react-redux";
import store from "./Store";
import MemberListModal from "./components/Modals/MemberListModal";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route component={Login} path="/react_chat-app/login" />
              <Route component={ChatRoom} path="/react_chat-app" exact />
              <Route path="/">
                <Redirect to="/react_chat-app" />
              </Route>
            </Switch>
            <AddRoomModal />
            <InviteMemberModal />
            <MemberListModal />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
