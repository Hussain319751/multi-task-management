import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import {
  createTodoApi,
  retriveTodoApi,
  updateTodoApi,
} from "../api/TodoapiService copy";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Todo = () => {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    retriveTodo();
  }, [id]);

  const retriveTodo = () => {
    if (id != -1) {
      retriveTodoApi(username, id)
        .then((res) => {
          setDescription(res.data.description);
          setTargetDate(res.data.targetDate);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSubmit = (values) => {
    console.log("Form submitted:", values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    if (id != -1) {
      updateTodoApi(username, id, todo)
        .then((res) => {
          navigate("/todos");
        })
        .catch((err) => console.log(err));
    } else {
      createTodoApi(username, todo)
        .then((res) => {
          navigate("/todos");
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = (values) => {
    let errors = {};

    if (!values.description || values.description.length < 5) {
      errors.description = "Enter at least 5 characters";
    }

    if (!values.targetDate) {
      errors.targetDate = "Target date is required";
    }

    return errors;
  };

  return (
    <>
      <h1>Enter Todo Details</h1>
      <Formik
        initialValues={{ description, targetDate }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form>
          <ErrorMessage
            name="description"
            component="div"
            className="alert alert-warning"
          />
          <ErrorMessage
            name="targetDate"
            component="div"
            className="alert alert-warning"
          />
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <Field name="description" type="text" className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="targetDate" className="form-label">
              Target Date
            </label>
            <Field name="targetDate" type="date" className="form-control" />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default Todo;
