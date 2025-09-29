import React, { useState, useEffect } from 'react';
import { Calendar, Upload, Check, AlertCircle, ArrowRight } from 'lucide-react';
import type { GuestSession, QuestionAnswer } from './types';

interface GuestCheckInProps {
  session: GuestSession;
  onUpdateGuestInfo: (phone: string, email: string) => void;
  onUploadId: (file: File) => void;
  onAnswerQuestion: (answerId: string) => void;
}

const GuestCheckIn: React.FC<GuestCheckInProps> = ({
  session,
  onUpdateGuestInfo,
  onUploadId,
  onAnswerQuestion,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState(session.guest.phone);
  const [email, setEmail] = useState(session.guest.email);
  const [idUploaded, setIdUploaded] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const checkInDate = session.guest.check_in_date;
  const isCheckInDay = today === checkInDate;

  const handleSaveInfo = () => {
    onUpdateGuestInfo(phone, email);
    setEditMode(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadId(file);
      setIdUploaded(true);
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswerId(answerId);
    onAnswerQuestion(answerId);
  };

  if (!isCheckInDay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {session.guest.name}!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your booking at <strong>{session.property.name}</strong>.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-amber-700">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Check-in Instructions Not Available</span>
            </div>
            <p className="text-amber-600 mt-2 text-sm">
              Please return to this page on your check-in date ({new Date(checkInDate).toLocaleDateString()}) 
              to access your check-in instructions.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p><strong>Check-in:</strong> {new Date(session.guest.check_in_date).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(session.guest.check_out_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {session.guest.name}!</h1>
          <p className="text-gray-600">
            Ready to check into <strong>{session.property.name}</strong>
          </p>
        </div>

        {/* Guest Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Your Information</h2>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            )}
          </div>
          
          {editMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveInfo}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Phone:</span>
                <p className="font-medium">{phone}</p>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <p className="font-medium">{email}</p>
              </div>
              <div>
                <span className="text-gray-500">Check-in:</span>
                <p className="font-medium">{new Date(session.guest.check_in_date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-500">Check-out:</span>
                <p className="font-medium">{new Date(session.guest.check_out_date).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* ID Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Government Issued ID</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {idUploaded || session.guest.id_document_url ? (
              <div className="text-green-600">
                <Check className="h-12 w-12 mx-auto mb-2" />
                <p className="font-medium">ID Document Uploaded</p>
                <p className="text-sm text-gray-500 mt-1">Thank you for providing your ID</p>
              </div>
            ) : (
              <div>
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Please upload a photo of your government-issued ID</p>
                <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Check-in Question */}
        {session.question && session.answers && session.answers.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Check-in Question</h2>
            <div className="mb-6">
              <p className="text-gray-700 font-medium">{session.question.question}</p>
            </div>
            <div className="space-y-3">
              {session.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedAnswerId === answer.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{answer.answer_text}</span>
                    {selectedAnswerId === answer.id && (
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestCheckIn;