import { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Phone, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DirectoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProfession, setFilterProfession] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');

  const members = [
    {
      id: 1,
      name: "Rajesh Maheshwari",
      family: "Maheshwari Family",
      profession: "Business Owner",
      company: "Maheshwari Textiles",
      location: "Karol Bagh",
      phone: "+91 98765 43210",
      email: "rajesh@maheshwaritextiles.com",
      avatar: "",
      joinedYear: 2018,
      isActive: true
    },
    {
      id: 2,
      name: "Priya Maheshwari",
      family: "Maheshwari Family",
      profession: "Doctor",
      company: "Apollo Hospital",
      location: "South Delhi",
      phone: "+91 98765 43211",
      email: "priya.maheshwari@apollo.com",
      avatar: "",
      joinedYear: 2020,
      isActive: true
    },
    {
      id: 3,
      name: "Amit Maheshwari",
      family: "Maheshwari Family",
      profession: "Engineer",
      company: "Tech Solutions Ltd",
      location: "Gurgaon",
      phone: "+91 98765 43212",
      email: "amit.maheshwari@techsolutions.com",
      avatar: "",
      joinedYear: 2019,
      isActive: true
    },
    {
      id: 4,
      name: "Sunita Maheshwari",
      family: "Maheshwari Family",
      profession: "Teacher",
      company: "Delhi Public School",
      location: "East Delhi",
      phone: "+91 98765 43213",
      email: "sunita.maheshwari@dps.edu",
      avatar: "",
      joinedYear: 2017,
      isActive: true
    },
    {
      id: 5,
      name: "Vikash Maheshwari",
      family: "Maheshwari Family",
      profession: "Chartered Accountant",
      company: "V.M. & Associates",
      location: "Central Delhi",
      phone: "+91 98765 43214",
      email: "vikash@vmassociates.com",
      avatar: "",
      joinedYear: 2021,
      isActive: true
    },
    {
      id: 6,
      name: "Meera Maheshwari",
      family: "Maheshwari Family",
      profession: "Lawyer",
      company: "Delhi High Court",
      location: "North Delhi",
      phone: "+91 98765 43215",
      email: "meera.maheshwari@dhc.gov.in",
      avatar: "",
      joinedYear: 2016,
      isActive: true
    },
    {
      id: 7,
      name: "Rohit Maheshwari",
      family: "Maheshwari Family",
      profession: "Architect",
      company: "Design Studio",
      location: "West Delhi",
      phone: "+91 98765 43216",
      email: "rohit@designstudio.com",
      avatar: "",
      joinedYear: 2022,
      isActive: true
    },
    {
      id: 8,
      name: "Kavita Maheshwari",
      family: "Maheshwari Family",
      profession: "Banker",
      company: "State Bank of India",
      location: "Dwarka",
      phone: "+91 98765 43217",
      email: "kavita.maheshwari@sbi.co.in",
      avatar: "",
      joinedYear: 2015,
      isActive: true
    }
  ];

  const professions = [...new Set(members.map(member => member.profession))];
  const locations = [...new Set(members.map(member => member.location))];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProfession = filterProfession === 'all' || member.profession === filterProfession;
    const matchesLocation = filterLocation === 'all' || member.location === filterLocation;
    return matchesSearch && matchesProfession && matchesLocation;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getProfessionColor = (profession: string) => {
    const colors = {
      'Business Owner': 'bg-primary',
      'Doctor': 'bg-green-500',
      'Engineer': 'bg-blue-500',
      'Teacher': 'bg-yellow-500',
      'Chartered Accountant': 'bg-purple-500',
      'Lawyer': 'bg-red-500',
      'Architect': 'bg-indigo-500',
      'Banker': 'bg-teal-500'
    };
    return colors[profession as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Member Directory</h1>
          <p className="text-muted-foreground">Connect with {members.length} community members</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{filteredMembers.length}</div>
          <div className="text-sm text-muted-foreground">Members</div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-elegant">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, profession, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Profession</label>
                <select
                  value={filterProfession}
                  onChange={(e) => setFilterProfession(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background text-sm"
                >
                  <option value="all">All Professions</option>
                  {professions.map(profession => (
                    <option key={profession} value={profession}>{profession}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Location</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background text-sm"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="shadow-elegant hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className={`${getProfessionColor(member.profession)} text-white font-medium`}>
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        Member since {member.joinedYear}
                      </span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center space-x-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{member.profession}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{member.location}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{member.company}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{members.filter(m => m.profession === 'Business Owner').length}</div>
            <div className="text-sm text-muted-foreground">Business Owners</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{members.filter(m => m.profession === 'Doctor').length}</div>
            <div className="text-sm text-muted-foreground">Doctors</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{members.filter(m => m.profession === 'Engineer').length}</div>
            <div className="text-sm text-muted-foreground">Engineers</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-elegant">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{members.filter(m => m.isActive).length}</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>
      </div>

      {filteredMembers.length === 0 && (
        <Card className="shadow-elegant">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No members found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DirectoryScreen;