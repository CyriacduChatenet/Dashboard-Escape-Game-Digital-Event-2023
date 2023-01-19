import './timer.css';

const Timer = () => {
    return (
        <div className="timer">
            {
                time == undefined
                ? <p className="time">00:00:00</p> 
                : <p className="time">{time}</p>
            }

        </div>
    );
}

export default Timer;