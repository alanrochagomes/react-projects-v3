import React, { Component } from "react";
import "./App.css"; // Certifique-se de importar o arquivo CSS
import deleteSound from "./assets/delete_sound.mp3"; // Importe o arquivo de som

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      editIndex: -1,
      editText: "",
      editTitle: false,
      title: "Booking Movie Tickets",
      commentIndex: -1,
      commentText: "",
      showCommentsIndex: null,
      editCommentIndex: null,
      editCommentText: "",
    };
    this.audioRef = React.createRef();
  }

  handleAddTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() !== "") {
      this.setState({
        todos: [
          ...todos,
          { text: newTodo.trim(), checked: false, comments: [] },
        ],
        newTodo: "",
      });
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
    this.playDeleteSound();
  };

  playDeleteSound = () => {
    if (this.audioRef.current) {
      this.audioRef.current.play();
    }
  };

  handleToggleTodo = (index) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    this.setState({ todos: newTodos });
  };

  startEdit = (index, text) => {
    this.setState({ editIndex: index, editText: text });
  };

  cancelEdit = () => {
    this.setState({ editIndex: -1, editText: "" });
  };

  saveEdit = (index) => {
    const { editText, todos } = this.state;
    if (editText.trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].text = editText.trim();
      this.setState({ todos: newTodos, editIndex: -1, editText: "" });
    }
  };

  handleEditTitle = () => {
    this.setState({ editTitle: true, editText: this.state.title });
  };

  handleTitleChange = (event) => {
    this.setState({ editText: event.target.innerText });
  };

  handleBlurTitle = () => {
    const { editText } = this.state;
    if (editText.trim() !== "") {
      this.setState({ title: editText.trim(), editTitle: false, editText: "" });
    } else {
      this.setState({ editTitle: false, editText: "" });
    }
  };

  handleComment = (index) => {
    this.setState((prevState) => ({
      commentIndex: prevState.commentIndex === index ? -1 : index,
      commentText: "",
      showCommentsIndex: index,
    }));
  };

  handleCommentChange = (event) => {
    this.setState({ commentText: event.target.value });
  };

  handleSaveComment = (index) => {
    const { commentText, todos } = this.state;
    if (commentText.trim() !== "") {
      const newTodos = [...todos];
      newTodos[index].comments.push(commentText.trim());
      this.setState({ todos: newTodos, commentIndex: -1, commentText: "" });
    }
  };

  handleCancelComment = () => {
    this.setState({ commentIndex: -1, commentText: "" });
  };

  handleToggleComments = (index) => {
    this.setState((prevState) => ({
      showCommentsIndex: prevState.showCommentsIndex === index ? null : index,
    }));
  };

  handleEditComment = (todoIndex, commentIndex, commentText) => {
    this.setState({
      editCommentIndex: commentIndex,
      editCommentText: commentText,
      showCommentsIndex: todoIndex,
    });
  };

  handleEditCommentChange = (event) => {
    this.setState({ editCommentText: event.target.value });
  };

  handleSaveEditedComment = (todoIndex, commentIndex) => {
    const { editCommentText, todos } = this.state;
    if (editCommentText.trim() !== "") {
      const newTodos = [...todos];
      newTodos[todoIndex].comments[commentIndex] = editCommentText.trim();
      this.setState({
        todos: newTodos,
        editCommentIndex: null,
        editCommentText: "",
      });
    }
  };

  handleDeleteComment = (todoIndex, commentIndex) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos[todoIndex].comments.splice(commentIndex, 1);
    this.setState({ todos: newTodos });
  };

  handleCancelEditComment = () => {
    this.setState({ editCommentIndex: null, editCommentText: "" });
  };

  render() {
    const {
      todos,
      newTodo,
      editIndex,
      editText,
      title,
      editTitle,
      commentIndex,
      commentText,
      showCommentsIndex,
      editCommentIndex,
      editCommentText,
    } = this.state;

    return (
      <div className="App">
        <audio
          ref={this.audioRef}
          src={deleteSound}
          style={{ display: "none" }}
        />

        <div className="todo-container">
          <div className="todo-header">
            <h1
              className="todo-title"
              contentEditable={editTitle}
              onClick={this.handleEditTitle}
              onBlur={this.handleBlurTitle}
              onInput={this.handleTitleChange}
            >
              {title}
            </h1>
            <span onClick={this.handleEditTitle} className="edit-title">
              Edit
            </span>
          </div>

          <div className="todo-input-container">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => this.setState({ newTodo: e.target.value })}
              className="todo-input"
              placeholder="Add new task"
            />
            <button onClick={this.handleAddTodo} className="add-button">
              Add
            </button>
          </div>

          <ul className="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                <div className="todo-content">
                  <div
                    className="todo-checkbox"
                    onClick={() => this.handleToggleTodo(index)}
                  >
                    {todo.checked && (
                      <svg viewBox="0 0 24 24" className="checkmark">
                        <path d="M9 16.2l-3.5-3.5c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3l8.1-8.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L9 16.2z"></path>
                      </svg>
                    )}
                  </div>
                  <span
                    className={`todo-text ${todo.checked ? "checked" : ""}`}
                  >
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) =>
                          this.setState({ editText: e.target.value })
                        }
                        className="edit-input"
                      />
                    ) : (
                      todo.text
                    )}
                  </span>
                </div>

                <div className="todo-actions">
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => this.saveEdit(index)}
                        className="action-button"
                      >
                        Save
                      </button>
                      <button
                        onClick={this.cancelEdit}
                        className="action-button"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => this.startEdit(index, todo.text)}
                        className="action-button"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => this.handleComment(index)}
                        className="action-button"
                      >
                        💬
                      </button>
                      <button
                        onClick={() => this.handleDeleteTodo(index)}
                        className="action-button"
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>

                {commentIndex === index && (
                  <div className="comment-container">
                    <input
                      type="text"
                      value={commentText}
                      onChange={this.handleCommentChange}
                      className="comment-input"
                      placeholder="Add a comment"
                    />
                    <button
                      onClick={() => this.handleSaveComment(index)}
                      className="comment-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={this.handleCancelComment}
                      className="comment-button"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {showCommentsIndex === index && todo.comments.length > 0 && (
                  <ul className="comments-list">
                    {todo.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="comment-item">
                        {editCommentIndex === commentIndex ? (
                          <div className="edit-comment-container">
                            <input
                              type="text"
                              value={editCommentText}
                              onChange={this.handleEditCommentChange}
                              className="comment-input"
                              placeholder="Edit your comment"
                            />
                            <button
                              onClick={() =>
                                this.handleSaveEditedComment(
                                  index,
                                  commentIndex
                                )
                              }
                              className="comment-button"
                            >
                              Save
                            </button>
                            <button
                              onClick={this.handleCancelEditComment}
                              className="comment-button"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="comment-content">
                            <span>{comment}</span>
                            <div className="comment-actions">
                              <button
                                onClick={() =>
                                  this.handleEditComment(
                                    index,
                                    commentIndex,
                                    comment
                                  )
                                }
                                className="action-button"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  this.handleDeleteComment(index, commentIndex)
                                }
                                className="action-button"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {todo.comments.length > 0 && (
                  <button
                    onClick={() => this.handleToggleComments(index)}
                    className="toggle-comments-button"
                  >
                    {showCommentsIndex === index
                      ? "Hide Comments"
                      : "Show Comments"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
