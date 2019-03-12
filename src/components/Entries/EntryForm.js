import React, { useState } from "react";
import moment from "moment";
import useSlugify from "../../hooks/useSlugify";
import MarkdownEditor from "./FormFields/MarkdownEditor";
import HtmlEditor from "./FormFields/HtmlEditor";
import SingleDatePickerField from "./FormFields/SingleDatePickerField";
import ReferenceManager from "./FormFields/ReferenceManager";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const SortableItem = SortableElement(
  ({ value, entryId, onRemoveReference, fieldName }) => (
    <li className="sortable-list__item">
      <span>{value}</span>
      <button
        className="button button--link-dark"
        data-id={entryId}
        data-name={fieldName}
        onClick={onRemoveReference}
      >
        Remove
      </button>
    </li>
  )
);

const SortableList = SortableContainer(
  ({ items, itemsRef, onRemoveReference, fieldName }) => {
    return (
      <ul className="sortable-list">
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={
              itemsRef.find(ref => {
                return ref.id === value;
              }).title
            }
            entryId={
              itemsRef.find(ref => {
                return ref.id === value;
              }).id
            }
            fieldName={fieldName}
            onRemoveReference={onRemoveReference}
          />
        ))}
      </ul>
    );
  }
);

export const EntryForm = props => {
  const [contentType, setContentType] = useState(props.contentType);
  const [fields, setFields] = useState(props.fields);
  const [entries, setEntries] = useState(props.entries);
  const [entry, setEntry] = useState(props.entry);
  const [calendarFocused, setCalendarFocused] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState([]);
  const slugify = useSlugify(null);

  const onSubmit = e => {
    e.preventDefault();
    let errors = [];

    contentType.fields.map(fieldType => {
      const entryValue = entry[fieldType];

      // enforce uniqueness if isUnique
      // TO DO: Check unique fields against database
      if (getFieldValue(fieldType, "isUnique")) {
        const valueExists = checkUniqueness(entryValue, fieldType);
        if (valueExists) {
          errors.push({
            field: fieldType,
            message: `${getFieldValue(fieldType, "name")} must be unique.`
          });
        }
      }

      // enforce required field
      if (getFieldValue(fieldType, "isRequired") && !entryValue) {
        errors.push({
          field: fieldType,
          message: `${getFieldValue(fieldType, "name")} is required.`
        });
      }
    });

    let success = "";
    if (!errors.length === 0) {
      success = "Entry saved successfully.";
    }
    setSuccess(success);
    setErrors(errors);

    if (errors.length > 0) {
      return;
    }

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

    props.onSubmit({
      contentTypeId: contentType.id,
      entry
    });
  };
  const getFieldValue = (fieldType, fieldValue) => {
    return fields.find(field => field.apiKey === fieldType)[fieldValue];
  };
  const checkUniqueness = (value, uniqueField) => {
    // look through entries that is not this entry
    return entries.find(singleEntry => {
      return singleEntry[uniqueField] === value && singleEntry.id !== entry.id;
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
    let errors = [];
    if (fieldIsUnique) {
      const valueExists = checkUniqueness(fieldValue, fieldName);
      if (valueExists) {
        setFieldError({
          message: "This value must be unique",
          field: fieldName
        });
        errors.push({
          field: fieldName,
          message: "This value must be unique"
        });
      }
    }
    setErrors(errors);

    newEntry[fieldName] = fieldValue;
    setEntry(newEntry);
  };
  const onComponentFieldChange = (content, name) => {
    const fieldName = name;
    const fieldValue = content;
    let newEntry = entry;
    newEntry[fieldName] = fieldValue;
    setEntry(newEntry);
  };
  const onSortEnd = ({ oldIndex, newIndex, collection }, e) => {
    const fieldName = e.path[1].dataset.name;
    const oldFieldValue = entry[fieldName];
    const newFieldValue = arrayMove(oldFieldValue, oldIndex, newIndex);
    let newEntry = entry;
    newEntry[fieldName] = newFieldValue;
    setEntry(newEntry);
  };
  const onRemoveReference = e => {
    const itemId = e.target.dataset.id;
    const fieldName = e.target.dataset.name;
    let newEntry = entry;
    let newTags = newEntry[fieldName];
    newTags = newTags.filter(tag => {
      return tag !== itemId;
    });
    newEntry[fieldName] = newTags;
    setEntry(newEntry);
  };
  return (
    <form className="form content-container--two-panel" onSubmit={onSubmit}>
      <div className="content-container__main-panel">
        {contentType.fields.map(fieldType => {
          return (
            <div key={fieldType}>
              <label className="label">
                {getFieldValue(fieldType, "name")}
                {getFieldValue(fieldType, "isRequired") && (
                  <span className="fieldRequired">Required</span>
                )}
                {getFieldValue(fieldType, "type") === "Short Text" &&
                  getFieldValue(fieldType, "display") === "Single line" && (
                    <div>
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
                    </div>
                  )}
                {getFieldValue(fieldType, "type") === "Short Text" &&
                  getFieldValue(fieldType, "display") === "Slug" && (
                    <div>
                      <input
                        type="text"
                        className="text-input"
                        data-isunique={getFieldValue(fieldType, "isRequired")}
                        name={getFieldValue(fieldType, "apiKey")}
                        value={entry[getFieldValue(fieldType, "apiKey")]}
                        onChange={onFieldChange}
                      />
                    </div>
                  )}
                {getFieldValue(fieldType, "type") === "Date and Time" &&
                  getFieldValue(fieldType, "display") === "Date only" && (
                    <div>
                      <SingleDatePickerField
                        date={
                          entry[getFieldValue(fieldType, "apiKey")]
                            ? moment(entry[getFieldValue(fieldType, "apiKey")])
                            : moment()
                        }
                        name={getFieldValue(fieldType, "apiKey")}
                        onChange={onComponentFieldChange}
                      />
                    </div>
                  )}
              </label>

              {getFieldValue(fieldType, "type") === "Long Text" &&
                getFieldValue(fieldType, "display") === "Multiple line" && (
                  <div>
                    <textarea
                      className="textarea textarea--markdown"
                      data-isunique={getFieldValue(fieldType, "isRequired")}
                      name={getFieldValue(fieldType, "apiKey")}
                      value={entry[getFieldValue(fieldType, "apiKey")]}
                      onChange={onFieldChange}
                    />
                  </div>
                )}
              {getFieldValue(fieldType, "type") === "Long Text" &&
                getFieldValue(fieldType, "display") === "Markdown" && (
                  <div>
                    <MarkdownEditor
                      initialValue={entry[getFieldValue(fieldType, "apiKey")]}
                      name={getFieldValue(fieldType, "apiKey")}
                      onChange={onComponentFieldChange}
                    />
                  </div>
                )}
              {getFieldValue(fieldType, "type") === "Long Text" &&
                getFieldValue(fieldType, "display") === "Rich HTML" && (
                  <div>
                    <HtmlEditor
                      initialValue={entry[getFieldValue(fieldType, "apiKey")]}
                      name={getFieldValue(fieldType, "apiKey")}
                      onChange={onComponentFieldChange}
                    />
                  </div>
                )}
              {getFieldValue(fieldType, "type") === "Reference" &&
                getFieldValue(fieldType, "display") === "Many References" && (
                  <div>
                    <div data-name={getFieldValue(fieldType, "apiKey")}>
                      {entry[getFieldValue(fieldType, "apiKey")] &&
                        entry[getFieldValue(fieldType, "apiKey")].length >
                          0 && (
                          <SortableList
                            items={entry[getFieldValue(fieldType, "apiKey")]}
                            itemsRef={entries}
                            fieldName={getFieldValue(fieldType, "apiKey")}
                            onSortEnd={onSortEnd}
                            onRemoveReference={onRemoveReference}
                            helperClass="sortable-list__item--helper"
                          />
                        )}

                      <ReferenceManager
                        references={entry[getFieldValue(fieldType, "apiKey")]}
                        name={getFieldValue(fieldType, "apiKey")}
                        onChange={onComponentFieldChange}
                      />
                    </div>
                  </div>
                )}

              {errors.map(error => {
                if (error.field === getFieldValue(fieldType, "apiKey")) {
                  return (
                    <p
                      className="form__error form__error--inline"
                      key={`error-${error.field}`}
                    >
                      {error.message}
                    </p>
                  );
                }
              })}
              <span className="fieldHelpText">
                {getFieldValue(fieldType, "helpText")}
              </span>
            </div>
          );
        })}
      </div>
      <div className="content-container__action-panel">
        <button className="button action-panel__button">
          Save {contentType.title}
        </button>
        {props.onRemove && (
          <button
            className="button button--secondary action-panel__button"
            onClick={props.onRemove}
          >
            Delete Entry
          </button>
        )}
        {success && <span className="form__success">{success}</span>}
      </div>
    </form>
  );
};

export default EntryForm;
