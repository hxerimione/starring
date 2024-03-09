const API_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
const Content = ({ poster_path, title }) => {
    // console.log(poster_path);
    return (
        <div className="content">
            {/* 200*300 */}
            <img
                crossOrigin="anonymous"
                src={API_ENDPOINT + poster_path}
                alt={title}
                width="200"
                height="300"
            />
            <p>{title}</p>
        </div>
    );
};
export default Content;
