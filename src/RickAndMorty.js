import React, { useState, useEffect } from "react";
import "./RickAndMorty.css";

const RickAndMorty = () => {
  const [character, setCharacter] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomCharacter = async () => {
    setIsLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 826) + 1;
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${randomId}`
      );
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  const toggleFavorite = (character) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === character.id)) {
        return prev.filter((fav) => fav.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  return (
    <div className="rick-morty-app">
      <h1>Rick and Morty Character Explorer</h1>
      {isLoading ? (
        <p className="loading-text">Loading Character...</p>
      ) : (
        character && (
          <div className="character-card">
            <img
              src={character.image}
              alt={character.name}
              className="character-image"
            />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p>
                <strong>Status:</strong> {character.status}
              </p>
              <p>
                <strong>Species:</strong> {character.species}
              </p>
              <p>
                <strong>Location:</strong> {character.location.name}
              </p>
              <button
                className={`favorite-btn ${
                  favorites.find((fav) => fav.id === character.id)
                    ? "favorited"
                    : ""
                }`}
                onClick={() => toggleFavorite(character)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                </svg>
                {favorites.find((fav) => fav.id === character.id)
                  ? "Unfavorite"
                  : "Favorite"}
              </button>
            </div>
          </div>
        )
      )}
      <button className="randomize-btn" onClick={fetchRandomCharacter}>
        Randomize Character
      </button>
      <div className="favorites-section">
        <h3>Your Favorites</h3>
        {favorites.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div key={fav.id} className="favorite-card">
                <img src={fav.image} alt={fav.name} />
                <p>{fav.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RickAndMorty;
