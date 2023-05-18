import './App.css';
import Filter from './components/Filter';
import React, { useEffect, useState } from 'react'
import { Provider as provider, useAtom } from 'jotai';
import { pokemonList, typesList } from './store';
import PokemonGrid from './components/PokemonGrid';
import EmptyPageSearch from './components/EmptyPageSearch';
import FavoriteGrid from './components/FavoriteGrid'
import ButtonToFavorites from './components/ButtonToFavorites'
import { useFetch } from './useFetch';
import { Route, Routes } from 'react-router';

function App() {
  const [filterList, setFilterList] = useAtom(typesList);
  const [pokemonData, setPokemonData] = useAtom(pokemonList)
  const [emptyPage, setEmptyPage] = useState(true)
  const [dataPokemonTypes, errorPokemonTypes, loadingPokemomTypes] = useFetch("https://pokeapi.co/api/v2/type")

  useEffect(() => {
    if (pokemonData.length > 0) {
      const filteredTypes = dataPokemonTypes.results.map((type) => type.name)
      const availableTypes = [];

      pokemonData.forEach((pokemon) => {
        const pokemonTypes = pokemon.types.map((type) => type);
        pokemonTypes.forEach((type) => {
          if (!availableTypes.includes(type)) {
            availableTypes.push(type);
          }
        });
      });
      const updatedFilterList = [
        { value: '', text: '', disabled: false }, // Empty value at the top
        ...filteredTypes.map((type) => ({
          value: type,
          text: type.charAt(0).toUpperCase() + type.slice(1),
          disabled: !availableTypes.includes(type),
        })),
      ];
      setFilterList(updatedFilterList);
    }
  }, [pokemonData, dataPokemonTypes]);

  function getRandomNumbers(value) {
    const MAX_NUMBERS = value;
    const MIN_NUMBER = 1;
    const MAX_NUMBER = 1010;
    const numbers = new Set();

    while (numbers.size < MAX_NUMBERS) {
      const randomNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1) + MIN_NUMBER);
      numbers.add(randomNumber);
    }

    return [...numbers];
  }

  function emptyPageNumberOfPokemonsSelected(value) {
    const randomNumbers = getRandomNumbers(value)
    const promises = randomNumbers.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      )
    );
    Promise.all(promises).then((results) => {
      setPokemonData(results.map((pokemonData) => {
        const { name, weight, height, sprites, types } = pokemonData;
        const imgUrl = sprites.back_default;
        const typeNames = types.map((typeObj) => typeObj.type.name);
        const favorite = false;
        return { name, weight, height, imgUrl, types: typeNames };
      }));
      // You can use the dataPokemonList array for further processing or rendering in your application
    });
    setEmptyPage(false)
  }

  function newPokemons() {
    setEmptyPage(true)
  }

  return (
    <div className='App'>
      <h1>Pokemon Project</h1>
      <Routes>
        <Route path="/" element={
          emptyPage ?
            <>
              <EmptyPageSearch emptyPageNumberOfPokemonsSelected={emptyPageNumberOfPokemonsSelected} />
            </>
            :
            <>
              <Filter />
              <ButtonToFavorites />
              <PokemonGrid newPokemons={() => newPokemons} pokemonData={pokemonData} />
            </>
        } />
        <Route path="/poke-project" element={
          emptyPage ?
            <EmptyPageSearch emptyPageNumberOfPokemonsSelected={emptyPageNumberOfPokemonsSelected} />
            :
            <>
              <Filter />
              <ButtonToFavorites />
              <PokemonGrid newPokemons={() => newPokemons} pokemonData={pokemonData} />
            </>
        } />
        <Route path="/favorites" element={<FavoriteGrid />} />
      </Routes>
    </div>
  )
}

export default App;
