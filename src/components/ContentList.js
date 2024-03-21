import React, { useEffect, useState } from 'react';
import { api } from '../api';
import Content from './Content';
import MyButton from './MyButton';
import dummyData from '../dummyData.json';
import Modal from './Modal';
import Slider from 'react-slick';

const API_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
const ContentList = ({ contentHeadText }) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                },
            },
            {
                breakpoint: 1210,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 835,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    // api 받아와서 데이터 띄워주기
    const dummy = dummyData;
    const [data, setData] = useState(dummy);
    const [modalOpen, setModalOpen] = useState(false);

    const [pick, setPick] = useState(-1);
    const [media, setMedia] = useState('movie');
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        setData(dummy.slice(0, 12));
    }, []);

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

            <Slider {...settings}>
                {data.map((it) => (
                    <div
                        className="content"
                        onClick={() => {
                            setModalOpen(true);
                            setPick(it.id);
                        }}
                        key={it.id}
                    >
                        <img
                            src={API_ENDPOINT + it.poster_path}
                            alt={it.title}
                            width="200px"
                            height="290px"
                        />
                        <h4>{it.title}</h4>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
export default ContentList;
