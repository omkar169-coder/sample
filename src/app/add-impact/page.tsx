"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddImpactForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [_, forceUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const initialFormData = {
    email: "omkar@wooble.org",
    user_id: 9168,
    name: "",
    description: "",
    users: "",
    revenue: "",
    impact: "",
    eventDate: "",
    awardBy: "",
    researchTopic: "",
    tools: [],
  };

  const [formData, setFormData] = useState<any>(initialFormData);

  useEffect(() => {
    if (!sessionStorage.getItem("formData")) {
      sessionStorage.setItem("formData", JSON.stringify(initialFormData));
      sessionStorage.setItem("email", "omkar@wooble.org");
      sessionStorage.setItem("user_id", "9168");
    }
    forceUpdate((prev) => !prev);

  }, []);

  const getFormData = () => {
    const data = sessionStorage.getItem("formData");
    return data ? JSON.parse(data) : {};
  };

  const setFormDataField = (field: string, value: any) => {
    const currentData = getFormData();
    const updatedData = { ...currentData, [field]: value };
    sessionStorage.setItem("formData", JSON.stringify(updatedData));
    setFormData(updatedData);
    forceUpdate((prev) => !prev);
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
    setFormDataField(field, value);
  };

  const getApiEndpoint = () => {
    switch (selectedOption) {
      case "hustle":
        return "https://wooble.io/api/impact/addHustle.php";
      case "event":
        return "https://wooble.io/api/impact/addEvent.php";
      case "research":
        return "https://wooble.io/api/impact/addResearch.php";
      case "award":
        return "https://wooble.io/api/impact/addAward.php";
      default:
        return "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
  
    const email = sessionStorage.getItem("email") || "omkar@wooble.org";
    const payload = new FormData();
  
    // Append shared fields
    payload.append("email", email);
    payload.append("type", selectedOption);
    payload.append("name", formData.name);
    payload.append("description", formData.description);
  
    // Determine endpoint and append type-specific fields
    let endpoint = "";
  
    switch (selectedOption) {
      case "hustle":
        endpoint = "https://wooble.io/api/impact/addHustle.php";
        payload.append("users", formData.users);
        payload.append("revenue", formData.revenue);
        payload.append("impact", formData.impact);
        payload.append("startDate", startDate?.toISOString().split("T")[0] || "");
        payload.append("tools", JSON.stringify(formData.tools));
        break;
  
      case "event":
        endpoint = "https://wooble.io/api/impact/addEvent.php";
        payload.append("eventDate", startDate?.toISOString().split("T")[0] || "");
        break;
  
      case "research":
        endpoint = "https://wooble.io/api/impact/addResearch.php";
        payload.append("researchTopic", formData.researchTopic);
        break;
  
      case "award":
        endpoint = "https://wooble.io/api/impact/addAward.php";
        payload.append("awardBy", formData.awardBy);
        break;
  
      default:
        setMessage({ type: "error", text: "Invalid impact type selected." });
        setLoading(false);
        return;
    }
  
    // Append media if available
    if (mediaFile) {
      payload.append("media", mediaFile);
    }
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
      });
  
      const result = await response.json();
  
      if (result.status === "success") {
        setMessage({ type: "success", text: `${selectedOption.toUpperCase()} submitted successfully!` });
  
        // Optionally redirect or update state
        router.push(`/impactzonestab?data=${encodeURIComponent(JSON.stringify(formData))}`);
      } else {
        setMessage({ type: "error", text: result.message || "Submission failed." });
      }
    } catch (error) {
      console.error("Submission failed", error);
      setMessage({ type: "error", text: "Something went wrong while submitting." });
    } finally {
      setLoading(false);
    }
  };
  
  
  // Reusable Field Components
  const textField = (label: string, placeholder: string, required = false, key = "") => (
    <>
      <label className="block mb-1 font-medium">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        type="text"
        placeholder={placeholder}
        required={required}
        className="w-full border rounded-md p-2 mb-4"
        onChange={(e) => key && handleInputChange(key, e.target.value)}
      />
    </>
  );

  const numberField = (label: string, placeholder: string, key = "") => (
    <>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        className="w-full border rounded-md p-2 mb-4"
        onChange={(e) => key && handleInputChange(key, e.target.value)}
      />
    </>
  );

  const dateField = (
    <div>
      <label className="block mb-1 font-medium">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        placeholderText="Select a date"
        className="w-full border rounded-md p-2 mb-4"
        required
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );

  const mediaField = (
    <>
      <label className="block mb-1 font-medium">Upload Media</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaChange}
        className="w-full border rounded-md p-2 mb-4"
      />
      {mediaPreview && (
        <div className="mt-2">
          <button onClick={removeMedia} className="text-white bg-red-500 rounded-md px-2 py-1 mb-2">X</button>
          {mediaFile?.type.startsWith("image") ? (
            <img src={mediaPreview} alt="Preview" className="mt-2" />
          ) : (
            <video controls className="mt-2"><source src={mediaPreview} /></video>
          )}
        </div>
      )}
    </>
  );

  // utils or your form component
