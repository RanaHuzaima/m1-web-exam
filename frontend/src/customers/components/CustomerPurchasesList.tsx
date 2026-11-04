import { Empty, Space } from "antd";
import Title from "antd/es/typography/Title";
import type { PurchaseModel } from "../models/PurchaseModel";
import { AddPurchaseButton } from "./AddPurchaseButton";
import { CustomerPurchaseListItem } from "./CustomerPurchaseListItem";

interface CustomerPurchasesListProps {
  purchases: PurchaseModel[];
  isLoading: boolean;
  createPurchase: (input: {
    bikeId: string;
    quantity: number;
  }) => Promise<void>;
}

export const CustomerPurchasesList = ({
  purchases,
  isLoading,
  createPurchase,
}: CustomerPurchasesListProps) => {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ width: "100%", display: "flex" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Purchases
        </Title>
        <AddPurchaseButton createPurchase={createPurchase} />
      </div>
      {isLoading ? (
        <Space
          direction="vertical"
          size="small"
          style={{ width: "100%", display: "flex" }}
        >
          {[0, 1, 2].map((index) => (
            <CustomerPurchaseListItem key={index} />
          ))}
        </Space>
      ) : purchases.length === 0 ? (
        <Empty description="No purchases yet" />
      ) : (
        <Space
          direction="vertical"
          size="small"
          style={{ width: "100%", display: "flex" }}
        >
          {purchases.map((purchase) => (
            <CustomerPurchaseListItem key={purchase.id} purchase={purchase} />
          ))}
        </Space>
      )}
    </Space>
  );
};
