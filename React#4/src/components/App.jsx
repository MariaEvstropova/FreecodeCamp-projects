var React = require('react');
var Field = require('./Field.jsx');
var Counter = require('./Counter.jsx');
require('./css/App.css');

const width = 50;
const height = 30;

var stateR = [];
for(let i=0; i<height; i++){
	stateR[i] = [];
	for(let j=0; j<width; j++) {
		stateR[i][j] = Math.random() > 0.5;
	}
}

var state0 = [];
for(let i=0; i<height; i++){
	state0[i] = [];
	for(let j=0; j<width; j++) {
		state0[i][j] = false;
	}
}

function getNeighbours(row, column) {
	switch(row) {
		case 0: var rowTop = height - 1; 
				var rowBottom = row + 1;
				break;
		case height-1: 
				var rowTop = row - 1;
				var rowBottom = 0;
				break;
		default: 
				var rowTop = row - 1;
				var rowBottom = row + 1;
				break;
	}

	switch(column) {
		case 0: var colLeft = width - 1; 
				var colRight = column + 1;
				break;
		case width-1: 
				var colLeft = column - 1;
				var colRight = 0;
				break;
		default: 
				var colLeft = column - 1;
				var colRight = column + 1;
				break;
	}

	return {
		rowTop: rowTop,
		rowBottom: rowBottom,
		colLeft: colLeft,
		colRight: colRight
	};
}

var App = React.createClass({
	getInitialState: function(){
		return {
			state: stateR,
			play: true,
			generation: 0
		}
	},
	componentDidMount: function(){
		this.interval = setInterval(this.newGeneration, 500);
	},
	componentWillUnmount: function(){
		clearInterval(this.interval);
	},
	handleGetClick: function(click){
		//Make a deep copy of the state
		//Array.prototype.slice() won't work
		var curState = [];
		this.state.state.forEach(function(row, indexR){
			curState[indexR] = [];
			row.forEach(function(column, indexC){
				curState[indexR][indexC] = column;
			})
		});

		curState[click.row][click.column] = !curState[click.row][click.column];
		this.setState({state: curState});
	},
	handleClear: function(){
		this.setState({state: state0});
	},
	handlePlay: function(){
		var state = this.state.state;
		this.setState({
			state: state,
			play: true
		});
	},
	handlePause: function() {
		var state = this.state.state;
		this.setState({
			state: state,
			play: false
		});
	},
	newGeneration: function() {
		if(!this.state.play) return;

		var newState = [];
		for(let row=0; row<height; row++) {
			newState[row] = [];
			for(let col=0; col<width; col++) {
				if (!this.state.state[row][col]) {
					switch (this.countSum(row, col)) {
						case 3: newState[row][col] = true; break;
						default: newState[row][col] = false; break;
					}
				} else {
					switch (this.countSum(row, col)) {
						case 2:
						case 3: newState[row][col] = true; break;
						default: newState[row][col] = false; break;
					}
				}
			}
		}
		var generation = this.state.generation + 1;
		this.setState({
			state: newState, 
			generation: generation
		});
	},
	countSum: function(row, column){
		let n = getNeighbours(row, column);
		let sum = this.numberState(n.rowTop, n.colLeft)+
					this.numberState(n.rowTop, column)+
					this.numberState(n.rowTop, n.colRight)+
					this.numberState(row, n.colLeft)+
					this.numberState(row, n.colRight)+
					this.numberState(n.rowBottom, n.colLeft)+
					this.numberState(n.rowBottom, column)+
					this.numberState(n.rowBottom, n.colRight);
		return sum;
	},
	numberState: function(row, column){
		if(this.state.state[row][column]) return 1 
			else return 0;
	},
	render: function(){
		return (
			<div>
				<div className="header">
					React project #4: Game of Life
				</div>
				<div className="info-plate">
					<a type="button" onClick={this.handlePlay}>Run</a>
					<a type="button" onClick={this.handlePause}>Pause</a>
					<a type="button" onClick={this.handleClear}>Clear</a>
					<Counter data={this.state.generation}/>
					<div className="bg-plate">
						<Field
							data={this.state}
							getClick={this.handleGetClick}/>
					</div>
				</div>
			</div>);
	}
});

module.exports = App;