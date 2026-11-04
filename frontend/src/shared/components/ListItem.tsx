import { Row } from "antd";
import type { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode | ReactNode[];
}

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <Row
      align="middle"
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        padding: "12px 16px",
        background: "#fafafa",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f5ff")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#fafafa")}
    >
      {children}
    </Row>
  );
};
