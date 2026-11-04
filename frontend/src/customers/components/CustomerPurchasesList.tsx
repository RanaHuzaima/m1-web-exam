import { Empty, Space } from "antd";
import Title from "antd/es/typography/Title";
import type { PurchaseModel } from "../models/PurchaseModel";
import { CustomerPurchaseListItem } from "./CustomerPurchaseListItem";

interface CustomerPurchasesListProps {
  purchases: PurchaseModel[];
  isLoading: boolean;
}

export const CustomerPurchasesList = ({
  purchases,
  isLoading,
}: CustomerPurchasesListProps) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: "100%", display: "flex" }}>
      <Title level={3} style={{ margin: 0 }}>
        Purchases
      </Title>
      {isLoading ? (
        <Space direction="vertical" size="small" style={{ width: "100%", display: "flex" }}>
          {[0, 1, 2].map((index) => <CustomerPurchaseListItem key={index} />)}
        </Space>
      ) : purchases.length === 0 ? (
        <Empty description="No purchases yet" />
      ) : (
        <Space direction="vertical" size="small" style={{ width: "100%", display: "flex" }}>
          {purchases.map((purchase) => (
            <CustomerPurchaseListItem key={purchase.id} purchase={purchase} />
          ))}
        </Space>
      )}
    </Space>
  );
};
