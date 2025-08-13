// components/DateRangePicker.tsx
"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dateString: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onChange }) => {
  const turkishMonths = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const turkishWeekDays = ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"];
  const [start, setStart] = useState<Date | null>(startDate);
  const [end, setEnd] = useState<Date | null>(endDate);
  const handleStartChange = (date: Date | null) => {
    setStart(date);
  };

  const handleEndChange = (date: Date | null) => {
    setEnd(date);
  };

  useEffect(() => {
    handle();
  }, [startDate, endDate]);

  const handle = () => {
    const dates: string[] = [];
    dates.push(start!.toISOString(), end!.toISOString());

    const datesStr = dates.join(",");

    onChange(datesStr);
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div>
        <DatePicker
          selected={start}
          onChange={handleStartChange}
          selectsStart
          startDate={start}
          endDate={end}
          dateFormat="dd.MM.yyyy"
          className="w-full rounded border px-3 py-1.5"
          placeholderText="Başlangıç tarihi"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-1">
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <span>
                {turkishMonths[date.getMonth()]} {date.getFullYear()}
              </span>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          formatWeekDay={nameOfDay => {
            const weekdayIndex = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].indexOf(
              nameOfDay.slice(0, 2),
            );
            return turkishWeekDays[weekdayIndex];
          }}
        />
      </div>
      <div>
        <DatePicker
          selected={end}
          onChange={handleEndChange}
          selectsEnd
          startDate={start}
          endDate={end}
          minDate={start!}
          dateFormat="dd.MM.yyyy"
          className="w-full rounded border px-3 py-1.5"
          placeholderText="Bitiş tarihi"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-1">
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <span>
                {turkishMonths[date.getMonth()]} {date.getFullYear()}
              </span>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          )}
          formatWeekDay={nameOfDay => {
            const weekdayIndex = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].indexOf(
              nameOfDay.slice(0, 2),
            );
            return turkishWeekDays[weekdayIndex];
          }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
