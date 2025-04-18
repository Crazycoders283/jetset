"use client"

import React, { useState, useEffect } from "react"
import { Calendar, Users, MapPin, Search, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react"
import { defaultSearchData, specialFares } from "./data.js"

// Get this from a config or parent component
const USE_AMADEUS_API = false;

export default function FlightSearchForm({ initialData, onSearch }) {
  const [formData, setFormData] = useState(initialData || defaultSearchData)
  const [formErrors, setFormErrors] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleTripTypeChange = (type) => {
    setFormData({ ...formData, tripType: type })
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
    
    // Clear validation error when field is changed
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: null
      });
    }
  }

  const validateForm = () => {
    const errors = {};
    
    if (!formData.from) {
      errors.from = "Please enter departure city";
    }
    
    if (!formData.to) {
      errors.to = "Please enter destination city";
    }
    
    if (!formData.departDate) {
      errors.departDate = "Please select departure date";
    }
    
    if (formData.tripType === "roundTrip" && !formData.returnDate) {
      errors.returnDate = "Please select return date";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSearch = () => {
    if (!validateForm()) {
      return;
    }
    
    if (onSearch) {
      onSearch(formData);
    } else {
      console.log("Search data:", formData)
    }
  }

  const nextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, 2))
  }

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0))
  }

  // Mobile form steps
  const renderMobileStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleTripTypeChange("oneWay")}
                className={`flex-1 py-3 text-center font-medium rounded-lg transition-colors ${
                  formData.tripType === "oneWay" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                One Way
              </button>
              <button
                onClick={() => handleTripTypeChange("roundTrip")}
                className={`flex-1 py-3 text-center font-medium rounded-lg transition-colors ${
                  formData.tripType === "roundTrip" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Round Trip
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">From</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.from || ""}
                    onChange={(e) => handleInputChange("from", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Departure city"
                  />
                  <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {formErrors.from && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.from}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">To</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.to || ""}
                    onChange={(e) => handleInputChange("to", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Destination city"
                  />
                  <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {formErrors.to && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.to}</p>
                )}
              </div>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm font-medium mb-2 block">Depart Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.departDate || ""}
                  onChange={(e) => handleInputChange("departDate", e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select date"
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
              {formErrors.departDate && (
                <p className="text-red-500 text-xs mt-1">{formErrors.departDate}</p>
              )}
            </div>

            {formData.tripType === "roundTrip" && (
              <div>
                <label className="text-gray-600 text-sm font-medium mb-2 block">Return Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.returnDate || ""}
                    onChange={(e) => handleInputChange("returnDate", e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select date"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
                {formErrors.returnDate && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.returnDate}</p>
                )}
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-sm font-medium mb-2 block">Travelers</label>
              <div className="relative">
                <select
                  value={formData.travelers || "2"}
                  onChange={(e) => handleInputChange("travelers", e.target.value)}
                  className="w-full p-4 appearance-none border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4+ Travelers</option>
                </select>
                <Users className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl border border-gray-200 whitespace-nowrap">
                Student
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl border border-gray-200 whitespace-nowrap">
                Senior Citizen
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl border border-gray-200 whitespace-nowrap">
                Armed Forces
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {isMobile ? (
        <div className="w-full bg-white rounded-xl shadow-md p-6 mt-16 sm:mt-20">
          {/* Progress indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-2">
              {[0, 1, 2].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeStep === step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {renderMobileStep()}
          
          <div className="flex justify-between mt-6">
            {activeStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
            )}
            
            {activeStep < 2 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Search className="h-5 w-5" />
                Search Flights
              </button>
            )}
          </div>
        </div>
      ) : (
        // Desktop version remains unchanged
        <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6" style={{ width: "1200px" }}>
          <div className="flex flex-row items-end justify-between gap-4">
            {/* From */}
            <div className="flex-1">
              <label className="text-gray-600 text-sm font-medium mb-2 block">From</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.from || ""}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Departure city"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {formErrors.from && (
                <p className="text-red-500 text-xs mt-1">{formErrors.from}</p>
              )}
            </div>
            
            {/* To */}
            <div className="flex-1">
              <label className="text-gray-600 text-sm font-medium mb-2 block">To</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.to || ""}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Destination city"
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {formErrors.to && (
                <p className="text-red-500 text-xs mt-1">{formErrors.to}</p>
              )}
            </div>
            
            {/* Depart Date */}
            <div className="flex-1">
              <label className="text-gray-600 text-sm font-medium mb-2 block">Depart Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.departDate || ""}
                  onChange={(e) => handleInputChange("departDate", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select date"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
              </div>
              {formErrors.departDate && (
                <p className="text-red-500 text-xs mt-1">{formErrors.departDate}</p>
              )}
            </div>
            
            {/* Return Date - Only visible for Round Trip */}
            {formData.tripType === "roundTrip" && (
              <div className="flex-1">
                <label className="text-gray-600 text-sm font-medium mb-2 block">Return Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.returnDate || ""}
                    onChange={(e) => handleInputChange("returnDate", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select date"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                </div>
                {formErrors.returnDate && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.returnDate}</p>
                )}
              </div>
            )}
            
            {/* Travelers */}
            <div className="flex-1">
              <label className="text-gray-600 text-sm font-medium mb-2 block">Travelers</label>
              <div className="relative">
                <select
                  value={formData.travelers || "2"}
                  onChange={(e) => handleInputChange("travelers", e.target.value)}
                  className="w-full p-3 appearance-none border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 Traveler</option>
                  <option value="2">2 Travelers</option>
                  <option value="3">3 Travelers</option>
                  <option value="4">4+ Travelers</option>
                </select>
                <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            {/* Search Button */}
            <div className="ml-2">
              <button
                onClick={handleSearch}
                className="h-12 bg-[#1a56db] hover:bg-blue-700 text-white px-8 rounded-md flex items-center justify-center transition-colors"
              >
                <Search className="h-5 w-5 mr-2" />
                <span className="font-medium">Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Special Fares - Desktop only */}
      {!isMobile && (
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">Special Fares:</span>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-gray-100 bg-opacity-30 hover:bg-opacity-40 text-white rounded-full border border-white">
              Student
            </button>
            <button className="px-6 py-2 bg-gray-100 bg-opacity-30 hover:bg-opacity-40 text-white rounded-full border border-white">
              Senior Citizen
            </button>
            <button className="px-6 py-2 bg-gray-100 bg-opacity-30 hover:bg-opacity-40 text-white rounded-full border border-white">
              Armed Forces
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
