import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

const MyInfo = ({}) => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || '';
    return (
        <div className="myinfo">
            <MyHeader searchKeyword={'검색어를 입력하세요'} />
            <div className="myinfo_wrapper">
                <section className="myinfo_section">
                    <img
                        src={process.env.PUBLIC_URL + `assets/myimage.jpg`}
                        width="150px"
                    />
                    <h4>장혜림</h4>
                </section>
                <section className="mygraph_section">내 별점 그래프</section>
                <section className="mylist_section">
                    내 평가 목록 최신순
                </section>
            </div>
            <MyFooter />
        </div>
    );
};
export default MyInfo;
