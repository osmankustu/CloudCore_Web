// MultiDatePickerComponent.tsx

// to-do kullanıma göre yeniden yazılacak
"use client";
import "react-multi-date-picker/styles/colors/teal.css";

import React from "react";

interface MultiDatePickerProps {
  onChange: (dates: string[]) => void;
  placeholder?: string;
  label?: string;
}

const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  // onChange,
  // placeholder = "Tarih seç",
  label,
}) => {
  // const [selectedDates, setSelectedDates] = useState<any[]>([]);

  // const handleChange = (dates: any) => {
  //   setSelectedDates(dates);
  //   const formatted = dates.map(d => toPayloadDateFormat(d)).join(",");
  //   console.log(formatted);
  //   onChange(formatted);
  // };

  // const turkishMonths = [
  //   ["ocak", "oca"],
  //   ["şubat", "şb"],
  //   ["mart", "mr"],
  //   ["nisan", "ni"],
  //   ["mayıs", "my"],
  //   ["haziran", "hz"],
  //   ["temmuz", "tm"],
  //   ["ağustos", "ag"],
  //   ["eylül", "ey"],
  //   ["ekim", "ek"],
  //   ["kasım", "ka"],
  //   ["aralık", "ar"],
  // ];

  // const turkishWeekDays = [
  //   ["pazar", "paz"],
  //   ["pazartesi", "pts"],
  //   ["salı", "sal"],
  //   ["çarşamba", "çar"],
  //   ["perşembe", "per"],
  //   ["cuma", "cum"],
  //   ["cumartesi", "cts"],
  // ];

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-white">{label}</label>
      )}
      {/* <DatePicker
        multiple
        value={selectedDates}
        onChange={handleChange}
        format="YYYY-MM-DD"
        className="teal"
        months={turkishMonths}
        weekDays={turkishWeekDays}
        placeholder={placeholder}
        calendarPosition="bottom-left"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedDates.map((d, i) => (
          <span key={i} className="bg-brand-100 dark:bg-brand-800 rounded px-2 py-1 text-sm">
            {d.format("YYYY-MM-DD")}
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default MultiDatePicker;
