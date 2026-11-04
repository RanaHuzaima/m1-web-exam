import { EyeOutlined, ThunderboltOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Col, Space, Tag, Typography } from "antd";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { ListItem } from "../../shared/components/ListItem";
import type { BikeModel } from "../models/BikeModel";
import { DeleteBikeButton } from "./DeleteBikeButton";

interface BikeListItemProps {
  bike: BikeModel;
  deleteBike: (id: string) => Promise<void>;
}

const formatPrice = (priceCents: number) =>
  (priceCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });

export const BikeListItem = ({ bike, deleteBike }: BikeListItemProps) => {
  return (
    <ListItem>
      <Col xs={24} sm={8}>
        <Space>
          {bike.electric ? <ThunderboltOutlined style={{ color: "#faad14" }} /> : <AppstoreOutlined style={{ color: "#1890ff" }} />}
          <Typography.Text strong>{`${bike.brand} ${bike.model}`}</Typography.Text>
        </Space>
      </Col>
      <Col xs={24} sm={6}>
        <Tag color="blue">{bike.category}</Tag>
      </Col>
      <Col xs={24} sm={6}>
        <Typography.Text type="secondary">{formatPrice(bike.priceCents)}</Typography.Text>
      </Col>
      <Col xs={24} sm={4} style={{ textAlign: "right" }}>
        <Space>
          <ButtonLink to="/bikes/$bikeId" params={{ bikeId: bike.id }} icon={<EyeOutlined />}>
            View
          </ButtonLink>
          <DeleteBikeButton bike={bike} deleteBike={deleteBike} />
        </Space>
      </Col>
    </ListItem>
  );
};
