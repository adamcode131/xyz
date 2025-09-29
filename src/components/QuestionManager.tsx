import React, { useState } from 'react';
import { Plus, HelpCircle, MessageSquare } from 'lucide-react';
import type { CheckInQuestion, Property, QuestionAnswer } from './types';

interface QuestionManagerProps {
  questions: CheckInQuestion[];
  answers: QuestionAnswer[];
  properties: Property[];
  onAddQuestion: (question: Omit<CheckInQuestion, 'id' | 'created_at'>) => void;
  onAddAnswer: (answer: Omit<QuestionAnswer, 'id' | 'created_at'>) => void;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  answers,
  properties,
  onAddQuestion,
  onAddAnswer,
}) => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [questionFormData, setQuestionFormData] = useState({
    property_id: '',
    question: '',
  });
  const [answerFormData, setAnswerFormData] = useState({
    question_id: '',
    answer_text: '',
    instruction_page_id: '',
  });

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddQuestion(questionFormData);
    setQuestionFormData({ property_id: '', question: '' });
    setShowQuestionForm(false);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAnswer(answerFormData);
    setAnswerFormData({ question_id: '', answer_text: '', instruction_page_id: '' });
    setShowAnswerForm(false);
  };

  const getPropertyName = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.name : 'Unknown Property';
  };

  const getQuestionAnswers = (questionId: string) => {
    return answers.filter(answer => answer.question_id === questionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Check-in Questions</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAnswerForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Add Answer</span>
          </button>
          <button
            onClick={() => setShowQuestionForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {showQuestionForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Question</h3>
          <form onSubmit={handleQuestionSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property
              </label>
              <select
                required
                value={questionFormData.property_id}
                onChange={(e) => setQuestionFormData({ ...questionFormData, property_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Text
              </label>
              <textarea
                required
                value={questionFormData.question}
                onChange={(e) => setQuestionFormData({ ...questionFormData, question: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your check-in question"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Question
              </button>
              <button
                type="button"
                onClick={() => setShowQuestionForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showAnswerForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Answer Option</h3>
          <form onSubmit={handleAnswerSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <select
                required
                value={answerFormData.question_id}
                onChange={(e) => setAnswerFormData({ ...answerFormData, question_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a question</option>
                {questions.map((question) => (
                  <option key={question.id} value={question.id}>
                    {question.question} ({getPropertyName(question.property_id)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Answer Text
              </label>
              <input
                type="text"
                required
                value={answerFormData.answer_text}
                onChange={(e) => setAnswerFormData({ ...answerFormData, answer_text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter answer option"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instruction Page ID (Optional)
              </label>
              <input
                type="text"
                value={answerFormData.instruction_page_id}
                onChange={(e) => setAnswerFormData({ ...answerFormData, instruction_page_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Link to instruction page (optional)"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Add Answer
              </button>
              <button
                type="button"
                onClick={() => setShowAnswerForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {questions.map((question) => {
          const questionAnswers = getQuestionAnswers(question.id);
          return (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{question.question}</h3>
                    <p className="text-sm text-gray-500">
                      Property: {getPropertyName(question.property_id)}
                    </p>
                  </div>
                </div>
              </div>
              
              {questionAnswers.length > 0 && (
                <div className="mt-4 pl-8">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Answer Options:</h4>
                  <div className="space-y-2">
                    {questionAnswers.map((answer) => (
                      <div
                        key={answer.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                      >
                        <span className="text-sm text-gray-900">{answer.answer_text}</span>
                        {answer.instruction_page_id && (
                          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                            Links to instructions
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {questions.length === 0 && !showQuestionForm && (
        <div className="text-center py-12">
          <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
          <p className="text-gray-500 mb-4">Create questions to customize the check-in flow.</p>
          <button
            onClick={() => setShowQuestionForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Question</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;