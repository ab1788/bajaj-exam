import React, { useState } from "react";
import Section from "./Section";

const DynamicForm = ({ form }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateSection = () => {
    const section = form.sections[currentSection];
    const newErrors = {};

    section.fields.forEach((field) => {
      const value = formData[field.fieldId];
      if (field.required && !value) {
        newErrors[field.fieldId] = field.validation?.message || "Required";
      } else if (field.minLength && value.length < field.minLength) {
        newErrors[field.fieldId] = `Minimum ${field.minLength} characters`;
      } else if (field.maxLength && value.length > field.maxLength) {
        newErrors[field.fieldId] = `Maximum ${field.maxLength} characters`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateSection()) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const prev = () => {
    setCurrentSection((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Collected Form Data:", formData);
      alert("Form submitted! Check console.");
    }
  };

  const isLast = currentSection === form.sections.length - 1;

  return (
    <div>
      <h2>{form.formTitle}</h2>
      <Section
        section={form.sections[currentSection]}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
      <div>
        {currentSection > 0 && <button onClick={prev}>Previous</button>}
        {!isLast && <button onClick={next}>Next</button>}
        {isLast && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default DynamicForm;
