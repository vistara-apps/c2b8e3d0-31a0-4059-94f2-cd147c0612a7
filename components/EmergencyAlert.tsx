'use client';

import { cn } from '@/lib/utils';
import { EmergencyAlertProps } from '@/lib/types';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export function EmergencyAlert({
  variant,
  onCancel,
  onConfirm,
  message = 'Emergency alert will be sent to your contacts'
}: EmergencyAlertProps) {
  const isActive = variant === 'active';
  const isSent = variant === 'sent';

  return (
    <div className={cn(
      'glass-card p-6 border-2',
      isActive && 'border-red-400 bg-red-500 bg-opacity-10',
      isSent && 'border-green-400 bg-green-500 bg-opacity-10'
    )}>
      <div className="flex items-start space-x-3">
        <div className={cn(
          'p-2 rounded-full',
          isActive && 'bg-red-500',
          isSent && 'bg-green-500'
        )}>
          {isActive && <AlertTriangle className="w-5 h-5 text-white" />}
          {isSent && <CheckCircle className="w-5 h-5 text-white" />}
        </div>

        <div className="flex-1">
          <h3 className={cn(
            'font-semibold mb-2',
            isActive && 'text-red-300',
            isSent && 'text-green-300'
          )}>
            {isActive && 'Emergency Alert'}
            {isSent && 'Alert Sent'}
          </h3>
          
          <p className="text-sm text-gray-300 mb-4">
            {message}
          </p>

          {isActive && (
            <div className="flex space-x-3">
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Send Alert
              </button>
              <button
                onClick={onCancel}
                className="px-4 py-2 glass-card hover:bg-opacity-20 transition-all duration-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {isSent && (
            <div className="text-sm text-green-300">
              ✓ Alert sent to 3 contacts with your location
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
