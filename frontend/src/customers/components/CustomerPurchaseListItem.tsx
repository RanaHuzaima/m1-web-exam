import {
  CalendarOutlined,
  ShoppingOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Col, Skeleton, Space } from "antd";
import { ListItem } from "../../shared/components/ListItem";
import type { PurchaseModel } from "../models/PurchaseModel";

interface CustomerPurchaseListItemProps {
  // No purchase means it is still loading: the row keeps its shape with placeholders
  purchase?: PurchaseModel;
}

const formatPrice = (cents: number) =>
  (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" });

export const CustomerPurchaseListItem = ({
  purchase,
}: CustomerPurchaseListItemProps) => {
  const placeholder = <Skeleton.Input active size="small" />;

  return (
    <ListItem>
      <Col xs={24} sm={10}>
        <Space>
          <ShoppingOutlined style={{ color: "#1890ff" }} />
          {purchase ? (
            <>
              {`${purchase.bike.brand} ${purchase.bike.model}`}
              {purchase.bike.electric && (
                <ThunderboltOutlined style={{ color: "#faad14" }} aria-label="Electric" />
              )}
            </>
          ) : (
            placeholder
          )}
        </Space>
      </Col>
      <Col xs={24} sm={6}>
        <Space>
          <CalendarOutlined style={{ color: "#8c8c8c" }} />
          {purchase ? formatDate(purchase.soldAt) : placeholder}
        </Space>
      </Col>
      <Col xs={24} sm={4}>
        {purchase
          ? `${purchase.quantity} × ${formatPrice(purchase.unitPriceCents)}`
          : placeholder}
      </Col>
      <Col xs={24} sm={4} style={{ textAlign: "right", fontWeight: "bold" }}>
        {purchase
          ? formatPrice(purchase.quantity * purchase.unitPriceCents)
          : placeholder}
      </Col>
    </ListItem>
  );
};
