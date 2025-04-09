import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobList from "../components/JobLists";
import axios from "axios";
import Loader from "../components/Loader";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function SearchJobs() {
  const [keywords, setKeywords] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [load, setLoad] = useState(false);
  const [query, setQuery] = useState("");
  const countries = ["sa", "fr", "ca", "gr", "tr"];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("يرجى اختيار ملف PDF");

    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoad(true);
    try {
      const response = await axios.post(
        "https://fake-apis-uomb.onrender.com/upload-cv/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.keywords) {
        setLoad(false);
        const extractedKeywords = response.data.keywords
          .map(([word]) => word)
          .join(" ");
        setKeywords(extractedKeywords);
        console.log(response.data.keywords.join(","));
        fetchJobs(response.data.keywords.join(",")); // تشغيل البحث مباشرة
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchJobs = async (searchQuery) => {
    try {
      setLoad(true);
      const response = await axios.get(
        `https://jsearch.p.rapidapi.com/search`,

        {
          params: {
            query: searchQuery,
            country: countries,
          },
          headers: {
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            "X-RapidAPI-Key":
              "1c258210ebmsh7838cfcbf6894cap182dcejsn9e487b8725fe",
          },
        }
      );
      if (response.status === 200) {
        setJobs(response.data.data);
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // تحديث الاستعلام مع كل تغيير في حقل الإدخال
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    if (searchQuery.length > 2) {
      fetchJobs(searchQuery);
    } else {
      setJobs([]);
    }
  };

  return (
    <section className="container mx-auto py-16">
      <div className="parent">
        <h1 className="mb-10 text-3xl font-bold">Get Your Job</h1>
        <div className="main-content">
          <div className="mb-5">
            <SearchBar query={query} onSearch={handleSearch} />
          </div>

          {Object.keys(jobs).length > 0 ? (
            load ? (
              <Loader />
            ) : (
              <JobList jobs={jobs} />
            )
          ) : load ? (
            <Loader />
          ) : (
            <>
              <h3 className="text-center my-3">OR</h3>
              <div className="cv-section">
                <label className="cv-upload-label font-semibold">
                  Search by CV:
                </label>
                <div className="relative w-full text-center h-[40vh] border-2 border-dashed border-emerald-400 rounded-md mt-3 mb-10">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="cv-upload-input absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    size="200"
                  />
                  <button
                    onClick={handleUpload}
                    className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-2 text-white bg-emerald-500 !rounded-md cursor-pointer auth-btn"
                  >
                    Select CV
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchJobs;
