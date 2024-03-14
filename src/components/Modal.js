import { useContext, useEffect, useState } from 'react';
import { api } from '../api';
import { ReviewDispatchContext, ReviewStateContext } from '../App';
import dummy from '../detaildummy.json';
const IMG_ENDPOINT = 'https://image.tmdb.org/t/p/w200';

const Modal = ({ handleModalBtn, contentId, contentMedia }) => {
    const [detail, setDetail] = useState(undefined);
    const reviewList = useContext(ReviewStateContext);
    const { onCreate, onEdit, onRemove } = useContext(ReviewDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const targetReview = reviewList.filter((it) => it.contentId === contentId)[
        '0'
    ];
    console.log(targetReview);
    useEffect(() => {
        // api.getDetail(contentMedia, contentId).then((res) =>
        //     setDetail(res.data)
        // );
        setDetail(dummy);
    }, []);
    console.log(detail);
    return (
        <div className="modal-background">
            <div className="modal">
                <button onClick={handleModalBtn}>x</button>
                <p>pick content : {contentId}</p>
                {/* content api 가져오기 (사진, 제목, 줄거리,..) */}

                {detail && (
                    <div>
                        <section className="content_detail">
                            <img
                                crossOrigin="anonymous"
                                src={IMG_ENDPOINT + detail.poster_path}
                                width="100px"
                            />
                            <p>{detail.title}</p>
                            <p>{detail.overview}</p>
                        </section>
                        {targetReview && (
                            <div className="review">
                                {isEdit ? (
                                    <>
                                        id : {targetReview.id}
                                        <br />
                                        data : {targetReview.date}
                                        <br />
                                        review : {targetReview.review}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                        {!targetReview && <button>후기 작성하기</button>}
                    </div>
                )}

                {/* 후기 있으면 가져오기+edit+remove / 없으면 create */}
            </div>
        </div>
    );
};
export default Modal;
