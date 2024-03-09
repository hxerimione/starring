import ContentList from '../components/ContentList';
import MyHeader from '../components/MyHeader';

const Home = ({}) => {
    return (
        <div className="home">
            <MyHeader searchKeyword={'검색어를 입력하세요'} />
            <ContentList contentHeadText={'추천 작품'} />
            {/* <ContentList contentHeadText={'추천 영화'} />
            <ContentList contentHeadText={'추천 드라마'} /> */}
        </div>
    );
};
export default Home;
