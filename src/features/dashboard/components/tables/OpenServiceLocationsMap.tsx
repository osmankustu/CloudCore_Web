"use client";
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRequestAction } from "@/core/hooks/useRequestAction";
import { useDashboardStore } from "../../store/useDashboardStore";
import { FcExpand } from "react-icons/fc";

const OpenServiceLocationsMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const router = useRouter();
  const [openCities, setOpenCities] = useState<string[]>([]);
  const { openServiceLocations, fetchOpenServiceLocations } = useDashboardStore();
  const { run } = useRequestAction();

  const toggleCity = (cityName: string, koordinat?: [number, number]) => {
    setOpenCities(prev =>
      prev.includes(cityName) ? prev.filter(c => c !== cityName) : [...prev, cityName],
    );
    if (koordinat && mapInstance.current) {
      mapInstance.current.flyTo(koordinat, 10, {
        animate: true,
        duration: 0.6,
      });
    }
  };

  useEffect(() => {
    run(async () => {
      fetchOpenServiceLocations();
    });
  }, []);

  useEffect(() => {
    if (!openServiceLocations) return;
    if (!Array.isArray(openServiceLocations.items)) {
      return;
    }

    if (mapRef.current && !mapInstance.current) {
      const map = L.map(mapRef.current).setView([36.883, 30.65], 8);
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      openServiceLocations?.items.forEach(il => {
        il.states.forEach(ilce => {
          console.log(ilce.name, ilce.lat, ilce.lon);
          if (ilce.lat && ilce.lon) {
            const circle = L.circle([ilce.lat, ilce.lon], {
              radius: ilce.serviceCount * 400,
              color: "#2563eb",
              weight: 1,
              fillColor: "#3b82f6",
              fillOpacity: 0.3,
            }).addTo(map);

            circle.bindPopup(`
              <div style="font-size: 14px">
                <strong>${ilce.name}</strong><br/>
                ${ilce.serviceCount} servis kaydı<br/>
                <button 
                  data-ilce="${ilce.name}" 
                  class="go-to-servisler" 
                  style="margin-top: 6px; color: #2563eb; text-decoration: underline; cursor: pointer; background: none; border: none;"
                >
                  Servis kayıtlarına git
                </button>
              </div>
            `);
          }

          // ilce.mahalleler?.forEach((mahalle) => {
          //   const renk =
          //     mahalle.priority === "high"
          //       ? "red"
          //       : mahalle.priority === "medium"
          //       ? "yellow"
          //       : "green";

          //   L.circle(mahalle.koordinat, {
          //     radius: 100,
          //     color: renk,
          //     weight: 1,
          //     fillColor: renk,
          //     fillOpacity: 0.8,
          //   })
          //     .addTo(map)
          //     .bindTooltip(
          //       `${mahalle.name} (${mahalle.serviceCount})`,
          //       { permanent: false, direction: "top" }
          //     );
          // });

          // // Mahalleleri ekle
          // ilce.mahalleler.forEach((mahalle) => {
          //   const colorMap = {
          //     low: "green",
          //     medium: "orange",
          //     high: "red",
          //   };

          //   L.circleMarker(mahalle.koordinat, {
          //     radius: 6,
          //     color: colorMap[mahalle.priority],
          //     fillColor: colorMap[mahalle.priority],
          //     fillOpacity: 0.7,
          //     weight: 1,
          //   })
          //     .addTo(map)
          //     .bindTooltip(`${mahalle.name} (${mahalle.priority})`, {
          //       permanent: false,
          //       direction: "top",
          //     });
          // });
        });
      });

      map.on("popupopen", () => {
        const buttons = document.querySelectorAll(".go-to-servisler");
        buttons.forEach(btn => {
          btn.addEventListener("click", () => {
            const ilce = (btn as HTMLButtonElement).dataset.ilce;

            if (ilce) {
              const query = new URLSearchParams();
              query.set("filter", `district:${ilce};`);
              router.push(`/servicerecords?${query.toString()}`);
            }
          });
        });
      });
    }
  }, [openServiceLocations]);

  const flyToIlce = (coord: [number, number]) => {
    if (mapInstance.current) {
      mapInstance.current.flyTo(coord, 13, {
        animate: true,
        duration: 0.6,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <motion.div
        className="col-span-2 overflow-hidden rounded-2xl border bg-white shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div ref={mapRef} className="h-[500px] w-full" />
      </motion.div>

      <motion.div
        className="h-[500px] overflow-y-auto rounded-2xl border bg-white p-4 shadow-lg dark:bg-gray-900"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {openServiceLocations?.items.map((il, ilIdx) => {
          const isOpen = openCities.includes(il.name);

          return (
            <div key={ilIdx} className="mb-4">
              <button
                className="flex w-full items-center justify-between rounded-md px-2 py-2 font-semibold text-gray-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white/90"
                onClick={() => toggleCity(il.name, [il.lat, il.lon])}
              >
                <span>
                  {il.name}
                  <span className="text-sm text-gray-500"> ({il.totalServiceCount} servis)</span>
                </span>
                {isOpen ? <FcExpand size={20} /> : <FcExpand size={20} />}
              </button>

              {isOpen && (
                <ul className="mt-2 space-y-2">
                  {il.states.map((ilce, idx) => (
                    <li
                      key={idx}
                      className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-2 transition hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-600"
                      onClick={() => flyToIlce([ilce.lat, ilce.lon])}
                    >
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        {ilce.name}
                      </span>
                      <span className="text-sm text-blue-600">{ilce.serviceCount} servis</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OpenServiceLocationsMap;
