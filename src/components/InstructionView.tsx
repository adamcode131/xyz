import React from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import type { InstructionPage } from './types';

interface InstructionViewProps {
  page: InstructionPage;
  guestName: string;
  propertyName: string;
  onBack: () => void;
}

const InstructionView: React.FC<InstructionViewProps> = ({ 
  page, 
  guestName, 
  propertyName,
  onBack 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Check-in</span>
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{page.title}</h1>
            <p className="text-gray-600">
              Welcome to <strong>{propertyName}</strong>, {guestName}!
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          {page.steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step_number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              
              {step.image_url && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                      <ImageIcon className="h-4 w-4" />
                      <span>Step {step.step_number} Visual Guide</span>
                    </div>
                    <img
                      src={step.image_url}
                      alt={`Step ${step.step_number}: ${step.title}`}
                      className="w-full h-auto rounded-md border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Completion Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">You're All Set!</h2>
          <p className="text-green-700">
            Follow the steps above to complete your check-in. If you need any assistance, 
            don't hesitate to contact us. Enjoy your stay!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructionView;