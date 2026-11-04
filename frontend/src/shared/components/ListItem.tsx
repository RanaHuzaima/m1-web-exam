import { Row, theme } from "antd";
import type { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode | ReactNode[];
}

export const ListItem = ({ children }: ListItemProps) => {
  const {
    token: { colorBorderSecondary, colorFillTertiary, colorFillSecondary },
  } = theme.useToken();

  return (
    <Row
      align="middle"
      style={{
        border: `1px solid ${colorBorderSecondary}`,
        borderRadius: "8px",
        padding: "12px 16px",
        background: colorFillTertiary,
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colorFillSecondary;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colorFillTertiary;
      }}
    >
      {children}
    </Row>
  );
};
