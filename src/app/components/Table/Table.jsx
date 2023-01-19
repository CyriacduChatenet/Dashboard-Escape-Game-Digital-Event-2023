import { useEffect } from 'react';
import './table.css';

const Table = ({sessions}) => {

  const parseTime = (result) => {
    if(result < 10) {
        result = '0' + result
    }
    return result
  }

  const getTime = (dataTime) => {
    const sessionTime = new Date(dataTime)
    const sessionTimeHours = sessionTime.getHours()
    const sessionTimeMinutes = sessionTime.getMinutes()

    const sessionTimeHoursParse = parseTime(sessionTimeHours)
    const sessionTimeMinutesParse = parseTime(sessionTimeMinutes)

    return `${sessionTimeHoursParse}:${sessionTimeMinutesParse}`
  }
  return (
    <table className="tg">
    <thead>
      <tr>
        <th className="tg-0pky">Prochaines sessions :</th>
        <th className="tg-0pky">Nombre d'inscrits :</th>
      </tr>
    </thead>
    <tbody>
      {
        sessions.map((session) => {
          if(session.fields['Status'] === "closed" && Date.parse(session.fields['Heure début']) > Date.now()){
            return (
              <tr>
                <td className="tg-0pky">{getTime(session.fields['Heure début'])}</td>
                {session.fields.User == undefined ? <td className="tg-0pky">0 / 12</td> : <td className="tg-0pky">{session.fields['User']?.length} / 12</td>}
                {/* <td className="tg-0pky">{session.fields} / 12</td> */}
              </tr>
            )
          }
        })
      }
    </tbody>
    </table>
  );
};

export default Table;
