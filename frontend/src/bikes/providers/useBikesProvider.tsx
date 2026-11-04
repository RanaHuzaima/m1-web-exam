import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../shared/api";
import type { BikeModel, CreateBikeModel } from "../models/BikeModel";

type BikesPageResponse = {
  totalCount: number;
  bikes: BikeModel[];
};

export const useBikesProvider = () => {
  const [bikes, setBikes] = useState<BikeModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const load = (pageToLoad: number = page) => {
    setIsLoading(true);
    axios
      .get<BikesPageResponse>(`${API_URL}/bikes`, {
        params: { page: pageToLoad, limit },
      })
      .then((result) => {
        setBikes(result.data.bikes);
        setTotalCount(result.data.totalCount);
        setPage(pageToLoad);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteBike = (id: string) =>
    axios.delete(`${API_URL}/bikes/${id}`).then(() => {
      load(page);
    });

  const createBike = (input: CreateBikeModel) =>
    axios.post<BikeModel>(`${API_URL}/bikes`, input).then(() => {
      // Go back to page 1 so the newly created bike is visible
      load(1);
    });

  return {
    bikes,
    totalCount,
    page,
    limit,
    load,
    isLoading,
    deleteBike,
    createBike,
  };
};
