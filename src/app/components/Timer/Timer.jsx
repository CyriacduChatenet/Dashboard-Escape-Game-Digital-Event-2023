import { useEffect, useState } from 'react';
import './timer.css';

const Timer = ({session}) => {
    const [time, setTime] = useState(null)

    const parseTime = (result) => {
        if(result < 10) {
            result = '0' + result
        }
        return result
    }

    const getSessionTime = (data) => {
        const sessionTime = data.map((session) => {
            if(session.fields['Status'] === "open"){
                return session.fields['Heure fin']
            }
        })
        const sessionTimeLeft = Date.parse(sessionTime[0]) - Date.now()

        if(sessionTimeLeft < 0) {
            return "00:00:00"
        }

        const sessionTimeHours = Math.floor((sessionTimeLeft / (1000 * 60 * 60)))
        const sessionTimeMinutes = Math.floor((sessionTimeLeft / 1000 / 60) % 60)
        const sessionTimeSeconds = Math.floor((sessionTimeLeft / 1000) % 60)

        const sessionTimeHoursParse = parseTime(sessionTimeHours)
        const sessionTimeMinutesParse = parseTime(sessionTimeMinutes)
        const sessionTimeSecondsParse = parseTime(sessionTimeSeconds)

        return `${sessionTimeHoursParse}:${sessionTimeMinutesParse}:${sessionTimeSecondsParse}`
    }
    useEffect(() => {
        setTime(getSessionTime(session))
    }, [session])
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