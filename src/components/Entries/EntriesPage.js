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
            <h2 className="page-header__title">
              {this.props.contentType.title}
            </h2>
            <div className="page-header__actions">
              <Link
                className="button"
                to={`/entry/${this.props.contentType.apiKey}/add`}
              >
                Add {this.props.contentType.title}
              </Link>
            </div>
          </div>
        </div>
        <div className="content-container">
          <EntriesList contentType={this.props.contentType} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    contentType: state.contentTypes.find(
      contentType => contentType.apiKey === props.match.params.slug
    )
  };
};

export default connect(mapStateToProps)(EntriesPage);
