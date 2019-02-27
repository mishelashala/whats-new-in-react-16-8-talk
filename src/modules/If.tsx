import React from "react";

export interface IIfProps {
  predicate: boolean;
}

export const If: React.SFC<IIfProps> = props => {
  return props.predicate && (props.children as any);
};
