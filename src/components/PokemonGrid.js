import { useAtom } from "jotai";
import { filter } from "../store";
import '../App.css';
import { useEffect, useState } from "react";

function PokemonGrid(props) {
    const [typeOfPokemonFilter] = useAtom(filter);
    const [filteredData, setFilteredData] = useState([]);
    useEffect(()=>{
        if(props.pokemonData){
            if(typeOfPokemonFilter){
                setFilteredData(props.pokemonData.filter((pokemon) =>
                pokemon.types.includes(typeOfPokemonFilter)))
            }
            else{
                setFilteredData(props.pokemonData)
            }
        }
    },[props.pokemonData,typeOfPokemonFilter])
    return (
        props.pokemonData ?
            <>
            <div className="pokemon-grid">
                {filteredData.map((pokemon) => (
                    <div className="pokemon-card" key={pokemon.name}>
                        <img src={pokemon.imgUrl} alt={pokemon.name} />
                        <div className="pokemon-details">
                            <h3>{pokemon.name}</h3>
                            <p>Weight: {pokemon.weight}</p>
                            <p>Height: {pokemon.height}</p>
                            <p>Types: {pokemon.types.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="button" onClick={props.newPokemons()}>Get new Pokemons!</button>
            </>
            : null
    );
}

export default PokemonGrid;
