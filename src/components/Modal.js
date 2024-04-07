import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { api } from '../api';
import { Rating } from '@mui/material';
import { ReviewDispatchContext, ReviewStateContext } from '../App';
import StarRating from './StarRating';

const IMG_ENDPOINT = 'https://image.tmdb.org/t/p/w200';

const Modal = ({ handleModalBtn, contentId, contentMedia }) => {
    const [detail, setDetail] = useState(undefined);
    // const reviewList = useContext(ReviewStateContext);
    const { onCreate, onEdit, onRemove } = useContext(ReviewDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const targetReview = JSON.parse(localStorage.getItem(contentId));
    const reviewInput = useRef();
    const [star, setStar] = useState(targetReview ? targetReview.star : 0);
    const [state, setState] = useState(
        targetReview
            ? {
                  review: targetReview.review,
                  contentId: contentId,
                  contentMedia: contentMedia,
              }
            : {
                  review: '',
                  contentId: contentId,
                  contentMedia: contentMedia,
              }
    );
    console.log(targetReview);
    useEffect(() => {
        if (targetReview) {
            onEdit(
                targetReview.id,
                contentId,
                targetReview.review,
                star,
                contentMedia
            );
        } else if (star > 0) {
            onCreate(state.review, star, state.contentId, state.contentMedia);
        }
        console.log('edit star', star);
    }, [star]);
    const handleChangeStar = useCallback((e) => {
        setStar(Number(e.target.value));
        onEdit(targetReview.id, contentId, state.review, star, contentMedia);
        console.log('handleChangeStar');
    }, []);
    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        console.log('handleChangeState');
    };

    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(contentId);
        }

        setIsNew(false);
    };
    const handleEdit = () => {
        setIsEdit(false);
        if (state.review.length < 5) {
            alert('다섯글자 이상으로 작성하세요');
            return;
        }
        onEdit(targetReview.id, contentId, state.review, star, contentMedia);
    };
    const handleSubmit = () => {
        if (state.review.length < 5) {
            alert('리뷰는 다섯글자 이상으로 입력해주세요');
            reviewInput.current.focus();
            return;
        }
        //데이터 저장 (추가해줘야함)
        // date, contentId, review, star
        onCreate(state.review, star, state.contentId, state.contentMedia);

        setState({
            review: '',

            contentId: contentId,
            contentMedia: contentMedia,
        });
        setStar(0);
        alert('저장하였습니다.');
    };
    useEffect(() => {
        api.getDetail(contentMedia, contentId).then((res) => {
            setDetail(res.data);
        });
    }, []);

    return (
        <div className="modal-background">
            <div className="modal">
                <button
                    className="modal_close_btn"
                    onClick={handleModalBtn}
                >
                    x
                </button>

                {/* content api 가져오기 (사진, 제목, 줄거리,..) */}

                {detail && (
                    <div>
                        <div className="content_detail">
                            <section className="poster_wrapper">
                                <img
                                    className="content_poster"
                                    // crossOrigin="anonymous"
                                    src={IMG_ENDPOINT + detail.poster_path}
                                />
                            </section>
                            <section className="content_description">
                                {detail.name ? (
                                    <h3>{detail.name}</h3>
                                ) : (
                                    <h3>{detail.title}</h3>
                                )}
                                {detail.last_air_date ? (
                                    <b>{detail.last_air_date}</b>
                                ) : (
                                    <b>{detail.release_date}</b>
                                )}

                                {detail.genres.map((it) => (
                                    <p key={it.id}>{it.name}</p>
                                ))}
                                <i className="detail_descriition">
                                    {detail.overview}
                                </i>
                            </section>
                        </div>
                        {targetReview && (
                            <div className="review_wrapper">
                                {/* <Rating
                                    className="star"
                                    value={Number(star)}
                                    defaultValue={0}
                                    precision={0.5}
                                    onChange={handleChangeStar}
                                /> */}
                                <StarRating
                                    star={star}
                                    onChange={handleChangeStar}
                                />
                                {isEdit ? (
                                    // 리뷰 있는데 수정할 때
                                    <>
                                        <textarea
                                            value={state.review}
                                            onChange={(e) => {
                                                setState({
                                                    ...state,
                                                    review: e.target.value,
                                                });
                                            }}
                                        />

                                        <button
                                            className="edit_btn"
                                            onClick={handleEdit}
                                        >
                                            수정 완료
                                        </button>
                                        <button className="cancel_btn">
                                            취소
                                        </button>
                                    </>
                                ) : (
                                    // 리뷰 있고 수정안할 떄
                                    <div>
                                        <p className="review">
                                            {targetReview.review}
                                        </p>
                                        <button
                                            className="edit_btn"
                                            onClick={() => {
                                                setIsEdit(true);
                                            }}
                                        >
                                            수정하기
                                        </button>
                                        <button
                                            className="delete_btn"
                                            onClick={handleDelete}
                                        >
                                            삭제하기
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!targetReview && (
                            <div className="create_review">
                                {/* <Rating
                                    className="star"
                                    value={Number(star)}
                                    defaultValue={0}
                                    precision={0.5}
                                    onChange={handleChangeStar}
                                /> */}
                                <StarRating
                                    star={star}
                                    onChange={handleChangeStar}
                                />
                                {isNew ? (
                                    // 새 리뷰 작성
                                    <>
                                        <textarea
                                            className="review_input"
                                            ref={reviewInput}
                                            name="review"
                                            value={state.review}
                                            onChange={(e) =>
                                                setState({
                                                    ...state,
                                                    [e.target.name]:
                                                        e.target.value,
                                                })
                                            }
                                        />

                                        <div>
                                            <button
                                                className="save_btn"
                                                onClick={handleSubmit}
                                            >
                                                후기 저장
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // 후기 작성버튼
                                    <>
                                        <button
                                            className="write_btn"
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
export default React.memo(Modal);
