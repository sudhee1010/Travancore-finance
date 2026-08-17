import { useState } from "react";
import { submitEnquiry } from "../services/api/enquiryApi";

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Form state + submit handler for the Contact page enquiry form.
 */
export function useEnquiryForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitEnquiry(formData);
      setStatus("success");
      setFormData(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err?.message || "Failed to submit enquiry.");
    }
  };

  return { formData, updateField, handleSubmit, status, errorMessage };
}
