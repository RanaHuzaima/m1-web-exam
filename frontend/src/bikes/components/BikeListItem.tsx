import { EyeOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Col, Row, Space, Tag } from "antd";
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
      <Col span={8}>
        <Space orientation="horizontal" style={{ width: "100%" }}>
          {bike.electric && <ThunderboltOutlined />}
          {`${bike.brand} ${bike.model}`}
        </Space>
      </Col>
      <Col span={6}>
        <Tag>{bike.category}</Tag>
      </Col>
      <Col span={6}>{formatPrice(bike.priceCents)}</Col>
      <Col span={4}>
        <Row gutter={[4, 4]}>
          <Col>
            <ButtonLink to="/bikes/$bikeId" params={{ bikeId: bike.id }}>
              <EyeOutlined />
            </ButtonLink>
          </Col>
          <Col>
            <DeleteBikeButton bike={bike} deleteBike={deleteBike} />
          </Col>
        </Row>
      </Col>
    </ListItem>
  );
};
