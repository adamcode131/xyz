import type { Property, CheckInQuestion, QuestionAnswer, InstructionPage, Guest } from '../components/types';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Mock data for demo purposes
export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    name: 'Sunset Villa',
    address: '123 Ocean View Drive, Malibu, CA 90265',
    description: 'Luxury beachfront property with stunning sunset views',
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'prop-2',
    name: 'Downtown Loft',
    address: '456 City Center Ave, Los Angeles, CA 90012',
    description: 'Modern downtown loft in the heart of the city',
    created_at: '2024-01-20T14:30:00Z',
  },
];

export const mockQuestions: CheckInQuestion[] = [
  {
    id: 'q-1',
    property_id: 'prop-1',
    question: 'How many guests will be staying?',
    created_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'q-2',
    property_id: 'prop-2',
    question: 'What time do you plan to arrive?',
    created_at: '2024-01-21T09:00:00Z',
  },
];

export const mockAnswers: QuestionAnswer[] = [
  {
    id: 'a-1',
    question_id: 'q-1',
    answer_text: '1-2 guests',
    instruction_page_id: 'page-1',
    created_at: '2024-01-16T10:30:00Z',
  },
  {
    id: 'a-2',
    question_id: 'q-1',
    answer_text: '3-4 guests',
    instruction_page_id: 'page-2',
    created_at: '2024-01-16T10:31:00Z',
  },
  {
    id: 'a-3',
    question_id: 'q-2',
    answer_text: 'Before 3 PM',
    instruction_page_id: 'page-3',
    created_at: '2024-01-21T09:30:00Z',
  },
  {
    id: 'a-4',
    question_id: 'q-2',
    answer_text: 'After 3 PM',
    instruction_page_id: 'page-4',
    created_at: '2024-01-21T09:31:00Z',
  },
];

export const mockInstructionPages: InstructionPage[] = [
  {
    id: 'page-1',
    property_id: 'prop-1',
    title: 'Check-in Instructions for 1-2 Guests',
    steps: [
      {
        id: 'step-1-1',
        step_number: 1,
        title: 'Find the Key Lockbox',
        description: 'Locate the key lockbox on the right side of the front door. It\'s a black digital lockbox mounted on the wall.',
        image_url: 'https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'step-1-2',
        step_number: 2,
        title: 'Enter the Access Code',
        description: 'Enter the code: 1234. Press the lock button to unlock the box.',
        image_url: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'step-1-3',
        step_number: 3,
        title: 'Retrieve the Keys',
        description: 'Take the house keys from inside the lockbox. There should be 2 keys: front door and back patio.',
        image_url: 'https://images.pexels.com/photos/48771/pexels-photo-48771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'step-1-4',
        step_number: 4,
        title: 'Enter the Property',
        description: 'Use the front door key to unlock and enter. The alarm system is disabled for your arrival.',
      },
    ],
    created_at: '2024-01-16T11:00:00Z',
  },
  {
    id: 'page-2',
    property_id: 'prop-1',
    title: 'Check-in Instructions for 3-4 Guests',
    steps: [
      {
        id: 'step-2-1',
        step_number: 1,
        title: 'Contact Property Manager',
        description: 'For larger groups, please call the property manager at (555) 123-4567 for personalized check-in assistance.',
      },
      {
        id: 'step-2-2',
        step_number: 2,
        title: 'Wait for Greeting',
        description: 'A property manager will meet you at the front entrance within 10 minutes of your call.',
      },
    ],
    created_at: '2024-01-16T11:30:00Z',
  },
  {
    id: 'page-3',
    property_id: 'prop-2',
    title: 'Early Arrival Instructions',
    steps: [
      {
        id: 'step-3-1',
        step_number: 1,
        title: 'Building Access',
        description: 'Enter the building using code 9876 at the main entrance.',
        image_url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'step-3-2',
        step_number: 2,
        title: 'Elevator to Floor 15',
        description: 'Take the elevator to the 15th floor. Your unit is 15B.',
      },
    ],
    created_at: '2024-01-21T10:00:00Z',
  },
  {
    id: 'page-4',
    property_id: 'prop-2',
    title: 'Standard Check-in Instructions',
    steps: [
      {
        id: 'step-4-1',
        step_number: 1,
        title: 'Building Access',
        description: 'Use your temporary access card to enter the building. Card was sent via email.',
      },
      {
        id: 'step-4-2',
        step_number: 2,
        title: 'Unit Access',
        description: 'Your unit door will unlock automatically when you tap your access card.',
      },
    ],
    created_at: '2024-01-21T10:30:00Z',
  },
];

export const mockGuests: Guest[] = [
  {
    id: 'guest-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    property_id: 'prop-1',
    check_in_date: new Date().toISOString().split('T')[0], // Today for demo
    check_out_date: '2024-02-05',
    magic_token: 'magic-token-123',
    created_at: '2024-01-25T10:00:00Z',
  },
  {
    id: 'guest-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    property_id: 'prop-2',
    check_in_date: '2024-02-10',
    check_out_date: '2024-02-15',
    magic_token: 'magic-token-456',
    created_at: '2024-01-26T14:00:00Z',
  },
];

// Utility functions for mock data
export const generateMockId = generateId;

export const createMockProperty = (data: Omit<Property, 'id' | 'created_at'>): Property => ({
  ...data,
  id: generateId(),
  created_at: new Date().toISOString(),
});

export const createMockGuest = (data: Omit<Guest, 'id' | 'created_at' | 'magic_token'>): Guest => ({
  ...data,
  id: generateId(),
  magic_token: `magic-${generateId()}`,
  created_at: new Date().toISOString(),
});

export const createMockQuestion = (data: Omit<CheckInQuestion, 'id' | 'created_at'>): CheckInQuestion => ({
  ...data,
  id: generateId(),
  created_at: new Date().toISOString(),
});

export const createMockAnswer = (data: Omit<QuestionAnswer, 'id' | 'created_at'>): QuestionAnswer => ({
  ...data,
  id: generateId(),
  created_at: new Date().toISOString(),
});

export const createMockInstructionPage = (data: Omit<InstructionPage, 'id' | 'created_at'>): InstructionPage => ({
  ...data,
  id: generateId(),
  created_at: new Date().toISOString(),
});