import { Flex } from "antd";
import React from "react";

function Chart({ budgetLimit, totalSpent }) {
  return (
    <Flex vertical>
      <div>{budgetLimit}</div>
      <div>{totalSpent}</div>
    </Flex>
  );
}

export default Chart;
