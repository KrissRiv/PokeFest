import React, { useEffect } from "react";

import PokemonCard from "./PokemonCard";
import usePokemon from "./data/pokemonProvider";

import styles from "./PokemonList.module.scss";

const PokemonList = () => {
  const { loading, pokemonList, getPokemonList } = usePokemon();

  useEffect(() => {
    getPokemonList();
    console.log("pokemonList ", pokemonList);
  }, []);

  return (
    <main className={styles.pokeFestMain}>
      {!loading ? <PokemonCard /> : <div>Loading...</div>}
    </main>
  );
};

export default PokemonList;
