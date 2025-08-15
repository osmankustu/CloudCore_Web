"use client";
import Button from "@/components/ui/button/Button";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";

const BillingCard = () => {
  const invoices = [
    { id: "#INV-001", date: "2025-07-01", amount: "₺120,00", status: "Ödendi" },
    { id: "#INV-002", date: "2025-08-01", amount: "₺120,00", status: "Bekliyor" },
  ];

  const plans = [
    {
      name: "Temel Plan",
      price: "₺120/ay",
      features: ["10 GB depolama", "Temel destek", "1 kullanıcı"],
      current: true,
    },
    {
      name: "Profesyonel Plan",
      price: "₺250/ay",
      features: ["100 GB depolama", "Öncelikli destek", "5 kullanıcı"],
      current: false,
    },
    {
      name: "Kurumsal Plan",
      price: "₺500/ay",
      features: ["Sınırsız depolama", "7/24 destek", "Sınırsız kullanıcı"],
      current: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Fatura Geçmişi */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          Fatura Geçmişi
        </h3>
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-y border-gray-100 dark:border-gray-800">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Fatura No
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Tarih
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Tutar
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Durum
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {invoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="text-theme-sm py-3 text-gray-800 dark:text-white/90">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {invoice.amount}
                  </TableCell>
                  <TableCell className="text-theme-sm py-3 text-gray-500 dark:text-gray-400">
                    {invoice.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Plan Değiştirme */}
      <div className="grid gap-6 sm:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-5 ${
              plan.current
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-800"
            }`}
          >
            <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
              {plan.name}
            </h4>
            <p className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{plan.price}</p>
            <ul className="mb-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {plan.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
            {plan.current ? (
              <Button size="sm" disabled>
                Mevcut Plan
              </Button>
            ) : (
              <Button size="sm">Bu Plana Geç</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingCard;
