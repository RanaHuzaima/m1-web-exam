import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../shared/api";
import type {
  CustomerModel,
  UpdateCustomerModel,
} from "../models/CustomerModel";
import type { PurchaseModel } from "../models/PurchaseModel";

export const useCustomerDetailsProvider = (customerId: string) => {
  const [customer, setCustomer] = useState<CustomerModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [purchases, setPurchases] = useState<PurchaseModel[]>([]);
  const [isPurchasesLoading, setIsPurchasesLoading] = useState<boolean>(true);

  const load = () => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/customers/${customerId}`)
      .then((result) => setCustomer(result.data))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadPurchases = () => {
    setIsPurchasesLoading(true);
    axios
      .get(`${API_URL}/customers/${customerId}/bikes`)
      .then((result) => setPurchases(result.data))
      .finally(() => {
        setIsPurchasesLoading(false);
      });
  };

  // Returns the request so the caller can react to errors
  const updateCustomer = (input: UpdateCustomerModel) =>
    axios
      .patch<CustomerModel>(`${API_URL}/customers/${customerId}`, input)
      .then((result) => setCustomer(result.data));

  const createPurchase = (input: { bikeId: string; quantity: number }) =>
    axios
      .post(`${API_URL}/customers/${customerId}/bikes`, input)
      .then(() => {
        loadPurchases();
      });

  return {
    customer,
    load,
    isLoading,
    updateCustomer,
    purchases,
    loadPurchases,
    isPurchasesLoading,
    createPurchase,
  };
};
