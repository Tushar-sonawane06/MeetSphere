import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication.jsx';
import {AuthProvider} from './contexts/authContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';

function App(){
    return(
        <div className="App">
            <Router>
                <AuthProvider>                
                    <Routes>
                    {/* <Route path="/home" element*/}
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/auth' element={<Authentication />} />
                        <Route path='/:url'element={<VideoMeetComponent/>}/>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App