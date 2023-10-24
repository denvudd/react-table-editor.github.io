import React from "react";

interface TableLayoutPros {
  children: React.ReactNode;
}

const TableLayout: React.FC<TableLayoutPros> = ({ children }) => {
  return <div className="container mb-24">{children}</div>;
};

export default TableLayout;
