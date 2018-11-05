import React, { useState } from "react";
import useSlugify from "../../hooks/useSlugify";

export const EntryForm = props => {
  const [contentType, setContentType] = useState(props.contentType);
  const [fields, setFields] = useState(props.fields);
  const [entry, setEntry] = useState({}); //need to go through the fields and populate this object with the keys and empty values
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const slugify = useSlugify(null);

  const onSubmit = e => {
    e.preventDefault();
  };
  const getFieldValue = (fieldType, fieldValue) => {
    return fields.find(field => field.slug === fieldType)[fieldValue];
  };
  const onFieldChange = e => {
    console.log(e.target.name);
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    let newEntry = entry;
    newEntry[fieldName] = fieldValue;
    console.log(newEntry);
    setEntry(newEntry);
  };
  console.log(fields);
  console.log(fields.find(field => field.slug === "title"));
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}
      {contentType.fields.map(fieldType => {
        return (
          <div key={fieldType}>
            <label className="label">{getFieldValue(fieldType, "name")}</label>
            {getFieldValue(fieldType, "type") === "Long Text" &&
              getFieldValue(fieldType, "display") === "Markdown" && (
                <textarea
                  className="textarea textarea--markdown"
                  name={getFieldValue(fieldType, "slug")}
                  value={entry[getFieldValue(fieldType, "slug")]}
                  onChange={onFieldChange}
                />
              )}
            {getFieldValue(fieldType, "type") === "Short Text" &&
              getFieldValue(fieldType, "display") === "Single line" && (
                <input
                  type="text"
                  className="text-input"
                  name={getFieldValue(fieldType, "slug")}
                  value={entry[getFieldValue(fieldType, "slug")]}
                  onChange={onFieldChange}
                />
              )}
          </div>
        );
      })}
      <div>
        <button className="button">Save {contentType.title}</button>
      </div>
    </form>
  );
};

export default EntryForm;
