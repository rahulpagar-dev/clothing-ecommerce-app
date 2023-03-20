import "./CardPrimary.css";
import React, { useContext } from "react";
import { useState } from "react";
import { EditTemplate, CardTemplate } from "../templates/Templates";
import { uid } from "react-uid";
import { TodoStore } from "./../contexts/ContextStore";

function CardPrimary() {
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [editIndex, setEditIndex] = useState();
  const todosContext = useContext(TodoStore);


  const handleDelete = (id) => {
    let filteredArray = todosContext.todos.filter((elem, index) => {
      return index !== id;
    });
    todosContext.postTodos(filteredArray,todosContext.setTodos);
  };

  const handleEdit = (elem, index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedTodo("");
  };
  const handleEditfield = (e) => {
    const fieldValue = e.target.value;
    setEditedTodo(fieldValue);
  };
  const handleEditMode = (elem, index) => {
    if (editedTodo === "") {
      setEditedTodo(elem.todo);
      setEditMode(false);
    } else {
      let editedArray = todosContext.todos;
      editedArray[index] = { todo: editedTodo, done: elem.done };
      todosContext.postTodos(editedArray,todosContext.setTodos);
      setEditMode(false);
    }
  };
  const markDone = (elem, index) => {
    let changedArray = todosContext.todos;
    changedArray[index].done = !changedArray[index].done;
    todosContext.postTodos(changedArray,todosContext.setTodos);

  };

  return (
    <>
      {todosContext.todos?.map((elem, index) => {
        return (
          <>
            {editMode ? (
              <>
                {index === editIndex ? (
                  <EditTemplate
                    key={uid(elem, index)}
                    elem={elem}
                    index={index}
                    handleEditfield={handleEditfield}
                    handleEditMode={() => {
                      handleEditMode(elem, index);
                    }}
                  />
                ) : (
                  <CardTemplate
                    key={uid(elem, index)}
                    elem={elem}
                    index={index}
                    handleEditMode={() => {
                      handleEditMode(elem, index);
                    }}
                    handleEdit={() => {
                      handleEdit(elem, index);
                    }}
                    handleDelete={() => {
                      handleDelete(index);
                    }}
                    markDone={() => {
                      markDone(elem, index);
                    }}
                  />
                )}
              </>
            ) : (
              <CardTemplate
                key={uid(elem, index)}
                elem={elem}
                index={index}
                handleEdit={() => {
                  handleEdit(elem, index);
                }}
                handleDelete={() => {
                  handleDelete(index);
                }}
                markDone={() => {
                  markDone(elem, index);
                }}
              />
            )}
          </>
        );
      })}
    </>
  );
}

export default CardPrimary;
