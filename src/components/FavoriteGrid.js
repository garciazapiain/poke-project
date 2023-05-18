import { useEffect, useState } from "react";
import StarIcon from "./StarIcon";
import { useAtom } from "jotai";
import { pokemonList } from "../store";

function FavoriteGrid(props) {
    const [favorites, setFavorites] = useState([]);
    const [updatedFavorites, setUpdateFavorites] = useState(false);
    const [pokemonData, setPokemonData] = useAtom(pokemonList)

    useEffect(() => {
        const favoritesData = localStorage.getItem("favoritePokemons");
        if (favoritesData) {
            setFavorites(JSON.parse(favoritesData));
        }
        setUpdateFavorites(false)
    }, [updatedFavorites]);

    function favoriteUnselected() {
        setUpdateFavorites(true)
    }

    function resetFavorites() {
        localStorage.setItem("favoritePokemons", [])
        setFavorites([])
        setPokemonData((prevData) =>
            prevData.map((pokemon) => {
                if (pokemon.favorite) {
                    return { ...pokemon, favorite: false };
                }
                return pokemon;
            })
        );
    }

    return (
        <>
            <h1>Favorites</h1>
            {favorites.length > 0 ? (
                <div className="pokemon-grid">
                    {favorites.map((pokemon) => (
                        <div className="pokemon-card" key={pokemon.name}>
                            <img src={pokemon.imgUrl} alt={pokemon.name} />
                            <div onClick={favoriteUnselected}>
                                <StarIcon favoriteGrid={true} pokemon={pokemon} />
                            </div>
                            <div className="pokemon-details">
                                <h3>{pokemon.name}</h3>
                                <p>Weight: {pokemon.weight}</p>
                                <p>Height: {pokemon.height}</p>
                                <p>Types: {pokemon.types.join(", ")}</p>
                            </div>
                        </div>
                    ))}
                    <button onClick={resetFavorites} className="button">Reset favorites</button>
                </div>
            ) : (
                <p>No favorite Pokemons yet!</p>
            )}
        </>
    );
}

export default FavoriteGrid;
