"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const AddImpactForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [_, forceUpdate] = useState(false); // to trigger re-render
  const [formData, setFormData] = useState<any>({
    email: "",
    name: "",
    description: "",
    users: "",
    revenue: "",
    impact: "",
    tools: [],
  });

    // Set static email in sessionStorage on load
    useEffect(() => {
        if (!sessionStorage.getItem("formData")) {
          const initialData = {
            email: "omkar@wooble.org",
            name: "",
            description: "",
            users: "",
            revenue: "",
            impact: "",
            tools: [],
          };
          sessionStorage.setItem("formData", JSON.stringify(initialData));
        }
        forceUpdate((prev) => !prev); // force re-render
      }, []);
    
      const getFormData = () => {
        const data = sessionStorage.getItem("formData");
        return data ? JSON.parse(data) : {};
      };
    
      const setFormDataField = (field: string, value: any) => {
        const currentData = getFormData();
        const updatedData = { ...currentData, [field]: value };
        sessionStorage.setItem("formData", JSON.stringify(updatedData));
        forceUpdate((prev) => !prev); // optional, to reflect immediately
      };
    
    

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMediaFile(file);
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMediaFile(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (selectedOption === "hustle") {
      const payload = new FormData();
      payload.append("email", formData.email);
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("users", formData.users);
      payload.append("revenue", formData.revenue);
      payload.append("impact", formData.impact);
      payload.append("startDate", startDate?.toISOString().split("T")[0] || "");
      payload.append("tools", JSON.stringify(formData.tools));
      if (mediaFile) payload.append("media", mediaFile);

      try {
        const response = await axios.post(
          "https://wooble.io/api/impact/addHustle.php",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Hustle details submitted successfully!");
      } catch (error) {
        console.error("Submission failed", error);
        alert("Something went wrong while submitting.");
      }
    }
  };

  const renderDateField = (label: string, required = false) => (
    <>
      <label className="block mb-1 font-medium">{label}</label>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        placeholderText="Select a date"
        className="w-full border rounded-md p-2 mb-4"
        required={required}
        dateFormat="yyyy-MM-dd"
      />
    </>
  );

  const renderForm = () => {
    const textField = (label: string, placeholder: string, required = false, key = "") => (
      <>
        <label className="block mb-1 font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          className="w-full border rounded-md p-2 mb-4"
          onChange={(e) => key && handleInputChange(key, e.target.value)}
        />
      </>
    );

    const numberField = (label: string, placeholder: string, required = false, key = "") => (
      <>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          type="number"
          placeholder={placeholder}
          required={required}
          className="w-full border rounded-md p-2 mb-4"
          onChange={(e) => key && handleInputChange(key, e.target.value)}
        />
      </>
    );

    const mixedField = (label: string, placeholder: string, required = false, key = "") => (
      <>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          required={required}
          className="w-full border rounded-md p-2 mb-4"
          onChange={(e) => key && handleInputChange(key, e.target.value)}
        />
      </>
    );

    const mediaField = (label: string) => (
      <>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
          className="w-full border rounded-md p-2 mb-4"
        />
        {mediaPreview && (
          <div className="mt-2">
            <button
              type="button"
              onClick={removeMedia}
              className="text-white bg-red-500 rounded-md px-2 py-1 mb-2"
            >
              X
            </button>
            {mediaPreview.includes("image") ? (
              <img src={mediaPreview} alt="Media Preview" className="mt-2" />
            ) : (
              <video controls className="mt-2">
                <source src={mediaPreview} />
              </video>
            )}
          </div>
        )}
      </>
    );

    const dateField = renderDateField;

    switch (selectedOption) {
      case "hustle":
        return (
          <div className="space-y-4 mt-4">
            <h3 className="font-semibold text-lg mb-2">Hustle Details</h3>
            {textField("Name", "Enter hustle name", true, "name")}
            {mixedField("Description", "Enter hustle description", false, "description")}
            {numberField("Users", "Enter number of users", false, "users")}
            {numberField("Revenue", "Enter revenue", false, "revenue")}
            {numberField("Impact", "Enter impact factor", false, "impact")}
            {dateField("Start Date", true)}
            {mediaField("Upload Media")}
            <p>Note: Max File Size 5MB.</p>
          </div>
        );
      // Event / Award / Research unchanged
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Impact</h1>
      <label className="block font-medium mb-2">What would you like to add?</label>
      <select
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
          setMediaPreview(null);
        }}
        className="w-full border rounded-md p-2"
      >
        <option value="">Select an option</option>
        <option value="hustle">HUSTLE</option>
        <option value="event">EVENT</option>
        <option value="research">RESEARCH</option>
        <option value="award">AWARD</option>
      </select>

      {renderForm()}

      {selectedOption && (
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6"
        >
          SAVE DETAILS
        </button>
      )}
    </div>
  );
};

export default AddImpactForm;
