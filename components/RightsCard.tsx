'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Download, Share2 } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface RightsCardProps {
  isOpen: boolean;
  onClose: () => void;
  state: string;
  language: 'en' | 'es';
  className?: string;
}

export function RightsCard({ 
  isOpen, 
  onClose, 
  state, 
  language,
  className 
}: RightsCardProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      // Mock share functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (navigator.share) {
        await navigator.share({
          title: 'Know Your Rights Card',
          text: `Essential rights information for ${state}`,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  const rights = {
    en: {
      title: 'Digital Rights Card',
      subtitle: 'Your rights you can tell the you to rally.',
      sections: [
        {
          title: 'What to Say',
          items: [
            'I am exercising my right to remain silent',
            'I do not consent to any searches',
            'Am I free to leave?',
            'I want to speak to a lawyer'
          ]
        },
        {
          title: 'What Not to Say',
          items: [
            'Don\'t argue or resist physically',
            'Don\'t lie or provide false information',
            'Don\'t consent to searches',
            'Don\'t answer questions without a lawyer'
          ]
        }
      ]
    },
    es: {
      title: 'Tarjeta de Derechos Digital',
      subtitle: 'Tus derechos que puedes decir que te reúnas.',
      sections: [
        {
          title: 'Qué Decir',
          items: [
            'Estoy ejerciendo mi derecho a permanecer en silencio',
            'No consiento ningún registro',
            '¿Soy libre de irme?',
            'Quiero hablar con un abogado'
          ]
        },
        {
          title: 'Qué No Decir',
          items: [
            'No discutas o resistas físicamente',
            'No mientas o proporciones información falsa',
            'No consientas registros',
            'No respondas preguntas sin un abogado'
          ]
        }
      ]
    }
  };

  const content = rights[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={cn(
        'glass-card max-w-md w-full p-6 relative',
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-shadow">
              {content.title}
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              {content.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass-card rounded-lg hover:bg-opacity-20 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {content.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className={cn(
                'p-3 rounded-lg text-center font-medium',
                index === 0 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              )}>
                {section.title}
              </div>
              
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="p-2 bg-white bg-opacity-5 rounded-lg text-xs leading-relaxed"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
          <div className="text-xs text-gray-400">
            {state} • {language.toUpperCase()}
          </div>
          
          <div className="flex space-x-2">
            <ShareButton
              onShare={handleShare}
              disabled={isSharing}
              className="text-xs px-3 py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
