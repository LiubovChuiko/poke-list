import {createSlice} from '@reduxjs/toolkit';

export type Config = {
  pokemonsCount: number;
  pokemons: ObjRecord[];
  currentPokemon: StoredPokemon | undefined;
  currentPage: number;
  pokeTypes: ObjRecord[];
  listType: ListType;
  selectedType: string;
};

const initialState: Config = {
  pokemonsCount: 0,
  currentPage: 1,
  pokemons: [],
  currentPokemon: undefined,
  pokeTypes: [],
  listType: 'main',
  selectedType: 'none',
};

const mainSlice = createSlice({
  name: 'main',
  initialState: initialState,
  reducers: {
    setPokemonsCount: (state, action) => {
      state.pokemonsCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentPokemon: (state, action) => {
      state.currentPokemon = action.payload;
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setPokeTypes: (state, action) => {
      state.pokeTypes = action.payload;
    },
    setListType: (state, action) => {
      state.listType = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    clearAll: state => {
      state = initialState;
    },
  },
});

export const {
  setPokemons,
  setCurrentPokemon,
  setPokemonsCount,
  setCurrentPage,
  setPokeTypes,
  setListType,
  setSelectedType,
  clearAll,
} = mainSlice.actions;

export default mainSlice.reducer;
