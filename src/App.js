import './App.css';
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import MyInfo from './pages/MyInfo';
import Edit from './pages/Edit';
import Review from './pages/Review';
function App() {
    const Navigate = useNavigate();
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/new"
                        element={<New />}
                    />
                    <Route
                        path="/myInfo"
                        element={<MyInfo />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<Edit />}
                    />
                    <Route
                        path="/review/:id"
                        element={<Review />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
