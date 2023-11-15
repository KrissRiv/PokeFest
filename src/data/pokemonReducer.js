import actions from "./actions";

export const initialState = {
  error: "",
  filteredTerm: "",
  loading: true,
  pokemonList: {},
  pokemonDetail: [],
  pokemonFilter: [],
};

const pokemonReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.GET_POKEMON_DETAIL: {
      console.log("GET_POKEMON_DETAIL ", payload);
      return {
        ...state,
        loading: false,
        pokemonDetail: [...state.pokemonDetail, payload],
      };
    }
    case actions.GET_POKEMON_FILTER: {
      console.log("GET_POKEMON_FILTER ", payload);
      return {
        ...state,
        filteredTerm: payload.filteredTerm,
        loading: false,
        pokemonFilter: payload.filtered,
      };
    }
    case actions.GET_POKEMON_LIST: {
      console.log("GET_POKEMON_LIST ", payload);
      return {
        ...state,
        loading: false,
        pokemonList: payload,
      };
    }
    case actions.SET_ERROR: {
      console.log("SET_ERROR ", payload);
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    case actions.SET_LOADING: {
      console.log("SET_LOADING ", payload);
      return {
        ...state,
        loading: payload,
      };
    }
    default: {
      throw new Error(`No case for type ${type} found in shopReducer.`);
    }
  }
};

export default pokemonReducer;
