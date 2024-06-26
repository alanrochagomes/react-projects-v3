import React, { Component } from "react";
import "./App.css"; // Certifique-se de importar arquivo CSS
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
      title: "To-Do List",
      commentIndex: -1,
      commentText: "",
    };
    // Crie uma referência para o elemento de áudio
    this.audioRef = React.createRef();
  }

  handleAddTodo = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() !== "") {
      this.setState({
        todos: [...todos, { text: newTodo.trim(), checked: false }],
        newTodo: "",
      });
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });

    // Reproduza o som ao deletar
    this.playDeleteSound();
  };

  playDeleteSound = () => {
    // Verifique se a referência do áudio está definida e reproduza o som
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
    this.setState({ commentIndex: index, commentText: "" });
  };

  handleCommentChange = (event) => {
    this.setState({ commentText: event.target.value });
  };

  handleSaveComment = () => {
    console.log(`Comentário salvo: ${this.state.commentText}`);
    this.setState({ commentIndex: -1, commentText: "" });
  };

  handleCancelComment = () => {
    this.setState({ commentIndex: -1, commentText: "" });
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
    } = this.state;

    return (
      <div className="App-header">
        {/* Elemento de áudio para o som */}
        <audio
          ref={this.audioRef}
          src={deleteSound}
          style={{ display: "none" }}
        />

        {/* Renderização condicional para editar o título */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1
            className="App-title"
            contentEditable={editTitle}
            onClick={this.handleEditTitle}
            onBlur={this.handleBlurTitle}
            onInput={this.handleTitleChange}
            style={{ marginRight: "10px", outline: "none" }}
          >
            {title}
          </h1>
          {!editTitle && (
            <span
              onClick={this.handleEditTitle}
              style={{
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "5px",
                color: "#61dafb",
              }}
            >
              ✏️
            </span>
          )}
        </div>

        {/* Lista de tarefas */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => this.setState({ newTodo: e.target.value })}
            style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
          />
          <button
            onClick={this.handleAddTodo}
            style={{ padding: "10px", fontSize: "16px" }}
          >
            Add
          </button>
        </div>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%", // Define a largura total do elemento <li>
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) =>
                      this.setState({ editText: e.target.value })
                    }
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      fontSize: "14px",
                      flexGrow: 1,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <div
                      className="round-checkbox"
                      onClick={() => this.handleToggleTodo(index)}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        marginRight: "10px",
                        backgroundColor: todo.checked
                          ? "#61dafb"
                          : "transparent",
                      }}
                    >
                      {todo.checked && (
                        <svg
                          viewBox="0 0 24 24"
                          style={{
                            width: "12px",
                            height: "12px",
                            fill: "white",
                          }}
                        >
                          <path d="M9 16.2l-3.5-3.5c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l4.2 4.2c.2.2.5.3.7.3s.5-.1.7-.3l8.1-8.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0L9 16.2z"></path>
                        </svg>
                      )}
                    </div>
                    <span
                      style={{
                        textDecoration: todo.checked ? "line-through" : "none",
                        flexGrow: 1,
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex" }}>
                  {editIndex === index ? (
                    <>
                      <button
                        onClick={() => this.saveEdit(index)}
                        style={{
                          padding: "5px",
                          fontSize: "14px",
                          marginRight: "5px",
                          color: "#61dafb",
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={this.cancelEdit}
                        style={{
                          padding: "5px",
                          fontSize: "14px",
                          marginRight: "5px",
                          color: "#61dafb",
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => this.startEdit(index, todo.text)}
                        style={{
                          padding: "5px",
                          fontSize: "14px",
                          marginRight: "5px",
                          color: "#61dafb",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => this.handleComment(index)}
                        style={{
                          padding: "5px",
                          fontSize: "14px",
                          marginRight: "5px",
                          color: "#6A5ACD",
                        }}
                      >
                        💬
                      </button>
                      <button
                        onClick={() => this.handleDeleteTodo(index)}
                        style={{
                          padding: "5px",
                          fontSize: "14px",
                          marginRight: "5px",
                          color: "#ff6347",
                        }}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </div>
              </div>
              {commentIndex === index && (
                <div style={{ width: "100%", marginTop: "10px" }}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={this.handleCommentChange}
                    placeholder="Add a comment"
                    style={{
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      marginBottom: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={this.handleSaveComment}
                    style={{
                      padding: "10px",
                      fontSize: "14px",
                      marginRight: "5px",
                      color: "#6A5ACD",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={this.handleCancelComment}
                    style={{
                      padding: "10px",
                      fontSize: "14px",
                      color: "#ff6347",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
