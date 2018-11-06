import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EntriesList from "./EntriesList";

export class EntriesPage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              {this.props.contentType.title}
            </h1>
            <div className="page-header__actions">
              <Link
                className="button"
                to={`/entry/${this.props.contentType.slug}/add`}
              >
                Add {this.props.contentType.title}
              </Link>
            </div>
          </div>
        </div>
        <div className="content-container">
          <EntriesList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    contentType: state.contentTypes.find(
      contentType => contentType.slug === props.match.params.slug
    )
  };
};

export default connect(mapStateToProps)(EntriesPage);
