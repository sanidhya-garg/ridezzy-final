import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { jobService, applicationService, JobListing, blogService, BlogPost } from "../firebase/firebaseService";
import { 
  X, 
  Menu, 
  Home, 
  Briefcase, 
  Users, 
  FileText, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Blog form state
interface BlogFormState {
  id?: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  imageUrl?: string;
  imageFile?: File | null;
}

interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeFileName: string;
  resumeUrl?: string;
  submittedAt?: { toDate: () => Date } | number | Date | null;
  status?: string; // e.g. Pending, Reviewed, Interview, Rejected, Accepted
}

interface JobFormState {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  status: 'open' | 'closed';
}


const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobFormState | null>(null);
  const [jobForm, setJobForm] = useState<JobFormState>({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    status: 'open',
  });
  const [jobFormError, setJobFormError] = useState("");
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [appStatusFilter, setAppStatusFilter] = useState<string>("All");
  const [jobFilter, setJobFilter] = useState<string>("All");
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
  
  // Sidebar and navigation state
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'applications' | 'blogs'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Search and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "reviewing", label: "Reviewing" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" },
  ];
  // Blog management state
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogFormState | null>(null);
  const [blogForm, setBlogForm] = useState<BlogFormState>({ title: "", summary: "", content: "", author: user?.email || "", imageUrl: "", imageFile: null });
  const [blogFormError, setBlogFormError] = useState("");

  const auth = getAuth();

  // Helper functions for filtering and pagination
  const filteredApplications = applications.filter(app => {
    const matchesJob = jobFilter === "All" || app.jobTitle === jobFilter;
    const matchesStatus = appStatusFilter === "All" || (app.status || "pending") === appStatusFilter;
    const matchesSearch = searchTerm === "" || 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesJob && matchesStatus && matchesSearch;
  });

  const filteredJobs = jobListings.filter(job => 
    searchTerm === "" || 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogs = blogs.filter(blog => 
    searchTerm === "" || 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination helper
  const getPaginatedData = <T,>(data: T[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      data: data.slice(startIndex, endIndex),
      totalPages: Math.ceil(data.length / itemsPerPage),
      totalItems: data.length
    };
  };

  const renderPagination = (totalPages: number) => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setAppStatusFilter("All");
    setJobFilter("All");
    setCurrentPage(1);
  };

  // Render functions for each section
  const renderDashboard = () => {
    const pendingApps = applications.filter(app => (app.status || 'pending') === 'pending').length;
    const totalApps = applications.length;
    const activeJobs = jobListings.filter(job => job.isActive).length;
    const totalBlogs = blogs.length;

    return (
      <div className="space-y-4 lg:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-xl lg:text-3xl font-bold text-blue-600">{activeJobs}</p>
              </div>
              <Briefcase className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Applications</p>
                <p className="text-xl lg:text-3xl font-bold text-green-600">{totalApps}</p>
              </div>
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl lg:text-3xl font-bold text-orange-600">{pendingApps}</p>
              </div>
              <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-xl lg:text-3xl font-bold text-purple-600">{totalBlogs}</p>
              </div>
              <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Recent Applications</h3>
            <div className="space-y-2 lg:space-y-3">
              {applications.slice(0, 5).map(app => (
                <div key={app.id} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="font-medium text-sm lg:text-base truncate">{app.fullName}</p>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">{app.jobTitle}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                    (app.status || 'pending') === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    (app.status || 'pending') === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                    (app.status || 'pending') === 'hired' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {statusOptions.find(opt => opt.value === (app.status || 'pending'))?.label || 'Pending'}
                  </span>
                </div>
              ))}
              {applications.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No applications yet</p>
              )}
            </div>
          </div>
          
          <div className="bg-white p-4 lg:p-6 rounded-lg lg:rounded-xl shadow-sm border">
            <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">Recent Blog Posts</h3>
            <div className="space-y-2 lg:space-y-3">
              {blogs.slice(0, 5).map(blog => (
                <div key={blog.id} className="flex items-center justify-between p-2 lg:p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="font-medium text-sm lg:text-base truncate">{blog.title}</p>
                    <p className="text-xs lg:text-sm text-gray-600 truncate">by {blog.author}</p>
                  </div>
                  <p className="text-xs text-gray-500 flex-shrink-0">
                    {blog.createdAt?.toDate().toLocaleDateString()}
                  </p>
                </div>
              ))}
              {blogs.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No blog posts yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJobsSection = () => {
    const paginatedJobs = getPaginatedData(filteredJobs);
    
    return (
      <div className="space-y-4 lg:space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {paginatedJobs.totalItems} job{paginatedJobs.totalItems !== 1 ? 's' : ''} found
            </span>
          </div>
          <button
            onClick={() => openJobModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Job</span>
          </button>
        </div>

        {/* Mobile Cards - Show on small screens */}
        <div className="lg:hidden space-y-4">
          {paginatedJobs.data.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.salary}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  job.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {job.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Type:</span> {job.type}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => openJobModal(job)}
                  className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeletingJobId(job.id!)}
                  className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
          
          {paginatedJobs.totalItems === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No jobs found</p>
            </div>
          )}
        </div>

        {/* Desktop Table - Hide on small screens */}
        <div className="hidden lg:block bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedJobs.data.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.salary}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{job.department}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{job.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleJobStatus(job.id!, job.status || 'open')}
                        className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                          (job.status || 'open') === 'open' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {(job.status || 'open') === 'open' ? 'Open' : 'Closed'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openJobModal(job)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingJobId(job.id!)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginatedJobs.totalItems === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No jobs found</p>
            </div>
          )}
        </div>
        
        {renderPagination(paginatedJobs.totalPages)}

        {/* Delete Confirmation Modal */}
        {deletingJobId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Delete Job Post</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this job post? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDeleteJob(deletingJobId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeletingJobId(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderApplicationsSection = () => {
    const paginatedApps = getPaginatedData(filteredApplications);
    
    return (
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {paginatedApps.totalItems} application{paginatedApps.totalItems !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="flex space-x-3">
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={jobFilter} 
              onChange={e => setJobFilter(e.target.value)}
            >
              <option value="All">All Jobs</option>
              {Array.from(new Set(applications.map(a => a.jobTitle))).map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={appStatusFilter} 
              onChange={e => setAppStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedApps.data.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {app.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{app.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-4 h-4 text-gray-400 mr-1" />
                        {app.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-1" />
                        {app.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.experience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className={`text-xs rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${
                          (app.status || 'pending') === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          (app.status || 'pending') === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                          (app.status || 'pending') === 'shortlisted' ? 'bg-purple-100 text-purple-800' :
                          (app.status || 'pending') === 'hired' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                        value={app.status || "pending"}
                        disabled={updatingAppId === app.id}
                        onChange={e => handleStatusChange(app, e.target.value)}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {app.submittedAt && (
                          typeof app.submittedAt === 'object' && 'toDate' in app.submittedAt 
                            ? app.submittedAt.toDate().toLocaleDateString()
                            : new Date(app.submittedAt as number).toLocaleDateString()
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => openAppModal(app)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-900 p-1 inline-block"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginatedApps.totalItems === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No applications found</p>
            </div>
          )}
        </div>
        
        {renderPagination(paginatedApps.totalPages)}
      </div>
    );
  };

  const renderBlogsSection = () => {
    const paginatedBlogs = getPaginatedData(filteredBlogs);
    
    return (
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {paginatedBlogs.totalItems} blog post{paginatedBlogs.totalItems !== 1 ? 's' : ''} found
            </span>
          </div>
          <button
            onClick={() => openBlogModal()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Blog Post</span>
          </button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedBlogs.data.map((blog) => (
            <div key={blog.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              {blog.imageUrl && (
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>by {blog.author}</span>
                  <span>{blog.createdAt?.toDate().toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openBlogModal(blog)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeletingBlogId(blog.id!)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {paginatedBlogs.totalItems === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No blog posts found</p>
          </div>
        )}
        
        {renderPagination(paginatedBlogs.totalPages)}

        {/* Delete Confirmation Modal */}
        {deletingBlogId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Delete Blog Post</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleDeleteBlog(deletingBlogId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeletingBlogId(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const jobs = await jobService.getAllJobs();
      setJobListings(jobs);
      const apps = await applicationService.getAllApplications();
      setApplications(apps);
      const blogList = await blogService.getAllBlogs();
      setBlogs(blogList);
    } finally {
      setLoading(false);
    }
  };
  // Blog CRUD
  const openBlogModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingBlog({ ...blog, imageFile: null });
      setBlogForm({ ...blog, imageFile: null });
    } else {
      setEditingBlog(null);
      setBlogForm({ title: "", summary: "", content: "", author: user?.email || "", imageUrl: "", imageFile: null });
    }
    setBlogFormError("");
    setShowBlogModal(true);
  };
  const closeBlogModal = () => {
    setShowBlogModal(false);
    setEditingBlog(null);
    setBlogFormError("");
  };
  const handleBlogFormChange = (field: keyof BlogFormState, value: string | File | null) => {
    setBlogForm(prev => ({ ...prev, [field]: value }));
  };
  const handleBlogFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogFormError("");
    if (!blogForm.title || !blogForm.summary || !blogForm.content || !blogForm.author) {
      setBlogFormError("All fields are required.");
      return;
    }
    try {
      if (editingBlog && editingBlog.id) {
        await blogService.updateBlog(editingBlog.id, {
          title: blogForm.title,
          summary: blogForm.summary,
          content: blogForm.content,
          author: blogForm.author,
        }, blogForm.imageFile || undefined);
      } else {
        await blogService.addBlog({
          title: blogForm.title,
          summary: blogForm.summary,
          content: blogForm.content,
          author: blogForm.author,
        }, blogForm.imageFile || undefined);
      }
      closeBlogModal();
      fetchData();
    } catch {
      setBlogFormError("Failed to save blog post.");
    }
  };
  const handleDeleteBlog = async (blogId: string) => {
    setDeletingBlogId(blogId);
    try {
      await blogService.deleteBlog(blogId);
      setDeletingBlogId(null);
      fetchData();
    } catch {
      setDeletingBlogId(null);
      alert("Failed to delete blog post.");
    }
  };

  // Job CRUD
  const openJobModal = (job?: JobListing) => {
    if (job) {
      setEditingJob({
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities.join("\n"),
        requirements: job.requirements.join("\n"),
        benefits: job.benefits.join("\n"),
        status: job.status || 'open',
      });
      setJobForm({
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        responsibilities: job.responsibilities.join("\n"),
        requirements: job.requirements.join("\n"),
        benefits: job.benefits.join("\n"),
        status: job.status || 'open',
      });
    } else {
      setEditingJob(null);
      setJobForm({
        title: "",
        department: "",
        location: "",
        type: "",
        experience: "",
        salary: "",
        description: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
        status: 'open',
      });
    }
    setJobFormError("");
    setShowJobModal(true);
  };

  const closeJobModal = () => {
    setShowJobModal(false);
    setEditingJob(null);
    setJobFormError("");
  };

  const handleJobFormChange = (field: keyof JobFormState, value: string) => {
    setJobForm(prev => ({ ...prev, [field]: value }));
  };

  const handleJobFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormError("");
    // Validate
    if (!jobForm.title || !jobForm.department || !jobForm.location) {
      setJobFormError("Title, Department, and Location are required.");
      return;
    }
    const jobData = {
      ...jobForm,
      responsibilities: jobForm.responsibilities.split("\n").map(s => s.trim()).filter(Boolean),
      requirements: jobForm.requirements.split("\n").map(s => s.trim()).filter(Boolean),
      benefits: jobForm.benefits.split("\n").map(s => s.trim()).filter(Boolean),
      status: jobForm.status,
    };
    try {
      if (editingJob && editingJob.id) {
        await jobService.updateJob(editingJob.id, jobData);
      } else {
        await jobService.addJob({ ...jobData, isActive: true });
      }
      closeJobModal();
      fetchData();
    } catch {
      setJobFormError("Failed to save job post.");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    setDeletingJobId(jobId);
    try {
      await jobService.deleteJob(jobId);
      setDeletingJobId(null);
      fetchData();
    } catch {
      setDeletingJobId(null);
      alert("Failed to delete job post.");
    }
  };

  const handleToggleJobStatus = async (jobId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'open' ? 'closed' : 'open';
      await jobService.updateJob(jobId, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error('Failed to update job status:', error);
      alert("Failed to update job status.");
    }
  };

  // Application modal
  const openAppModal = (app: Application) => {
    setSelectedApp(app);
    setShowAppModal(true);
  };
  const closeAppModal = () => {
    setSelectedApp(null);
    setShowAppModal(false);
  };

  // Update application status
  const handleStatusChange = async (app: Application, newStatus: string) => {
    if (!app.id) return;
    setUpdatingAppId(app.id);
    try {
      await applicationService.updateApplicationStatus(app.id, newStatus as "pending" | "reviewing" | "shortlisted" | "hired" | "rejected");
      setApplications(prev => prev.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdatingAppId(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAuthError(err.message);
      } else {
        setAuthError("An unknown error occurred.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Modal render functions
  const renderJobModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeJobModal}>
      <div className="bg-white rounded-xl w-full max-w-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full" onClick={closeJobModal}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-2xl font-bold mb-6">{editingJob ? "Edit Job Post" : "Add Job Post"}</h2>
        <form onSubmit={handleJobFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Job Title" 
              value={jobForm.title} 
              onChange={e => handleJobFormChange("title", e.target.value)} 
              required 
            />
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Department" 
              value={jobForm.department} 
              onChange={e => handleJobFormChange("department", e.target.value)} 
              required 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Location" 
              value={jobForm.location} 
              onChange={e => handleJobFormChange("location", e.target.value)} 
              required 
            />
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Type (e.g. Full-time)" 
              value={jobForm.type} 
              onChange={e => handleJobFormChange("type", e.target.value)} 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Experience (e.g. 3-5 years)" 
              value={jobForm.experience} 
              onChange={e => handleJobFormChange("experience", e.target.value)} 
            />
            <input 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Salary" 
              value={jobForm.salary} 
              onChange={e => handleJobFormChange("salary", e.target.value)} 
            />
            <select 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              value={jobForm.status} 
              onChange={e => handleJobFormChange("status", e.target.value as 'open' | 'closed')} 
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <textarea 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Description" 
            value={jobForm.description} 
            onChange={e => handleJobFormChange("description", e.target.value)} 
            rows={3} 
          />
          <textarea 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Responsibilities (one per line)" 
            value={jobForm.responsibilities} 
            onChange={e => handleJobFormChange("responsibilities", e.target.value)} 
            rows={3} 
          />
          <textarea 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Requirements (one per line)" 
            value={jobForm.requirements} 
            onChange={e => handleJobFormChange("requirements", e.target.value)} 
            rows={3} 
          />
          <textarea 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Benefits (one per line)" 
            value={jobForm.benefits} 
            onChange={e => handleJobFormChange("benefits", e.target.value)} 
            rows={3} 
          />
          {jobFormError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{jobFormError}</div>}
          <div className="flex space-x-3 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {editingJob ? "Update Job" : "Create Job"}
            </button>
            <button 
              type="button" 
              onClick={closeJobModal} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBlogModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeBlogModal}>
      <div className="bg-white rounded-xl w-full max-w-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full" onClick={closeBlogModal}>
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <h2 className="text-2xl font-bold mb-6">{editingBlog ? "Edit Blog Post" : "Add Blog Post"}</h2>
        <form onSubmit={handleBlogFormSubmit} className="space-y-4">
          <input 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Blog Title" 
            value={blogForm.title} 
            onChange={e => handleBlogFormChange("title", e.target.value)} 
            required 
          />
          <input 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Summary" 
            value={blogForm.summary} 
            onChange={e => handleBlogFormChange("summary", e.target.value)} 
            required 
          />
          <input 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Author" 
            value={blogForm.author} 
            onChange={e => handleBlogFormChange("author", e.target.value)} 
            required 
          />
          <textarea 
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Content" 
            value={blogForm.content} 
            onChange={e => handleBlogFormChange("content", e.target.value)} 
            rows={6} 
            required 
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Blog Image</label>
            <input 
              type="file" 
              accept="image/*" 
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              onChange={e => handleBlogFormChange("imageFile", e.target.files ? e.target.files[0] : null)} 
            />
            {blogForm.imageUrl && !blogForm.imageFile && (
              <div className="mt-3">
                <img src={blogForm.imageUrl} alt="Current blog image" className="w-32 h-24 object-cover rounded-lg border" />
                <p className="text-sm text-gray-500 mt-1">Current image</p>
              </div>
            )}
          </div>
          {blogFormError && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{blogFormError}</div>}
          <div className="flex space-x-3 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {editingBlog ? "Update Blog" : "Create Blog"}
            </button>
            <button 
              type="button" 
              onClick={closeBlogModal} 
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAppModal = () => {
    if (!selectedApp) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeAppModal}>
        <div className="bg-white rounded-xl w-full max-w-2xl p-8 relative shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full" onClick={closeAppModal}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold mb-6">Application Details</h2>
          
          <div className="space-y-6">
            {/* Applicant Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Applicant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span>{selectedApp.fullName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Email:</span>
                  <span>{selectedApp.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span>{selectedApp.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Experience:</span>
                  <span>{selectedApp.experience}</span>
                </div>
              </div>
            </div>

            {/* Job Info */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Applied Position</h3>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Job Title:</span>
                <span className="text-blue-700 font-medium">{selectedApp.jobTitle}</span>
              </div>
              {selectedApp.submittedAt && (
                <div className="flex items-center space-x-2 mt-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Applied:</span>
                  <span className="text-sm text-gray-500">
                    {typeof selectedApp.submittedAt === 'object' && 'toDate' in selectedApp.submittedAt 
                      ? selectedApp.submittedAt.toDate().toLocaleString()
                      : new Date(selectedApp.submittedAt as number).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
                {selectedApp.coverLetter}
              </div>
            </div>

            {/* Resume */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Resume</h3>
              <a
                href={selectedApp.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
          {authError && <div className="text-red-500 text-sm">{authError}</div>}
          <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded font-semibold">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${sidebarCollapsed ? '-translate-x-full lg:w-16' : 'w-64'}
        fixed lg:relative h-full z-40 lg:z-auto
        transition-all duration-300 ease-in-out
        bg-white shadow-lg border-r border-gray-200
        flex flex-col
      `}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && <h1 className="text-xl font-bold text-gray-900">Ridezzy Admin</h1>}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <nav className="mt-8 flex-1">
          <div className="px-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                if (isMobile) setSidebarCollapsed(true);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Home className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('jobs');
                if (isMobile) setSidebarCollapsed(true);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'jobs' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Job Posts</span>}
              {!sidebarCollapsed && (
                <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {jobListings.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('applications');
                if (isMobile) setSidebarCollapsed(true);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'applications' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Applications</span>}
              {!sidebarCollapsed && (
                <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
                  {applications.filter(app => (app.status || 'pending') === 'pending').length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                setActiveTab('blogs');
                if (isMobile) setSidebarCollapsed(true);
              }}
              className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'blogs' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              {!sidebarCollapsed && <span className="ml-3">Blog Posts</span>}
              {!sidebarCollapsed && (
                <span className="ml-auto bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {blogs.length}
                </span>
              )}
            </button>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {!sidebarCollapsed ? 'Logout' : '⏻'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} transition-all duration-300 min-w-0`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile menu button */}
                {isMobile && sidebarCollapsed && (
                  <button
                    onClick={() => setSidebarCollapsed(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 capitalize">
                    {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 hidden sm:block">
                    {activeTab === 'dashboard' && 'Welcome back! Here\'s what\'s happening.'}
                    {activeTab === 'jobs' && 'Manage job postings and requirements'}
                    {activeTab === 'applications' && 'Review and manage job applications'}
                    {activeTab === 'blogs' && 'Create and manage blog content'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-32 sm:w-48 lg:w-64"
                  />
                </div>
                {(searchTerm || appStatusFilter !== 'All' || jobFilter !== 'All') && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg hidden sm:block"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 lg:p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'jobs' && renderJobsSection()}
              {activeTab === 'applications' && renderApplicationsSection()}
              {activeTab === 'blogs' && renderBlogsSection()}
            </>
          )}
        </main>
      </div>

      {/* Modals remain the same */}
      {showJobModal && renderJobModal()}
      {showBlogModal && renderBlogModal()}
      {showAppModal && renderAppModal()}
    </div>
  );
}

export default AdminDashboard;
