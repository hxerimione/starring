import React, { useContext, useEffect, useRef, useState } from 'react';
import { api } from '../api';
import { Rating } from '@mui/material';
import { ReviewDispatchContext, ReviewStateContext } from '../App';
import { MDBContainer, MDBRating } from 'mdbreact';
import dummy from '../detaildummy.json';
const IMG_ENDPOINT = 'https://image.tmdb.org/t/p/w200';

const Modal = ({ handleModalBtn, contentId, contentMedia }) => {
    const [detail, setDetail] = useState(undefined);
    const reviewList = useContext(ReviewStateContext);
    const { onCreate, onEdit, onRemove } = useContext(ReviewDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const targetReview = reviewList.filter((it) => it.contentId === contentId)[
        '0'
    ];
    const [editReview, setEditReview] = useState(targetReview.review);
    const [editStar, setEditStar] = useState(targetReview.star);
    const reviewInput = useRef();
    const [state, setState] = useState({
        review: '',
        star: 0,
        contentId: contentId,
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setIsEdit(false);
        if (editReview.length < 5) {
            alert('다섯글자이상');
            return;
        }
        onEdit(targetReview.id, contentId, editReview, editStar);
    };
    const handleSubmit = () => {
        if (state.review.length < 5) {
            alert('리뷰는 다섯글자 이상으로 입력해주세요');
            reviewInput.current.focus();
            return;
        }
        //데이터 저장 (추가해줘야함)
        // date, contentId, review, star
        onCreate(state.review, state.star, state.contentId);

        setState({
            review: '',
            star: 0,
            contentId: contentId,
        });
        alert('저장 성공!!!!');
    };
    useEffect(() => {
        // api.getDetail(contentMedia, contentId).then((res) =>
        //     setDetail(res.data)
        // );
        setDetail(dummy);
    }, []);

    console.log(reviewList);
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
                                    // 리뷰 있는데 수정할 때
                                    <>
                                        <textarea
                                            value={editReview}
                                            onChange={(e) =>
                                                setEditReview(e.target.value)
                                            }
                                        />
                                        <Rating
                                            name="star"
                                            value={Number(editStar)}
                                            precision={0.5}
                                            // onChange={handleChangeState}
                                            onChange={(event, newValue) => {
                                                setEditStar(newValue);
                                            }}
                                        />
                                        <button onClick={handleEdit}>
                                            수정 완료
                                        </button>
                                        <button>취소</button>
                                    </>
                                ) : (
                                    // 리뷰 있고 수정안할 떄
                                    <>
                                        id : {targetReview.id}
                                        <br />
                                        star : {targetReview.star}
                                        <br />
                                        review : {targetReview.review}
                                        <br />
                                        <button
                                            onClick={() => {
                                                setIsEdit(true);
                                            }}
                                        >
                                            수정하기
                                        </button>
                                        <button>삭제하기</button>
                                    </>
                                )}
                            </div>
                        )}
                        {!targetReview && (
                            <div className="create-review">
                                {isNew ? (
                                    // 새 리뷰 작성
                                    <>
                                        <p>후기</p>
                                        <input
                                            ref={reviewInput}
                                            name="review"
                                            value={state.review}
                                            onChange={handleChangeState}
                                        />
                                        <Rating
                                            name="star"
                                            // name="half-rating"
                                            value={Number(state.star)}
                                            precision={0.5}
                                            onChange={handleChangeState}
                                            // onChange={(event, newValue) => {
                                            //     handleChangeState(newValue);
                                            // }}
                                        />
                                        <div>
                                            <button onClick={handleSubmit}>
                                                일기 저장
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // 후기 작성버튼
                                    <>
                                        <button
                                            onClick={() => {
                                                setIsNew(true);
                                            }}
                                        >
                                            후기 작성하기
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Modal;
