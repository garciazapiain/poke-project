import { Link } from "react-router-dom";

function ButtonToFavorites() {
  return (
    <>
    <Link to="/favorites">
      <button className="button">Favorites</button>
    </Link>
    </>
  );
}

export default ButtonToFavorites;
