import React, { useState } from "react";
import useSlugify from "../../hooks/useSlugify";

export const EntryForm = props => {
  const [contentType, setContentType] = useState(props.contentType);
  const [fields, setFields] = useState(props.fields);
  const [entry, setEntry] = useState(props.entry);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const slugify = useSlugify(null);

  const onSubmit = e => {
    e.preventDefault();
    // need to add validation
    const error = "";
    const success = "Content type saved successfully.";
    setError(error);
    setSuccess(success);
    props.onSubmit({
      contentTypeId: contentType.id,
      entry
    });
  };
  const getFieldValue = (fieldType, fieldValue) => {
    return fields.find(field => field.slug === fieldType)[fieldValue];
  };
  const onFieldChange = e => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    let newEntry = entry;
    newEntry[fieldName] = fieldValue;
    setEntry(newEntry);
  };
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
