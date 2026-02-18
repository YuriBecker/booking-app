import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Property } from "@/models/property";

export type FavoritesState = {
  favorites: Property[];
};

const initialState: FavoritesState = {
  favorites: [],
};

const hasValidPropertyId = (
  property: Partial<Property>
): property is Property => {
  return typeof property.id === "string" && property.id.length > 0;
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Property>) => {
      if (!hasValidPropertyId(action.payload)) {
        return;
      }

      const favoriteExists = state.favorites.some(
        (property) => property.id === action.payload.id
      );

      if (favoriteExists) {
        return;
      }

      state.favorites.unshift(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Property["id"]>) => {
      state.favorites = state.favorites.filter(
        (property) => property.id !== action.payload
      );
    },
    toggleFavorite: (state, action: PayloadAction<Property>) => {
      if (!hasValidPropertyId(action.payload)) {
        return;
      }

      const favoriteExists = state.favorites.some(
        (property) => property.id === action.payload.id
      );

      if (favoriteExists) {
        state.favorites = state.favorites.filter(
          (property) => property.id !== action.payload.id
        );
        return;
      }

      state.favorites.unshift(action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
