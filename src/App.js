import React, { useEffect, useState } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import Pokedex from './Pokedex';
import MyTeam from './MyTeam';
import Pokemon from './Pokemon';
import './App.css';

function App() {
	const [pokemons, setPokemon] = useState();

	const makeApiCall = (pokemonUrl) =>
		fetch(pokemonUrl)
			.then((response) => response.json())
			.then((data) => setPokemon(data.results));

	useEffect(() => {
		const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
		makeApiCall(pokemonUrl);
	}, []);

	console.log(pokemons);

	return (
		<div className='App'>
			<nav>
				<h1>Pokedex Project</h1>

				<Link to='/'>Pokedex</Link>
				<br />

				<Link to='/myteam'>My Team</Link>
			</nav>

			<Switch>
				<Route exact path='/' render={() => <Pokedex pokemons={pokemons} />} />
				<Route path='/pokedex' exact render={() => <Redirect to='/' />} />
				<Route
					path='/pokemon/:id'
					exact
					render={(routerProps) => (
						<Pokemon {...routerProps} pokemons={pokemons} />
					)}
				/>
				<Route path='/myteam' exact component={MyTeam} />
				<Redirect to='/' />
			</Switch>
		</div>
	);
}

export default App;
