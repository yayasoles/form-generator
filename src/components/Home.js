import { Container } from "react-bootstrap";
import { Form } from "@formio/react";
import { atomOneLight, CopyBlock } from "react-code-blocks";
import logo from "../Light-Background.png";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const onSubmitHandler = (submission) => {
    console.log(submission);
  };
  const [formSrc, setFormSrc] = useState(null);
  useEffect(() => {
    const fectcData = async () => {
      const url =
        "http://localhost:9000/api/formio/get-all-local-form-by-name/form1";
      const response = await axios.get(url);
      const localFormData = response.data.design;
      console.log(localFormData);
      setFormSrc(localFormData);
    };
    fectcData();
  }, []);

  return (
    <>
      <Container className="pt-5">
        <div className="card p-3">
          <h5 className="card-title">Redesign the Formio json schema we got from the local database </h5>
          <div className="card-body bg-light rounded-3">
            <div>
              {formSrc && <Form form={formSrc} onSubmit={onSubmitHandler} />}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
