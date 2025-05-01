// "use client";

// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

// const AddImpactForm = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [mediaPreview, setMediaPreview] = useState<string | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [mediaFile, setMediaFile] = useState<File | null>(null);
//   const [_, forceUpdate] = useState(false);

//   const [formData, setFormData] = useState<any>({
//     email: "omkar@wooble.org",
//     name: "",
//     description: "",
//     users: "",
//     revenue: "",
//     impact: "",
//     eventDate: "",
//     tools: [],
//   });

//   // Initialize sessionStorage
//   useEffect(() => {
//     if (!sessionStorage.getItem("formData")) {
//       sessionStorage.setItem("formData", JSON.stringify(formData));
//     }
//     forceUpdate((prev) => !prev);
//   }, []);

//   const getFormData = () => {
//     const data = sessionStorage.getItem("formData");
//     return data ? JSON.parse(data) : {};
//   };

//   const setFormDataField = (field: string, value: any) => {
//     const currentData = getFormData();
//     const updatedData = { ...currentData, [field]: value };
//     sessionStorage.setItem("formData", JSON.stringify(updatedData));
//     forceUpdate((prev) => !prev);
//   };

//   const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       setMediaFile(file);
//     }
//   };

//   const removeMedia = () => {
//     setMediaPreview(null);
//     setMediaFile(null);
//   };

//   const handleInputChange = (field: string, value: any) => {
//     setFormData((prev: any) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     const payload = new FormData();
//     payload.append("email", "omkar@wooble.org");
//     payload.append("type", selectedOption);
//     payload.append("name", formData.name);
//     payload.append("description", formData.description);

//     switch (selectedOption) {
//       case "hustle":
//         payload.append("users", formData.users);
//         payload.append("revenue", formData.revenue);
//         payload.append("impact", formData.impact);
//         payload.append("startDate", startDate?.toISOString().split("T")[0] || "");
//         payload.append("tools", JSON.stringify(formData.tools));
//         break;

//       case "event":
//         payload.append("eventDate", startDate?.toISOString().split("T")[0] || "");
//         break;

//       case "research":
//         payload.append("researchTopic", formData.researchTopic);
//         break;

//       case "award":
//         payload.append("awardBy", formData.awardBy);
//         break;
//     }

//     if (mediaFile) payload.append("media", mediaFile);

//     try {
//       const response = await axios.post(
//         "https://wooble.io/api/impact/addImpact.php",
//         payload,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert(`${selectedOption.toUpperCase()} submitted successfully!`);
//     } catch (error) {
//       console.error("Submission failed", error);
//       alert("Something went wrong while submitting.");
//     }
//   };

//   const textField = (label: string, placeholder: string, required = false, key = "") => (
//     <>
//       <label className="block mb-1 font-medium">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type="text"
//         placeholder={placeholder}
//         required={required}
//         className="w-full border rounded-md p-2 mb-4"
//         onChange={(e) => key && handleInputChange(key, e.target.value)}
//       />
//     </>
//   );

//   const numberField = (label: string, placeholder: string, required = false, key = "") => (
//     <>
//       <label className="block mb-1 font-medium">{label}</label>
//       <input
//         type="number"
//         placeholder={placeholder}
//         required={required}
//         className="w-full border rounded-md p-2 mb-4"
//         onChange={(e) => key && handleInputChange(key, e.target.value)}
//       />
//     </>
//   );

//   const dateField = (
//     <div>
//       <label className="block mb-1 font-medium">Start Date</label>
//       <DatePicker
//         selected={startDate}
//         onChange={(date: Date | null) => setStartDate(date)}
//         placeholderText="Select a date"
//         className="w-full border rounded-md p-2 mb-4"
//         required
//         dateFormat="yyyy-MM-dd"
//       />
//     </div>
//   );

//   const mediaField = (
//     <>
//       <label className="block mb-1 font-medium">Upload Media</label>
//       <input
//         type="file"
//         accept="image/*,video/*"
//         onChange={handleMediaChange}
//         className="w-full border rounded-md p-2 mb-4"
//       />
//       {mediaPreview && (
//         <div className="mt-2">
//           <button
//             type="button"
//             onClick={removeMedia}
//             className="text-white bg-red-500 rounded-md px-2 py-1 mb-2"
//           >
//             X
//           </button>
//           {mediaPreview.includes("image") ? (
//             <img src={mediaPreview} alt="Media Preview" className="mt-2" />
//           ) : (
//             <video controls className="mt-2">
//               <source src={mediaPreview} />
//             </video>
//           )}
//         </div>
//       )}
//       <p className="text-sm text-gray-600 mt-1">Note: Max File Size 5MB.</p>
//     </>
//   );

//   const renderForm = () => {
//     switch (selectedOption) {
//       case "hustle":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Hustle Details</h3>
//             {textField("Name", "Enter hustle name", true, "name")}
//             {textField("Description", "Enter hustle description", false, "description")}
//             {numberField("Users", "Enter number of users", false, "users")}
//             {numberField("Revenue", "Enter revenue", false, "revenue")}
//             {numberField("Impact", "Enter impact factor", false, "impact")}
//             {dateField}
//             {mediaField}
//           </div>
//         );

//       case "event":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Event Details</h3>
//             {textField("Event Name", "Enter event name", true, "name")}
//             {textField("Description", "Event description", false, "description")}
//             {dateField}
//             {mediaField}
//           </div>
//         );

//       case "award":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Award Details</h3>
//             {textField("Award Title", "Enter award title", true, "name")}
//             {textField("Description", "Award description", false, "description")}
//             {textField("Awarded By", "Organization or Person", true, "awardBy")}
//             {dateField}
//             {mediaField}
//           </div>
//         );

//       case "research":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Research Details</h3>
//             {textField("Research Title", "Enter research topic", true, "name")}
//             {textField("Description", "Research summary", false, "description")}
//             {textField("Topic", "Specific research area", false, "researchTopic")}
//             {mediaField}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add Impact</h1>
//       <label className="block font-medium mb-2">What would you like to add?</label>
//       <select
//         value={selectedOption}
//         onChange={(e) => {
//           setSelectedOption(e.target.value);
//           setMediaPreview(null);
//         }}
//         className="w-full border rounded-md p-2"
//       >
//         <option value="">Select an option</option>
//         <option value="hustle">HUSTLE</option>
//         <option value="event">EVENT</option>
//         <option value="research">RESEARCH</option>
//         <option value="award">AWARD</option>
//       </select>

//       {renderForm()}

//       {selectedOption && (
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6"
//         >
//           SAVE DETAILS
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddImpactForm;
