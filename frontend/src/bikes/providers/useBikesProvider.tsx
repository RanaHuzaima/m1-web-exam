import axios from "axios";
import { useState } from "react";
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
      .get<BikesPageResponse>("http://localhost:3000/bikes", {
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
    axios.delete(`http://localhost:3000/bikes/${id}`).then(() => {
      load(page);
    });

  const createBike = (input: CreateBikeModel) =>
    axios.post<BikeModel>("http://localhost:3000/bikes", input).then(() => {
      load(page);
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
