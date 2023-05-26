import { useAtom } from "jotai";
import { filter } from "../store";
import '../App.css';
import { useEffect, useState } from "react";
import StarIcon from "./StarIcon";

function PokemonGrid(props) {
    const [typeOfPokemonFilter] = useAtom(filter);
    const [filteredData, setFilteredData] = useState([]);
    const [searchPokemon, setSearchPokemon] = useState("")
    const [errorSearch, setErrorSearch] = useState("");

    useEffect(() => {
        if (props.pokemonData) {
            let filteredPokemons = props.pokemonData;

            if (typeOfPokemonFilter) {
                filteredPokemons = filteredPokemons.filter((pokemon) =>
                    pokemon.types.includes(typeOfPokemonFilter)
                );
            }

            if (searchPokemon) {
                filteredPokemons = filteredPokemons.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
                );
            }

            setFilteredData(filteredPokemons);
        }
    }, [props.pokemonData, typeOfPokemonFilter, searchPokemon]);

    function handleInputChangeSearch(event) {
        const value = event.target.value;

        setSearchPokemon(value);
        setErrorSearch("");
    }

    return (
        props.pokemonData ?
            <>
                <div className="filterByName">
                    <p>Filter by name</p>
                    <input
                        type="string"
                        id="string-input"
                        value={searchPokemon}
                        onChange={handleInputChangeSearch}
                    />
                </div>
                {filteredData.length === 0 ? (
                    <p>No Pokemon match your search.</p>
                ) : (
                    <div className="pokemon-grid">
                        {filteredData.map((pokemon) => (
                            <div className="pokemon-card" key={pokemon.name}>
                                <img src={pokemon.imgUrl} alt={pokemon.name} />
                                <StarIcon pokemon={pokemon} />
                                <div className="pokemon-details">
                                    <h3>{pokemon.name}</h3>
                                    <p>Weight: {pokemon.weight}</p>
                                    <p>Height: {pokemon.height}</p>
                                    <p>Types: {pokemon.types.join(", ")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <button className="button" onClick={props.newPokemons()}>Get new Pokemons!</button>
            </>
            : null
    );
}

export default PokemonGrid;
