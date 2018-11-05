import React, { useState } from "react";
import useSlugify from "../../hooks/useSlugify";

export const ContentTypeForm = props => {
  const [title, setTitle] = useState(
    props.contentType ? props.contentType.title : ""
  );
  const [slug, setSlug] = useState(
    props.contentType ? props.contentType.slug : ""
  );
  const [fields, setFields] = useState(
    props.contentType ? props.contentType.fields : []
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const slugify = useSlugify(null);

  const onTitleChange = e => {
    setTitle(e.target.value);
    setSlug(useSlugify(e.target.value));
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
    // TO DO: Check that slug is unique in db
    if (!title || !slug) {
      const error = "Please provide title and slug";
      const success = "";
      setError(error);
      setSuccess(success);
    } else {
      const error = "";
      const success = "Content type saved successfully.";
      setError(error);
      setSuccess(success);
      props.onSubmit({
        title: title,
        slug: slug,
        fields: fields
      });
    }
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {error && <p className="form__error">{error}</p>}
      {success && <p className="form__success">{success}</p>}
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
        placeholder="Slug"
        value={slug}
        onChange={e => setSlug(e.target.value)}
      />
      {props.fields &&
        props.fields.map(field => {
          return (
            <div key={field.id}>
              <input
                type="checkbox"
                value={field.slug}
                onChange={onFieldChange}
                checked={fields.includes(field.slug)}
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
