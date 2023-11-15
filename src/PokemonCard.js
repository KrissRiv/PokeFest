import React, { memo, useEffect, useState } from "react";
import capitalize from "lodash/capitalize";
import sortBy from "lodash/sortBy";

import usePokemon from "./data/pokemonProvider";

import styles from "./PokemonCard.module.scss";

const PokemonCard = memo(() => {
  const {
    filteredTerm,
    loading,
    pokemonDetail,
    pokemonFilter,
    pokemonList,
    getPokemonDetail,
  } = usePokemon();
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => { // Load all pokemon data for each pokemon
    getPokemonDetail(pokemonList);
    console.log("pokemonDetail ", pokemonDetail);
  }, [pokemonList]);

  useEffect(() => { // Load filter pokemon data
    if (filteredTerm.length > 0 && pokemonFilter.length === 0) {
      //No results
      setPokemonData([]);
    } else {
      pokemonFilter.length > 0
        ? setPokemonData(sortBy(pokemonFilter, (item) => item.id))
        : setPokemonData(sortBy(pokemonDetail, (item) => item.id));
    }
  }, [filteredTerm, pokemonDetail, pokemonFilter]);

  const getHeight = (height) => height * 10;
  const getWeight = (weight) => (weight * 100) / 1000;

  const getPokemonResults = () => {
    let content;
    if (pokemonData.length > 0) {
      content = (
        <ul className={styles.pokeFestList}>
          {pokemonData.map((pokemon) => (
            <li key={`${pokemon.name}-${pokemon.id}`}>
              <div className={styles.pokeFestCard}>
                <div>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <div>
                  <p className={styles.pokeFestCard_name}>
                    {capitalize(pokemon.name)}
                  </p>
                  <p className={styles.pokeFestCard_stats}>
                    Peso: {getWeight(pokemon.weight)}/Kg
                  </p>
                  <p className={styles.pokeFestCard_stats}>
                    Altura: {getHeight(pokemon.height)}/Cm
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      content = <div>No results</div>;
    }
    return content;
  };

  return !loading ? getPokemonResults() : <div>Loading...</div>;
});

export default PokemonCard;
