import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPokemonByType = createAsyncThunk(
  'pokemon/fetchPokemonByType',
  async (pokemonType: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${pokemonType}`);
    
    // Filtrar Pokémon con ID menor o igual a 151
    const filteredPokemon = response.data.pokemon.filter((pokemon: any) => {
      const pokemonId = parseInt(pokemon.pokemon.url.split('/').slice(-2, -1)[0], 10);
      return pokemonId <= 151;
    });

    return { ...response.data, pokemon: filteredPokemon };  
  }
);


interface PokemonState {
  data: any;  // 
  loading: boolean;
  error: string | null;
}


const initialPokemonState: PokemonState = {
  data: null,
  loading: false,
  error: null,
};


const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: initialPokemonState,
  extraReducers: (builder) => {
    builder

      .addCase(fetchPokemonByType.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPokemonByType.fulfilled, (state, action) => {
        state.data = action.payload;  // Set the data to the API response
        state.loading = false;
      })

      .addCase(fetchPokemonByType.rejected, (state, action) => {
        // Ensure we check for error message properly
        state.error = action.error.message || 'An unknown error occurred';
        state.loading = false;
      });
  },
  reducers: {} 
});


export default pokemonSlice.reducer;
