import { useState } from "react";

function EmptyPageSearch(props) {
    const [number, setNumber] = useState(1);
    const [error, setError] = useState("");

    function handleInputChange(event) {
        const value = parseInt(event.target.value);

        if (isNaN(value) || value < 1 || value > 100) {
            setError("Number must be between 1 and 100");
        } else {
            setNumber(value);
            setError("");
        }
    }

    return (
        <>
            <label htmlFor="number-input">Hoy many pokemons do you want (enter number between 1-100): </label>
            <input
                type="number"
                id="number-input"
                value={number}
                onChange={handleInputChange}
            />
            <button className="button" onClick={() => props.emptyPageNumberOfPokemonsSelected(number)}>Get Pokemons!</button>
            {error && <p>{error}</p>}
        </>
    );
}

export default EmptyPageSearch;
