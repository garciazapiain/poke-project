import { useEffect, useState } from "react";
import StarIcon from "./StarIcon";

function FavoriteGrid(props) {
    const [favorites, setFavorites] = useState([]);
    const [updatedFavorites, setUpdateFavorites] = useState(false);

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
                </div>
            ) : (
                <p>No favorite Pokemons yet!</p>
            )}
        </>
    );
}

export default FavoriteGrid;
