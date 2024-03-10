import { useNavigate } from 'react-router-dom';
import Search from './Search';

const MyHeader = () => {
    const navigate = useNavigate();
    return (
        <header>
            <h1
                className="head_text"
                onClick={() => navigate('/')}
            >
                Starring
            </h1>
            <Search />

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
