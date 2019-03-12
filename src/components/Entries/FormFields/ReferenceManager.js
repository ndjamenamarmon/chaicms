import React, { Component } from "react";
import Modal from "react-modal";
import EntriesList from "../EntriesList";

Modal.setAppElement("#app");

class ReferenceManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(item, value) {
    let newReferences;

    if (this.props.type === "many") {
      let oldReferences = this.props.references ? this.props.references : [];
      newReferences = oldReferences;

      if (value) {
        newReferences.push(item);
      } else {
        newReferences = oldReferences.filter(function(value, index, arr) {
          return value !== item;
        });
      }
    } else if (this.props.type === "one") {
      newReferences = item;
    }

    this.props.onChange(newReferences, this.props.name);
    return newReferences;
  }

  render() {
    return (
      <div>
        <button
          className="button button--secondary"
          onClick={e => {
            e.preventDefault();
            this.setState({ modalIsOpen: true });
          }}
        >
          {this.props.type === "many" && <span>Link to entries</span>}
          {this.props.type === "one" && <span>Link to entry</span>}
        </button>

        <Modal
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 100 }
          }}
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => {
            this.setState({ modalIsOpen: false });
          }}
          contentLabel="Manage References"
          closeTimeoutMS={200}
          className="modal"
        >
          {this.props.type === "many" && (
            <h3 className="modal__title">Manage References</h3>
          )}
          {this.props.type === "one" && (
            <h3 className="modal__title">Manage Reference</h3>
          )}
          <div className="modal__body">
            <EntriesList
              display="referenceManager"
              type={this.props.type}
              references={this.props.references}
              handleChange={this.handleChange}
            />
            <button
              className="button"
              onClick={() => {
                this.setState({ modalIsOpen: false });
              }}
            >
              Done
            </button>{" "}
            <button
              className="button button--secondary"
              onClick={() => {
                this.setState({ modalIsOpen: false });
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReferenceManager;
