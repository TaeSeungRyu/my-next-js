"use client";
import { use, useEffect, useState } from "react";
import FormElement from "../components/FormElement";

export default function Test2Example() {
  const [formData, setFormData] = useState({
    textInput: "",
    selectInput: "",
    radioInput: "",
  });

  const handleChange = (name: any, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setTimeout(() => {
      setFormData((prev) => ({ ...prev, textInput: "Hello, World!" }));
    }, 3000);
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">동적 폼데이터 만들어 보기</h1>

      <FormElement
        type="text"
        name="textInput"
        label="텍스트 샘플"
        value={formData.textInput}
        onChange={handleChange}
      />

      <FormElement
        type="select"
        name="selectInput"
        label="셀렉트"
        options={[
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
          { label: "Option 3", value: "option3" },
        ]}
        value={formData.selectInput}
        onChange={handleChange}
      />

      <FormElement
        type="radio"
        name="radioInput"
        label="라디오"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        value={formData.radioInput}
        onChange={handleChange}
      />

      <div className="p-4 bg-gray-100 rounded dark:bg-gray-500">
        <h2 className="font-bold">Form Data 결과</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}
