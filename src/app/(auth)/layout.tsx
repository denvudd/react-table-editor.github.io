import React from "react";

interface LoginLayoutPros {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutPros> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default LoginLayout;
