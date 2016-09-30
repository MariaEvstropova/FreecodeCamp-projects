var React = require('react');
require('./css/Field.css');

var Field = React.createClass({
	render: function(){
		const height = 30;
		const width = 50;
		var rows = [];

		for(let i=0; i<height; i++) {
			rows[i] = [];
			for(let j=0; j<width; j++) {
				let key = {row: i, column: j};
				rows[i].push(
					<td 
						key={i*100+j}
						className={this.props.data.state[i][j] ? "alive" : ""} 
						onClick={this.props.getClick.bind(null, key)}>
					</td>)
			}
		}

		var tableRows = rows.map(function(row, index){
			return <tr key={index} className="cell">{row}</tr>
		});

		return (
		<table>
			<tbody>
				{tableRows}
			</tbody>
		</table>);
	}
});

module.exports = Field;