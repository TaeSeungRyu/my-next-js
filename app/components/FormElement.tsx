"use client";
import React, { memo } from "react";

const FormElement = memo(
  ({ type, name, options = [], label, value, onChange }: any) => {
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      if (onChange) {
        onChange(name, value); // 부모의 onChange로 값 전달
      }
    };

    switch (type) {
      case "text":
        return (
          <div>
            <label htmlFor={name} className="block mb-2 font-medium">
              {label}
            </label>
            <input
              type="text"
              id={name}
              name={name}
              value={value || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full dark:bg-gray-500"
            />
          </div>
        );

      case "select":
        return (
          <div>
            <label htmlFor={name} className="block mb-2 font-medium ">
              {label}
            </label>
            <select
              id={name}
              name={name}
              value={value || ""}
              onChange={handleChange}
              className="border rounded p-2 w-full dark:bg-gray-500"
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case "radio":
        return (
          <div>
            <label className="block mb-2 font-medium">{label}</label>
            {options.map((option: any) => (
              <div key={option.value} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  onChange={handleChange}
                  checked={value === option.value}
                  className="mr-2"
                />
                <label htmlFor={`${name}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <p className="text-red-500 dark:bg-gray-500">
            유효하지 않는 타입 입니다.
          </p>
        );
    }
  }
);

export default FormElement;
