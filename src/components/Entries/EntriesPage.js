import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EntriesList from "./EntriesList";
import { startSetEntries } from "../../actions/entries";

export class EntriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  async componentDidMount() {
    await this.props.startSetEntries();
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        {!this.state.loading && this.props.contentType && (
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
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startSetEntries: () => dispatch(startSetEntries())
  };
};

const mapStateToProps = (state, props) => {
  return {
    contentType: state.contentTypes.find(
      contentType => contentType.apiKey === props.match.params.slug
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntriesPage);
