import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Input,
  InputNumber,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import type { ReactNode } from "react";
import { useState } from "react";
import type { BikeModel, UpdateBikeModel } from "../models/BikeModel";

interface BikeDetailsCardProps {
  bike: BikeModel | null;
  isLoading: boolean;
  updateBike: (input: UpdateBikeModel) => Promise<void>;
}

type TextField =
  | "brand"
  | "model"
  | "description"
  | "category"
  | "frameMaterial";

type NumberField =
  | "frameSizeCm"
  | "wheelSizeInches"
  | "gearCount"
  | "weightKg"
  | "priceCents";

type BikeFormValues = Record<TextField, string> &
  Record<NumberField, number | null> & { electric: boolean };

type BikeFormErrors = Partial<Record<TextField | NumberField, string>>;

const formatPrice = (priceCents: number) =>
  (priceCents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "EUR",
  });

const toValues = (bike: BikeModel): BikeFormValues => ({
  brand: bike.brand,
  model: bike.model,
  description: bike.description,
  category: bike.category,
  frameMaterial: bike.frameMaterial,
  frameSizeCm: bike.frameSizeCm,
  wheelSizeInches: bike.wheelSizeInches,
  gearCount: bike.gearCount,
  weightKg: bike.weightKg,
  priceCents: bike.priceCents,
  electric: bike.electric,
});

const validate = (values: BikeFormValues): BikeFormErrors => {
  const errors: BikeFormErrors = {};
  if (!values.brand.trim()) errors.brand = "Brand is required";
  if (!values.model.trim()) errors.model = "Model is required";
  if (!values.description.trim()) errors.description = "Description is required";
  if (!values.category.trim()) errors.category = "Category is required";
  if (!values.frameMaterial.trim())
    errors.frameMaterial = "Frame material is required";
  if (values.frameSizeCm == null || values.frameSizeCm <= 0)
    errors.frameSizeCm = "Frame size must be positive";
  if (values.wheelSizeInches == null || values.wheelSizeInches <= 0)
    errors.wheelSizeInches = "Wheel size must be positive";
  if (values.gearCount == null || values.gearCount < 1)
    errors.gearCount = "Gear count must be at least 1";
  if (values.weightKg == null || values.weightKg <= 0)
    errors.weightKg = "Weight must be positive";
  if (values.priceCents == null || values.priceCents < 0)
    errors.priceCents = "Price must be 0 or more";
  return errors;
};

export const BikeDetailsCard = ({
  bike,
  isLoading,
  updateBike,
}: BikeDetailsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [values, setValues] = useState<BikeFormValues | null>(null);
  const [errors, setErrors] = useState<BikeFormErrors>({});

  const startEditing = () => {
    if (!bike) return;
    setValues(toValues(bike));
    setErrors({});
    setIsEditing(true);
  };

  const cancel = () => {
    setValues(null);
    setErrors({});
    setIsEditing(false);
  };

  const save = () => {
    if (!values) return;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    updateBike({
      brand: values.brand.trim(),
      model: values.model.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      frameMaterial: values.frameMaterial.trim(),
      frameSizeCm: values.frameSizeCm!,
      wheelSizeInches: values.wheelSizeInches!,
      gearCount: values.gearCount!,
      weightKg: values.weightKg!,
      electric: values.electric,
      priceCents: values.priceCents!,
    })
      .then(cancel)
      .catch(() => {})
      .finally(() => setIsSaving(false));
  };

  const value = (content: ReactNode) =>
    isLoading ? <Skeleton.Input active size="small" /> : (content ?? "—");

  const items: DescriptionsProps["items"] = [
    { key: "brand", label: "Brand", children: value(bike?.brand) },
    { key: "model", label: "Model", children: value(bike?.model) },
    {
      key: "description",
      label: "Description",
      children: value(bike?.description),
    },
    { key: "category", label: "Category", children: value(bike?.category) },
    {
      key: "frameMaterial",
      label: "Frame material",
      children: value(bike?.frameMaterial),
    },
    {
      key: "frameSizeCm",
      label: "Frame size",
      children: value(bike && `${bike.frameSizeCm} cm`),
    },
    {
      key: "wheelSizeInches",
      label: "Wheel size",
      children: value(bike && `${bike.wheelSizeInches} in`),
    },
    { key: "gearCount", label: "Gears", children: value(bike?.gearCount) },
    {
      key: "weightKg",
      label: "Weight",
      children: value(bike && `${bike.weightKg} kg`),
    },
    {
      key: "electric",
      label: "Electric",
      children: value(bike ? (bike.electric ? "Yes" : "No") : null),
    },
    {
      key: "priceCents",
      label: "Price",
      children: value(bike && formatPrice(bike.priceCents)),
    },
  ];

  const textField = (name: TextField, label: string) =>
    values && (
      <>
        <label htmlFor={`bike-detail-${name}`}>{label}</label>
        <Input
          id={`bike-detail-${name}`}
          value={values[name]}
          status={errors[name] && "error"}
          onChange={(event) => {
            setValues({ ...values, [name]: event.target.value });
            setErrors({ ...errors, [name]: undefined });
          }}
        />
        {errors[name] && (
          <Typography.Text type="danger">{errors[name]}</Typography.Text>
        )}
      </>
    );

  const numberField = (name: NumberField, label: string) =>
    values && (
      <>
        <label htmlFor={`bike-detail-${name}`}>{label}</label>
        <InputNumber
          id={`bike-detail-${name}`}
          style={{ width: "100%" }}
          value={values[name]}
          status={errors[name] && "error"}
          onChange={(value) => {
            setValues({ ...values, [name]: value });
            setErrors({ ...errors, [name]: undefined });
          }}
        />
        {errors[name] && (
          <Typography.Text type="danger">{errors[name]}</Typography.Text>
        )}
      </>
    );

  return (
    <Card
      title="Bike details"
      style={{ width: "100%" }}
      extra={
        isEditing ? (
          <Space>
            <Button icon={<CloseOutlined />} onClick={cancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={isSaving}
              onClick={save}
            >
              Save
            </Button>
          </Space>
        ) : (
          <Button
            icon={<EditOutlined />}
            aria-label="Edit bike"
            disabled={!bike}
            onClick={startEditing}
          />
        )
      }
    >
      {isEditing && values ? (
        <Row gutter={[16, 16]}>
          <Col span={12}>{textField("brand", "Brand *")}</Col>
          <Col span={12}>{textField("model", "Model *")}</Col>
          <Col span={24}>{textField("description", "Description *")}</Col>
          <Col span={12}>{textField("category", "Category *")}</Col>
          <Col span={12}>{textField("frameMaterial", "Frame material *")}</Col>
          <Col span={8}>{numberField("frameSizeCm", "Frame size (cm) *")}</Col>
          <Col span={8}>
            {numberField("wheelSizeInches", "Wheel size (in) *")}
          </Col>
          <Col span={8}>{numberField("gearCount", "Gears *")}</Col>
          <Col span={8}>{numberField("weightKg", "Weight (kg) *")}</Col>
          <Col span={8}>{numberField("priceCents", "Price (cents) *")}</Col>
          <Col span={8}>
            <label htmlFor="bike-detail-electric">Electric</label>
            <div>
              <Checkbox
                id="bike-detail-electric"
                checked={values.electric}
                onChange={(event) =>
                  setValues({ ...values, electric: event.target.checked })
                }
              >
                Electric bike
              </Checkbox>
            </div>
          </Col>
        </Row>
      ) : (
        <Descriptions column={1} items={items} />
      )}
    </Card>
  );
};
