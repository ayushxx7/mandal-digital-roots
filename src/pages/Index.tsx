import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomeScreen from '@/components/HomeScreen';
import EventsScreen from '@/components/EventsScreen';
import DirectoryScreen from '@/components/DirectoryScreen';
import AnnouncementsScreen from '@/components/AnnouncementsScreen';
import GalleryScreen from '@/components/GalleryScreen';
import FeedbackScreen from '@/components/FeedbackScreen';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'events':
        return <EventsScreen />;
      case 'directory':
        return <DirectoryScreen />;
      case 'announcements':
        return <AnnouncementsScreen />;
      case 'gallery':
        return <GalleryScreen />;
      case 'feedback':
        return <FeedbackScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen gradient-warm">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pt-0 md:pb-0 md:ml-64">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Index;
