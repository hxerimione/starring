import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import MyFooter from '../components/MyFooter';
import MyHeader from '../components/MyHeader';
// import { useLocation } from 'react-router-dom';

const SearchResult = ({}) => {
    // const location = useLocation();
    // const { search } = location.state || {};
    const [searchParams, setSearchParams] = useSearchParams();
    const [contentList, setContentList] = useState('');
    const keyword = searchParams.get('search');

    useEffect(() => {
        if (keyword) {
            api.getSearch(keyword).then((res) =>
                setContentList(res.data.results)
            );
            console.log(typeof contentList);
        }
    }, [keyword]);

    return (
        <div>
            <MyHeader />
            <div>
                {/* <p>{contentList}</p> */}
                {contentList &&
                    contentList.map((it) => (
                        <div>
                            <p>{it.id}</p>
                            <p>{it.name}</p>
                        </div>
                    ))}
            </div>
            <MyFooter />
        </div>
    );
};
export default SearchResult;
