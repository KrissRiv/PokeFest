import React from "react";

import { PokemonProvider } from "./data/pokemonProvider";
import PokemonList from "./PokemonList";
import PokemonHead from "./PokemonHead";
import PokemonFilter from "./PokemonFilter";

import styles from "./App.module.scss";

const App = () => {

  return (
    <PokemonProvider>
      <section className={styles.pokeFestContainer}>
        <PokemonHead />
        <PokemonFilter />
        <PokemonList />
      </section>
    </PokemonProvider>
  );
};

export default App;
