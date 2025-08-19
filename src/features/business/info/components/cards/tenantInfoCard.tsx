import React from "react";

type Tenant = {
  name: string;
  code: string;
  description: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  logoUrl?: string;
  taxNumber?: string;
  invoiceAddress?: string;
};

interface TenantInfoProps {
  tenant: Tenant;
}

export default function TenantInfoPage() {
  return (
    <div className="mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Tenant Bilgileri</h1>

      {/* Temel Bilgiler */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Temel Bilgiler</h2>
        <p>
          <strong>Adı:</strong> {mockTenant.name}
        </p>
        <p>
          <strong>Kodu / ID:</strong> {mockTenant.code}
        </p>
        <p>
          <strong>Açıklama:</strong> {mockTenant.description}
        </p>
      </div>

      {/* İletişim Bilgileri */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">İletişim Bilgileri</h2>
        <p>
          <strong>Email:</strong> {mockTenant.email}
        </p>
        <p>
          <strong>Telefon:</strong> {mockTenant.phone}
        </p>
        {mockTenant.website && (
          <p>
            <strong>Web Sitesi:</strong> {mockTenant.website}
          </p>
        )}
      </div>

      {/* Adres Bilgileri */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Adres Bilgileri</h2>
        <p>
          {mockTenant.address.street}, {mockTenant.address.city}, {mockTenant.address.postalCode},{" "}
          {mockTenant.address.country}
        </p>
      </div>

      {/* Logo */}
      {mockTenant.logoUrl && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Logo</h2>
          <img src={mockTenant.logoUrl} alt="Tenant Logo" className="h-24 w-auto" />
        </div>
      )}

      {/* Vergi / Fatura */}
      {mockTenant.taxNumber && (
        <p>
          <strong>Vergi Numarası:</strong> {mockTenant.taxNumber}
        </p>
      )}
      {mockTenant.invoiceAddress && (
        <p>
          <strong>Fatura Adresi:</strong> {mockTenant.invoiceAddress}
        </p>
      )}
    </div>
  );
}

// Mock Data
export const mockTenant: Tenant = {
  name: "Osman Tech",
  code: "OT-001",
  description: "Yenilikçi yazılım çözümleri sunan bir firma.",
  email: "info@osmantech.com",
  phone: "+90 555 123 4567",
  website: "https://www.osmantech.com",
  address: {
    street: "Atatürk Caddesi No:10",
    city: "İstanbul",
    postalCode: "34000",
    country: "Türkiye",
  },
  logoUrl: "https://via.placeholder.com/150",
  taxNumber: "1234567890",
  invoiceAddress: "Atatürk Caddesi No:10, İstanbul, Türkiye",
};
