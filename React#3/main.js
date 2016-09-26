var Recipe = React.createClass({
	render: function(){
		var items = this.props.ingredients.map(function(item, index){
			return <li key={index}>{item}</li>;
		});
		return <div className = "recipe">
					<div className = "edit">
						<span onClick={this.props.onRecipeEdit}>
							<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
						</span>
						<span onClick={this.props.onRecipeDelete}>
							<i className="fa fa-times" aria-hidden="true"></i>
						</span>
					</div>
					<div className = "header">{this.props.name}</div>
					<ul>{items}</ul>
					<div className = "method">{this.props.preparation}</div>
				</div>;
	}
});

var RecipeGrid = React.createClass({
	componentDidMount: function(){
		var grid = this.refs.grid;
		this.msnry = new Masonry( grid, {
			columnWidth: 0,
			itemSelector: '.recipe',
			gutter: 10,
			isFitWidth: true
		});
	},
	componentDidUpdate: function(prevProps){
		if (this.props.data.length !== prevProps.data.length) {
			this.msnry.reloadItems();
			this.msnry.layout();
		}
	},
	render: function(){
		var onRecipeDelete = this.props.onRecipeDelete;
		var onRecipeEdit = this.props.onRecipeEdit;
		var data = this.props.data.map(function(item){
			return <Recipe
				key = {item.id}
				name = {item.recipeName} 
				ingredients = {item.ingredients} 
				preparation = {item.preparation}
				onRecipeDelete = {onRecipeDelete.bind(null, item)}
				onRecipeEdit = {onRecipeEdit.bind(null, item)}/>;
		});
		return <div ref="grid" className="recipeGrid">{data}</div>;
	}
});

var RecipeForm = React.createClass({
	getInitialState: function(){
		return {
			title: '',
			items: [],
			method: ''
		};
	},
	handleTitleChange: function(e){
		this.setState({title: e.target.value});
	},
	handleItemsChange: function(e){
		var items = e.target.value.split(",");
		this.setState({items: items});
	},
	handleMethodChange: function(e){
		this.setState({method: e.target.value});
	},
	handleNewRecipe: function(e){
		e.preventDefault();
		var newRecipe = {
			id: Date.now(),
			recipeName: this.state.title,
			ingredients: this.state.items,
			preparation: this.state.method
		};

		this.props.onRecipeAdd(newRecipe);
		this.setState(
			{
				title: '',
				items: [],
				method: ''
			});
	},
	handleChangeRecipe: function(e){
		e.preventDefault();
		var changeRecipe = {
			id: this.props.editRecipe.id,
			recipeName: this.state.title,
			ingredients: this.state.items,
			preparation: this.state.method
		};
		this.props.onRecipeChange(changeRecipe);
		this.setState(
			{
				title: '',
				items: [],
				method: ''
			});
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.editRecipe) {
			this.setState({
				title: nextProps.editRecipe.recipeName,
				items: nextProps.editRecipe.ingredients,
				method: nextProps.editRecipe.preparation
			});
		}
	},
	render: function(){
		return <div className = {this.props.isModal ? "recipeForm modal-content" : "recipeForm"}>
			<div className = {this.props.isModal ? "exit": "not-display"}>
				<span onClick={this.props.onModalClose}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</span>
			</div>
			<form onSubmit={this.props.isModal ? this.handleChangeRecipe : this.handleNewRecipe}>
				<input 
				type="text" 
				placeholder="Recipe title" 
				value={this.state.title}
				onChange={this.handleTitleChange}/>

				<input 
				className = "margin" 
				type="text" 
				placeholder="List ingredients separated by commas" 
				value={this.state.items}
				onChange={this.handleItemsChange}/>

				<textarea 
				className="method" 
				placeholder="Describe method of preparation" 
				rows="5"
				value={this.state.method}
				onChange={this.handleMethodChange}/>

				<button className="submit" type="submit">Submit</button>
			</form>
		</div>;
	}
});

var Modal = React.createClass({
	render: function() {
		return <div className = {this.props.visible ? "modal" : "not-display"}>
					<RecipeForm 
						isModal={true} 
						onModalClose={this.props.onModalClose} 
						editRecipe={this.props.editRecipe}
						onRecipeChange={this.props.onRecipeChange}/>
				</div>
	}
});

var RecipeApp = React.createClass({
	getInitialState: function(){
		return {
			state: [],
			modal: false
		};
	},
	componentDidMount: function(){
		var localRecipes = JSON.parse(localStorage.getItem('recipes'));
		if (localRecipes.length !== 0) {
			this.setState({state: localRecipes});
		} else {
			this.setState({state: 
				[{
				id: "1",
				recipeName: "Vitamin booster smoothie",
				ingredients: ["1 orange, peeled and roughly chopped", 
				"1 large carrot, peeled and roughly chopped",
				"2 sticks celery, roughly chopped",
				"50g mango, roughly chopped",
				"200ml water"],
				preparation: "Put all the orange, carrot, celery and mango in the blender, top up with water, then blitz until smooth."
			}, 
			{
				id: "2",
				recipeName: "Avocado & strawberry smoothie",
				ingredients: ["½ avocado, stoned, peeled and cut into chunks", 
				"150g strawberry, halved",
				"4 tbsp low-fat natural yogurt",
				"200ml semi-skimmed milk",
				"lemon or lime juice, to taste",
				"honey, to taste"],
				preparation: "Put all the ingredients in a blender and whizz until smooth. If the consistency is too thick, add a little water."
			}]});
		}
	},
	componentDidUpdate: function(){
		this._updateLocalStorage();
	},
	handleRecipeAdd: function(newRecipe){
		var items = this.state.state.slice();
		items.unshift(newRecipe);
		this.setState({state: items});
	},
	handleRecipeDelete: function(recipe){
		var id = recipe.id;
		var newItems = this.state.state.filter(function(item){
			return item.id !== id;
		});
		this.setState({state: newItems});
	},
	handleChangeRecipe: function(changeRecipe) {
		var items = this.state.state.slice();
		items.forEach(function(item, index, array){
			if (item.id == changeRecipe.id) {
				array[index] = changeRecipe;
			}
		});
		this.setState({
				state: items,
				modal: false
			});

	},
	_updateLocalStorage: function(){
		var items = JSON.stringify(this.state.state);
		localStorage.setItem('recipes',items);
	},
	onModalClose: function(){
		this.setState({modal: false});
	},
	onModalOpen: function(recipe){
		this.editRecipe = recipe;
		this.setState({modal: true});
	},
	render: function(){
		return <div>
					<div className = "recipeApp">
						<h1 className="title">Recipe App</h1>
						<RecipeForm 
							onRecipeAdd={this.handleRecipeAdd} 
							isModal={false}/>
						<RecipeGrid 
							data = {this.state.state} 
							onRecipeDelete = {this.handleRecipeDelete}
							onRecipeEdit = {this.onModalOpen}/>
					</div>
					<Modal 
						visible={this.state.modal} 
						onModalClose={this.onModalClose} 
						editRecipe={this.editRecipe}
						onRecipeChange={this.handleChangeRecipe}/>
				</div>;
	}
});

ReactDOM.render(
		<RecipeApp/>,
		document.getElementById('content')
	);