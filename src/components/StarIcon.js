import React from "react";
import { BsStarFill } from 'react-icons/bs';
import { useAtom } from "jotai";
import { pokemonList } from "../store";

const StarIcon = (props) => {
    const [pokemonData, setPokemonData] = useAtom(pokemonList)

    const starStyles = {
        color: props.favoriteGrid ? 'gold' : props.pokemon.favorite ? 'gold' : 'white',
        padding: '10px',
        borderRadius: '50%',
        cursor: 'pointer',
    };

    function toggleFavorite(name) {
        setPokemonData((prevPokemonList) => {
            return prevPokemonList.map((pokemon) => {
                if (pokemon.name === name) {
                    return {
                        ...pokemon,
                        favorite: !pokemon.favorite,
                    };
                }
                return pokemon;
            });
        });

        const favoritePokemonsJSON = localStorage.getItem('favoritePokemons');
        if (!favoritePokemonsJSON) {
          // No existing favorites in local storage
          const favoritePokemon = pokemonData.find((pokemon) => pokemon.name === name);
          if (favoritePokemon) {
            // Add the current pokemon object as favorite
            localStorage.setItem('favoritePokemons', JSON.stringify([favoritePokemon]));
          }
        } else {
          const existingFavorites = JSON.parse(favoritePokemonsJSON);
          const updatedFavorites = existingFavorites.filter((pokemon) => pokemon.name !== name);
          if (updatedFavorites.length === existingFavorites.length) {
            // Pokemon does not exist in favorites, add it
            const favoritePokemon = pokemonData.find((pokemon) => pokemon.name === name);
            if (favoritePokemon) {
              updatedFavorites.push(favoritePokemon);
            }
          }
          localStorage.setItem('favoritePokemons', JSON.stringify(updatedFavorites));
        }

    }
      

    return (
        <div >
            <BsStarFill onClick={() => toggleFavorite(props.pokemon.name)} style={starStyles} />
        </div>
    )
};

export default StarIcon;

