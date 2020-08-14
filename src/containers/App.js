import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';


class App extends Component {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
		// console.log('constructor');
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({robots: users}));
		// console.log('componentDidMount');
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
		
		// console.log(filterdRobots);
	}

	render() {
	const { robots, searchfield } = this.state
	const filterdRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})
	// console.log('render');
		return !robots.length ?
		<h1>Loading</h1> :	
		(
		<div className='tc'>
			<h1 className='f2'>RoboFriends</h1>
			<SearchBox searchChange={this.onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
					<CardList robots={filterdRobots}/>
				</ErrorBoundry>
			</Scroll>
		</div>
		);
	}
}

export default App;
