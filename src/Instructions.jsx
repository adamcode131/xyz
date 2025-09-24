import { useState } from 'react';

export default function Instructions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Select Your Property",
      description: "Choose from our luxurious villas or modern apartments. Click on the property image to select your preferred accommodation.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      alt: "Luxury property selection"
    },
    {
      id: 2,
      title: "Enter Your Details",
      description: "Fill in your personal information including name and email address. We'll use this to send your booking confirmation.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop",
      alt: "Form filling illustration"
    },
    {
      id: 3,
      title: "Choose Dates",
      description: "Select your check-in and check-out dates. Make sure to check availability for your preferred dates.",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop",
      alt: "Calendar and dates selection"
    },
    {
      id: 4,
      title: "Confirm Booking",
      description: "Review your reservation details and click 'Book Now' to complete your booking. You'll receive a confirmation email shortly.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
      alt: "Booking confirmation"
    }
  ];

  const currentStep = steps.find(step => step.id === activeStep);

  // Show option selection screen
  if (!selectedOption) {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 fixed inset-0 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Instructions</h1>
            <p className="text-lg text-gray-600">
              Choose your preferred instruction method below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step by Step Option */}
            <button 
              onClick={() => setSelectedOption('step-by-step')}
              className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Step by Step Instructions</h3>
              <p className="text-gray-600 mb-4">
                Interactive guide with visual examples. Perfect for first-time users who want detailed guidance.
              </p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                Get Started
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Other Method Option */}
            <button 
              onClick={() => setSelectedOption('other')}
              className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quick Guide</h3>
              <p className="text-gray-600 mb-4">
                Concise instructions for experienced users. Get straight to the point with minimal explanations.
              </p>
              <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                View Guide
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show other method instructions
  if (selectedOption === 'other') {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 fixed inset-0 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button 
              onClick={() => setSelectedOption(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Options
            </button>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Guide</h1>
              <p className="text-lg text-gray-600">
                Fast and straightforward booking process
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Select a Property</h3>
                  <p className="text-gray-600">Click on any property card to choose your accommodation</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fill Basic Info</h3>
                  <p className="text-gray-600">Enter your name and email in the form fields</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Choose Dates</h3>
                  <p className="text-gray-600">Pick your check-in and check-out dates</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Confirm Booking</h3>
                  <p className="text-gray-600">Click "Book Now" to complete your reservation</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setSelectedOption(null)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Back to Options
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show step by step instructions
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 fixed inset-0 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => setSelectedOption(null)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Options
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Step by Step Instructions</h1>
          <p className="text-lg text-gray-600">
            Follow these simple steps to complete your reservation and secure your perfect getaway
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 ${
                      activeStep >= step.id
                        ? 'bg-white text-indigo-600 shadow-lg transform scale-110'
                        : 'bg-indigo-400 text-white'
                    } ${activeStep === step.id ? 'ring-4 ring-indigo-300 ring-opacity-50' : ''}`}
                  >
                    {step.id}
                  </button>
                  <span className={`text-sm mt-2 font-medium ${
                    activeStep === step.id ? 'text-white' : 'text-indigo-200'
                  }`}>
                    Step {step.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
                    Step {activeStep} of {steps.length}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentStep?.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {currentStep?.description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    disabled={activeStep === 1}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                    disabled={activeStep === steps.length}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeStep === steps.length
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {activeStep === steps.length ? 'Completed' : 'Next Step'}
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={currentStep?.image}
                    alt={currentStep?.alt}
                    className="rounded-xl shadow-lg w-full max-w-md transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-3 -right-3 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Step {activeStep}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {steps.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    activeStep === step.id ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to step ${step.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}