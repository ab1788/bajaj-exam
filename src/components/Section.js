import React from "react";

const Section = ({ section, formData, setFormData, errors, setErrors }) => {
  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldId]: "",
    }));
  };

  return (
    <div>
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      {section.fields.map((field) => {
        const value = formData[field.fieldId] || "";
        const error = errors[field.fieldId];
        const commonProps = {
          value,
          placeholder: field.placeholder || "",
          onChange: (e) => handleChange(field.fieldId, e.target.value),
          "data-testid": field.dataTestId,
        };

        return (
          <div key={field.fieldId}>
            <label>{field.label}</label>
            {["text", "email", "tel", "date"].includes(field.type) && (
              <input type={field.type} {...commonProps} />
            )}
            {field.type === "textarea" && <textarea {...commonProps} />}
            {field.type === "dropdown" && (
              <select
                {...commonProps}
                onChange={(e) => handleChange(field.fieldId, e.target.value)}
              >
                <option value="">Select</option>
                {field.options?.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    data-testid={opt.dataTestId}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {field.type === "radio" &&
              field.options?.map((opt) => (
                <label key={opt.value}>
                  <input
                    type="radio"
                    name={field.fieldId}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={() => handleChange(field.fieldId, opt.value)}
                    data-testid={opt.dataTestId}
                  />
                  {opt.label}
                </label>
              ))}
            {field.type === "checkbox" &&
              field.options?.map((opt) => (
                <label key={opt.value}>
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={Array.isArray(value) && value.includes(opt.value)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const newValue = isChecked
                        ? [...(value || []), opt.value]
                        : (value || []).filter((v) => v !== opt.value);
                      handleChange(field.fieldId, newValue);
                    }}
                    data-testid={opt.dataTestId}
                  />
                  {opt.label}
                </label>
              ))}
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default Section;
