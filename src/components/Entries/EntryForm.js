import React, { useState } from "react";
import moment from "moment";
import useSlugify from "../../hooks/useSlugify";
import MarkdownEditor from "./FormFields/MarkdownEditor";
import SingleDatePickerField from "./FormFields/SingleDatePickerField";

export const EntryForm = props => {
  const [contentType, setContentType] = useState(props.contentType);
  const [fields, setFields] = useState(props.fields);
  const [entries, setEntries] = useState(props.entries);
  const [entry, setEntry] = useState(props.entry);
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldError, setFieldError] = useState({ message: "", field: "" });
  const slugify = useSlugify(null);

  const onSubmit = e => {
    e.preventDefault();
    let error = "";
    // need to add validation

    contentType.fields.map(fieldType => {
      const entryValue = entry[fieldType];

      // enforce uniqueness if isUnique
      // TO DO: Check unique fields against database
      if (getFieldValue(fieldType, "isUnique")) {
        const valueExists = checkUniqueness(entryValue, fieldType);
        if (valueExists) {
          error = `${getFieldValue(fieldType, "name")} must be unique.`;
        }
      }

      // enforce required field
      if (getFieldValue(fieldType, "isRequired") && !entryValue) {
        error = "Please complete all required fields.";
      }
    });

    // TO DO: Require that required fields be filled out
    // const error = "";
    let success = "";
    if (!error) {
      success = "Content type saved successfully.";
    }
    setError(error);
    setSuccess(success);

    let newEntry = entry;

    entry.createdBy = props.entry.createdBy
      ? props.entry.createdBy
      : props.currentUser.uid;
    entry.lastUpdatedBy = props.currentUser.uid;
    entry.createdAt = props.entry.createdAt
      ? moment(props.entry.createdAt).valueOf()
      : moment().valueOf();
    entry.lastUpdated = moment().valueOf();

    setEntry(newEntry);

    // console.log(entry);
    props.onSubmit({
      contentTypeId: contentType.id,
      entry
    });
  };
  const getFieldValue = (fieldType, fieldValue) => {
    return fields.find(field => field.apiKey === fieldType)[fieldValue];
  };
  const checkUniqueness = (value, uniqueField) => {
    return entries.find(singleEntry => {
      return singleEntry[uniqueField] === value;
    });
  };
  const onFieldChange = e => {
    const fieldName = e.target.name;
    const fieldType = e.target.dataset ? e.target.dataset.type : undefined;
    const fieldIsUnique = e.target.dataset ? e.target.dataset.isunique : false;
    const fieldValue = e.target.value;
    let newEntry = entry;

    if (fieldType === "Title") {
      {
        contentType.fields.map(fieldType => {
          if (getFieldValue(fieldType, "display") === "Slug") {
            let slug = useSlugify(fieldValue);
            const slugField = getFieldValue(fieldType, "apiKey");

            // if the slug is a unique field, make the generated slug unique
            if ((getFieldValue(fieldType), "isUnique")) {
              // enforce uniqueness
              while (checkUniqueness(slug, slugField)) {
                slug =
                  slug +
                  Math.round(
                    Math.random() * (999999999 - 100000000) + 100000000
                  );
              }
            }

            newEntry[slugField] = slug;
          }
        });
      }
    }

    // enforce uniqueness if isUnique
    if (fieldIsUnique) {
      const valueExists = checkUniqueness(fieldValue, fieldName);
      if (valueExists) {
        setFieldError({
          message: "This value must be unique",
          field: fieldName
        });
      } else {
        setFieldError({ message: "", field: "" });
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
  const onDateChange = (content, name) => {
    const fieldName = name;
    const fieldValue = content.valueOf();
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
                    data-isunique={getFieldValue(fieldType, "isRequired")}
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
                    data-isunique={getFieldValue(fieldType, "isRequired")}
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
                    data-isunique={getFieldValue(fieldType, "isRequired")}
                    name={getFieldValue(fieldType, "apiKey")}
                    value={entry[getFieldValue(fieldType, "apiKey")]}
                    onChange={onFieldChange}
                  />
                )}
              {getFieldValue(fieldType, "type") === "Date and Time" &&
                getFieldValue(fieldType, "display") === "Date only" && (
                  <SingleDatePickerField
                    date={
                      entry[getFieldValue(fieldType, "apiKey")]
                        ? moment(entry[getFieldValue(fieldType, "apiKey")])
                        : moment()
                    }
                    name={getFieldValue(fieldType, "apiKey")}
                    onDateChange={onDateChange}
                  />
                )}
            </label>
            <span className="fieldHelpText">
              {getFieldValue(fieldType, "helpText")}
            </span>
            {fieldError.field === getFieldValue(fieldType, "apiKey") && (
              <p className="form__error">{fieldError.message}</p>
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
