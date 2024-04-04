import React from 'react';
import ContentList from '../components/ContentList';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';

const Home = ({}) => {
    return (
        <div className="home">
            <ContentList />
        </div>
    );
};
export default React.memo(Home);
