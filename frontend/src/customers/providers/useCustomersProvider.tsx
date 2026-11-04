import axios from "axios";
import { useState } from "react";
import type {
  CreateCustomerModel,
  CustomerModel,
} from "../models/CustomerModel";

type CustomersPageResponse = {
  totalCount: number;
  customers: CustomerModel[];
};

export const useCustomersProvider = () => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const load = (pageToLoad: number = page) => {
    setIsLoading(true);
    axios
      .get<CustomersPageResponse>("http://localhost:3000/customers", {
        params: { page: pageToLoad, limit },
      })
      .then((result) => {
        setCustomers(result.data.customers);
        setTotalCount(result.data.totalCount);
        setPage(pageToLoad);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteCustomer = (id: string) => {
    axios.delete(`http://localhost:3000/customers/${id}`).then(() => {
      load(page);
    });
  };

  // Returns the request so the caller can react to errors (e.g. email already in use)
  const createCustomer = (input: CreateCustomerModel) =>
    axios
      .post<CustomerModel>("http://localhost:3000/customers", input)
      .then(() => {
        load(page);
      });

  return {
    customers,
    totalCount,
    page,
    limit,
    load,
    isLoading,
    deleteCustomer,
    createCustomer,
  };
};
