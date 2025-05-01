"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";



  const AddImpactForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
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

    // initial fetch call for impacts
    axios.post("https://wooble.io/api/portfolio/fetch_impacts.php", {
      user_id: sessionStorage.getItem("user_id"),
    });
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
  
    // FormData setup for the first handleSubmit logic (with API call)
    const payload = new FormData();
    const email = sessionStorage.getItem("email") || "omkar@wooble.org";
  
    payload.append("email", email);
    payload.append("name", formData.name);
    payload.append("description", formData.description);
  
    switch (selectedOption) {
      case "hustle":
        payload.append("users", formData.users);
        payload.append("revenue", formData.revenue);
        payload.append("impact", formData.impact);
        payload.append("startDate", startDate?.toISOString().split("T")[0] || "");
        payload.append("tools", JSON.stringify(formData.tools));
        break;
  
      case "event":
        payload.append("eventDate", startDate?.toISOString().split("T")[0] || "");
        break;
  
      case "research":
        payload.append("researchTopic", formData.researchTopic);
        break;
  
      case "award":
        payload.append("awardBy", formData.awardBy);
        break;
    }
  
    if (mediaFile) {
      payload.append("media", mediaFile); // after uploading to Cloudinary or similar

    }
  
    try {
      // Perform the API request to submit data
      await axios.post(getApiEndpoint(), payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // After successful submission, navigate to impact zones
      router.push(
        `/impactzonestab?data=${encodeURIComponent(JSON.stringify(formData))}`
      );
  
      // Display success message
      setMessage({ type: "success", text: `${selectedOption.toUpperCase()} submitted successfully!` });
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
          {mediaPreview.includes("image") ? (
            <img src={mediaPreview} alt="Preview" className="mt-2" />
          ) : (
            <video controls className="mt-2"><source src={mediaPreview} /></video>
          )}
        </div>
      )}
    </>
  );

  const toolsField = (
    <>
      <label className="block mb-1 font-medium">Tools Used</label>
      <input
        type="text"
        placeholder="e.g. React, Node.js"
        className="w-full border rounded-md p-2 mb-4"
        onChange={(e) =>
          handleInputChange("tools", e.target.value.split(",").map((t) => t.trim()))
        }
      />
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
            {mediaField}
          </>
        );

      case "award":
        return (
          <>
            {textField("Award Title", "Title of the award", true, "name")}
            {textField("Description", "Award details", false, "description")}
            {textField("Awarded By", "Issuer of the award", true, "awardBy")}
            {dateField}
            {mediaField}
          </>
        );

      case "research":
        return (
          <>
            {textField("Research Title", "Title of research", true, "name")}
            {textField("Description", "Research description", false, "description")}
            {textField("Topic", "Research topic", true, "researchTopic")}
            {mediaField}
          </>
        );

      default:
        return null;
    }
  };
    return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Add Impact</h2>
        <select
          className="w-full p-2 mb-4 border rounded-md"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="hustle">Hustle</option>
          <option value="event">Event</option>
          <option value="award">Award</option>
          <option value="research">Research</option>
        </select>
  
        {renderForm()}
  
        <button
          disabled={loading || !selectedOption}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white rounded-md py-2 mt-4 hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "save details"}
        </button>
  
        {message && (
          <div
            className={`mt-4 text-center font-semibold text-${message.type === "success" ? "green" : "red"}-600`}
          >
            {message.text}
          </div>
        )}
      </div>
    );
  };

export default AddImpactForm;
