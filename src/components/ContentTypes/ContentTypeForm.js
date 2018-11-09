import React, { useState } from "react";
import moment from "moment";
import useCamelify from "../../hooks/useCamelify";

export const ContentTypeForm = props => {
  const [title, setTitle] = useState(
    props.contentType ? props.contentType.title : ""
  );
  const [apiKey, setApiKey] = useState(
    props.contentType ? props.contentType.apiKey : ""
  );
  const [fields, setFields] = useState(
    props.contentType ? props.contentType.fields : []
  );
  // const [createdAt, setCreatedAt] = useState(
  //   props.contentType ? moment(props.contentType.createdAt) : moment()
  // );
  // const [lastUpdated, setLastUpdated] = useState(moment());
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const camelify = useCamelify(null);

  const onTitleChange = e => {
    setTitle(e.target.value);
    setApiKey(useCamelify(e.target.value));
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
  const onSubmit = e => {
    e.preventDefault();
    // TO DO: Check that apiKey is unique in db
    if (!title || !apiKey) {
      const error = "Please provide title and API Key";
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
        lastUpdated: moment().valueOf()
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
        onChange={e => setApiKey(e.target.value)}
      />
      {props.fields &&
        props.fields.map(field => {
          return (
            <div key={field.id}>
              <input
                type="checkbox"
                value={field.apiKey}
                onChange={onFieldChange}
                checked={fields.includes(field.apiKey)}
              />{" "}
              {field.name}
            </div>
          );
        })}
      <div>
        <button className="button">Save Content Type</button>
      </div>
    </form>
  );
};

export default ContentTypeForm;
