// components/UserDropdown.tsx

import { useState, useRef, useEffect, ReactNode } from "react";
import {
  User,
  Lightbulb,
  Sun,
  Puzzle,
  Info,
  LogOut,
} from "lucide-react";

export default function UserDropdown({
  trigger,
}: {
  trigger: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
    
        <div style={{ right: '-12px' }} className="absolute mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-gray-300 text-black z-50">

          <div className="py-1">
            <MenuItem icon={<User size={18} />} label="Profile" />
          </div>
          <div className="border-t rounded border-gray-200" />
          <div className="py-1">
            <MenuItem icon={<Lightbulb size={18} />} label="Tools" />
            <MenuItem icon={<Sun size={18} />} label="Change Theme" />
            <MenuItem icon={<Puzzle size={18} />} label="Challenges" />
            <MenuItem icon={<Info size={18} />} label="About" />
          </div>
          <div className="border-t border-gray-200" />
          <div className="py-1">
            <MenuItem icon={<LogOut size={18} />} label="Log in / Logout" />
          </div>
        </div>
      )}
    </div>
  );
}

const MenuItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors">
    {icon}
    <span>{label}</span>
  </button>
);











// "use client";

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useEffect } from 'react';


// const AddImpactForm = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [mediaPreview, setMediaPreview] = useState<string | null>(null);
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [tools, setTools] = useState<string[]>([]);
//   const [toolInput, setToolInput] = useState<string>("");


//   useEffect(() => {
//     setFormData((prev: any) => ({ ...prev, email: "omkar@wooble.org" }));
//   }, []);
  


//   const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeMedia = () => {
//     setMediaPreview(null);
//   };

//   const renderDateField = (label: string, required = false) => (
//     <>
//       <label className="block mb-1 font-medium">{label}</label>
//       <DatePicker
//         selected={startDate}
//         onChange={(date: Date | null) => setStartDate(date)}
//         placeholderText="Select a date"
//         className="w-full border rounded-md p-2 mb-4"
//         required={required}
//         dateFormat="yyyy-MM-dd"
//       />
//     </>
//   );

//   const renderForm = () => {
//     const textField = (label: string, placeholder: string, required = false) => (
//       <>
//         <label className="block mb-1 font-medium">
//           {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           type="text"
//           pattern="[A-Za-z\s]*"
//           inputMode="text"
//           placeholder={placeholder}
//           required={required}
//           className="w-full border rounded-md p-2 mb-4"
//         />
//       </>
//     );

//     const numberField = (label: string, placeholder: string, required = false) => (
//       <>
//         <label className="block mb-1 font-medium">{label}</label>
//         <input
//           type="number"
//           inputMode="numeric"
//           placeholder={placeholder}
//           required={required}
//           className="w-full border rounded-md p-2 mb-4"
//         />
//       </>
//     );

//     const mixedField = (label: string, placeholder: string, required = false) => (
//       <>
//         <label className="block mb-1 font-medium">{label}</label>
//         <input
//           type="text"
//           placeholder={placeholder}
//           required={required}
//           className="w-full border rounded-md p-2 mb-4"
//         />
//       </>
//     );

//     const mediaField = (label: string) => (
//       <>
//         <label className="block mb-1 font-medium">{label}</label>
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={handleMediaChange}
//           className="w-full border rounded-md p-2 mb-4"
//         />
//         {mediaPreview && (
//           <div className="mt-2">
//             <button
//               type="button"
//               onClick={removeMedia}
//               className="text-white bg-red-500 rounded-md px-2 py-1 mb-2"
//             >
//               X
//             </button>
//             {mediaPreview && mediaPreview.includes("image") ? (
//               <img src={mediaPreview} alt="Media Preview" className="mt-2" />
//             ) : (
//               <video controls className="mt-2">
//                 <source src={mediaPreview} />
//               </video>
//             )}
//           </div>
//         )}
//       </>
//     );

//     const dateField = (label: string, required = false) => (
//         <>
//           <label className="block mb-1 font-medium">{label}</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date: Date | null) => setStartDate(date)}
//             placeholderText="Select a date"
//             className="w-full border rounded-md p-2 mb-4"
//             required={required}
//             dateFormat="yyyy-MM-dd"
//           />
//         </>
//       );
      

//     switch (selectedOption) {
//       case "hustle":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Hustle Details</h3>
//             {textField("Name", "Enter hustle name", true)}
//             {mixedField("Description", "Enter hustle description")}
//             {numberField("Users", "Enter number of users")}
//             {numberField("Revenue", "Enter revenue")}
//             {numberField("Impact", "Enter impact factor")}
//             {dateField("Start Date", true)}
            
//             {mediaField("Upload Media")}
//             <p>Note: Max File Size 5MB.</p>
//           </div>
//         );

//       case "event":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Event Details</h3>
//             {textField("Name", "Enter event title", true)}
//             {mixedField("Description", "Enter event description")}
//             {dateField("Date", true)}
//             {textField("Organization Name", "Enter organization name")}
//             {mixedField("Location", "Enter location")}
//             {numberField("Users", "Enter number of users")}
//             {mediaField("Upload Event Media")}
//             <p>Note: Max File Size 5MB.</p>
//           </div>
//         );

//       case "award":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Award Details</h3>
//             {textField("Name", "Enter award name")}
//             {mixedField("Description", "Enter award description")}
//             {dateField("Date", true)}
//             {textField("Organization", "Enter organization name")}
//             {numberField("Users", "Enter number of users")}
//             {mediaField("Upload Award Media")}
//             <p>Note: Max File Size 5MB.</p>
//           </div>
//         );

//       case "research":
//         return (
//           <div className="space-y-4 mt-4">
//             <h3 className="font-semibold text-lg mb-2">Research Details</h3>
//             {textField("Title", "Enter research title")}
//             {mixedField("Abstract", "Enter research description")}
//             {dateField("Publication Date", true)} {/* This is your dateField function */}
//             {textField("Affiliation", "Enter organization name")}
//             {mixedField("Citation", "Enter citation number")}
//             {mixedField("Impact Factor", "Eg: 0 to 10")}
//             {mixedField("DOI Link", "Enter DOI link")}
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
//           type="submit"
//           className="bg-green-500 text-white py-2 px-4 rounded-md w-full mt-6"
//         >
//           SAVE DETAILS
//         </button>
//       )}
//     </div>
//   );
// };

// export default AddImpactForm;
