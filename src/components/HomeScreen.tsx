import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, DoorOpen, Heart, Camera, Bell, Users, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';
import communityHall from '@/assets/community-hall.jpg';
import festivalImage from '@/assets/festival-image.jpg';

const HomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const announcements = [
    {
      id: 1,
      title: "Diwali Celebration 2024",
      description: "Join us for grand Diwali celebrations at the community hall with cultural programs and dinner.",
      image: festivalImage,
      date: "Nov 12, 2024",
      priority: "high"
    },
    {
      id: 2,
      title: "Annual General Meeting",
      description: "All members are cordially invited to attend the AGM for important discussions and decisions.",
      image: communityHall,
      date: "Nov 5, 2024",
      priority: "medium"
    },
    {
      id: 3,
      title: "Community Hall Booking",
      description: "Book our beautiful community hall for your family functions and celebrations.",
      image: communityHall,
      date: "Available",
      priority: "low"
    }
  ];

  const quickLinks = [
    { title: "Book Hall", icon: DoorOpen, color: "gradient-primary" },
    { title: "Donate", icon: Heart, color: "gradient-secondary" },
    { title: "Events", icon: Calendar, color: "gradient-accent" },
    { title: "Gallery", icon: Camera, color: "gradient-primary" },
  ];

  const upcomingEvents = [
    {
      title: "Karva Chauth Celebration",
      date: "Nov 1, 2024",
      time: "6:00 PM",
      location: "Community Hall",
      attendees: 45
    },
    {
      title: "Business Networking Meet",
      date: "Nov 8, 2024",
      time: "7:00 PM",
      location: "Conference Room",
      attendees: 32
    },
    {
      title: "Youth Cultural Program",
      date: "Nov 15, 2024",
      time: "5:00 PM",
      location: "Main Hall",
      attendees: 28
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Welcome */}
      <div className="relative h-48 rounded-xl overflow-hidden shadow-cultural">
        <img 
          src={heroImage} 
          alt="Maheshwari Mandal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 flex items-center">
          <div className="px-6 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Welcome to Maheshwari Mandal</h2>
            <p className="text-primary-foreground/90 text-sm">
              Connecting our community through tradition and unity
            </p>
          </div>
        </div>
      </div>

      {/* Announcements Carousel */}
      <Card className="shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-accent" />
            <span>Latest Announcements</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {announcements.map((announcement) => (
                <div key={announcement.id} className="w-full flex-shrink-0">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src={announcement.image} 
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">
                            {announcement.date}
                          </span>
                          {announcement.priority === 'high' && (
                            <span className="text-xs bg-accent px-2 py-1 rounded">
                              Important
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{announcement.title}</h3>
                        <p className="text-sm text-white/90">{announcement.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center space-y-2 hover-lift border-2"
                >
                  <div className={`w-8 h-8 ${link.color} rounded-full flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{link.title}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border hover-lift">
                <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;