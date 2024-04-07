import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';

const MyHeader = () => {
    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || '';
    const navigate = useNavigate();
    console.log('header');
    return (
        <header>
            <img
                className="head_logo"
                src={process.env.PUBLIC_URL + `/assets/starviewvalley.png`}
                alt="logo"
                onClick={() => navigate('/')}
            />
            <div className="search_info_wrapper">
                <Search />

                <div
                    className="my_info"
                    onClick={() => navigate('/myInfo')}
                >
                    INFO
                </div>
            </div>
        </header>
    );
};
export default React.memo(MyHeader);
