import {
  ContactsOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Space, Typography } from "antd";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { ListItem } from "../../shared/components/ListItem";
import type { CustomerModel } from "../models/CustomerModel";
import { DeleteCustomerButton } from "./DeleteUserButton";

interface CustomerListItemProps {
  customer: CustomerModel;
  deleteCustomer: (id: string) => void;
}

export const CustomerListItem = ({
  customer,
  deleteCustomer,
}: CustomerListItemProps) => {
  return (
    <ListItem>
      <Col xs={24} sm={8}>
        <Space>
          <ContactsOutlined style={{ color: "#1890ff" }} />
          <Typography.Text strong>{`${customer.lastName} ${customer.firstName}`}</Typography.Text>
        </Space>
      </Col>
      <Col xs={24} sm={8}>
        <Space>
          <MailOutlined style={{ color: "#8c8c8c" }} />
          <Typography.Text type="secondary">{customer.email}</Typography.Text>
        </Space>
      </Col>
      <Col xs={24} sm={4}>
        <Space>
          <PhoneOutlined style={{ color: "#8c8c8c" }} />
          <Typography.Text type="secondary">{customer.phone || "—"}</Typography.Text>
        </Space>
      </Col>
      <Col xs={24} sm={4} style={{ textAlign: "right" }}>
        <Space>
          <ButtonLink
            to={`/customers/$customerId`}
            params={{ customerId: customer.id }}
            icon={<EyeOutlined />}
          >
            View
          </ButtonLink>
          <DeleteCustomerButton
            customer={customer}
            deleteCustomer={deleteCustomer}
          />
        </Space>
      </Col>
    </ListItem>
  );
};
