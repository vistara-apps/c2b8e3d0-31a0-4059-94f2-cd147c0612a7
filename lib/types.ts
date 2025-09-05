// User entity
export interface User {
  userId: string;
  fName: string;
  handle: string;
  emergencyContacts: string[];
  notificationPreferences: {
    sms: boolean;
    farcaster: boolean;
    email: boolean;
  };
}

// Legal Guide entity
export interface LegalGuide {
  guideId: string;
  state: string;
  language: 'en' | 'es';
  content: string;
  scripts: {
    whatToSay: string[];
    whatNotToSay: string[];
  };
  url?: string;
}

// Alert Log entity
export interface AlertLog {
  alertId: string;
  userId: string;
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  recordedMediaUrl?: string;
}

// App state types
export interface AppState {
  selectedState: string;
  language: 'en' | 'es';
  isRecording: boolean;
  currentGuide: LegalGuide | null;
  user: User | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface ActionButtonProps {
  variant: 'primary' | 'danger' | 'record';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export interface InfoCardProps {
  variant: 'state' | 'script';
  title: string;
  content: string | string[];
  price?: string;
  onPurchase?: () => void;
  className?: string;
}

export interface ShareButtonProps {
  variant?: 'default';
  onShare: () => void;
  disabled?: boolean;
  className?: string;
}

export interface EmergencyAlertProps {
  variant: 'active' | 'sent';
  onCancel?: () => void;
  onConfirm?: () => void;
  message?: string;
}

// OpenAI types
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ScriptGenerationRequest {
  state: string;
  scenario: string;
  language: 'en' | 'es';
}
