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
    let oldReferences = this.props.references ? this.props.references : [];
    let newReferences = oldReferences;

    if (value) {
      newReferences.push(item);
    } else {
      newReferences = oldReferences.filter(function(value, index, arr) {
        return value !== item;
      });
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
          Link to entries
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
          <h3 className="modal__title">Manage References</h3>
          <div className="modal__body">
            <EntriesList
              display="referenceManager"
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
