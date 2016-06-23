import React from 'react';
import Relay from 'react-relay';
import styles from './index.scss';

class Main extends React.Component {
  render() {
    const {viewer: {megasena}} = this.props;

    const tableBody = megasena.map((obj, index) => {
      const {_id, Concurso, Valor_Acumulado} = obj;
      return (
        <tr key={_id}>
          <td>{Concurso}</td>
          <td>{Valor_Acumulado}</td>
        </tr>
      );
    });

    console.log(this);
    return (
      <table className="table table-sm table-hover table-striped">
        <thead>
          <tr>
            <th>Concurso</th>
            <th>Valor Acumulado</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    );
  }
}


export default Relay.createContainer(Main, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        megasena {
          _id
          Concurso
          Valor_Acumulado
        }
      }
    `
  }
});

