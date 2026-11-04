import { ArrowLeftOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Skeleton, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { useBikeDetailsProvider } from "../providers/useBikeDetailsProvider";
import { BikeDetailsCard } from "./BikeDetailsCard";

interface BikeDetailsProps {
  bikeId: string;
}

export const BikeDetails = ({ bikeId }: BikeDetailsProps) => {
  const { bike, isLoading, load, updateBike } = useBikeDetailsProvider(bikeId);

  useEffect(() => {
    load();
  }, [bikeId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 16,
        padding: ".25rem .5rem",
      }}
    >
      <ButtonLink to="/bikes" icon={<ArrowLeftOutlined />}>
        Back to bikes
      </ButtonLink>

      <Space align="center">
        <AppstoreOutlined style={{ fontSize: "1.5rem" }} />
        {isLoading ? (
          <Skeleton.Input active size="large" />
        ) : (
          <Title level={2} style={{ margin: 0 }}>
            {bike ? `${bike.brand} ${bike.model}` : "Bike not found"}
          </Title>
        )}
      </Space>

      <BikeDetailsCard
        bike={bike}
        isLoading={isLoading}
        updateBike={updateBike}
      />
    </div>
  );
};
