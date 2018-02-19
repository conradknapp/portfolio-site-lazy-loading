import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          _id: this.props.id
        }
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="comment-form">
        <input
          placeholder="Add a comment"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation addComment($_id: String!, $content: String!) {
    addComment(_id: $_id, content: $content) {
      _id
      comments
    }
  }
`;

export default graphql(mutation)(CommentForm);
