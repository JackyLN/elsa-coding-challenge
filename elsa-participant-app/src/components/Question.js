import React, { useState } from "react";
import { Card, Checkbox, Button, Typography, Alert } from "antd";

const { Group: CheckboxGroup } = Checkbox;
const { Text } = Typography;

const Question = ({ question, onSubmit, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeOutMessage, setTimeOutMessage] = useState("");

  const handleChange = (checkedValues) => {
    setSelectedOptions(checkedValues);
  };

  const handleSubmit = async () => {
    if (selectedOptions.length > 0) {
      setIsSubmitting(true);

      try {
        const response = await onSubmit(selectedOptions);
        console.log("response", response);
        if (response.duplicate) {
          setTimeOutMessage(
            response.message || "Question is already answered!"
          );
        } else if (response.answer !== null) {
          const _result = response.answer.result === 1 ? "Correct" : "Wrong";
          setResult(response.answer.result === 1); // true = success, false = error
          setTimeOutMessage(_result);
        } else {
          setTimeOutMessage("Unexpected error. Please try again.");
        }
      } catch (error) {
        setTimeOutMessage("Error submitting the answer. Try again.");
      } finally {
        setIsSubmitting(false);
      }

      // Show the result and move to the next question after 2.5 seconds
      setTimeout(() => {
        setSelectedOptions([]);
        setResult(null);
        setTimeOutMessage("");
        onNext();
      }, 2500);
    }
  };

  return (
    <Card
      title={question.content}
      style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}
    >
      <CheckboxGroup
        options={question.options.map((option, index) => ({
          label: option,
          value: index,
        }))}
        value={selectedOptions}
        onChange={handleChange}
        style={{ display: "flex", flexDirection: "column" }}
      />

      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0 || isSubmitting}
        style={{ marginTop: 20 }}
        block
      >
        Submit
      </Button>

      {/* Display the result */}
      {timeOutMessage && (
        <Alert
          message={timeOutMessage}
          type={result === null ? "info" : result ? "success" : "error"}
          style={{ marginTop: 20 }}
        />
      )}
    </Card>
  );
};

export default Question;
