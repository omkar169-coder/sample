// make sure this is the design for the individual user profile page

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import { Plus, Pencil, Briefcase, MapPin } from 'lucide-react';

// interface UserProfile {
//   name: string;
//   username: string;
//   cover_pic: string;
//   profile_pic: string;
//   location: string;
//   bio: string;
//   skills: string[];
//   followers: number;
//   linkedin: string;
//   github: string;
//   website: string;
// }

// export default function ProfilePage() {
//   const { username } = useParams();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [activeTab, setActiveTab] = useState("projects");

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`https://wooble.io/user/${username}`, {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     if (username) fetchUserDetails();
//   }, [username]);

//   if (!user) return <div className="p-6 text-center text-gray-600">Loading profile...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-6xl mx-auto mt-4 space-y-6 px-4 sm:px-6 md:px-8">

//         {/* Profile Header Card */}
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//           <div className="h-70 bg-gradient-to-r from-orange-200 via-yellow-300 to-blue-400 relative cursor-pointer">
//             {user.cover_pic && (
//               <img src={user.cover_pic} alt="Cover" className="w-full h-full object-cover opacity-70" />
//             )}
//           </div>

//           <div className="relative px-6 pb-6">
//             <div className="absolute -top-20 left-6 w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
//               <img
//                 src={user.profile_pic || '/default-profile.jpg'}
//                 alt={user.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="absolute right-3 mt-5 top-0 flex items-center space-x-2">
//               {user.linkedin && (
//                 <a href={user.linkedin} target="_blank">
//                   <i className="bi bi-linkedin text-xl text-blue-600" />
//                 </a>
//               )}
//               {user.website && (
//                 <a href={user.website} target="_blank">
//                   <i className="bi bi-globe text-xl text-blue-600" />
//                 </a>
//               )}
//               {user.github && (
//                 <a href={user.github} target="_blank">
//                   <i className="bi bi-github text-xl text-blue-600" />
//                 </a>
//               )}
//               <button className="text-blue-500 hover:text-blue-700 transition font-bold">
//                 <Plus className="w-4.5 h-4.5 stroke-[6]" />
//               </button>
//             </div>

//             <div className="pt-16">
//               <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 flex items-center gap-2">
//                 {user.name}
//                 <button className="text-gray-500 hover:text-gray-700 transition">
//                   <Pencil className="w-4 h-4" />
//                 </button>
//               </h1>

//               <p className="text-gray-700 mt-1">{user.bio || 'No bio available'}</p>

//               <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
//                 <Briefcase className="w-4 h-4" />
//                 <span className="font-medium">Wooble.io</span>
//               </div>

//               <div className="flex items-center gap-2 text-sm mt-2 text-gray-700">
//                 <MapPin className="w-4 h-4" />
//                 <span className="font-medium">{user.location || 'Unknown Location'}</span>
//               </div>

//               <div className="mt-8 flex gap-3">
//                 <button className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-full shadow hover:opacity-90 transition">
//                   Follow
//                 </button>
//                 <button className="border border-black text-black px-5 py-2 rounded-full hover:bg-gray-100 transition">
//                   Ask Question
//                 </button>
//               </div>
//             </div>

//             {/* Skills Section */}
//             <div className="flex justify-end">
//               <div className="flex justify-between items-start mt-4 text-sm text-gray-700 w-full">
//                 <div className="flex items-center mr-2 gap-2 flex-shrink-0">
//                   <span className="font-semibold ml-6">Skills</span>
//                 </div>
//                 <div className="flex-1 min-w-0 mx-4 flex flex-wrap gap-2">
//                 {user?.skills?.length > 0 ? (
//                     user.skills.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded"
//                       >
//                         {skill}
//                       </span>
//                     ))
//                   ) : (
//                     <span>No skills available</span>
//                   )}
//                 </div>
//                 <button className="text-blue-500 hover:text-blue-700 transition font-bold flex-shrink-0">
//                   <Plus className="w-4.5 h-4.5 stroke-[6]" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-3">This is me</h2>
//           <p className="text-gray-700">{user.bio || 'No description available.'}</p>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl shadow-md p-4">
//           <div className="flex gap-6 border-b pb-2 mb-6">
//             {["projects", "timeline", "impact"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`font-medium pb-1 ${
//                   activeTab === tab
//                     ? "text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {tab.toUpperCase()}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           {activeTab === "projects" && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="border rounded-xl overflow-hidden shadow-sm">
//                 <img
//                   src="/project1.png"
//                   alt="Project 1"
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-3">
//                   <h3 className="text-blue-600 font-medium">Lets Resources</h3>
//                   <div className="flex justify-between text-sm text-gray-500 mt-1">
//                     <span>0 claps</span>
//                     <span>IMAGE</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="border rounded-xl overflow-hidden shadow-sm">
//                 <img
//                   src="/project2.png"
//                   alt="Project 2"
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-3">
//                   <h3 className="text-blue-600 font-medium">Hello Testing</h3>
//                   <div className="flex justify-between text-sm text-gray-500 mt-1">
//                     <span>4 claps</span>
//                     <span>WORD DOCUMENT</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === "timeline" && (
//             <div className="text-gray-600 text-sm">Timeline content goes here...</div>
//           )}

//           {activeTab === "impact" && (
//             <div className="text-gray-600 text-sm">Impact Zone content goes here...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
