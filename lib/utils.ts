import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    });
  });
}

export function generateAlertId(): string {
  return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function validateEmergencyContact(contact: string): boolean {
  // Basic validation for phone numbers or usernames
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  
  return phoneRegex.test(contact) || usernameRegex.test(contact);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getStateFromLocation(lat: number, lng: number): Promise<string> {
  // Mock implementation - in real app, use reverse geocoding API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock state detection based on coordinates
      if (lat > 32 && lat < 42 && lng > -124 && lng < -114) {
        resolve('California');
      } else if (lat > 25 && lat < 37 && lng > -107 && lng < -93) {
        resolve('Texas');
      } else {
        resolve('New York'); // Default
      }
    }, 1000);
  });
}
