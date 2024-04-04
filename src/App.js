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
import MyHeader from './components/MyHeader';

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
            localStorage.setItem(action.contentId, action.data, action.media);
            break;
        }
        default:
            return state;
    }
    return newState;
};
function App() {
    localStorage.setItem(
        278,
        JSON.stringify({
            id: 0,
            review: '쇼생크탈출 재밌어요',
            star: 4,
            media: 'movie',
        })
    );
    localStorage.setItem(
        238,
        JSON.stringify({
            id: 1,
            review: '대부 최고',
            star: 2.5,
            media: 'movie',
        })
    );
    // useEffect(() => {
    //     localStorage.setItem(
    //         278,
    //         JSON.stringify({
    //             id: 0,
    //             review: '쇼생크탈출 재밌어요',
    //             star: 4,
    //             media: 'movie',
    //         })
    //     );
    //     localStorage.setItem(
    //         238,
    //         JSON.stringify({
    //             id: 1,
    //             review: '대부 최고',
    //             star: 2.5,
    //             media: 'movie',
    //         })
    //     );
    // }, []);
    const [data, dispatch] = useReducer(reducer, localStorage);

    const dataId = useRef(2);

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
        // <ReviewStateContext.Provider value={data}>
        <ReviewDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
            <BrowserRouter>
                <div className="App">
                    <MyHeader />
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
        // </ReviewStateContext.Provider>
    );
}

export default App;
