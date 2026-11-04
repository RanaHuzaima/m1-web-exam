import { Outlet } from "@tanstack/react-router";
import { Layout as AntLayout, Typography, theme } from "antd";
import { AppMenu } from "./AppMenu";

const { Header, Content, Footer } = AntLayout;
const { Title } = Typography;

export const Layout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
          borderBottom: "1px solid #f0f0f0",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", width: "100%", maxWidth: 1200, margin: "0 auto" }}>
          <Title level={3} style={{ margin: 0, color: "#1890ff" }}>
            Bikez.ai
          </Title>
          <div style={{ flex: 1 }}>
            <AppMenu />
          </div>
        </div>
      </Header>
      <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Bikez.ai ©{new Date().getFullYear()} Created for M1 Web Exam
      </Footer>
    </AntLayout>
  );
};
