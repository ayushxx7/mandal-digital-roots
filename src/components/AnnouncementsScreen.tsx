import { useState } from 'react';
import { Bell, Calendar, Pin, Filter, Search, Star, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import festivalImage from '@/assets/festival-image.jpg';
import communityHall from '@/assets/community-hall.jpg';

const AnnouncementsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const announcements = [
    {
      id: 1,
      title: "Diwali Celebration 2024 - Grand Event",
      content: "We are excited to announce our grand Diwali celebration on November 12th, 2024. Join us for an evening filled with cultural programs, traditional music, dance performances, and a community dinner. This year's theme is 'Unity in Tradition' and we encourage all families to participate.",
      date: "2024-10-25",
      author: "Event Committee",
      type: "event",
      priority: "high",
      image: festivalImage,
      isPinned: true,
      views: 156,
      likes: 23
    },
    {
      id: 2,
      title: "Annual General Meeting - Important Notice",
      content: "All members are cordially invited to attend the Annual General Meeting scheduled for November 5th, 2024, at 7:00 PM in the Conference Room. Agenda includes: Annual report presentation, financial statements review, election of new committee members, and discussion on upcoming community projects. Your presence is highly valued.",
      date: "2024-10-22",
      author: "Management Committee",
      type: "official",
      priority: "high",
      image: communityHall,
      isPinned: true,
      views: 142,
      likes: 31
    },
    {
      id: 3,
      title: "Community Hall Renovation Update",
      content: "We are pleased to inform that the community hall renovation work is progressing well and is expected to be completed by October 30th. The new audio-visual system, improved lighting, and enhanced seating arrangements will provide a better experience for all our events.",
      date: "2024-10-20",
      author: "Infrastructure Team",
      type: "update",
      priority: "medium",
      image: communityHall,
      isPinned: false,
      views: 89,
      likes: 12
    },
    {
      id: 4,
      title: "New Member Registration Drive",
      content: "We are starting a new member registration drive to welcome more families to our community. If you know any Maheshwari families who would like to join, please help them with the registration process. Contact the membership committee for more details.",
      date: "2024-10-18",
      author: "Membership Committee",
      type: "announcement",
      priority: "medium",
      image: "",
      isPinned: false,
      views: 67,
      likes: 8
    },
    {
      id: 5,
      title: "Karva Chauth Celebration - Special Arrangements",
      content: "Special arrangements have been made for Karva Chauth celebration on November 1st. The puja will start at 6:00 PM followed by traditional ceremonies. Light refreshments will be served. All married women and their families are welcome to join this auspicious occasion.",
      date: "2024-10-15",
      author: "Cultural Committee",
      type: "event",
      priority: "medium",
      image: festivalImage,
      isPinned: false,
      views: 94,
      likes: 18
    },
    {
      id: 6,
      title: "Monthly Donation Drive Results",
      content: "Thank you to all members who contributed to our monthly donation drive. We collected ₹45,000 which will be used for community welfare activities and supporting underprivileged families. Your generosity is greatly appreciated.",
      date: "2024-10-12",
      author: "Welfare Committee",
      type: "update",
      priority: "low",
      image: "",
      isPinned: false,
      views: 78,
      likes: 15
    },
    {
      id: 7,
      title: "Youth Sports Tournament Registration Open",
      content: "Registration is now open for the annual youth sports tournament scheduled for December. Events include cricket, badminton, table tennis, and chess. Age categories: Under 16, 16-25, and 25-35. Register before November 15th. Prizes for winners in each category.",
      date: "2024-10-10",
      author: "Sports Committee",
      type: "announcement",
      priority: "medium",
      image: "",
      isPinned: false,
      views: 112,
      likes: 26
    },
    {
      id: 8,
      title: "Business Directory Update",
      content: "We are updating our business directory to help community members connect for professional opportunities. If you own a business or provide professional services, please update your profile in the member directory with your business details.",
      date: "2024-10-08",
      author: "Business Committee",
      type: "announcement",
      priority: "low",
      image: "",
      isPinned: false,
      views: 56,
      likes: 9
    }
  ];

  const filterTypes = [
    { value: 'all', label: 'All Announcements' },
    { value: 'official', label: 'Official' },
    { value: 'event', label: 'Events' },
    { value: 'update', label: 'Updates' },
    { value: 'announcement', label: 'General' }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || announcement.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.isPinned);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50/50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50/50';
      default:
        return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const AnnouncementCard = ({ announcement }: { announcement: any }) => (
    <Card className={`shadow-elegant hover-lift border-l-4 ${getPriorityColor(announcement.priority)}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          {announcement.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={announcement.image} 
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {announcement.isPinned && (
                  <Pin className="h-4 w-4 text-primary" />
                )}
                {getPriorityIcon(announcement.priority)}
                <Badge variant="secondary" className="text-xs">
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(announcement.date)}
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-2 line-clamp-2">
              {announcement.title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {announcement.content}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>By {announcement.author}</span>
                <span>• {announcement.views} views</span>
                <span>• {announcement.likes} likes</span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Like
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements & News</h1>
          <p className="text-muted-foreground">Stay updated with community news and events</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Bell className="h-4 w-4 mr-2" />
          Subscribe
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-elegant">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
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
        </CardContent>
      </Card>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Pin className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Pinned Announcements</h2>
          </div>
          {pinnedAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}

      {/* Regular Announcements */}
      {regularAnnouncements.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Announcements</h2>
          {regularAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredAnnouncements.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No announcements found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No announcements match your current filter'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{announcements.filter(a => a.priority === 'high').length}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{announcements.filter(a => a.isPinned).length}</div>
            <div className="text-sm text-muted-foreground">Pinned</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{announcements.filter(a => a.type === 'event').length}</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementsScreen;