"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImpactZonesTab from "@/components/impactzonestab";
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
  };


  const sanitizeMediaUrl = (encodedPath: string): string => {
    return `https://wooble.org/dms/${encodedPath}`;
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
      setMediaFile(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string); // This is Base64 string
      };
      reader.readAsDataURL(file); // Convert to Base64
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
        return "";  // No endpoint for unrecognized options
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
    payload.append("name", formData.name || "");
    payload.append("description", formData.description || "");
  
    // Determine endpoint and append type-specific fields
    let endpoint = "";
  
    switch (selectedOption) {
      case "hustle":
        endpoint = "https://wooble.io/api/impact/addHustle.php";
        payload.append("users", formData.users || "");
        payload.append("revenue", formData.revenue || "");
        payload.append("impact", formData.impact || "");
        payload.append("startDate", startDate?.toISOString().split("T")[0] || "");
        payload.append("tools", Array.isArray(formData.tools) ? JSON.stringify(formData.tools) : formData.tools || "");
        payload.append("media", formData.media || "");
        break;
  
      case "event":
        endpoint = "https://wooble.io/api/impact/addEvent.php";
        
        // Use the correct field names expected by the API
        payload.append("email", email);
        payload.append("eventName", formData.eventName || "");
        payload.append("eventDescription", formData.eventDescription || "");
        payload.append("eventOrganization", formData.eventOrganization || "");
        payload.append("eventDate", startDate?.toISOString().split("T")[0] || "");
        payload.append("eventUsers", formData.eventUsers || "");
        payload.append("eventLocation", formData.eventLocation || "");
  
        // For media, check if there's a file and append it
        if (formData.media) {
          payload.append("media", formData.media);
        }
        break;
        
        case "research":
          endpoint = "https://wooble.io/api/impact/addResearch.php";
          payload.append("researchName", formData.researchName || "");
          payload.append("researchDescription", formData.researchDescription || "");
          payload.append("researchDate", startDate?.toISOString().split("T")[0] || "");
          payload.append("researchOrganization", formData.researchOrganization || "");
          payload.append("researchFactor", formData.researchFactor || "");
          payload.append("researchCitation", formData.researchCitation || "");
          payload.append("DOILink", formData.DOILink || "");
          break;
        
  
        case "award":
          endpoint = "https://wooble.io/api/impact/addAward.php";
          // Correctly append award-specific fields
          payload.append("awardName", formData.awardName || "");
          payload.append("awardDescription", formData.awardDescription || "");
          payload.append("awardDate", startDate?.toISOString().split("T")[0] || "");
          payload.append("awardOrganization", formData.awardOrganization || "");
          payload.append("awardFactor", formData.awardFactor || "");
          
          // Ensure that media is correctly added
          if (formData.media) {
            payload.append("media", formData.media);
          }
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
        console.log("API Response:", result);
    
        if (result.status) {
          setMessage({ type: "success", text: `${selectedOption.toUpperCase()} submitted successfully!` });
        
          setTimeout(() => {
            console.log("Redirecting to Account Profile Page");
            router.push(`/AccountProfilePage?tab=${encodeURIComponent('Impact Zone')}&data=${encodeURIComponent(JSON.stringify(formData))}`);
          }, 300); 
        }
        else {
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
        <button
          onClick={removeMedia}
          className="text-white bg-red-500 rounded-md px-2 py-1 mb-2"
        >
          X
        </button>

        {(mediaFile?.type?.startsWith("image") ||
          (typeof mediaPreview === "string" && mediaPreview.startsWith("data:image"))) ? (
          <img
            src={mediaPreview}
            alt="Preview"
            className="mt-2 rounded max-w-full h-auto"
          />
        ) : (
          <video controls className="mt-2 rounded max-w-full h-auto">
            <source src={mediaPreview} />
          </video>
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

// Ensure that formData.tools is always an array
const tools = Array.isArray(formData.tools) ? formData.tools : [];

// Tool field JSX
const toolsField = (
  <div className="mb-4">
    <label className="block mb-1 font-medium">Tools Used</label>
    <div className="flex gap-2 mb-2 flex-wrap">
      {tools.map((tool: string, index: number) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center gap-1"
        >
          {tool}
          <button
            type="button"
            onClick={() => {
              const updatedTools = tools.filter((_: string, i: number) => i !== index);
              setFormDataField("tools", updatedTools);
            }}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ×
          </button>
        </span>
      ))}
    </div>
    <input
      type="text"
      placeholder="Add a tool and press Enter"
      className="w-full border rounded-md p-2"
      value={toolInput}
      onChange={(e) => setToolInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && toolInput.trim() !== "") {
          e.preventDefault();
          const updatedTools = [...tools, toolInput.trim()];  // Use 'tools' here instead of 'formData.tools'
          setFormDataField("tools", updatedTools);
          setToolInput("");
        }
      }}
    />
  </div>
);

// Render form based on selected option
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
            {textField("Event Name", "Enter event name", true, "eventName")} {/* Changed name to eventName */}
            {textField("Description", "Event details", false, "eventDescription")} {/* Changed description to eventDescription */}
            {dateField}
            {textField("Organizer", "Name of the organizer", true, "eventOrganization")} {/* Changed organizer to eventOrganization */}
            {textField("Location", "Event location", true, "eventLocation")} {/* Changed location to eventLocation */}
            {numberField("Number of Attendees", "Number of attendees", "eventUsers")} {/* Changed to eventUsers */}
            {mediaField}
          </>
        );
  
// {dateField}
//  {textField("Location", "Event location", true, "eventLocation")} {/* Changed location to eventLocation */}
//  {numberField("Number of Attendees", "Number of attendees", "eventUsers")} {/* Changed to eventUsers */}


        case "award":
          return (
            <>
              {textField("Award Name", "Name of the award", true, "awardName")}
              {textField("Description", "Award details", false, "awardDescription")}
              {dateField} {/* Date picker for the award date */}
              {textField("Organization Name", "Name of the Organization", true, "awardOrganization")}
              {numberField("Award Factor", "Factor for the award", "awardFactor")}
              {mediaField} {/* Upload field for media */}
            </>
          );
    

          case "research":
            return (
              <>
                {textField("Research Title", "Title of research", true, "researchName")}
                {textField("Research Abstract", "Abstract of research", true, "researchDescription")}
                {dateplace("Publication Date", true, startDate, setStartDate)}
                {textField("Research Affiliation", "Affiliation name", true, "researchOrganization")}
                {textField("Research Citation", "Citation number", true, "researchCitation")}
                {textField("Research Impact", "Impact of research", false, "researchFactor")}
                {textField("Research DOI", "DOI number", true, "DOILink")}
              </>
            );
          

    default:
      return null;
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
        <p className={`mt-4 text-sm font-medium ${message.type === "success" ? "text-black-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AddImpactForm;



