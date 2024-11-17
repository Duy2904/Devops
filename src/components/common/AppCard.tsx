import { Card } from "antd";
import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const AppCard = ({ children, className = "" }: Props) => {
  return (
    <Card
      className={classNames("rounded-2xl", className)}
      classNames={{
        body: "!p-4",
      }}>
      {children}
    </Card>
  );
};

export default AppCard;
