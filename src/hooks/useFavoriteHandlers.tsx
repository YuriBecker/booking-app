import { Property } from "@/models/property";
import { RootState } from "@/store";
import { toggleFavorite } from "@/store/slices/favorites";
import { useDispatch, useSelector } from "react-redux";

const useFavoriteHandlers = () => {
  const dispatch = useDispatch();
  const favorites =
    useSelector((state: RootState) => state.favorites.favorites) || [];

  const isFavorite = (propertyId: Property["id"]) => {
    return favorites.some((property) => property.id === propertyId);
  };

  const handleToggleFavorite = (property: Property) => {
    dispatch(toggleFavorite(property));
  };

  return {
    favorites,
    isFavorite,
    handleToggleFavorite,
  };
};

export default useFavoriteHandlers;
