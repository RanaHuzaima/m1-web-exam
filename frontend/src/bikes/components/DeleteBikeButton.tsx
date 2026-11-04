import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { isAxiosError } from "axios";
import { useState } from "react";
import type { BikeModel } from "../models/BikeModel";

interface DeleteBikeButtonProps {
  bike: BikeModel;
  deleteBike: (id: string) => Promise<void>;
}

export const DeleteBikeButton = ({
  bike,
  deleteBike,
}: DeleteBikeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onConfirm = () => {
    setIsDeleting(true);
    deleteBike(bike.id)
      .then(() => setIsOpen(false))
      .catch((error) => {
        if (isAxiosError(error) && error.response?.status === 409) {
          message.error("This bike cannot be deleted because it has sales");
        }
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <>
      <Button danger onClick={() => setIsOpen(true)}>
        <DeleteOutlined />
      </Button>
      <Modal
        okButtonProps={{ danger: true }}
        open={isOpen}
        title={`Deleting ${bike.brand} ${bike.model}`}
        onCancel={() => setIsOpen(false)}
        onOk={onConfirm}
        okText="Yes, delete"
        confirmLoading={isDeleting}
      >
        You are about to delete {bike.brand} {bike.model}. This action cannot be
        undone, are you sure?
      </Modal>
    </>
  );
};
