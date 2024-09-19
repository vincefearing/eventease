"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Upload, Calendar, MapPin, X } from "lucide-react";

// Mock function to load XML data
const loadXMLData = async () => {
  // This would be replaced with actual XML loading logic
  return [
    {
      id: 1,
      name: "Summer Music Festival",
      date: "2023-07-15",
      location: "Central Park",
      description:
        "A day-long music festival featuring top artists from around the world.",
    },
    {
      id: 2,
      name: "Tech Conference 2023",
      date: "2023-08-22",
      location: "Convention Center",
      description:
        "Annual conference showcasing the latest in technology and innovation.",
    },
    {
      id: 3,
      name: "Food and Wine Expo",
      date: "2023-09-10",
      location: "City Hall",
      description:
        "Explore a variety of cuisines and wines from local and international vendors.",
    },
  ];
};

export default function EventEase() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadXMLData().then(setEvents);
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/xml") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(
          event.target.result,
          "application/xml"
        );
        const parsedEvents = parseXML(xml);
        setEvents(parsedEvents);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid XML file.");
    }
  };

  const parseXML = (xml) => {
    const events = [];
    const eventNodes = xml.getElementsByTagName("event");
    for (let i = 0; i < eventNodes.length; i++) {
      const eventNode = eventNodes[i];
      const id = parseInt(eventNode.getAttribute("id"), 10);
      const name = eventNode.getElementsByTagName("name")[0]?.textContent || "";
      const date = eventNode.getElementsByTagName("date")[0]?.textContent || "";
      const location =
        eventNode.getElementsByTagName("location")[0]?.textContent || "";
      const description =
        eventNode.getElementsByTagName("description")[0]?.textContent || "";
      events.push({ id, name, date, location, description });
    }
    return events;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative h-64 overflow-hidden">
        <img
          src="/background.jpg"
          alt="Event crowd with raised hands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0066b2] bg-opacity-70 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Event<span className="text-[#FF6B35]">Ease</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border border-[#0066b2] rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#0066b2] text-gray-800"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#0066b2]" />
          </div>
          <button
            onClick={handleUpload}
            className="flex items-center justify-center px-4 py-2 bg-[#0066b2] text-white rounded-md hover:bg-[#004d86] transition-colors duration-300"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload XML
          </button>
        </div>

        <input
          type="file"
          accept=".xml"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#0066b2] hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#0066b2]">
                {event.name}
              </h2>
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-2 text-[#FF6B35]" />
                <p>{event.date}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-[#FF6B35]" />
                <p>{event.location}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-[#FF6B35] text-white rounded-md hover:bg-[#e55a2b] transition-colors duration-300 w-full"
                onClick={() => openModal(event)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </main>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0066b2]">
                {selectedEvent.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-5 w-5 mr-2 text-[#FF6B35]" />
                <p>{selectedEvent.date}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-[#FF6B35]" />
                <p>{selectedEvent.location}</p>
              </div>
            </div>
            <p className="text-gray-700">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
