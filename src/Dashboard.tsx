import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import PropertyManager from './components/PropertyManager';
import GuestManager from './components/GuestManager';
import QuestionManager from './components/QuestionManager';
import InstructionPageManager from './components/InstructionPageManager';
import GuestCheckIn from './components/GuestCheckIn';
import InstructionView from './components/InstructionView';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  mockProperties,
  mockGuests,
  mockQuestions,
  mockAnswers,
  mockInstructionPages,
  createMockProperty,
  createMockGuest,
  createMockQuestion,
  createMockAnswer,
  createMockInstructionPage,
} from './utils/mockData';
import type { 
  Property, 
  Guest, 
  CheckInQuestion, 
  QuestionAnswer, 
  InstructionPage, 
  GuestSession 
} from './components/types';

function Dashboard() {
  const [properties, setProperties] = useLocalStorage<Property[]>('properties', mockProperties);
  const [guests, setGuests] = useLocalStorage<Guest[]>('guests', mockGuests);
  const [questions, setQuestions] = useLocalStorage<CheckInQuestion[]>('questions', mockQuestions);
  const [answers, setAnswers] = useLocalStorage<QuestionAnswer[]>('answers', mockAnswers);
  const [instructionPages, setInstructionPages] = useLocalStorage<InstructionPage[]>('instructionPages', mockInstructionPages);
  
  const [activeTab, setActiveTab] = useState('properties');
  const [currentView, setCurrentView] = useState<'admin' | 'guest-checkin' | 'instructions'>('admin');
  const [guestSession, setGuestSession] = useState<GuestSession | null>(null);
  const [selectedInstructionPage, setSelectedInstructionPage] = useState<InstructionPage | null>(null);

  // Check for magic link in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      const guest = guests.find(g => g.magic_token === token);
      if (guest) {
        const property = properties.find(p => p.id === guest.property_id);
        const question = questions.find(q => q.property_id === guest.property_id);
        const questionAnswers = question ? answers.filter(a => a.question_id === question.id) : [];
        
        if (property) {
          setGuestSession({
            guest,
            property,
            question,
            answers: questionAnswers,
          });
          setCurrentView('guest-checkin');
        }
      }
    }
  }, [guests, properties, questions, answers]);

  const handleAddProperty = (propertyData: Omit<Property, 'id' | 'created_at'>) => {
    const newProperty = createMockProperty(propertyData);
    setProperties([...properties, newProperty]);
  };

  const handleAddGuest = (guestData: Omit<Guest, 'id' | 'created_at' | 'magic_token'>) => {
    const newGuest = createMockGuest(guestData);
    setGuests([...guests, newGuest]);
  };

  const handleAddQuestion = (questionData: Omit<CheckInQuestion, 'id' | 'created_at'>) => {
    const newQuestion = createMockQuestion(questionData);
    setQuestions([...questions, newQuestion]);
  };

  const handleAddAnswer = (answerData: Omit<QuestionAnswer, 'id' | 'created_at'>) => {
    const newAnswer = createMockAnswer(answerData);
    setAnswers([...answers, newAnswer]);
  };

  const handleAddInstructionPage = (pageData: Omit<InstructionPage, 'id' | 'created_at'>) => {
    const newPage = createMockInstructionPage(pageData);
    setInstructionPages([...instructionPages, newPage]);
  };

  const handleCopyMagicLink = (token: string) => {
    const link = `${window.location.origin}?token=${token}`;
    navigator.clipboard.writeText(link);
  };

  const handleUpdateGuestInfo = (phone: string, email: string) => {
    if (guestSession) {
      const updatedGuest = { ...guestSession.guest, phone, email };
      const updatedGuests = guests.map(g => 
        g.id === updatedGuest.id ? updatedGuest : g
      );
      setGuests(updatedGuests);
      setGuestSession({ ...guestSession, guest: updatedGuest });
    }
  };

  const handleUploadId = (file: File) => {
    // In a real Dashboard, this would upload to storage and get a URL
    console.log('ID file uploaded:', file.name);
    if (guestSession) {
      const updatedGuest = { 
        ...guestSession.guest, 
        id_document_url: `uploaded-id-${file.name}` 
      };
      const updatedGuests = guests.map(g => 
        g.id === updatedGuest.id ? updatedGuest : g
      );
      setGuests(updatedGuests);
      setGuestSession({ ...guestSession, guest: updatedGuest });
    }
  };

  const handleAnswerQuestion = (answerId: string) => {
    const answer = answers.find(a => a.id === answerId);
    if (answer && answer.instruction_page_id) {
      const page = instructionPages.find(p => p.id === answer.instruction_page_id);
      if (page) {
        setSelectedInstructionPage(page);
        setCurrentView('instructions');
      }
    }
  };

  const handleBackToCheckIn = () => {
    setCurrentView('guest-checkin');
    setSelectedInstructionPage(null);
  };

  const handleBackToAdmin = () => {
    setCurrentView('admin');
    setGuestSession(null);
    setSelectedInstructionPage(null);
    // Remove token from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  if (currentView === 'instructions' && selectedInstructionPage && guestSession) {
    return (
      <InstructionView
        page={selectedInstructionPage}
        guestName={guestSession.guest.name}
        propertyName={guestSession.property.name}
        onBack={handleBackToCheckIn}
      />
    );
  }

  if (currentView === 'guest-checkin' && guestSession) {
    return (
      <div>
        <div className="fixed top-4 left-4 z-10">
          <button
            onClick={handleBackToAdmin}
            className="px-3 py-1 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 transition-colors"
          >
            Admin View
          </button>
        </div>
        <GuestCheckIn
          session={guestSession}
          onUpdateGuestInfo={handleUpdateGuestInfo}
          onUploadId={handleUploadId}
          onAnswerQuestion={handleAnswerQuestion}
        />
      </div>
    );
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'properties' && (
        <PropertyManager
          properties={properties}
          onAddProperty={handleAddProperty}
        />
      )}
      {activeTab === 'guests' && (
        <GuestManager
          guests={guests}
          properties={properties}
          onAddGuest={handleAddGuest}
          onCopyMagicLink={handleCopyMagicLink}
        />
      )}
      {activeTab === 'questions' && (
        <QuestionManager
          questions={questions}
          answers={answers}
          properties={properties}
          onAddQuestion={handleAddQuestion}
          onAddAnswer={handleAddAnswer}
        />
      )}
      {activeTab === 'pages' && (
        <InstructionPageManager
          pages={instructionPages}
          properties={properties}
          onAddPage={handleAddInstructionPage}
        />
      )}
    </AdminLayout>
  );
}

export default Dashboard;