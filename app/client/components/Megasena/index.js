import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Pagination from '../Pagination';

const DEFAULT_PAGE_NUMBER = 3;

class Megasena extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    viewer: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      userMoveNext: false,
      userMovePrev: false,
    };
  }

  _handleOnChangePage = (page, event) => {
    event.preventDefault();
    const { location: { pathname } } = this.props;
    this.context.router.push({ pathname, query: { page } });
  }

  render() {
    const {
      viewer: {
        megasena: {
          games,
          pagination: {
            pages,
            page,
          },
        },
      },
    } = this.props;

    const tableBody = games.map(game => {
      const { id, Concurso, Valor_Acumulado } = game;
      return (
        <tr key={id}>
          <td>{Concurso}</td>
          <td>{Valor_Acumulado}</td>
        </tr>
      );
    });

    return (
      <div className="container">
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
        <Pagination
          total={pages}
          page={page}
          onChangePage={this._handleOnChangePage}
        />
      </div>
    );
  }
}

export default Relay.createContainer(Megasena, {
  initialVariables: {
    page: 1,
    itemsPerPage: DEFAULT_PAGE_NUMBER,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        megasena(page: $page, itemsPerPage: $itemsPerPage) {
          pagination {
            pages
            page
            itemsPerPage
          }
          games {
            id,
            Concurso,
            Valor_Acumulado
          }
        }
      }
    `,
  },
});
