import { useState } from "react";
import ButtonToFavorites from "./ButtonToFavorites";

function EmptyPageSearch(props) {
    const [number, setNumber] = useState(1);
    const [error, setError] = useState("");
    const [searchPokemon, setSearchPokemon] = useState("")
    const [errorSearch, setErrorSearch] = useState("");


    function handleInputChangeNumberPokemons(event) {
        const value = parseInt(event.target.value);

        if (isNaN(value) || value < 1 || value > 100) {
            setError("Number must be between 1 and 100");
        } else {
            setNumber(value);
            setError("");
        }
    }

    function handleInputChangeSearch(event) {
        const value = event.target.value;

        setSearchPokemon(value);
        setErrorSearch("");
    }

    return (
        <>
            <div className="emptyPageSection">
                <label htmlFor="number-input">Hoy many pokemons do you want (enter number between 1-100): </label>
                <input
                    type="number"
                    id="number-input"
                    value={number}
                    onChange={handleInputChangeNumberPokemons}
                />
                <button className="button" onClick={() => props.emptyPageNumberOfPokemonsSelected(number)}>Get Pokemons!</button>
            </div>
            <div className="emptyPageSection">
                <p>Search Pokemon by name!</p>
                <input
                    type="string"
                    id="string-input"
                    value={searchPokemon}
                    onChange={handleInputChangeSearch}
                />
                <button className="button" onClick={() => props.fetchPokemonsThroughSearch(searchPokemon)}>
                    Search
                </button>
            </div>
            <div className="emptyPageSection">
                <p>Go to favorites page</p>
                <ButtonToFavorites />
            </div>
            <div className="error">{props.errorMessage}</div>
            {error && <p className="error">{error}</p>}
        </>
    );
}

export default EmptyPageSearch;
