import React from "react";
import { FormElementWrapper } from "../../components/Atoms/FormElementWrapper";

const Converter: React.FC = () => (
  <div className="px-24 py-9">
    <h1 className="font-sans text-5xl font-bold text-default-text pb-11 pt-8">I want to convert</h1>
    <FormElementWrapper label="amount">
      <input name="amount" className="mt-5 outline-none  border-b-2 bg-card border-b-default-text" />
    </FormElementWrapper>
  </div>
);

export default Converter;
