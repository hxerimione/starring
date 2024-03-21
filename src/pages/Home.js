import ContentList from '../components/ContentList';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

const Home = ({}) => {
    return (
        <div className="home">
            <MyHeader />

            <ContentList contentHeadText={'추천 작품'} />
            {/* <ContentList contentHeadText={'추천 영화'} />
            <ContentList contentHeadText={'추천 드라마'} /> */}
            <MyFooter />
        </div>
    );
};
export default Home;
