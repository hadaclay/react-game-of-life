'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = function (_React$Component) {
  _inherits(Cell, _React$Component);

  function Cell(props) {
    _classCallCheck(this, Cell);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleCellClick = _this.handleCellClick.bind(_this);
    return _this;
  }

  Cell.prototype.handleCellClick = function handleCellClick() {
    return this.props.onCellClick(this.props.row, this.props.col, this.props.status);
  };

  Cell.prototype.render = function render() {
    return React.createElement('td', { className: this.props.status, onClick: this.handleCellClick });
  };

  return Cell;
}(React.Component);

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      playing: false,
      generation: 0,
      delay: 60,
      rows: 40,
      columns: 40,
      boardData: []
    };

    _this2.toggleCell = _this2.toggleCell.bind(_this2);
    _this2.generateBoard = _this2.generateBoard.bind(_this2);
    _this2.randomizeBoard = _this2.randomizeBoard.bind(_this2);
    _this2.clearBoard = _this2.clearBoard.bind(_this2);
    _this2.getNeighbors = _this2.getNeighbors.bind(_this2);
    _this2.iterate = _this2.iterate.bind(_this2);
    _this2.togglePlaying = _this2.togglePlaying.bind(_this2);
    return _this2;
  }

  Board.prototype.toggleCell = function toggleCell(row, col, status) {
    // When cell is clicked, toggle 'alive' or 'dead'
    var newBoardData = this.state.boardData.slice(0),
        newStatus = '';
    if (status === 'alive') {
      newStatus = 'dead';
    } else {
      newStatus = 'alive';
    }
    newBoardData[row][col].status = newStatus;
    this.setState({ boardData: newBoardData });
  };

  Board.prototype.randomizeBoard = function randomizeBoard() {
    var newBoardData = [],
        rows = this.state.rows,
        columns = this.state.columns;
    for (var row = 0; row < rows; row++) {
      var currentRow = [];
      for (var col = 0; col < columns; col++) {
        var randomStatus = Math.random() <= 0.3 ? 'alive' : 'dead';
        currentRow.push({ status: randomStatus });
      }
      newBoardData.push(currentRow);
    }
    this.setState({ boardData: newBoardData, generation: 0 });
  };

  Board.prototype.clearBoard = function clearBoard() {
    var clearBoardState = [];
    for (var r = 0; r < this.state.rows; r++) {
      var currentRow = [];
      for (var c = 0; c < this.state.columns; c++) {
        currentRow.push({ status: 'dead' });
      }
      clearBoardState.push(currentRow);
    }
    this.setState({ boardData: clearBoardState,
      generation: 0 });
  };

  Board.prototype.generateBoard = function generateBoard() {
    var boardElements = [],
        keyCounter = 0;
    for (var r = 0; r < this.state.rows; r++) {
      var currentRow = [];
      for (var c = 0; c < this.state.columns; c++) {
        currentRow.push(React.createElement(Cell, { key: keyCounter, row: r, col: c,
          onCellClick: this.toggleCell,
          status: this.state.boardData[r][c].status }));
        keyCounter++;
      }
      boardElements.push(React.createElement(
        'tr',
        null,
        currentRow
      ));
    }
    return boardElements;
  };

  Board.prototype.getNeighbors = function getNeighbors(row, col, board) {
    // Determine where a cell is on board, then get status of neighbors
    var neighbors = [];
    var rows = this.state.rows,
        columns = this.state.columns;
    if (row === 0 && col === 0) {
      // Top Left
      neighbors = [board[row][col + 1].status, board[row + 1][col].status, board[row + 1][col + 1].status];
    } else if (row === 0 && col === columns - 1) {
      // Top Right
      neighbors = [board[row][col - 1].status, board[row + 1][col - 1].status, board[row + 1][col].status];
    } else if (row === rows - 1 && col === 0) {
      // Bottom Left
      neighbors = [board[row - 1][col].status, board[row - 1][col + 1].status, board[row][col + 1].status];
    } else if (row === rows - 1 && col === columns - 1) {
      // Bottom Right
      neighbors = [board[row - 1][row].status, board[row][row - 1].status, board[row - 1][row - 1].status];
    } else if (row === 0) {
      // Top row
      neighbors = [board[row][col - 1].status, board[row][col + 1].status, board[row + 1][col - 1].status, board[row + 1][col].status, board[row + 1][col + 1].status];
    } else if (row === rows - 1) {
      // Bottom Row
      neighbors = [board[row - 1][col - 1].status, board[row - 1][col].status, board[row - 1][col + 1].status, board[row][col - 1].status, board[row][col + 1].status];
    } else if (col === 0) {
      // Left Column
      neighbors = [board[row - 1][col].status, board[row - 1][col + 1].status, board[row][col + 1].status, board[row + 1][col].status, board[row + 1][col + 1].status];
    } else if (col === columns - 1) {
      // Right Column
      neighbors = [board[row - 1][col - 1].status, board[row - 1][col].status, board[row][col - 1].status, board[row + 1][col - 1].status, board[row + 1][col].status];
    } else {
      // Everything else
      neighbors = [board[row - 1][col - 1].status, board[row - 1][col].status, board[row - 1][col + 1].status, board[row][col - 1].status, board[row][col + 1].status, board[row + 1][col - 1].status, board[row + 1][col].status, board[row + 1][col + 1].status];
    }
    return neighbors;
  };

  Board.prototype.iterate = function iterate() {
    // Copy boardData from state NOT by reference
    var newBoardData = JSON.parse(JSON.stringify(this.state.boardData));

    for (var r = 0; r < this.state.rows; r++) {
      for (var c = 0; c < this.state.columns; c++) {
        var neighbors = this.getNeighbors(r, c, this.state.boardData);
        var neighborsAlive = neighbors.filter(function (status) {
          return status === 'alive';
        }).length;
        var cellStatus = this.state.boardData[r][c].status;

        // Dead cells with exactly 3 neighbors are reborn
        if (cellStatus === 'alive') {
          // Underpopulation Death
          if (neighborsAlive < 2) {
            newBoardData[r][c].status = 'dead';
          } else if (neighborsAlive === 2 || neighborsAlive === 3) {
            continue;
          }
          // Overpopulation Death
          else if (neighborsAlive > 3) {
              newBoardData[r][c].status = 'dead';
            }
        }

        if (cellStatus === 'dead') {
          if (neighborsAlive >= 4 || neighborsAlive < 3) {
            continue;
          }
          if (neighborsAlive === 3) {
            newBoardData[r][c].status = 'alive';
          }
        }
      }
    }
    var gen = this.state.generation;
    gen++;
    this.setState({ boardData: newBoardData, generation: gen });
  };

  Board.prototype.togglePlaying = function togglePlaying() {
    if (this.state.playing) {
      this.setState({ playing: false });
      clearInterval(this.state.delayIntervalID);
    } else {
      var delayIntervalID = setInterval(this.iterate, this.state.delay);
      this.setState({ playing: true, delayIntervalID: delayIntervalID });
    }
  };

  Board.prototype.componentWillMount = function componentWillMount() {
    this.randomizeBoard();
    var delayIntervalID = setInterval(this.iterate, this.state.delay);
    this.setState({ playing: true, delayIntervalID: delayIntervalID });
  };

  Board.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'table',
        null,
        this.generateBoard()
      ),
      React.createElement(
        'div',
        { className: 'controls' },
        React.createElement(
          'h2',
          null,
          'Generations: ',
          this.state.generation
        ),
        React.createElement(
          'button',
          { className: 'btn blue-main', onClick: this.togglePlaying },
          this.state.playing ? 'Stop' : 'Start'
        ),
        React.createElement(
          'button',
          { className: 'btn blue-secondary', onClick: this.iterate },
          'Step'
        ),
        React.createElement(
          'button',
          { className: 'btn blue-secondary', onClick: this.clearBoard },
          'Clear Board'
        ),
        React.createElement(
          'button',
          { className: 'btn blue-secondary', onClick: this.randomizeBoard },
          'Randomize'
        )
      )
    );
  };

  return Board;
}(React.Component);

ReactDOM.render(React.createElement(Board, null), document.getElementById('app'));