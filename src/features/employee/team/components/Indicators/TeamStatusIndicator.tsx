import React from "react";

import Badge from "@/components/ui/badge/Badge";

const TeamStatusIndicator = ({ status }: { status?: boolean }) => {
  let text = "";
  const getStatus = (status: boolean | undefined) => {
    switch (status) {
      case true:
        text = "Aktif Ekip";
        return "success";
      case false:
        text = "Pasif Ekip";
        return "error";
      default:
        break;
    }
  };
  return (
    <div>
      <Badge key={1} color={getStatus(status)}>
        {text}
      </Badge>
    </div>
  );
};

export default TeamStatusIndicator;
