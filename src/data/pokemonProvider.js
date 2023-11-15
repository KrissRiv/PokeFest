import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import filter from "lodash/filter";

import actions from "./actions";
import pokemonReducer, { initialState } from "./pokemonReducer";

const PokemonContext = createContext(initialState);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const getPokemonDetail = (list) => {
    dispatch({ type: actions.SET_LOADING, payload: true });

    list.results.map((pokemon) =>
      axios
        .get(pokemon.url)
        .then((response) =>
          dispatch({
            type: actions.GET_POKEMON_DETAIL,
            payload: response.data,
          })
        )
        .catch((error) => dispatch({ type: actions.SET_ERROR, payload: error }))
    );
  };

  const getPokemonFilter = (term) => {
    dispatch({ type: actions.SET_LOADING, payload: true });
    dispatch({
      type: actions.GET_POKEMON_FILTER,
      payload: {
        filtered: filter(state.pokemonDetail, (pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
        ),
        filteredTerm: term.toLowerCase(),
      },
    });
  };

  const getPokemonList = () => {
    dispatch({ type: actions.SET_LOADING, payload: true });

    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) =>
        dispatch({ type: actions.GET_POKEMON_LIST, payload: response.data })
      )
      .catch((error) => dispatch({ type: actions.SET_ERROR, payload: error }));
  };

  const value = {
    ...state,
    getPokemonDetail,
    getPokemonFilter,
    getPokemonList,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

const usePokemon = () => {
  const context = useContext(PokemonContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};

export default usePokemon;
