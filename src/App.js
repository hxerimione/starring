import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import MyInfo from './pages/MyInfo';
import Edit from './pages/Edit';
import Review from './pages/Review';
import { createContext, useContext, useReducer, useRef } from 'react';

const dummydata = [
    { id: 1, contentId: 278, date: 1709189151220, review: 'review1' },
    { id: 2, contentId: 238, date: 1709189151320, review: 'review2' },
    { id: 3, contentId: 240, date: 1709189151420, review: 'review3' },
    { id: 4, contentId: 19404, date: 1709189151520, review: 'review4' },
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
            newState = [action.data, ...state];
            break;
        }
        case 'REMOVE': {
            newState = state.filter((it) => it.id != action.targetId);
            break;
        }
        case 'EDIT': {
            newState = state.map((it) =>
                it.id === action.data.id ? { ...action.data } : it
            );
            break;
        }
        default:
            return state;
    }
    return newState;
};
function App() {
    const [data, dispatch] = useReducer(reducer, dummydata);

    const dataId = useRef(0);

    // onCreate
    const onCreate = (date, review, star) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                review,
                star,
            },
        });
        dataId.current += 1;
    };
    /* Remove */
    const onRemove = (targetId) => {
        dispatch({ type: 'REMOVE', targetId });
    };

    /*onEdit*/
    const onEdit = (targetId, date, review, star) => {
        dispatch({
            type: 'EDIT',
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                review,
                star,
            },
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
                                path="/new/:id"
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
            </ReviewDispatchContext.Provider>
        </ReviewStateContext.Provider>
    );
}

export default App;
