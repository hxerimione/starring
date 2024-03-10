import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value);

        if (e.key == 'Enter') {
            console.log(search);
        }
    };
    return (
        <input
            className="search_keyword"
            type="text"
            value={search}
            onChange={onChange}
            placeholder="검색어를 입력하세요"
        />
    );
};
export default Search;
