import { Pagination, Skeleton, Space, Typography } from "antd";
import { useEffect } from "react";
import { useCustomersProvider } from "../providers/useCustomersProvider";
import { AddCustomerButton } from "./AddCustomerButton";
import { CustomerListItem } from "./CustomerListItem";

export const CustomersList = () => {
  const {
    customers,
    totalCount,
    page,
    limit,
    deleteCustomer,
    createCustomer,
    isLoading,
    load,
  } = useCustomersProvider();

  useEffect(() => {
    load(1);
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography.Title level={2} style={{ margin: 0 }}>Customers</Typography.Title>
        <AddCustomerButton createCustomer={createCustomer} />
      </div>
      
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          {customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              customer={customer}
              deleteCustomer={deleteCustomer}
            />
          ))}
        </Space>
      )}
      
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={limit}
          total={totalCount}
          onChange={(nextPage) => load(nextPage)}
          showSizeChanger={false}
        />
      </div>
    </Space>
  );
};
