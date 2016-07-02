import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';

const DEFAULT_PAGE_NUMBER = 30;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMoveNext: false,
      userMovePrev: false
    };
  }

  render() {
    const {
      viewer: {megasenaConnection: {edges, pageInfo: {hasNextPage, hasPreviousPage}}},
    } = this.props;

    const tableBody = edges.map((edge) => {
      const {id, Concurso, Valor_Acumulado} = edge.node;
      return (
        <tr key={id}>
          <td>{Concurso}</td>
          <td>{Valor_Acumulado}</td>
        </tr>
      );
    });

    const classesButtonNext = classNames(
      'pager-next', {'disabled': !hasNextPage && !this.state.userMovePrev}
    );

    const classesButtonPrev = classNames(
      'pager-prev', {'disabled': !hasPreviousPage && !this.state.userMoveNext}
    );

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
        <nav>
          <ul className="pager">
            <li className={classesButtonPrev} onClick={this._prevPage}>
              <a href="">Older</a>
            </li>
            <li className={classesButtonNext} onClick={this._nextPage}>
              <a href="">Newer</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  _nextPage = e => {
    e.preventDefault();
    const {
      viewer: {
        megasenaConnection: {
          pageInfo: {
            hasNextPage,
            endCursor
          }
        }
      },
      relay: {setVariables}
    } = this.props;

    if (!hasNextPage && !this.state.userMovePrev) {
      return null;
    }

    this.setState({
      userMoveNext: true,
      userMovePrev: false,
    });

    setVariables({
      first: DEFAULT_PAGE_NUMBER,
      after: endCursor,
      last: null,
      before: null
    });
  }

  _prevPage = e => {
    e.preventDefault();

    const {
      viewer: {
        megasenaConnection: {
          pageInfo: {
            hasPreviousPage,
            startCursor
          }
        }
      },
      relay: {setVariables}
    } = this.props;

    if (!hasPreviousPage && !this.state.userMoveNext) {
      return null;
    }

    this.setState({
      userMovePrev: true,
      userMoveNext: false
    });

    setVariables({
      first: null,
      after: null,
      last: DEFAULT_PAGE_NUMBER,
      before: startCursor
    });
  }
}


export default Relay.createContainer(Main, {
  initialVariables: {
    first: DEFAULT_PAGE_NUMBER,
    after: null,
    last: null,
    before: null
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        megasenaConnection(
          first: $first,
          after: $after,
          last: $last,
          before: $before
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              Concurso
              Valor_Acumulado
            }
          }
        }
      }
    `
  }
});
