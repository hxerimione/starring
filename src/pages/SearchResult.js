import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import { api } from '../api';
import Modal from '../components/Modal';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
// import { useLocation } from 'react-router-dom';
const API_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
const SearchResult = ({}) => {
    // const location = useLocation();
    // const { search } = location.state || {};
    const [searchParams, setSearchParams] = useSearchParams();
    const [contentList, setContentList] = useState('');
    const keyword = searchParams.get('search');
    const [modalOpen, setModalOpen] = useState(false);
    const [media, setMedia] = useState('movie');
    const [pick, setPick] = useState(-1);
    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        if (keyword) {
            api.getSearch(keyword).then((res) =>
                setContentList(res.data.results)
            );
        }
        console.log('search');
    }, [keyword]);

    console.log(contentList);
    return (
        <div>
            <MyHeader />
            <div className="search_wrapper">
                {modalOpen && (
                    <Modal
                        handleModalBtn={handleModalOpen}
                        contentId={pick}
                        contentMedia={media} //movie or tv
                    />
                )}
                {contentList &&
                    contentList.map((it) => (
                        <div
                            className="search_content"
                            key={it.id}
                            onClick={() => {
                                setModalOpen(true);
                                setPick(it.id);
                                setMedia(it.media_type);
                            }}
                        >
                            <img
                                src={API_ENDPOINT + it.poster_path}
                                alt={it.title}
                                width="200px"
                                height="290px"
                            />
                        </div>
                    ))}
            </div>
            <MyFooter />
        </div>
    );
};
export default SearchResult;
