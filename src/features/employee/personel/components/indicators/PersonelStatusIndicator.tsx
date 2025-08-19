import React from "react";

import Badge from "@/components/ui/badge/Badge";

const PersonelStatusIndicator = ({ status, text }: { status: boolean; text: string }) => {
  const getStatus = (status: boolean) => {
    switch (status) {
      case true:
        text = "Aktif Çalışan";
        return "success";
      case false:
        text = "Çalışmıyor";
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

export default PersonelStatusIndicator;
