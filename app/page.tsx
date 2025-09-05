'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { NavigationMenu } from '@/components/NavigationMenu';
import { InfoCard } from '@/components/InfoCard';
import { ActionButton } from '@/components/ActionButton';
import { EmergencyAlert } from '@/components/EmergencyAlert';
import { RightsCard } from '@/components/RightsCard';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { 
  US_STATES, 
  BASIC_RIGHTS, 
  EMERGENCY_SCRIPTS, 
  PRICING,
  MOCK_LEGAL_GUIDES 
} from '@/lib/constants';
import { 
  getCurrentLocation, 
  getStateFromLocation, 
  generateAlertId,
  formatPrice 
} from '@/lib/utils';
import { generateLegalScript, generateStateGuide } from '@/lib/openai';
import { AppState, LegalGuide } from '@/lib/types';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  
  // App state
  const [appState, setAppState] = useState<AppState>({
    selectedState: 'California',
    language: 'en',
    isRecording: false,
    currentGuide: null,
    user: null
  });

  // UI state
  const [activeSection, setActiveSection] = useState('guides');
  const [showRightsCard, setShowRightsCard] = useState(false);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState<'active' | 'sent'>('active');
  const [isLoading, setIsLoading] = useState(false);
  const [guides, setGuides] = useState<LegalGuide[]>(MOCK_LEGAL_GUIDES);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Auto-detect location on mount
  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      const position = await getCurrentLocation();
      const state = await getStateFromLocation(
        position.coords.latitude, 
        position.coords.longitude
      );
      
      setAppState(prev => ({ ...prev, selectedState: state }));
    } catch (error) {
      console.error('Location detection failed:', error);
      // Keep default state
    }
  };

  const handleStateChange = (state: string) => {
    setAppState(prev => ({ ...prev, selectedState: state }));
  };

  const handleLanguageToggle = () => {
    setAppState(prev => ({ 
      ...prev, 
      language: prev.language === 'en' ? 'es' : 'en' 
    }));
  };

  const handleRecordToggle = async () => {
    if (!appState.isRecording) {
      // Start recording
      setAppState(prev => ({ ...prev, isRecording: true }));
      
      try {
        // Mock recording start
        console.log('Recording started...');
        
        // Auto-show emergency alert after 2 seconds
        setTimeout(() => {
          setShowEmergencyAlert(true);
        }, 2000);
        
      } catch (error) {
        console.error('Failed to start recording:', error);
        setAppState(prev => ({ ...prev, isRecording: false }));
      }
    } else {
      // Stop recording
      setAppState(prev => ({ ...prev, isRecording: false }));
      console.log('Recording stopped');
    }
  };

  const handleEmergencyAlert = async () => {
    setIsLoading(true);
    
    try {
      // Mock alert sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAlertStatus('sent');
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowEmergencyAlert(false);
        setAlertStatus('active');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to send alert:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseGuide = async (type: 'basic' | 'detailed' | 'state') => {
    setIsLoading(true);
    
    try {
      // Mock purchase process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (type === 'state') {
        // Generate state-specific guide
        const content = await generateStateGuide(appState.selectedState, appState.language);
        const scripts = await generateLegalScript({
          state: appState.selectedState,
          scenario: 'traffic stop',
          language: appState.language
        });
        
        const newGuide: LegalGuide = {
          guideId: `guide_${Date.now()}`,
          state: appState.selectedState,
          language: appState.language,
          content,
          scripts
        };
        
        setGuides(prev => [...prev, newGuide]);
        setAppState(prev => ({ ...prev, currentGuide: newGuide }));
      }
      
      alert('Purchase successful! Guide unlocked.');
      
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderGuidesSection = () => (
    <div className="space-y-6">
      {/* State selector */}
      <div className="glass-card p-4">
        <h3 className="font-semibold mb-3 text-shadow">Select Your State</h3>
        <select
          value={appState.selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {US_STATES.map(state => (
            <option key={state} value={state} className="bg-gray-800">
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Language toggle */}
      <div className="flex justify-center">
        <button
          onClick={handleLanguageToggle}
          className="glass-button px-6 py-2 rounded-full"
        >
          {appState.language === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
        </button>
      </div>

      {/* Basic rights */}
      <InfoCard
        variant="state"
        title="Basic Rights"
        content={BASIC_RIGHTS[appState.language]}
      />

      {/* Premium guides */}
      <InfoCard
        variant="script"
        title="What to Say Scripts"
        content={EMERGENCY_SCRIPTS[appState.language].whatToSay}
        price={PRICING.basicScript.toString()}
        onPurchase={() => handlePurchaseGuide('basic')}
      />

      <InfoCard
        variant="script"
        title="What NOT to Say"
        content={EMERGENCY_SCRIPTS[appState.language].whatNotToSay}
        price={PRICING.detailedGuide.toString()}
        onPurchase={() => handlePurchaseGuide('detailed')}
      />

      <InfoCard
        variant="state"
        title={`${appState.selectedState} Specific Guide`}
        content={[`Detailed legal information specific to ${appState.selectedState} laws and procedures.`]}
        price={PRICING.stateSpecificGuide.toString()}
        onPurchase={() => handlePurchaseGuide('state')}
      />
    </div>
  );

  const renderRecordSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Record & Alert</h2>
        <p className="text-gray-300 mb-8">
          One-tap recording and emergency alerts
        </p>
      </div>

      {/* Recording button */}
      <div className="flex justify-center">
        <ActionButton
          variant="record"
          size="lg"
          onClick={handleRecordToggle}
          className={`w-32 h-32 rounded-full ${appState.isRecording ? 'recording animate-pulse' : ''}`}
        >
          <div className="text-center">
            <div className="text-2xl mb-1">
              {appState.isRecording ? '⏹️' : '🎙️'}
            </div>
            <div className="text-sm">
              {appState.isRecording ? 'Stop' : 'Record'}
            </div>
          </div>
        </ActionButton>
      </div>

      {appState.isRecording && (
        <div className="text-center">
          <div className="text-red-400 font-medium mb-2">● Recording Active</div>
          <div className="text-sm text-gray-300">
            Tap to stop recording and save evidence
          </div>
        </div>
      )}

      {/* Emergency alert */}
      {showEmergencyAlert && (
        <EmergencyAlert
          variant={alertStatus}
          onCancel={() => setShowEmergencyAlert(false)}
          onConfirm={handleEmergencyAlert}
          message="Send location and recording to emergency contacts?"
        />
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4">
        <ActionButton
          variant="primary"
          onClick={() => setShowRightsCard(true)}
        >
          <span>Quick Rights</span>
        </ActionButton>
        
        <ActionButton
          variant="danger"
          onClick={() => setShowEmergencyAlert(true)}
        >
          <span>Emergency</span>
        </ActionButton>
      </div>
    </div>
  );

  const renderShareSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Share Rights</h2>
        <p className="text-gray-300 mb-8">
          Generate and share digital rights cards
        </p>
      </div>

      <ActionButton
        variant="primary"
        size="lg"
        onClick={() => setShowRightsCard(true)}
        className="w-full"
      >
        <span>Generate Rights Card</span>
      </ActionButton>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Recent Shares</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
            <div>
              <div className="font-medium">Traffic Stop Rights</div>
              <div className="text-sm text-gray-400">Shared 2 hours ago</div>
            </div>
            <button className="text-cyan-400 hover:text-cyan-300">
              Share Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Location</h2>
        <p className="text-gray-300 mb-8">
          Current location and state-specific info
        </p>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Current Location</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">State:</span>
            <span className="font-medium">{appState.selectedState}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Language:</span>
            <span className="font-medium">
              {appState.language === 'en' ? 'English' : 'Español'}
            </span>
          </div>
        </div>
        
        <ActionButton
          variant="primary"
          onClick={detectLocation}
          className="w-full mt-4"
          isLoading={isLoading}
        >
          <span>Update Location</span>
        </ActionButton>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 gradient-text">Settings</h2>
        <p className="text-gray-300 mb-8">
          Configure your preferences
        </p>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Phone number or username"
            className="w-full p-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <ActionButton variant="primary" className="w-full">
            <span>Add Contact</span>
          </ActionButton>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>SMS Alerts</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span>Farcaster Alerts</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </label>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'guides':
        return renderGuidesSection();
      case 'record':
        return renderRecordSection();
      case 'share':
        return renderShareSection();
      case 'location':
        return renderLocationSection();
      case 'settings':
        return renderSettingsSection();
      default:
        return renderGuidesSection();
    }
  };

  return (
    <AppShell variant="glass">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <NavigationMenu
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          {renderActiveSection()}
        </div>
      </div>

      {/* Rights card modal */}
      <RightsCard
        isOpen={showRightsCard}
        onClose={() => setShowRightsCard(false)}
        state={appState.selectedState}
        language={appState.language}
      />
    </AppShell>
  );
}
