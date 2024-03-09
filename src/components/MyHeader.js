import { useNavigate } from 'react-router-dom';

const MyHeader = ({ searchKeyword }) => {
    const navigate = useNavigate();
    return (
        <header>
            <h1
                className="head_text"
                onClick={() => navigate('/')}
            >
                Starring
            </h1>
            <input
                type="text"
                className="search_keyword"
                placeholder={searchKeyword}
            />
            <div
                className="my_info"
                onClick={() => navigate('/myInfo')}
            >
                info
            </div>
        </header>
    );
};
export default MyHeader;
