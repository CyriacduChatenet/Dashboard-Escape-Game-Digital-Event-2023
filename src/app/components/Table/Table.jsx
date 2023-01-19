import './table.css';

const Table = () => {
  return (
    <table className="tg">
    <thead>
      <tr>
        <th className="tg-0pky">Prochaines sessions :</th>
        <th className="tg-0pky">Nombre d'inscrits :</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="tg-0pky">18:30</td>
        <td className="tg-0pky">6/12</td>
      </tr>
      <tr>
        <td className="tg-0pky">18:30</td>
        <td className="tg-0pky">6/12</td>
      </tr>
    </tbody>
    </table>
  );
};

export default Table;
