export interface Property {
    id: string;
    name: string;
    address: string;
    description?: string;
    created_at: string;
  }
  
  export interface CheckInQuestion {
    id: string;
    property_id: string;
    question: string;
    created_at: string;
  }
  
  export interface QuestionAnswer {
    id: string;
    question_id: string;
    answer_text: string;
    instruction_page_id: string;
    created_at: string;
  }
  
  export interface InstructionPage {
    id: string;
    property_id: string;
    title: string;
    steps: InstructionStep[];
    created_at: string;
  }
  
  export interface InstructionStep {
    id: string;
    step_number: number;
    title: string;
    description: string;
    image_url?: string;
  }
  
  export interface Guest {
    id: string;
    name: string;
    email: string;
    phone: string;
    property_id: string;
    check_in_date: string;
    check_out_date: string;
    magic_token: string;
    id_document_url?: string;
    created_at: string;
  }
  
  export interface GuestSession {
    guest: Guest;
    property: Property;
    question?: CheckInQuestion;
    answers?: QuestionAnswer[];
  }