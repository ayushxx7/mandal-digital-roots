import { useState } from 'react';
import { Home, Calendar, Users, Bell, Camera, MessageSquare, Settings, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'announcements', label: 'News', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'हिं' : 'EN');
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-elegant md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">MM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-primary">Maheshwari Mandal</h1>
                <p className="text-xs text-muted-foreground">Delhi</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{language}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t">
            <nav className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth outline-none ${
                      activeTab === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-smooth outline-none sm:hidden"
              >
                <Globe className="h-5 w-5" />
                <span>Language: {language === 'EN' ? 'English' : 'हिन्दी'}</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:flex md:flex-col bg-background border-r shadow-elegant z-40">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">MM</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-primary">Maheshwari Mandal</h1>
              <p className="text-sm text-muted-foreground">Delhi</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth outline-none hover-lift ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-cultural'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="outline"
            onClick={toggleLanguage}
            className="w-full flex items-center space-x-2"
          >
            <Globe className="h-4 w-4" />
            <span>Language: {language === 'EN' ? 'English' : 'हिन्दी'}</span>
          </Button>
        </div>
      </aside>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t shadow-elegant md:hidden">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-smooth outline-none ${
                  activeTab === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navigation;