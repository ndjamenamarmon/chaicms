import React, { useState } from "react";
import useSlugify from "../../hooks/useSlugify";
import MarkdownEditor from "./FormFields/MarkdownEditor";

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
    // console.log(entry);
    props.onSubmit({
      contentTypeId: contentType.id,
      entry
    });
  };
  const getFieldValue = (fieldType, fieldValue) => {
    return fields.find(field => field.apiKey === fieldType)[fieldValue];
  };
  const onFieldChange = e => {
    const fieldName = e.target.name;
    const fieldType = e.target.dataset ? e.target.dataset.type : undefined;
    const fieldValue = e.target.value;
    let newEntry = entry;

    if (fieldType === "Title") {
      {
        contentType.fields.map(fieldType => {
          if (getFieldValue(fieldType, "display") === "Slug") {
            const slug = useSlugify(fieldValue);
            const slugField = getFieldValue(fieldType, "apiKey");
            newEntry[slugField] = slug;
          }
        });
      }
    }

    newEntry[fieldName] = fieldValue;
    setEntry(newEntry);
  };
  const onMarkdownChange = (content, name) => {
    const fieldName = name;
    const fieldValue = content;
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
            <label className="label">
              {getFieldValue(fieldType, "name")}
              {getFieldValue(fieldType, "isRequired") && (
                <span className="fieldRequired">Required</span>
              )}
              {getFieldValue(fieldType, "type") === "Long Text" &&
                getFieldValue(fieldType, "display") === "Multiple line" && (
                  <textarea
                    className="textarea textarea--markdown"
                    name={getFieldValue(fieldType, "apiKey")}
                    value={entry[getFieldValue(fieldType, "apiKey")]}
                    onChange={onFieldChange}
                  />
                )}
              {getFieldValue(fieldType, "type") === "Long Text" &&
                getFieldValue(fieldType, "display") === "Markdown" && (
                  <MarkdownEditor
                    initialValue={entry[getFieldValue(fieldType, "apiKey")]}
                    name={getFieldValue(fieldType, "apiKey")}
                    onChange={onMarkdownChange}
                  />
                )}
              {getFieldValue(fieldType, "type") === "Short Text" &&
                getFieldValue(fieldType, "display") === "Single line" && (
                  <input
                    type="text"
                    className="text-input"
                    data-type={
                      contentType.titleField ===
                      getFieldValue(fieldType, "apiKey")
                        ? "Title"
                        : "Single Line"
                    }
                    name={getFieldValue(fieldType, "apiKey")}
                    value={entry[getFieldValue(fieldType, "apiKey")]}
                    onChange={onFieldChange}
                  />
                )}
              {getFieldValue(fieldType, "type") === "Short Text" &&
                getFieldValue(fieldType, "display") === "Slug" && (
                  <input
                    type="text"
                    className="text-input"
                    name={getFieldValue(fieldType, "apiKey")}
                    value={entry[getFieldValue(fieldType, "apiKey")]}
                    onChange={onFieldChange}
                  />
                )}
            </label>
            <span className="fieldHelpText">
              {getFieldValue(fieldType, "helpText")}
            </span>
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
