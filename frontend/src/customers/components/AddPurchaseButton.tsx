import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  InputNumber,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import type { BikeModel } from "../../bikes/models/BikeModel";
import { API_URL } from "../../shared/api";

interface AddPurchaseButtonProps {
  createPurchase: (input: {
    bikeId: string;
    quantity: number;
  }) => Promise<void>;
}

const formatPrice = (priceCents: number) =>
  (priceCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });

export const AddPurchaseButton = ({
  createPurchase,
}: AddPurchaseButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingBikes, setIsLoadingBikes] = useState(false);
  const [bikes, setBikes] = useState<BikeModel[]>([]);
  const [bikeId, setBikeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(1);
  const [error, setError] = useState<string | null>(null);

  const loadBikes = () => {
    setIsLoadingBikes(true);
    axios
      .get<{ bikes: BikeModel[] }>(`${API_URL}/bikes`, {
        params: { page: 1, limit: 50 },
      })
      .then((result) => setBikes(result.data.bikes))
      .finally(() => setIsLoadingBikes(false));
  };

  useEffect(() => {
    if (isOpen) loadBikes();
  }, [isOpen]);

  const close = () => {
    setBikeId(null);
    setQuantity(1);
    setError(null);
    setIsOpen(false);
  };

  const onConfirm = () => {
    if (!bikeId) {
      setError("Please select a bike");
      return;
    }
    if (quantity == null || quantity < 1 || !Number.isInteger(quantity)) {
      setError("Quantity must be a positive whole number");
      return;
    }

    setIsSaving(true);
    setError(null);
    createPurchase({ bikeId, quantity })
      .then(close)
      .catch(() => setError("Could not record the purchase"))
      .finally(() => setIsSaving(false));
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Add purchase
      </Button>
      <Modal
        open={isOpen}
        title="New purchase"
        okText="Add purchase"
        onCancel={close}
        onOk={onConfirm}
        confirmLoading={isSaving}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <div>
            <label htmlFor="purchase-bike">Bike *</label>
            <Select
              id="purchase-bike"
              style={{ width: "100%" }}
              placeholder="Select a bike"
              loading={isLoadingBikes}
              value={bikeId}
              onChange={(value) => {
                setBikeId(value);
                setError(null);
              }}
              options={bikes.map((bike) => ({
                value: bike.id,
                label: `${bike.brand} ${bike.model} — ${formatPrice(bike.priceCents)}`,
              }))}
              showSearch
              optionFilterProp="label"
            />
          </div>
          <div>
            <label htmlFor="purchase-quantity">Quantity *</label>
            <InputNumber
              id="purchase-quantity"
              style={{ width: "100%" }}
              min={1}
              step={1}
              value={quantity}
              onChange={(value) => {
                setQuantity(value);
                setError(null);
              }}
            />
          </div>
          {error && <Typography.Text type="danger">{error}</Typography.Text>}
        </Space>
      </Modal>
    </>
  );
};