const dateplace = (
  label: string,
  required: boolean,
  value: Date | null,
  onChange: (date: Date | null) => void
) => (
  <div className="w-full mb-4">
    <label className="block mb-1 text-sm font-medium">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        required={required}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  </div>
);

  const toolsField = (
    <>
      <label className="block mb-1 font-medium">Tools Used</label>
      <input
        type="text"
        placeholder="Enter tools used"
        className="w-full border-2 border-black-400 rounded-md p-2 mb-2"
        value={toolInput}
        onChange={(e) => setToolInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && toolInput.trim()) {
            e.preventDefault();
            const newTool = toolInput.trim();
            if (!formData.tools.includes(newTool)) {
              const updatedTools = [...formData.tools, newTool];
              handleInputChange("tools", updatedTools);
            }
            setToolInput("");
          }
        }}
      />
  
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.tools.map((tool: string, index: number) => (
          <div
            key={index}
            className="flex items-center bg-green-500 text-white font-semibold px-3 py-1 rounded-full text-sm"
          >
            {tool}
            <button
              type="button"
              onClick={() => {
                const updated = formData.tools.filter((_: unknown, i: number) => i !== index);
                setFormDataField("tools", updated);
              }}
              className="ml-2 text-white hover:text-red-200 focus:outline-none"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  );

  const renderForm = () => {
    switch (selectedOption) {
      case "hustle":
        return (
          <>
            {textField("Name", "Enter hustle name", true, "name")}
            {textField("Description", "Hustle description", false, "description")}
            {numberField("Users", "Number of users", "users")}
            {numberField("Revenue", "Revenue generated", "revenue")}
            {numberField("Impact", "Impact factor", "impact")}
            {dateField}
            {toolsField}
            {mediaField}
          </>
        );

      case "event":
        return (
          <>
            {textField("Event Name", "Enter event name", true, "name")}
            {textField("Description", "Event details", false, "description")}
            {dateField}
            {textField("Organizer", "Name of the organizer", true, "organizer")}
            {textField("Location", "Event location", true, "location")}
            {numberField("Number of Attendees", "Expected number of attendees", "attendees")}
            {mediaField}
          </>
        );

      case "award":
        return (
          <>
            {textField("Award Name", "Name of the award", true, "name")}
            {textField("Description", "Award details", false, "description")}
            {dateField}
            {textField("Organization Name", "Name of the Organization", true, "awardName")}
            {numberField("Users", "Number of users", "awardUsers")}
            {mediaField}
          </>
        );

        case "research":
          return (
            <>
              {textField("Research Title", "Title of research", true, "name")}
              {textField("Research Abstract", "Abstract of research", true, "researchAbstract")}
              {dateplace("Publication Date", true, startDate, setStartDate)}
              {textField("Research Affiliation", "Affiliation name", true, "researchAffiliation")}
              {textField("Research Citation", "Citation number", true, "researchCitation")}
              {textField("Research Impact", "Impact of research", false, "researchImpact")}
              {textField("Research DOI", "DOI number", true, "researchDOI")}
            </>
          );
      default:  
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Impact</h2>

      <label className="block mb-2 font-semibold">Select Impact Type</label>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className="w-full border rounded-md p-2 mb-4"
      >
        <option value="">Select</option>
        <option value="hustle">Hustle</option>
        <option value="event">Event</option>
        <option value="award">Award</option>
        <option value="research">Research</option>
      </select>

      {selectedOption && renderForm()}

      <button
        disabled={loading}
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && (
        <p className={`mt-4 text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AddImpactForm;
