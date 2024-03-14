import { Form, FormBuilder } from "@formio/react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ReactJson from "react-json-view";
import "../styles/Builder.css";
// import { useCreateFormMutation } from "../../src/store/api/applications"; // Adjust the import path
import axios from "axios";
import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';

// Your Builder component code continues here...

const Builder = () => {
  const [jsonSchema, setSchema] = useState({ components: [] });
  const onFormChange = (schema) => {
    console.log("22222222222222222222222222");

    setSchema({ ...schema, components: [...schema.components] });
    console.log("ffffffffffffffffffffffffffff");
    console.log("rrrrrrrrrrrrrrrrrrrrr", jsonSchema);
  };
  useEffect(() => {
    const fectcData = async () => {
      const url =
        "http://localhost:9000/api/formio/get-all-local-form-by-name/form1";
      const response = await axios.get(url);
      console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeee',response.data);
      const localFormData = {id:response.data.id,...response.data.design};
      console.log(localFormData);
      setSchema(localFormData);
    };
    fectcData();
  }, []);
  // const [createForm, { isLoading, isSuccess }] = useCreateFormMutation();
  const hadleSubmit = async () => {
    console.log(
      "jsonSchemajsonSchemajsonSchemajsonSchemajsonSchemajsonSchema",
      jsonSchema
    );
    if(jsonSchema.id){
      const payload = {
        id:jsonSchema.id,
        name: "form1",
        design: jsonSchema,
        formData: {},
      };
      console.log('we are going to update the form schema')
      const url = "http://localhost:9000/api/formio/update-local-form";
      const response = await axios.put(url, payload);
      console.log("form added successfully", response.status==200?true:false);
        notifications.show({
          title: 'Form update',
          message: 'Form updated successfully! 🤥',
        })
    }else{
      const payload = {
        name: "form1",
        design: jsonSchema,
        formData: {},
      };
      console.log('we are going to insert new  form schema')
      const url = "http://localhost:9000/api/formio/add-local-form";
      const response = await axios.post(url, payload);
      console.log("form added successfully", response);
      if(response){
        notifications.show({
          title: 'Form insertion',
          message: 'Form inserted successfully! 🤥',
        })
      }
    }
   
  };
  return (
    <>
      <FormBuilder form={jsonSchema} onChange={onFormChange} />
      <Card title="Form JSON Schema" className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As JSON Schema</Card.Title>
          <ReactJson src={jsonSchema} name={null} collapsed={true}></ReactJson>
        </Card.Body>
      </Card>
      <Card className="my-4">
        <Card.Body>
          <Card.Title className="text-center">As Rendered Form</Card.Title>
          <Form form={jsonSchema} onSubmit={hadleSubmit} />
        </Card.Body>
      </Card>
    </>
  );
};
export default Builder;
