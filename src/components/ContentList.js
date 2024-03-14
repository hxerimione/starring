import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Content from './Content';
import MyButton from './MyButton';
import dummyData from '../dummyData.json';
import Modal from './Modal';

const API_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
const ContentList = ({ contentHeadText }) => {
    // api 받아와서 데이터 띄워주기
    const dummy = dummyData;
    const [data, setData] = useState(dummy);
    const [slideMy, setSlideMy] = useState(0);
    const [slidePopular, setSlidePopular] = useState(0);
    const [slideTrending, setSlideTreding] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const [pick, setPick] = useState(-1);
    const [media, setMedia] = useState('movie');
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        setData(dummy.slice(0, 12));
    }, []);
    const toPrev = () => {
        slideMy < 0 && setSlideMy(slideMy + 660);
    };
    const toNext = () => {
        slideMy > -1200 && setSlideMy(slideMy - 660);
    };
    // console.log(data);
    return (
        <div className="content_list_wrapper">
            <h2 className="content_head_text">{contentHeadText}</h2>
            {modalOpen && (
                <Modal
                    handleModalBtn={handleModalOpen}
                    contentId={pick}
                    contentMedia={media} //movie or tv
                />
            )}
            <div
                className="content_list content_list_my"
                style={{
                    width: `100%`,
                    transform: `translateX(${slideMy}px)`,
                    transition: '0.5s ease',
                }}
            >
                {data.map((it) => (
                    <div
                        style={{ padding: '10px' }}
                        onClick={() => {
                            setModalOpen(true);
                            setPick(it.id);
                        }}
                        key={it.id}
                    >
                        <img
                            src={API_ENDPOINT + it.poster_path}
                            alt={it.title}
                            width="200"
                            height="300"
                        />
                        <h4>{it.title}</h4>
                    </div>
                    // <Content
                    //     key={it.id}
                    //     poster_path={it.poster_path}
                    //     title={it.title}
                    // />
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
        </div>
    );
};
export default ContentList;
