import React, { useEffect, useState } from 'react';
import dummyData from '../dummyData.json';
import Modal from './Modal';
import Slider from 'react-slick';
import { api } from '../api';

const API_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
const ContentList = () => {
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

    const [tvData, setTvData] = useState('');
    const [movieData, setMovieData] = useState('');

    useEffect(() => {
        api.getTrending('tv').then((res) =>
            setTvData(res.data.results.slice(0, 12))
        );
        api.getTrending('movie').then((res) =>
            setMovieData(res.data.results.slice(0, 12))
        );
    }, []);
    const [modalOpen, setModalOpen] = useState(false);

    const [pick, setPick] = useState(-1);
    const [media, setMedia] = useState('movie');
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    console.log('contentlist');
    return (
        <div className="content_list_wrapper">
            {modalOpen && (
                <Modal
                    handleModalBtn={handleModalOpen}
                    contentId={pick}
                    contentMedia={media} //movie or tv
                />
            )}
            <h2 className="content_head_text">이번주 인기 TV 시리즈</h2>
            <Slider {...settings}>
                {tvData ? (
                    tvData.map((it) => (
                        <div
                            className="content"
                            onClick={() => {
                                setModalOpen(true);
                                setPick(it.id);
                                setMedia('tv');
                            }}
                            key={it.id}
                        >
                            <img
                                src={API_ENDPOINT + it.poster_path}
                                alt={it.title}
                                width="200px"
                                height="290px"
                            />
                            <h4>{it.name}</h4>
                        </div>
                    ))
                ) : (
                    <div className="content">
                        <div
                            style={{
                                width: '200px',
                                height: '200px',
                                background: 'gray',
                            }}
                        ></div>
                    </div>
                )}
            </Slider>
            <h2 className="content_head_text">이번주 인기 영화</h2>
            <Slider {...settings}>
                {movieData ? (
                    movieData.map((it) => (
                        <div
                            className="content"
                            onClick={() => {
                                setModalOpen(true);
                                setPick(it.id);
                                setMedia('movie');
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
                    ))
                ) : (
                    <div className="content">
                        <div
                            style={{
                                width: '200px',
                                height: '290px',
                                background: 'gray',
                            }}
                        ></div>
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default ContentList;
