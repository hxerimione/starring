import React from 'react';

const MyFooter = ({}) => {
    console.log('footer');
    return (
        <footer>
            <div className="footer-line"></div>
            <nav>
                <a
                    href="https://velog.io/@hxerimione"
                    target="_blank"
                >
                    Blog
                </a>{' '}
                <a
                    href="https://github.com/hxerimione"
                    target="_blank"
                >
                    Github
                </a>
            </nav>
            <p>
                <span>저자 : hxerimione</span>
                <br />
                <span>이메일 : purejang98@gmail.com</span>
                <br />
                <span>Copyright 2024. hxerimione. All Rights Reserved.</span>
            </p>
        </footer>
    );
};

export default React.memo(MyFooter);
