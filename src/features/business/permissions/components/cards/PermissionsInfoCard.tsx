"use client";
import { useEffect, useState } from "react";
import { useOperationClaimStore } from "../../store/useOperationClaimStore";
import { OperationClaimModel } from "../../model/operationClaim";
import { useRequestAction } from "@/core/hooks/useRequestAction";

type Role = {
  id: number;
  name: string;
  label: string;
  description: string;
};

type RoleGroup = {
  title: string;
  roles: OperationClaimModel[];
};

function groupRoles(roles: OperationClaimModel[] | undefined): RoleGroup[] {
  const groups: { [key: string]: OperationClaimModel[] } = {};

  roles?.forEach(role => {
    const [prefix] = role.name.split(".");

    let groupTitle: string;

    switch (prefix) {
      case "service":
        groupTitle = "Servis Yetkileri";
        break;
      case "customer":
        groupTitle = "Müşteri Yetkileri";
        break;
      default:
        // prefix varsa prefix üzerinden isim üretelim
        groupTitle = prefix
          ? `${prefix.charAt(0).toUpperCase()}${prefix.slice(1)} Yetkileri`
          : "Genel Yetkiler";
    }

    if (!groups[groupTitle]) groups[groupTitle] = [];
    groups[groupTitle].push(role);
  });

  return Object.entries(groups).map(([title, roles]) => ({
    title,
    roles,
  }));
}

export default function PermissionInfoCard() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { OperationClaimOptions, fetchOperationClaimOptions } = useOperationClaimStore();
  const { run } = useRequestAction();

  const hiddenPrefixes = ["auth", "operationclaims", "useroperationclaims", "admin", "users"]; // Bu prefix ile başlayan roller görünmez

  function shouldHideRole(roleName: string) {
    const [prefix, action] = roleName.split(".");

    // Prefix kontrolü
    if (hiddenPrefixes.includes(prefix)) return true;

    return false;
  }

  const visibleRoles = OperationClaimOptions?.items.filter(
    role => !shouldHideRole(role.name.toLocaleLowerCase()),
  );

  useEffect(() => {
    run(async () => {
      fetchOperationClaimOptions();
    });
  }, []);

  return (
    <div className="mx-auto p-6">
      <h1 className="mb-4 text-2xl font-bold">Yetki Açıklamaları</h1>
      <p className="mb-6 text-gray-600">
        Bu sayfada sistemde tanımlı olan yetkilerin açıklamalarını bulabilirsiniz.
      </p>

      {groupRoles(visibleRoles).map(group => (
        <div key={group.title} className="mb-4 rounded-lg border">
          <button
            onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
            className="w-full rounded-t-lg bg-gray-100 px-4 py-3 text-left font-medium"
          >
            {group.title}
          </button>
          {openGroup === group.title && (
            <div className="space-y-3 px-4 py-3">
              {group.roles.map(role => (
                <div key={role.id} className="border-b pb-2 last:border-b-0">
                  <div className="font-semibold">{role.label}</div>
                  <div className="text-sm text-gray-600">{role.description}</div>
                  <div className="text-xs text-gray-400 italic">{role.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
