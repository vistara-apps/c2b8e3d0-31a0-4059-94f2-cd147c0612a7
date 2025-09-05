'use client';

import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Mic, 
  Share2, 
  Settings2, 
  Shield,
  MapPin
} from 'lucide-react';

interface NavigationMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

const menuItems = [
  { id: 'guides', label: 'Guides', icon: BookOpen },
  { id: 'record', label: 'Record', icon: Mic },
  { id: 'share', label: 'Share', icon: Share2 },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'settings', label: 'Settings', icon: Settings2 },
];

export function NavigationMenu({ 
  activeSection, 
  onSectionChange, 
  className 
}: NavigationMenuProps) {
  return (
    <nav className={cn('space-y-2', className)}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              'w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left',
              isActive 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'glass-card hover:bg-opacity-20'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
