import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../shared/api";
import type { BikeModel, UpdateBikeModel } from "../models/BikeModel";

export const useBikeDetailsProvider = (bikeId: string) => {
  const [bike, setBike] = useState<BikeModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    setIsLoading(true);
    axios
      .get<BikeModel>(`${API_URL}/bikes/${bikeId}`)
      .then((result) => setBike(result.data))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateBike = (input: UpdateBikeModel) =>
    axios
      .patch<BikeModel>(`${API_URL}/bikes/${bikeId}`, input)
      .then((result) => setBike(result.data));

  return { bike, load, isLoading, updateBike };
};
