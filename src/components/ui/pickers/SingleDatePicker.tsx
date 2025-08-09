"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const SingleDatePicker = ({
  text,
  defaultValue,
  onSelected,
}: {
  text?: string;
  defaultValue?: Date | null | undefined;
  onSelected: (value: string) => void;
}) => {
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
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleSelectDate = (date: Date | null | undefined) => {
    setSelectedDate(date!);
    const selectedDateStr = selectedDate?.toISOString();
    onSelected(selectedDateStr!);
  };

  const startDate: Date = new Date();

  return (
    <>
      <div className="w-full">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
          {text ? text : "Tarih Seç"}
        </label>
        <DatePicker
          selected={selectedDate ?? defaultValue}
          onChange={handleSelectDate}
          selectsStart
          startDate={new Date()}
          endDate={new Date()}
          dateFormat="dd.MM.yyyy"
          className="w-full rounded border px-3 py-2"
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
    </>
  );
};

export default SingleDatePicker;
