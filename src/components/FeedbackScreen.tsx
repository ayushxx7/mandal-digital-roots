import { useState } from 'react';
import { MessageSquare, Send, Star, CheckCircle, AlertCircle, User, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const FeedbackScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
    isAnonymous: false,
    rating: 0
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      name: 'Rajesh M.',
      category: 'event',
      subject: 'Excellent Diwali Celebration',
      message: 'The Diwali celebration was absolutely wonderful. Great organization, delicious food, and amazing cultural programs. Thank you to the event committee!',
      date: '2024-10-25',
      rating: 5,
      status: 'resolved',
      isAnonymous: false,
      response: 'Thank you for your positive feedback! We are glad you enjoyed the celebration.'
    },
    {
      id: 2,
      name: 'Anonymous',
      category: 'facility',
      subject: 'Community Hall Audio System',
      message: 'The audio system in the community hall needs improvement. During events, it\'s difficult to hear speakers clearly from the back rows.',
      date: '2024-10-22',
      rating: 3,
      status: 'in-progress',
      isAnonymous: true,
      response: 'We have received your feedback and are working on upgrading the audio system. Expected completion by November end.'
    },
    {
      id: 3,
      name: 'Priya S.',
      category: 'suggestion',
      subject: 'Youth Engagement Activities',
      message: 'It would be great to have more activities for young adults (20-30 age group). Maybe monthly workshops on professional development or hobby classes.',
      date: '2024-10-20',
      rating: 4,
      status: 'under-review',
      isAnonymous: false,
      response: ''
    },
    {
      id: 4,
      name: 'Anonymous',
      category: 'complaint',
      subject: 'Parking Issues',
      message: 'The parking space is insufficient during major events. Many members have to park quite far and walk long distances.',
      date: '2024-10-18',
      rating: 2,
      status: 'acknowledged',
      isAnonymous: true,
      response: 'We acknowledge this issue and are exploring options for additional parking arrangements.'
    },
    {
      id: 5,
      name: 'Amit K.',
      category: 'general',
      subject: 'Member Directory Update',
      message: 'The member directory should be updated more frequently. Some contact information is outdated.',
      date: '2024-10-15',
      rating: 3,
      status: 'resolved',
      isAnonymous: false,
      response: 'Directory has been updated. Please verify your information and notify us of any changes.'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'event', label: 'Events & Programs' },
    { value: 'facility', label: 'Facilities & Infrastructure' },
    { value: 'suggestion', label: 'Suggestions & Ideas' },
    { value: 'complaint', label: 'Complaints & Issues' },
    { value: 'appreciation', label: 'Appreciation & Thanks' }
  ];

  const statusFilters = [
    { value: 'all', label: 'All Feedback' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'under-review', label: 'Under Review' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Feedback submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: '',
      isAnonymous: false,
      rating: 0
    });
    
    // Show success message (in real app, would use toast)
    alert('Thank you for your feedback! We will review it and respond soon.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'under-review':
        return 'text-yellow-600 bg-yellow-50';
      case 'acknowledged':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'general': 'bg-gray-500',
      'event': 'bg-purple-500',
      'facility': 'bg-blue-500',
      'suggestion': 'bg-green-500',
      'complaint': 'bg-red-500',
      'appreciation': 'bg-yellow-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500';
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => handleRatingClick(index + 1) : undefined}
      />
    ));
  };

  const filteredSubmissions = submissions.filter(submission => 
    filterStatus === 'all' || submission.status === filterStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Feedback & Suggestions</h1>
          <p className="text-muted-foreground">Help us improve our community services</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{submissions.length}</div>
          <div className="text-sm text-muted-foreground">Total Feedback</div>
        </div>
      </div>

      {/* Feedback Form */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            <span>Share Your Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name {!formData.isAnonymous && '*'}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  disabled={formData.isAnonymous}
                  required={!formData.isAnonymous}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email {!formData.isAnonymous && '*'}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={formData.isAnonymous}
                  required={!formData.isAnonymous}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isAnonymous: checked }))
                }
              />
              <Label htmlFor="anonymous">Submit as Anonymous</Label>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md bg-background"
                required
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief summary of your feedback"
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please share your detailed feedback, suggestions, or concerns..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label>Overall Rating (Optional)</Label>
              <div className="flex items-center space-x-1 mt-2">
                {renderStars(formData.rating, true)}
                {formData.rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.rating} out of 5 stars
                  </span>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary text-primary-foreground">
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Feedback */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Community Feedback</CardTitle>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-sm"
            >
              {statusFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="border shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{submission.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getCategoryColor(submission.category)}`}>
                        {categories.find(c => c.value === submission.category)?.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(submission.status)}`}>
                        {getStatusIcon(submission.status)}
                        <span>{submission.status.replace('-', ' ')}</span>
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(submission.date).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{submission.subject}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{submission.message}</p>

                  {submission.rating > 0 && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm">Rating:</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(submission.rating)}
                      </div>
                    </div>
                  )}

                  {submission.response && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Community Response:</span>
                      </div>
                      <p className="text-sm">{submission.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusFilters.slice(1).map((status) => (
          <Card key={status.value} className="shadow-elegant">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {submissions.filter(s => s.status === status.value).length}
              </div>
              <div className="text-sm text-muted-foreground">{status.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackScreen;