import React from "react";

import Badge from "@/components/ui/badge/Badge";

const PriortyStatusIndicator = ({ priorty }: { priorty: string }) => {
  const getPriorty = (priorty: string) => {
    switch (priorty) {
      case "Yüksek":
        return "error";
      case "Orta":
        return "warning";
      case "Düşük":
        return "success";

      default:
        break;
    }
  };

  return (
    <div>
      <Badge key={1} color={getPriorty(priorty)}>
        {priorty}
      </Badge>
    </div>
  );
};

export default PriortyStatusIndicator;
