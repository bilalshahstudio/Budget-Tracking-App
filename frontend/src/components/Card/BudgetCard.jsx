import React from "react";
import { StyledCard } from "./card.styles";

function BudgetCard({ ...props }) {
  return <StyledCard {...props} />;
}

export default BudgetCard;
