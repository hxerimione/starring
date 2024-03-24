import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import MyInfo from './pages/MyInfo';
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
} from 'react';
import SearchResult from './pages/SearchResult';

const dummydata = [
    { id: 1, contentId: 278, review: 'review1', star: 2 },
    { id: 2, contentId: 238, review: 'review2', star: 3 },
    { id: 3, contentId: 240, review: 'review3', star: 5 },
    { id: 4, contentId: 19404, review: 'review4', star: 2 },
];

export const ReviewStateContext = createContext();
export const ReviewDispatchContext = createContext();
const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            // newState = [action.data, ...state];
            localStorage.setItem(action.contentId, action.data, action.media);
            break;
        }
        case 'REMOVE': {
            localStorage.removeItem(action.targetId);
            console.log(action.targetId);
            // newState = state.filter((it) => it.id != action.targetId);
            break;
        }
        case 'EDIT': {
            // newState = state.map((it) =>
            //     it.id === action.data.id ? { ...action.data } : it
            // );
            localStorage.removeItem(action.contentId);
            console.log(action.contentId);
            localStorage.setItem(action.contentId, action.data);
            break;
        }
        default:
            return state;
    }
    return newState;
};
function App() {
    useEffect(() => {
        localStorage.setItem(
            278,
            JSON.stringify({
                id: 0,
                review: 'review1',
                star: 2,
                media: 'movie',
            })
        );
        localStorage.setItem(
            238,
            JSON.stringify({
                id: 1,
                review: 'review2',
                star: 2.5,
                media: 'movie',
            })
        );
    }, []);
    const [data, dispatch] = useReducer(reducer, localStorage);

    const dataId = useRef(0);

    // onCreate
    const onCreate = (review, star, contentId, media) => {
        dispatch({
            type: 'CREATE',
            contentId,
            data: JSON.stringify({
                id: dataId.current,
                review,
                star,
                media,
            }),
        });
        dataId.current += 1;
    };
    /* Remove */
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };

    /*onEdit*/
    const onEdit = (targetId, contentId, review, star, media) => {
        dispatch({
            type: 'EDIT',
            contentId,
            data: JSON.stringify({
                id: targetId,
                review,
                star,
                media,
            }),
        });
    };
    return (
        <ReviewStateContext.Provider value={data}>
            <ReviewDispatchContext.Provider
                value={{ onCreate, onEdit, onRemove }}
            >
                <BrowserRouter>
                    <div className="App">
                        <Routes>
                            <Route
                                path="/"
                                element={<Home />}
                            />
                            <Route
                                path="/myInfo"
                                element={<MyInfo />}
                            />
                            <Route
                                path="/result"
                                element={<SearchResult />}
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
            </ReviewDispatchContext.Provider>
        </ReviewStateContext.Provider>
    );
}

export default App;
