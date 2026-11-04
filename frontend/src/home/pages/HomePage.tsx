import { ContactsOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";
import { ButtonLink } from "../../shared/components/ButtonLink";

const { Title, Paragraph } = Typography;

export const HomePage = () => {
  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <div>
        <Title level={2}>Welcome to Bikez.ai</Title>
        <Paragraph>
          Manage your bike shop's customers and keep track of every bike they bought.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <ContactsOutlined style={{ color: "#1890ff" }} />
                Customers
              </Space>
            }
            style={{ height: "100%" }}
          >
            <Paragraph>
              Browse your customers, check their contact details and remove the ones you no longer need.
            </Paragraph>
            <ButtonLink to="/customers" type="primary">
              See customers
            </ButtonLink>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={
              <Space>
                <ShoppingOutlined style={{ color: "#1890ff" }} />
                Purchases
              </Space>
            }
            style={{ height: "100%" }}
          >
            <Paragraph>
              Open a customer's page to see the bikes they bought, when, and for how much.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};
