import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value);
    };
    const onSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/result?search=${search}`);
            // navigate('/result', { state: { search: search } });
        }
    };
    return (
        <input
            className="search_keyword"
            type="text"
            value={search}
            onChange={onChange}
            onKeyDown={onSearch}
            placeholder="검색어를 입력하세요"
        />
    );
};
export default Search;
