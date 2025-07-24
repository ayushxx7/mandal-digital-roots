import { useState } from 'react';
import { Camera, Filter, Search, Download, Share2, Heart, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import festivalImage from '@/assets/festival-image.jpg';
import communityHall from '@/assets/community-hall.jpg';
import heroImage from '@/assets/hero-image.jpg';

const GalleryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const galleryItems = [
    {
      id: 1,
      title: "Diwali Celebration 2023",
      description: "Beautiful moments from our grand Diwali celebration with traditional performances and community dinner.",
      image: festivalImage,
      date: "2023-11-12",
      type: "festival",
      photographer: "Raj Photography",
      likes: 45,
      views: 234,
      downloads: 12,
      tags: ["diwali", "festival", "celebration", "community"]
    },
    {
      id: 2,
      title: "Community Hall Inauguration",
      description: "Inauguration ceremony of our newly renovated community hall with state-of-the-art facilities.",
      image: communityHall,
      date: "2023-09-15",
      type: "event",
      photographer: "Community Team",
      likes: 38,
      views: 189,
      downloads: 8,
      tags: ["inauguration", "community hall", "renovation", "ceremony"]
    },
    {
      id: 3,
      title: "Annual Cultural Program",
      description: "Youth and senior members showcasing their talents in music, dance, and drama performances.",
      image: heroImage,
      date: "2023-08-20",
      type: "cultural",
      photographer: "Events Team",
      likes: 52,
      views: 298,
      downloads: 15,
      tags: ["cultural", "performance", "youth", "music", "dance"]
    },
    {
      id: 4,
      title: "Holi Celebration 2023",
      description: "Colorful Holi celebration with families enjoying traditional colors and festive atmosphere.",
      image: festivalImage,
      date: "2023-03-08",
      type: "festival",
      photographer: "Festival Committee",
      likes: 67,
      views: 312,
      downloads: 23,
      tags: ["holi", "colors", "festival", "families", "celebration"]
    },
    {
      id: 5,
      title: "Business Networking Event",
      description: "Successful networking event connecting entrepreneurs and professionals in our community.",
      image: communityHall,
      date: "2023-07-10",
      type: "business",
      photographer: "Business Committee",
      likes: 29,
      views: 156,
      downloads: 6,
      tags: ["business", "networking", "professionals", "entrepreneurs"]
    },
    {
      id: 6,
      title: "Karva Chauth 2023",
      description: "Traditional Karva Chauth celebration with puja ceremonies and cultural traditions.",
      image: festivalImage,
      date: "2023-11-01",
      type: "festival",
      photographer: "Cultural Team",
      likes: 41,
      views: 201,
      downloads: 11,
      tags: ["karva chauth", "tradition", "puja", "cultural", "women"]
    },
    {
      id: 7,
      title: "Youth Sports Tournament",
      description: "Annual sports tournament featuring cricket, badminton, and other games with enthusiastic participation.",
      image: heroImage,
      date: "2023-12-15",
      type: "sports",
      photographer: "Sports Committee",
      likes: 35,
      views: 178,
      downloads: 9,
      tags: ["sports", "tournament", "youth", "cricket", "games"]
    },
    {
      id: 8,
      title: "Educational Workshop",
      description: "Educational workshop on financial planning and investment strategies for community members.",
      image: communityHall,
      date: "2023-06-25",
      type: "education",
      photographer: "Education Team",
      likes: 22,
      views: 134,
      downloads: 4,
      tags: ["education", "workshop", "financial", "learning", "investment"]
    }
  ];

  const filterTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'festival', label: 'Festivals' },
    { value: 'event', label: 'Events' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'education', label: 'Education' }
  ];

  const years = ['all', '2024', '2023', '2022', '2021'];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = filterYear === 'all' || item.date.startsWith(filterYear);
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesYear && matchesType;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'festival': 'bg-orange-500',
      'event': 'bg-blue-500',
      'cultural': 'bg-purple-500',
      'business': 'bg-green-500',
      'sports': 'bg-red-500',
      'education': 'bg-indigo-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Media Gallery</h1>
          <p className="text-muted-foreground">Explore memories from our community events</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-elegant">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search photos by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            
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

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="shadow-elegant hover-lift overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getTypeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(item.date)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>By {item.photographer}</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.views}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{item.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Download className="h-3 w-3" />
                      <span>{item.downloads}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View
                  </Button>
                  <Button size="sm" className="gradient-accent text-accent-foreground">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="shadow-elegant hover-lift">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>By {item.photographer}</span>
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{item.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes}</span>
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button size="sm" className="gradient-accent text-accent-foreground">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No photos found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Gallery Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{galleryItems.length}</div>
            <div className="text-sm text-muted-foreground">Total Photos</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{galleryItems.filter(i => i.type === 'festival').length}</div>
            <div className="text-sm text-muted-foreground">Festivals</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{galleryItems.reduce((sum, item) => sum + item.views, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{galleryItems.reduce((sum, item) => sum + item.downloads, 0)}</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GalleryScreen;