"use client";

import React, { useState, useEffect } from "react";

interface AddSkillsProps {
    handleClose: () => void;
    onSaveSkills: (skills: { skill: string; source: string }[]) => void;
  }
  
  const AddSkills: React.FC<AddSkillsProps> = ({ handleClose, onSaveSkills }) => {
    const [skill, setSkill] = useState("");
    const [source, setSource] = useState("");
    const [customSource, setCustomSource] = useState("");
    const [skillsList, setSkillsList] = useState<{ skill: string; source: string }[]>(() => {
      if (typeof window !== "undefined") {
        const storedSkills = localStorage.getItem("persistedSkills");
        return storedSkills ? JSON.parse(storedSkills) : [];
      }
      return [];
    });
    

      // Added savedSkills state
      const [savedSkills, setSavedSkills] = useState<{ skill: string; source: string }[]>(() => {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("accountPageSkills");
          return stored ? JSON.parse(stored) : [];
        }
        return [];
      });

  const handleSaveSkills = (skills: { skill: string; source: string }[]) => {
    setSavedSkills(skills);
    localStorage.setItem("accountPageSkills", JSON.stringify(skills));
    //setShowAddSkills(false); // Assuming `setShowAddSkills` is used to toggle visibility
    handleClose(); // Close the modal after saving
  };

    const yourSkills = [
    "JavaScript", "HTML", "CSS", "Python", "Java", "C++", "c", "C#", "SQL", "Git",
    "React", "Node.js", "Android Development", "iOS Development", "PHP",
    "Laravel", "AWS", "Azure", "Google Cloud", "Machine Learning",
    "Data Analysis", "Excel", "R", "Tableau", "Power BI", "AutoCAD", "MATLAB",
    "Cybersecurity", "Networking", "Linux", "Windows Server", "Blockchain Basics",
    "IoT Basics", "Hadoop", "Spark", "Big Data", "Predictive Modeling",
    "Business Intelligence", "Data Mining", "Data Visualization", "Statistics",
    "Data Governance", "Data Warehousing", "Data Quality", "Data Cleaning",
    "Data Engineering", "Artificial Intelligence Basics", "Natural Language Processing",
    "Google Analytics", "Facebook Ads", "Instagram Marketing", "Email Marketing",
    "Brand Management", "Consumer Behavior", "Sales Strategies", "Lead Generation",
    "Product Management", "Pricing Strategies", "Retail Management", "Advertising",
    "Public Relations", "Event Planning", "Accounting", "Taxation", "Auditing",
    "Financial Reporting", "Budgeting", "Cost Management", "Investment Analysis",
    "Portfolio Management", "Risk Assessment", "Payroll Management", "Financial Modeling",
    "QuickBooks", "Tally", "SAP FICO", "GST Compliance", "Income Tax Filing",
    "Corporate Finance", "Bank Reconciliation", "Credit Analysis",
    "Recruitment", "Employee Onboarding", "Talent Management", "Performance Management",
    "HR Policies", "HR Software", "Organizational Development", "Succession Planning",
    "Labor Law Compliance", "HR Analytics", "Change Management", "Leadership Development",
    "Corporate Training", "Curriculum Development", "Classroom Management",
    "Instructional Design", "Educational Technology", "Online Teaching",
    "Lesson Planning", "Student Assessment", "Special Education",
    "Early Childhood Education", "Adult Education", "Teaching English as a Second Language (TESOL)",
    "E-learning", "Pedagogy", "Learning Management Systems (LMS)", "Educational Research",
    "Legal Research", "Contract Law", "Corporate Law", "Intellectual Property Law",
    "Employment Law", "Litigation", "Compliance", "Legal Writing", "Legal Drafting",
    "Dispute Resolution", "Mergers & Acquisitions", "Criminal Law", "Civil Law",
    "Real Estate Law", "Tax Law", "Regulatory Affairs", "Legal Consulting",
    "Mediation", "Arbitration", "Legal Ethics", "Human Rights Law",
    "Environmental Law", "International Law", "UI/UX Design", "Sketch", "Figma",
    "InDesign", "After Effects", "Premiere Pro", "Final Cut Pro", "Video Editing",
    "Photography", "Content Creation", "Copywriting", "Creative Writing",
    "Blogging", "Social Media Management", "Branding", "SEO", "SEM", "Content Marketing",
    "Motion Graphics", "Visual Communication", "Typography", "Web Design",
    "Creative Problem Solving", "Docker", "Kubernetes", "Jenkins", "Terraform",
    "CI/CD Pipelines", "Cloud Security", "Penetration Testing", "Ethical Hacking",
    "Project Management", "Time Management", "Leadership", "Teamwork",
    "Agile Methodology", "Scrum", "Kanban", "Risk Management", "Strategic Planning",
    "Budget Management", "Business Development", "Market Research",
    "Financial Analysis", "Supply Chain Management", "Operations Management",
    "Business Analysis", "Entrepreneurship", "Negotiation Skills", "CRM Software",
    "Salesforce", "Microsoft Office", "Google Workspace", "Customer Relationship Management",
    "Public Speaking", "Presentation Skills", "Negotiation", "Conflict Resolution",
    "Networking", "Emotional Intelligence", "Active Listening", "Written Communication",
    "Verbal Communication", "Interpersonal Skills", "Problem Solving",
    "Critical Thinking", "Adaptability", "Creativity", "Decision Making",
    "Persuasion", "Storytelling", "Self-Motivation", "Mentoring", "Coaching",
    "Team Collaboration", "Cross-functional Teamwork", "Multilingualism",
    "First Aid", "CPR", "Personal Training", "Yoga", "Meditation", "Nutrition",
    "Diet Planning", "Physical Therapy", "Sports Coaching", "Health Education",
    "Wellness Coaching", "Stress Management", "Mental Health Awareness",
    "Mindfulness", "Public Health", "Healthcare Management", "Patient Care",
    "Pharmacy Basics", "Health Informatics", "Medical Billing & Coding",
    "Clinical Research", "Volunteer Management", "Nonprofit Management",
    "Customer Service", "Client Relations", "E-commerce", "Hospitality Management",
    "Tourism Management", "Fashion Design", "Interior Design", "Art Direction",
    "Music Production", "Film Production", "Creative Direction", "Baking",
    "Culinary Arts", "Bartending", "Mixology", "Hairdressing", "Makeup Artistry",
    "Pet Care", "Gardening", "Home Improvement", "Real Estate Management",
    "Property Management", "Transportation Logistics", "Supply Chain Optimization",
    "Fundraising", "Event Planning", "Human Rights Advocacy", "Ethical Leadership",
    "Sustainability Awareness", "Community Outreach", "Digital Literacy",
    "Personal Branding", "Emotional Resilience", "Positive Psychology"
  ];

 
  const filteredSuggestions = skill
    ? yourSkills.filter(
        (s) =>
          s.toLowerCase().includes(skill.toLowerCase()) &&
          !skillsList.some((item) => item.skill.toLowerCase() === s.toLowerCase())
      )
    : [];

    const handleAddSkill = () => {
      console.log("Saved Skills:", skillsList);
      onSaveSkills(skillsList);
    };
    

  const handleSuggestionClick = (suggestedSkill: string) => {
    setSkill(suggestedSkill);
  };

  const handleDeleteSkill = (index: number) => {
    setSkillsList((prev) => prev.filter((_, i) => i !== index));
  };

    // Automatically add skill to list when source is selected
    useEffect(() => {
      const finalSource = source === "Other" ? customSource.trim() : source;
  
      if (
        skill.trim() &&
        finalSource &&
        !skillsList.some(
          (item) =>
            item.skill.toLowerCase() === skill.trim().toLowerCase() &&
            item.source.toLowerCase() === finalSource.toLowerCase()
        )
      ) {
        setSkillsList((prev) => [...prev, { skill: skill.trim(), source: finalSource }]);
        setSkill("");
        setSource("");
        setCustomSource("");
      }
    }, [source, customSource]);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("persistedSkills", JSON.stringify(skillsList));
    }
  }, [skillsList]);
  

  return (
    <div className="w-full sm:max-w-2xl sm:mx-auto p-6 sm:p-8 bg-white rounded-3xl  shadow-2xl overflow-hidden sm:translate-x-0 translate-x-0 sm:rounded-3xl sm:shadow-2xl">
      <div className="flex flex-row  items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Add Your Skills
        </h2>
        <button
          onClick={handleClose}
          className="text-3xl leading-none text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
        
      <div className="mb-5 relative">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search and Add Skills
        </label>
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="One time only one skill name ex- React or communication"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      <div className="mt-15">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Where did you learn this skill?
        </label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        >
          <option value="">Select a source...</option>
          <option value="Self-Learned">Self-Learned</option>
          <option value="Online Course">Online Course</option>
          <option value="Bootcamp">Bootcamp</option>
          <option value="Training Program">Training Program</option>
          <option value="Other">Other</option>
        </select>
  
        {source === "Other" && (
          <input
            type="text"
            value={customSource}
            onChange={(e) => setCustomSource(e.target.value)}
            placeholder="Enter your source..."
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
          />
        )}
      </div>
  
      {skillsList.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Added Skills
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skillsList.map((item, index) => (
              <li
                key={index}
                className="flex items-center bg-blue-50 border border-blue-200 rounded-full text-sm px-3 py-1"
              >
                <span className="mr-2">{item.skill}</span>
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="text-red-500 hover:text-red-700 text-base leading-none"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      <button
        onClick={handleAddSkill}
        disabled={skillsList.length === 0}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition"
      >
        Save Skills
      </button>
    </div>
  );  
};

export default AddSkills;