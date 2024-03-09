import { useEffect, useState } from 'react';
import { api } from '../api';
import Content from './Content';
import MyButton from './MyButton';
import dummyData from '../dummyData.json';
const ContentList = ({ contentHeadText }) => {
    // api 받아와서 데이터 띄워주기
    const dummy = dummyData;
    const [data, setData] = useState(dummy);
    const [slideMy, setSlideMy] = useState(0);
    const [slidePopular, setSlidePopular] = useState(0);
    const [slideTrending, setSlideTreding] = useState(0);
    useEffect(() => {
        // api.getPopular('tv').then((res) => {
        //     console.log(res);
        //     setData(res.data.results.slice(0, 12));
        // });
        setData(dummy.slice(0, 12));
    }, []);
    const toPrev = () => {
        slideMy < 0 && setSlideMy(slideMy + 660);
    };
    const toNext = () => {
        slideMy > -1200 && setSlideMy(slideMy - 660);
    };
    console.log(data);
    return (
        <div className="content_list_wrapper">
            <h2 className="content_head_text">{contentHeadText}</h2>
            <div
                className="content_list content_list_my"
                style={{
                    width: `100%`,
                    transform: `translateX(${slideMy}px)`,
                    transition: '0.5s ease',
                }}
            >
                {data.map((it) => (
                    <Content
                        key={it.id}
                        poster_path={it.poster_path}
                        title={it.title}
                    />
                ))}
            </div>
            <div className="button_container">
                <MyButton
                    text={'<'}
                    type="prev"
                    onClick={toPrev}
                    style={{ display: slideMy === 0 ? 'none' : '' }}
                />
                <MyButton
                    text={'>'}
                    type="next"
                    onClick={toNext}
                    style={{ display: slideMy === -1200 ? 'none' : '' }}
                />
            </div>
            <h2 className="content_head_text">{contentHeadText}</h2>
            <div
                className="content_list content_list__popular"
                style={{
                    width: `100%`,
                    transform: `translateX(${slidePopular}px)`,
                    transition: '0.5s ease',
                }}
            >
                {data.map((it) => (
                    <Content
                        key={it.id}
                        poster_path={it.poster_path}
                        title={it.title}
                    />
                ))}
            </div>
            <div className="button_container">
                <MyButton
                    text={'<'}
                    type="prev"
                    onClick={toPrev}
                    style={{ display: slidePopular === 0 ? 'none' : '' }}
                />
                <MyButton
                    text={'>'}
                    type="next"
                    onClick={toNext}
                    style={{ display: slidePopular === -1200 ? 'none' : '' }}
                />
            </div>
            <h2 className="content_head_text">{contentHeadText}</h2>
            <div
                className="content_list content_list_trending"
                style={{
                    width: `100%`,
                    transform: `translateX(${slideTrending}px)`,
                    transition: '0.5s ease',
                }}
            >
                {data.map((it) => (
                    <Content
                        key={it.id}
                        poster_path={it.poster_path}
                        title={it.title}
                    />
                ))}
            </div>
            <div className="button_container">
                <MyButton
                    text={'<'}
                    type="prev"
                    onClick={toPrev}
                    style={{ display: slideTrending === 0 ? 'none' : '' }}
                />
                <MyButton
                    text={'>'}
                    type="next"
                    onClick={toNext}
                    style={{ display: slideTrending === -1200 ? 'none' : '' }}
                />
            </div>
        </div>
    );
};
export default ContentList;
