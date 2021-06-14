import React from "react";
import {
  Container,
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Button } from "antd";
import { Redirect } from "react-router-dom";
import { addNewRecipe } from "../constants";
import { Link } from "react-router-dom";

class AddRecipeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      ...props,
      form: {
        title: "",
        description: "",
        tags: "",
        photo: "",
        ingredients: "",
      },
    };
  }

  getIngredients = (ingredientsArray) => {
    let str = "{";
    ingredientsArray.forEach((ingredient, index) => {
      str += `"${ingredient.name}": ${ingredient.quantity}`;
      if (index + 1 < ingredientsArray.length) {
        str += ",";
      }
    });
    return str + "}";
  };

  handleSubmit = (values) => {
    const body = {
      title: values.title,
      description: values.description,
      created_by: "23",
      ingredients: this.getIngredients(values.ingredients),
      slug: "tmp-slug",
      tags: values.tags,
    };
    const whatever = {
      Authorization: `Token ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    this.setState({ loading: true });
    fetch(addNewRecipe, {
      method: "POST",
      headers: whatever,
      body: JSON.stringify(body),
    }).then((res) => {
      this.props.history.push(`/receipes/${res.data.id}`, { recipe: res.data });
    });
  };

  handleChange = (e) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { error, loading, isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (!!error) {
      return (
        <Message
          error
          header="There was some errors with your submission"
          content={JSON.stringify(error)}
        />
      );
    }
    if (loading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src="/images/recipes/spageto.jpg" />
        </Segment>
      );
    }

    return (
      <Container>
        <React.Fragment>
          <Form
            size="large"
            onFinish={this.handleSubmit}
            initialValues={this.state.form}
          >
            <Segment stacked>
              <Form.Item
                onChange={this.handleChange}
                label="Title"
                name="title"
                placeholder="Title"
                rules={[{ required: true, message: "Please input title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                onChange={this.handleChange}
                label="Description"
                name="description"
                placeholder="Description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                onChange={this.handleChange}
                label="Tags"
                name="tags"
                placeholder="Separate tags with a comma"
              >
                <Input />
              </Form.Item>
              <Form.List
                name="ingredients"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 ingredient")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        key={`ing-${field.key}`}
                        label={index === 0 ? "Ingredients" : ""}
                        rules={[
                          {
                            required: true,
                            message: "Please input ingredients",
                          },
                        ]}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input ingredient's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Ingredient name"
                            style={{ width: "60%" }}
                          />
                        </Form.Item>
                        <Form.Item
                          key={`quantity-${field.key}`}
                          name={[field.name, "quantity"]}
                          fieldKey={[field.fieldKey, "quantity"]}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please input ingredient's quantity or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <InputNumber style={{ width: "20%" }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add ingredient
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Button
                color="teal"
                fluid="true"
                size="large"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                Save
              </Button>
            </Segment>
          </Form>
        </React.Fragment>
      </Container>
    );
  }
}

export default AddRecipeLayout;
