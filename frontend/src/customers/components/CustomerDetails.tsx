import { ArrowLeftOutlined, ContactsOutlined } from "@ant-design/icons";
import { Col, Row, Skeleton, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { ButtonLink } from "../../shared/components/ButtonLink";
import { useCustomerDetailsProvider } from "../providers/useCustomerDetailsProvider";
import { AddressCard } from "./AddressCard";
import { ContactCard } from "./ContactCard";
import { CustomerPurchasesList } from "./CustomerPurchasesList";
import { PersonalInformationCard } from "./PersonalInformationCard";

interface CustomerDetailsProps {
  customerId: string;
}

export const CustomerDetails = ({ customerId }: CustomerDetailsProps) => {
  const {
    customer,
    isLoading,
    load,
    updateCustomer,
    purchases,
    isPurchasesLoading,
    loadPurchases,
  } = useCustomerDetailsProvider(customerId);

  useEffect(() => {
    load();
    loadPurchases();
  }, [customerId]);

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <ButtonLink to="/customers" icon={<ArrowLeftOutlined />}>
        Back to customers
      </ButtonLink>

      <Space align="center">
        <ContactsOutlined style={{ fontSize: "1.5rem", color: "#1890ff" }} />
        {isLoading ? (
          <Skeleton.Input active size="large" />
        ) : (
          <Title level={2} style={{ margin: 0 }}>
            {customer
              ? `${customer.lastName} ${customer.firstName}`
              : "Customer not found"}
          </Title>
        )}
      </Space>

      <Row gutter={[16, 16]} style={{ alignSelf: "stretch" }}>
        <Col xs={24} md={12}>
          <ContactCard
            customer={customer}
            isLoading={isLoading}
            updateCustomer={updateCustomer}
          />
        </Col>
        <Col xs={24} md={12}>
          <PersonalInformationCard
            customer={customer}
            isLoading={isLoading}
            updateCustomer={updateCustomer}
          />
        </Col>
        <Col span={24}>
          <AddressCard
            customer={customer}
            isLoading={isLoading}
            updateCustomer={updateCustomer}
          />
        </Col>
        <Col span={24}>
          <CustomerPurchasesList
            purchases={purchases}
            isLoading={isPurchasesLoading}
          />
        </Col>
      </Row>
    </Space>
  );
};
