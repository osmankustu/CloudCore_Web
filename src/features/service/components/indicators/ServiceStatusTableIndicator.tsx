import React from "react";

import Badge from "@/components/ui/badge/Badge";

const ServiceStatusTableIndicator = ({
  serviceStatus,
  id,
  classname = "",
}: {
  serviceStatus: string;
  id: string;
  classname?: string;
}) => {
  const text: string[] = [];
  const getMessage = (serviceStatus: string) => {
    switch (serviceStatus) {
      case "isCreated":
        text.push("Kayıt Alındı");
        return "warning";
      case "isPending":
        text.push("Beklemede");
        return "warning";
      case "isStarted":
        text.push("Başladı");
        return "success";
      case "isContinue":
        text.push("Devam Ediyor");
        return "success";
      case "isComplated":
        text.push("Tamamlandı");
        return "success";
      case "isClosed":
        text.push("Kapatıldı");
        return "info";
      default:
        break;
    }
  };

  return (
    <div key={id} className={`${classname + " " + getMessage(serviceStatus)}`}>
      {text?.map((rec, index) => (
        <Badge size="sm" key={index} color={getMessage(serviceStatus)}>
          {text.pop()}
        </Badge>
      ))}
    </div>
  );
};

export default ServiceStatusTableIndicator;
