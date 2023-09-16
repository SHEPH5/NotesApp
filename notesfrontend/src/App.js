import Header from "./components/Header";
import NotePage from "./pages/NotePage";
import './App.css'
import NoteListPage from "./pages/NotesListPage";
import {BrowserRouter as Router, Link , Route, Routes} from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from './utils/PrivateRouter';
import {AuthContext, AuthProvider} from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoutes/>}>
                <Route path='/' exact element={ <> <Header /> <NoteListPage/> </> }/>
                <Route path="/note/:id/" element={ <> <Header/> <NotePage/> </>  } />
              </Route>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage />}/>
            </Routes>
          </AuthProvider>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
