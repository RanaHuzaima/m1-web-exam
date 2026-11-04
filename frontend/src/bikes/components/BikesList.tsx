import { Pagination, Skeleton, Space, Typography } from "antd";
import { useEffect } from "react";
import { useBikesProvider } from "../providers/useBikesProvider";
import { AddBikeButton } from "./AddBikeButton";
import { BikeListItem } from "./BikeListItem";

export const BikesList = () => {
  const {
    bikes,
    totalCount,
    page,
    limit,
    deleteBike,
    createBike,
    isLoading,
    load,
  } = useBikesProvider();

  useEffect(() => {
    load(1);
  }, []);

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography.Title level={2} style={{ margin: 0 }}>Bikes</Typography.Title>
        <AddBikeButton createBike={createBike} />
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <Space direction="vertical" size="small" style={{ display: "flex" }}>
          {bikes.map((bike) => (
            <BikeListItem key={bike.id} bike={bike} deleteBike={deleteBike} />
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
