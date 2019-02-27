import React from "react";

export interface INavigationProps {
  title: string;
}

export const Navigation: React.SFC<INavigationProps> = ({ title }) => (
  <div className="top-bar">{title}</div>
);
