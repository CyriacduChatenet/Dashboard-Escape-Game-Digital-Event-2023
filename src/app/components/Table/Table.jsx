import "./table.css";

const Table = ({ sessions }) => {
  return (
    <table className="tg">
      <thead>
        <tr>
          <th className="tg-0pky">Prochaines sessions :</th>
          <th className="tg-0pky">Nombre d'inscrits :</th>
        </tr>
      </thead>
      <tbody>
        {sessions
          ? sessions.map((session) => (
              <tr>
                <td className="tg-0pky">{session.name}</td>
                <td className="tg-0pky">2 / 12</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default Table;
