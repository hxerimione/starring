import ContentList from '../components/ContentList';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

const Home = ({}) => {
    return (
        <div className="home">
            <MyHeader />

            <ContentList />

            <MyFooter />
        </div>
    );
};
export default Home;
