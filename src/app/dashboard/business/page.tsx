// src/app/dashboard/business/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon,
  ChartBarIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  PencilIcon,
  CameraIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowTrendingUpIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useAuth, withAuth } from '@/hooks/use-auth';
import { api, Business } from '@/lib/api';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { formatDate, timeAgo } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';

interface BusinessStats {
  totalViews: number;
  totalInquiries: number;
  totalReviews: number;
  averageRating: number;
  responseRate: number;
  profileCompleteness: number;
}

interface RecentInquiry {
  id: number;
  customer_name: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'pending' | 'responded' | 'closed';
}

interface RecentReview {
  id: number;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  responded: boolean;
}

// Analytics Chart Component
const AnalyticsChart = ({ stats }: { stats: BusinessStats }) => {
  // Sample data for the last 30 days
  const viewsData = [
    { date: '2024-01-01', views: 45, inquiries: 2, clicks: 8 },
    { date: '2024-01-05', views: 52, inquiries: 3, clicks: 12 },
    { date: '2024-01-10', views: 38, inquiries: 1, clicks: 6 },
    { date: '2024-01-15', views: 67, inquiries: 4, clicks: 15 },
    { date: '2024-01-20', views: 73, inquiries: 5, clicks: 18 },
    { date: '2024-01-25', views: 61, inquiries: 3, clicks: 14 },
    { date: '2024-01-30', views: 89, inquiries: 6, clicks: 22 }
  ];

  const trafficSourcesData = [
    { name: 'Direct Search', value: 45, color: '#3B82F6' },
    { name: 'Google Maps', value: 30, color: '#10B981' },
    { name: 'Referrals', value: 15, color: '#F59E0B' },
    { name: 'Social Media', value: 10, color: '#8B5CF6' }
  ];

  const inquiryTypesData = [
    { type: 'Emergency Service', count: 8 },
    { type: 'Quote Request', count: 6 },
    { type: 'General Inquiry', count: 5 },
    { type: 'Appointment', count: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Views and Engagement Over Time */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={viewsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value: any, name: string) => [
                value,
                name === 'views' ? 'Profile Views' : 
                name === 'inquiries' ? 'Inquiries' : 'Contact Clicks'
              ]}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Profile Views"
            />
            <Line 
              type="monotone" 
              dataKey="inquiries" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Inquiries"
            />
            <Line 
              type="monotone" 
              dataKey="clicks" 
              stroke="#F59E0B" 
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Contact Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={trafficSourcesData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {trafficSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Inquiry Types */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiry Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inquiryTypesData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis 
                type="category" 
                dataKey="type" 
                tick={{ fontSize: 12 }}
                width={100}
              />
              <Tooltip 
                formatter={(value: any) => [value, 'Count']}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px'
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {((viewsData[viewsData.length - 1].views - viewsData[0].views) / viewsData[0].views * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Views Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.responseRate}%
            </div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {((stats.totalInquiries / stats.totalViews) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BusinessDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState<BusinessStats>({
    totalViews: 0,
    totalInquiries: 0,
    totalReviews: 0,
    averageRating: 0,
    responseRate: 0,
    profileCompleteness: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [recentReviews, setRecentReviews] = useState<RecentReview[]>([]);

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API calls
      // const businessResponse = await api.businesses.getUserBusiness();
      // const statsResponse = await api.analytics.getBusinessStats();
      // const inquiriesResponse = await api.inquiries.getRecent();
      // const reviewsResponse = await api.reviews.getRecent();

      // For now, we'll check if user has a business and show appropriate state
      if (user?.has_business) {
        // When user has a business, fetch real data
        // setBusiness(businessResponse.data);
        // setStats(statsResponse.data);
        // setRecentInquiries(inquiriesResponse.data);
        // setRecentReviews(reviewsResponse.data);
        
        // Temporary sample data structure - replace with real API response
        setStats({
          totalViews: 425,
          totalInquiries: 23,
          totalReviews: 12,
          averageRating: 4.6,
          responseRate: 95,
          profileCompleteness: 75
        });
      }

    } catch (error) {
      console.error('Error fetching business data:', error);
      toast.error('Failed to load business data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProfileCompletionTasks = () => {
    if (!business) return [
      { task: 'Create your business profile', points: 50 },
      { task: 'Add business description', points: 15 },
      { task: 'Upload business photos', points: 20 },
      { task: 'Add contact information', points: 15 }
    ];

    const tasks = [];
    if (!business?.description || business.description.length < 100) {
      tasks.push({ task: 'Add detailed business description', points: 15 });
    }
    if (!business?.website_url) {
      tasks.push({ task: 'Add website URL', points: 10 });
    }
    if (business?.categories.length === 0) {
      tasks.push({ task: 'Add business categories', points: 10 });
    }
    if (stats.totalReviews < 5) {
      tasks.push({ task: 'Get more customer reviews', points: 20 });
    }
    return tasks;
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    description, 
    color = "primary",
    trend,
    trendDirection = "up"
  }: {
    icon: any;
    title: string;
    value: string | number;
    description: string;
    color?: string;
    trend?: string;
    trendDirection?: "up" | "down";
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <ArrowTrendingUpIcon className={`h-4 w-4 mr-1 ${
              trendDirection === 'down' ? 'rotate-180' : ''
            }`} />
            {trend}
          </div>
        )}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'profile', name: 'Business Profile', icon: BuildingOfficeIcon },
    { id: 'inquiries', name: 'Inquiries', icon: ChatBubbleLeftRightIcon },
    { id: 'reviews', name: 'Reviews', icon: StarIcon },
    { id: 'analytics', name: 'Analytics', icon: EyeIcon },
  ];

  // No Business State
  if (!loading && (!user?.has_business)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container-custom py-16">
          <div className="text-center max-w-2xl mx-auto">
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Create Your Business Profile
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start connecting with customers by creating your business profile on Jodi's List. 
              It's free for all verified military veterans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/businesses/create" className="btn-primary">
                Create Business Profile
              </Link>
              <Link href="/help" className="btn-secondary">
                Learn More
              </Link>
            </div>
            
            {/* Benefits of Creating Profile */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                <UsersIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Reach More Customers</h3>
                <p className="text-sm text-gray-600">
                  Get discovered by customers looking for veteran-owned businesses
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Manage Inquiries</h3>
                <p className="text-sm text-gray-600">
                  Receive and respond to customer inquiries directly through our platform
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border border-gray-200">
                <ChartBarIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Track Performance</h3>
                <p className="text-sm text-gray-600">
                  Get insights on your profile views, customer engagement, and growth
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {business?.business_name || 'Business Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your business profile and customer interactions
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Link 
                href={`/businesses/${business?.slug}`}
                className="btn-secondary flex items-center gap-2"
                target="_blank"
              >
                <EyeIcon className="h-4 w-4" />
                View Public Profile
              </Link>
              <button 
                onClick={() => setActiveTab('profile')}
                className="btn-primary flex items-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 border-primary-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                  {tab.id === 'inquiries' && recentInquiries.filter(i => i.status === 'pending').length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {recentInquiries.filter(i => i.status === 'pending').length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Business Status Card */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center mb-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-900">Business Status</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile Status:</span>
                  <span className="text-green-600 font-medium">
                    {business?.business_status || 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification:</span>
                  <span className={`font-medium ${business?.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {business?.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Military Status:</span>
                  <span className="text-blue-600 font-medium">
                    {user?.membership_status === 'veteran' ? 'Veteran Owned' : 'Military Connected'}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900">Profile Completion</span>
                <span className="text-sm text-gray-600">{stats.profileCompleteness}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.profileCompleteness}%` }}
                ></div>
              </div>
              <div className="space-y-1">
                {getProfileCompletionTasks().slice(0, 2).map((task, index) => (
                  <div key={index} className="text-xs text-gray-600">
                    • {task.task} (+{task.points}%)
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <StatCard
                        icon={EyeIcon}
                        title="Profile Views"
                        value={stats.totalViews.toLocaleString()}
                        description="This month"
                        color="blue"
                        trend="+12%"
                        trendDirection="up"
                      />
                      <StatCard
                        icon={ChatBubbleLeftRightIcon}
                        title="New Inquiries"
                        value={stats.totalInquiries}
                        description="This month"
                        color="green"
                        trend="+8%"
                        trendDirection="up"
                      />
                      <StatCard
                        icon={StarIcon}
                        title="Average Rating"
                        value={stats.averageRating.toFixed(1)}
                        description={`${stats.totalReviews} reviews`}
                        color="yellow"
                        trend="+0.2"
                        trendDirection="up"
                      />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <PencilIcon className="h-6 w-6 text-primary-600 mr-3" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Update Profile</div>
                            <div className="text-sm text-gray-600">Edit business information</div>
                          </div>
                        </button>
                        <button
                          onClick={() => setActiveTab('inquiries')}
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-600 mr-3" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Respond to Inquiries</div>
                            <div className="text-sm text-gray-600">
                              {recentInquiries.filter(i => i.status === 'pending').length} pending
                            </div>
                          </div>
                        </button>
                        <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <CameraIcon className="h-6 w-6 text-purple-600 mr-3" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900">Add Photos</div>
                            <div className="text-sm text-gray-600">Showcase your work</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Recent Activity Placeholder */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                      <div className="text-center py-8 text-gray-500">
                        <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No recent activity to display.</p>
                        <p className="text-sm mt-1">Inquiries and reviews will appear here.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Business Profile</h2>
                      <div className="flex gap-3">
                        {business && (
                          <Link
                            href={`/businesses/${business.slug}`}
                            className="btn-secondary flex items-center gap-2"
                            target="_blank"
                          >
                            <EyeIcon className="h-4 w-4" />
                            Preview
                          </Link>
                        )}
                        <Link
                          href="/businesses/edit"
                          className="btn-primary flex items-center gap-2"
                        >
                          <PencilIcon className="h-4 w-4" />
                          {business ? 'Edit Profile' : 'Create Profile'}
                        </Link>
                      </div>
                    </div>

                    {business ? (
                      <>
                        {/* Profile Information */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Business Name
                              </label>
                              <p className="text-gray-900">{business.business_name}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                              </label>
                              <p className="text-gray-900">{business.business_phone}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                              </label>
                              <p className="text-gray-900">{business.business_email}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Website
                              </label>
                              <p className="text-gray-900">{business.website_url || 'Not provided'}</p>
                            </div>
                            <div className="lg:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                              </label>
                              <p className="text-gray-900">{business.description}</p>
                            </div>
                            <div className="lg:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                              </label>
                              <p className="text-gray-900">{business.full_address}</p>
                            </div>
                          </div>
                        </div>

                        {/* Business Categories */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                          <div className="flex flex-wrap gap-2">
                            {business.categories.map((category) => (
                              <span
                                key={category.id}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                              >
                                <i className={`${category.icon_class} mr-2`}></i>
                                {category.name}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Business Features */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Business Features</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-gray-700">Verified</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-gray-700">Military Owned</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-gray-700">Emergency Service</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm text-gray-700">Insured</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <BuildingOfficeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Business Profile Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Create your business profile to start connecting with customers.
                        </p>
                        <Link href="/businesses/create" className="btn-primary">
                          Create Business Profile
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'inquiries' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Customer Inquiries</h2>
                      <div className="text-sm text-gray-600">
                        {recentInquiries.filter(i => i.status === 'pending').length} pending responses
                      </div>
                    </div>

                    {recentInquiries.length > 0 ? (
                      <div className="space-y-4">
                        {recentInquiries.map((inquiry) => (
                          <div key={inquiry.id} className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {inquiry.customer_name}
                                  </h3>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                                    {inquiry.status}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{inquiry.subject}</p>
                                <p className="text-sm text-gray-500 mb-2">{inquiry.message}</p>
                                <p className="text-xs text-gray-400">
                                  {formatDate(inquiry.created_at)}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                {inquiry.status === 'pending' && (
                                  <button className="btn-primary">
                                    Respond
                                  </button>
                                )}
                                <button className="btn-secondary">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Inquiries Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Customer inquiries will appear here when you receive them.
                        </p>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="btn-primary"
                        >
                          Complete Your Profile
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                      <div className="text-sm text-gray-600">
                        {stats.averageRating.toFixed(1)} average rating • {stats.totalReviews} reviews
                      </div>
                    </div>

                    {recentReviews.length > 0 ? (
                      <div className="space-y-4">
                        {recentReviews.map((review) => (
                          <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-medium text-gray-900">
                                    {review.customer_name}
                                  </h3>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <StarIconSolid
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-gray-700 mb-2">{review.review_text}</p>
                                <p className="text-xs text-gray-400">
                                  {formatDate(review.created_at)}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                {!review.responded && (
                                  <button className="btn-primary">
                                    Respond
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <StarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Reviews Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Customer reviews will appear here after you complete your first jobs.
                        </p>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="btn-primary"
                        >
                          Get Your First Customers
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                      <select className="form-select">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Last year</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard
                        icon={EyeIcon}
                        title="Profile Views"
                        value={stats.totalViews.toLocaleString()}
                        description="Total views"
                        color="blue"
                      />
                      <StatCard
                        icon={UsersIcon}
                        title="Unique Visitors"
                        value={Math.floor(stats.totalViews * 0.72).toLocaleString()}
                        description="Unique visitors"
                        color="green"
                      />
                      <StatCard
                        icon={PhoneIcon}
                        title="Phone Clicks"
                        value={Math.floor(stats.totalViews * 0.15).toString()}
                        description="Phone number clicks"
                        color="purple"
                      />
                      <StatCard
                        icon={EnvelopeIcon}
                        title="Email Clicks"
                        value={Math.floor(stats.totalViews * 0.08).toString()}
                        description="Email clicks"
                        color="red"
                      />
                    </div>

                    {/* Analytics Charts */}
                    {stats.totalViews > 0 ? (
                      <AnalyticsChart stats={stats} />
                    ) : (
                      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                        <ChartBarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No Analytics Data Yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Analytics will appear here once customers start viewing your profile.
                        </p>
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => setActiveTab('profile')}
                            className="btn-primary"
                          >
                            Complete Profile
                          </button>
                          <Link href="/help/marketing" className="btn-secondary">
                            Marketing Tips
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withAuth(BusinessDashboardPage, { requiredRole: ['business_owner', 'admin'] });