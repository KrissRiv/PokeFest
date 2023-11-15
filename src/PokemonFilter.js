import React, { useState } from "react";

import usePokemon from "./data/pokemonProvider";

import styles from "./PokemonFilter.module.scss";

const PokemonFilter = () => {
  const { getPokemonFilter, pokemonDetail, pokemonFilter } = usePokemon();
  const [pokemonTerm, setPokemonFilter] = useState("");

  const getResults = () => {
    if(pokemonTerm.length > 0) {
      return `${pokemonFilter.length} pokemon`;
    } else if (pokemonFilter.length === 0 && pokemonTerm.length === 0) {
      return `${pokemonDetail.length} pokemon`;
    }
  };

  const handleFilter = (term) => {
    setPokemonFilter(term);
    getPokemonFilter(term);
  };

  return (
    <section className={styles.pokeFestFilter}>
      <input
        onChange={(e) => handleFilter(e.target.value)}
        value={pokemonTerm}
      />
      {getResults()}
    </section>
  );
};

export default PokemonFilter;
