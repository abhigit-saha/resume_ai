"use client";
import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { useAutosave } from "react-autosave";
import { updateResume } from "@/utils/api";
const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "white", padding: 30 },
  section: { margin: 10, padding: 10 },
  heading: { fontSize: 24, marginBottom: 10 },
  subheading: { fontSize: 18, marginBottom: 5 },
  itemTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 2 },
  text: { fontSize: 12, marginBottom: 5 },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 5 },
  skill: {
    fontSize: 10,
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    borderRadius: 3,
  },
});

const ResumeEditor = ({ resume }) => {
  console.log(resume);
  const [formData, setFormData] = useState({
    name: resume.name,
    email: resume.email,
    contact: resume.contact,
    introduction: resume.introduction,

    educationalQual: resume.educationalQual,
    professionalExp: resume.professionalExp || [],
    skills: resume.skills,
    projects: resume.projects || [],
    awards: resume.awards,
  });
  const [loading, setLoading] = useState(false);
  useAutosave({
    data: formData,
    onSave: async (_formData) => {
      setLoading(true);
      console.log(resume.id);
      const updated = await updateResume(resume.id, formData);
      setLoading(false);
    },
  });

  const [pdfUrl, setPdfUrl] = useState(null);

  const handleInputChange = (e, index, field, subfield = null) => {
    const { value } = e.target;
    setFormData((prevData) => {
      if (subfield) {
        const updatedField = [...prevData[field]];
        updatedField[index] = { ...updatedField[index], [subfield]: value };
        return { ...prevData, [field]: updatedField };
      } else {
        const updatedField = [...prevData[field]];
        updatedField[index] = value;
        return { ...prevData, [field]: updatedField };
      }
    });
  };

  const addField = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [
        ...prevData[field],
        field === "professionalExp" || field === "projects"
          ? { title: "", description: "" }
          : "",
      ],
    }));
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>{formData.name}</Text>
          <Text style={styles.text}>{formData.email}</Text>
          <Text style={styles.text}>{formData.contact}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Summary</Text>
          <Text style={styles.text}>{formData.introduction}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Professional Experience</Text>
          {formData.professionalExp.map((item, index) => (
            <View key={index}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          {formData.educationalQual.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          <View style={styles.skillsContainer}>
            {formData.skills.map((item, index) => (
              <Text key={index} style={styles.skill}>
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Projects</Text>
          {formData.projects.map((item, index) => (
            <View key={index}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.subheading}>Awards and Achievements</Text>
          {formData.awards.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  useEffect(() => {
    const generatePdf = async () => {
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
    generatePdf();
  }, [formData]);

  const downloadPdf = () => {
    if (pdfUrl) {
      saveAs(pdfUrl, "resume.pdf");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans bg-gray-100">
      {loading && <p>Loading...</p>}
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Resume Builder</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Resume Input
          </h3>
          <div className="space-y-6">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Summary
              </h4>
              <textarea
                placeholder="Introduction"
                value={formData.introduction}
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Professional Experience
              </h4>
              {formData.professionalExp.map((item, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <input
                    placeholder="Job Title"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(e, index, "professionalExp", "title")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Job Description"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        index,
                        "professionalExp",
                        "description"
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>
              ))}
              <button
                onClick={() => addField("professionalExp")}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Experience
              </button>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Educational Qualification
              </h4>
              {formData.educationalQual.map((item, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <input
                    placeholder="Education"
                    value={item}
                    onChange={(e) =>
                      handleInputChange(e, index, "educationalQual")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={() => addField("educationalQual")}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Educational Qualification
              </button>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Skills
              </h4>
              {formData.skills.map((item, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <input
                    placeholder="Skill"
                    value={item}
                    onChange={(e) => handleInputChange(e, index, "skills")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={() => addField("skills")}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Skill
              </button>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Projects
              </h4>
              {formData.projects.map((item, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <input
                    placeholder="Project Title"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(e, index, "projects", "title")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(e, index, "projects", "description")
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>
              ))}
              <button
                onClick={() => addField("projects")}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Project
              </button>
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Awards and Achievements
              </h4>
              {formData.awards.map((item, index) => (
                <div key={index} className="mb-4 space-y-2">
                  <input
                    placeholder="Award/Achievement"
                    value={item}
                    onChange={(e) => handleInputChange(e, index, "awards")}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={() => addField("awards")}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Award/Accomplishment
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">
            Resume Preview
          </h3>
          {pdfUrl && (
            <div className="space-y-4">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px] border border-gray-300 rounded-md"
              />
              <button
                onClick={downloadPdf}
                className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
