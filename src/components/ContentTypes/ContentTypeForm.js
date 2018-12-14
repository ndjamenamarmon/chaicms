import React, { useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";
import useCamelify from "../../hooks/useCamelify";

Modal.setAppElement("#app");

const SortableItem = SortableElement(({ value }) => (
  <li className="sortable-list__item">{value}</li>
));

const SortableList = SortableContainer(({ items, itemsRef }) => {
  return (
    <ul className="sortable-list">
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={
            itemsRef.find(ref => {
              return ref.apiKey === value;
            }).name
          }
        />
      ))}
    </ul>
  );
});

export const ContentTypeForm = props => {
  const [title, setTitle] = useState(
    props.contentType ? props.contentType.title : ""
  );
  const [apiKey, setApiKey] = useState(
    props.contentType ? props.contentType.apiKey : ""
  );
  const [apiKeyError, setApiKeyError] = useState(null);
  const [fields, setFields] = useState(
    props.contentType ? props.contentType.fields : []
  );
  const [contentTypes] = useState(props.contentTypes);
  const [titleField, setTitleField] = useState(
    props.contentType ? props.contentType.titleField : ""
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const camelify = useCamelify(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const checkApiKey = apiKeyValue => {
    return contentTypes.find(contentType => {
      return contentType.apiKey === apiKeyValue;
    });
  };
  const onTitleChange = e => {
    setTitle(e.target.value);

    let newApiKey = useCamelify(e.target.value);
    // let n = 1;
    // enforce uniqueness
    while (checkApiKey(newApiKey)) {
      newApiKey =
        newApiKey +
        Math.round(Math.random() * (999999999 - 100000000) + 100000000);
      // newApiKey = newApiKey + n;
      // n++;
    }

    setApiKey(newApiKey);
  };
  const onApiKeyChange = e => {
    // enforce no whitespace
    const newApiKey = useCamelify(e.target.value);

    // enforce uniqueness
    const apiKeyExists = checkApiKey(newApiKey);
    if (apiKeyExists) {
      setApiKeyError("This API Key already exists.");
    } else {
      setApiKeyError("");
    }
    // enforce no whitespace
    setApiKey(newApiKey);
  };
  const onTitleFieldChange = e => {
    setTitleField(e.target.value);
  };
  const onFieldChange = e => {
    const field = e.target.checked ? e.target.value : null;
    let oldFields = fields ? fields : [];
    let newFields = oldFields;

    if (field) {
      newFields.push(field);
    } else {
      newFields = oldFields.filter(function(value, index, arr) {
        return value !== e.target.value;
      });
    }
    setFields(newFields);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFields(arrayMove(fields, oldIndex, newIndex));
  };
  const onSubmit = e => {
    e.preventDefault();
    // TO DO: Check that apiKey is unique in db
    if (!title || !apiKey || !titleField || apiKeyError) {
      const error = "Please provide title, API Key, and title field";
      const success = "";
      setError(error);
      setSuccess(success);
    } else {
      const error = "";
      const success = "Content type saved successfully.";
      setError(error);
      setSuccess(success);
      props.onSubmit({
        title,
        apiKey,
        fields,
        // createdAt: createdAt.valueOf(),
        createdAt: props.contentType
          ? moment(props.contentType.createdAt).valueOf()
          : moment().valueOf(),
        lastUpdated: moment().valueOf(),
        createdBy: props.contentType
          ? props.contentType.createdBy
          : props.currentUser.uid,
        lastUpdatedBy: props.currentUser.uid,
        titleField
      });
    }
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {/* {success && <p className="form__success">{success}</p>} */}
      <input
        className="text-input"
        type="text"
        placeholder="Title"
        autoFocus
        value={title}
        onChange={onTitleChange}
      />
      <input
        className="text-input"
        type="text"
        placeholder="API Key"
        value={apiKey}
        onChange={onApiKeyChange}
        readOnly={props.contentType}
      />
      {apiKeyError && <p className="form__error">{apiKeyError}</p>}
      {fields.length > 0 && (
        <p>
          <strong>Selected Fields</strong>
        </p>
      )}
      {/* {fields.map(field => {
          return (
              <div>
                {
                  props.fields.find(propField => {
                    return propField.apiKey === field;
                  }).name
                }
              </div>
          );
        })} */}
      <SortableList
        items={fields}
        itemsRef={props.fields}
        onSortEnd={onSortEnd}
        helperClass="sortable-list__item--helper"
      />
      <button
        className="button button--secondary"
        onClick={e => {
          e.preventDefault();
          setModalIsOpen(true);
        }}
      >
        Add Field
      </button>
      <Modal
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        contentLabel="Add Field"
        closeTimeoutMS={200}
        className="modal"
      >
        <h3 className="modal__title">Add Fields</h3>
        <p className="modal__body">
          {props.fields &&
            props.fields.map(field => {
              return (
                <label className="label" key={field.id}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={field.apiKey}
                    onChange={onFieldChange}
                    checked={fields.includes(field.apiKey)}
                  />{" "}
                  {field.name}
                </label>
              );
            })}
          <button
            className="button"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Done
          </button>
        </p>
      </Modal>
      <label className="label">
        Title Field <span className="fieldRequired">Required</span>
        <select
          className="select select--fullWidth"
          value={titleField}
          onChange={onTitleFieldChange}
        >
          <option value="">
            Choose a required field to be the entry title...
          </option>
          {fields.map(field => {
            if (
              props.fields.find(propField => {
                return (
                  propField.apiKey === field && propField.isRequired === true
                );
              })
            ) {
              return (
                <option key={field} value={field}>
                  {
                    props.fields.find(propField => {
                      return (
                        propField.apiKey === field &&
                        propField.isRequired === true
                      );
                    }).name
                  }
                </option>
              );
            }
          })}
        </select>
      </label>
      <div>
        <button className="button">Save Content Type</button>
      </div>
    </form>
  );
};

export default ContentTypeForm;
