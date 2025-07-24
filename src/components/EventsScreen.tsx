import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import festivalImage from '@/assets/festival-image.jpg';
import communityHall from '@/assets/community-hall.jpg';

const EventsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const events = [
    {
      id: 1,
      title: "Diwali Celebration 2024",
      date: "2024-11-12",
      time: "6:00 PM",
      location: "Community Hall",
      description: "Grand Diwali celebrations with cultural programs, dinner, and fireworks.",
      attendees: 120,
      maxAttendees: 150,
      image: festivalImage,
      type: "festival",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Annual General Meeting",
      date: "2024-11-05",
      time: "7:00 PM",
      location: "Conference Room",
      description: "Important AGM for all members to discuss community matters and future plans.",
      attendees: 45,
      maxAttendees: 80,
      image: communityHall,
      type: "meeting",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Karva Chauth Celebration",
      date: "2024-11-01",
      time: "6:00 PM",
      location: "Main Hall",
      description: "Traditional Karva Chauth celebration with puja and festivities.",
      attendees: 65,
      maxAttendees: 100,
      image: festivalImage,
      type: "festival",
      status: "confirmed"
    },
    {
      id: 4,
      title: "Business Networking Meet",
      date: "2024-11-08",
      time: "7:00 PM",
      location: "Conference Room",
      description: "Monthly networking event for business professionals in our community.",
      attendees: 32,
      maxAttendees: 50,
      image: communityHall,
      type: "business",
      status: "confirmed"
    },
    {
      id: 5,
      title: "Youth Cultural Program",
      date: "2024-11-15",
      time: "5:00 PM",
      location: "Main Hall",
      description: "Cultural performances by young talents from our community.",
      attendees: 28,
      maxAttendees: 120,
      image: festivalImage,
      type: "cultural",
      status: "confirmed"
    }
  ];

  const filterTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'festival', label: 'Festivals' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'business', label: 'Business' },
    { value: 'cultural', label: 'Cultural' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Simple calendar view
  const getCurrentMonth = () => {
    const now = new Date();
    const month = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return month;
  };

  const getDaysInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = events.some(event => event.date === dateStr);
      days.push({ day, hasEvent, dateStr });
    }
    
    return days;
  };

  const getStatusColor = (attendees: number, maxAttendees: number) => {
    const percentage = (attendees / maxAttendees) * 100;
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Events & Bookings</h1>
          <Button className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            {filterTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mini Calendar */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>{getCurrentMonth()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {getDaysInMonth().map((day, index) => (
              <div key={index} className="relative">
                {day ? (
                  <button className={`w-8 h-8 text-sm rounded-full transition-colors hover:bg-muted ${
                    day.hasEvent ? 'bg-accent text-accent-foreground font-medium' : ''
                  }`}>
                    {day.day}
                    {day.hasEvent && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="shadow-elegant hover-lift">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-32 h-32 relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </div>
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <span className={`text-sm font-medium ${getStatusColor(event.attendees, event.maxAttendees)}`}>
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm" className="gradient-accent text-accent-foreground">
                        RSVP
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No events match your current filter'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsScreen;