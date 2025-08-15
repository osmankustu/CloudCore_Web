"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCodeGenerator = ({ value }: { value: string }) => {
  return (
    <div>
      <div className="p-4">
        <QRCodeCanvas value={value} size={256} bgColor="#ffffff" fgColor="#000000" level="H" />
      </div>
    </div>
  );
};

export default QrCodeGenerator;
