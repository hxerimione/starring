const MyButton = ({ text, type, onClick }) => {
    const btnType = ['prev', 'next'].includes(type) ? type : 'prev';
    return (
        <button
            className={['MyButton', `Mybutton_${type}`].join(' ')}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
MyButton.defaultProps = {
    type: 'prev',
};
export default MyButton;
