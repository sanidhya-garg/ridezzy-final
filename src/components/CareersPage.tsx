import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  Calendar,
  X,
  Upload,
  User,
  Mail,
  Phone,
  FileText,
  Loader2,
  Share2,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Check
} from "lucide-react";
import Navbar from "../Navbar";
import officeImage from "../assets/office.png";
import Footer from "./Footer";
import { jobService, applicationService, JobListing } from "../firebase/firebaseService";

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
}

export default function CareersPage() {
  const { jobId } = useParams();
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareJob, setShareJob] = useState<JobListing | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null
  });

  // Fetch jobs from Firebase on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // SEED DATA - Run this ONCE then comment out
        // await seedJobData();
        
        const jobs = await jobService.getActiveJobs();
        setJobListings(jobs);
        
        // If there's a jobId in URL, auto-expand that job
        if (jobId) {
          const targetJob = jobs.find(job => job.id === jobId);
          if (targetJob) {
            setExpandedJob(jobId);
            // Scroll to job listings after a brief delay
            setTimeout(() => {
              document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          }
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        // You could add a toast notification here
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [jobId]);

  const toggleJobExpansion = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
    
    // Update URL without page reload
    const newUrl = expandedJob === jobId 
      ? '/careers' 
      : `/careers/${jobId}`;
    window.history.pushState({}, '', newUrl);
  };

  const openApplicationModal = (job: JobListing) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const openShareModal = (job: JobListing) => {
    setShareJob(job);
    setShowShareModal(true);
    setCopySuccess(false);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShareJob(null);
    setCopySuccess(false);
  };

  const getJobUrl = (job: JobListing) => {
    return `${window.location.origin}/careers/${job.id}`;
  };

  const copyJobLink = async (job: JobListing) => {
    try {
      await navigator.clipboard.writeText(getJobUrl(job));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnSocial = (job: JobListing, platform: 'facebook' | 'twitter' | 'linkedin') => {
    const jobUrl = getJobUrl(job);
    const text = `Check out this amazing job opportunity: ${job.title} at Ridezzy!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(jobUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null
    });
  };

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    setApplicationData(prev => ({ ...prev, resume: file }));
  };

  const handleSubmitApplication = async () => {
    if (!selectedJob || !applicationData.resume) return;
    
    try {
      setSubmitting(true);
      
      await applicationService.submitApplication(
        {
          jobId: selectedJob.id!,
          jobTitle: selectedJob.title,
          fullName: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone,
          experience: applicationData.experience,
          coverLetter: applicationData.coverLetter,
          resumeFileName: applicationData.resume.name,
        },
        applicationData.resume
      );

      alert("Application submitted successfully! We'll get back to you soon.");
      closeModal();
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (
    timestamp: Date | { toDate: () => Date } | number | null | undefined
  ): string => {
    if (!timestamp) return '';
    
    // Handle Firebase Timestamp
    const date =
      typeof timestamp === 'object' && timestamp !== null && 'toDate' in timestamp
        ? timestamp.toDate()
        : new Date(timestamp as Date | number);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 lg:py-40 px-2 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    Join Our Team
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Shape the Future of
                    <span className="block text-yellow-500">Urban Mobility</span>
                  </h1>
                  <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                    We're building the next generation of sustainable transportation solutions. Join our team of innovators and make a meaningful impact on how people move through cities.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    onClick={() => document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explore Opportunities
                  </button>
                  <button
                    className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById('company-culture')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    About Ridezzy
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  <img 
                    src={officeImage} 
                    alt="Ridezzy Modern Office Space" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-gray-900/30 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-lg font-semibold mb-2">Ridezzy Hub</h3>
                      <p className="text-sm opacity-90">Uttam Nagar, Delhi</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Company Culture Section */}
        <section id="company-culture" className="py-12 sm:py-24 px-2 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Ridezzy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join a company that's committed to innovation, sustainability, and creating meaningful impact in urban transportation.
              </p>
            </motion.div>


            {/* Office Culture Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-2xl p-4 sm:p-8 h-full">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Building className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Modern Work Environment
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Our state-of-the-art offices are designed to foster collaboration, creativity, and innovation. From open workspaces to quiet focus areas, we've created an environment where great ideas can flourish.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                          Open collaborative spaces
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                          Modern meeting rooms with latest tech
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3"></span>
                          Comfortable breakout areas
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-white rounded-2xl p-4 sm:p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Diverse Team
                  </h3>
                  <p className="text-sm text-gray-600">
                    Work alongside talented individuals from diverse backgrounds and expertise areas.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Growth Focus
                  </h3>
                  <p className="text-sm text-gray-600">
                    Continuous learning opportunities and clear career progression paths for all team members.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section id="job-listings" className="py-12 sm:py-24 px-2 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our team and help shape the future of sustainable urban transportation.
              </p>
            </motion.div>

            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  <span className="ml-3 text-gray-600">Loading job opportunities...</span>
                </div>
              ) : jobListings.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-gray-400 mb-4">
                    <Building className="w-16 h-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Open Positions</h3>
                  <p className="text-gray-500">Check back soon for new opportunities!</p>
                </div>
              ) : (
                jobListings.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Job Header */}
                    <div 
                      className="p-4 sm:p-8 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      onClick={() => toggleJobExpansion(job.id!)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 w-fit">
                              {job.department}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {job.type}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              {job.experience}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openShareModal(job);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                            title="Share this job"
                          >
                            <Share2 className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                          </button>
                          <span className="text-sm text-gray-500">
                            {formatDate(job.createdAt)}
                          </span>
                          {expandedJob === job.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Job Details */}
                    <AnimatePresence>
                      {expandedJob === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-100"
                        >
                          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-gray-50/50">
                            {/* Description */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">About this Role</h4>
                              <p className="text-gray-700 leading-relaxed">{job.description}</p>
                            </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                              {/* Responsibilities */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h4>
                                <ul className="space-y-3">
                                  {job.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Requirements */}
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h4>
                                <ul className="space-y-3">
                                  {job.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Benefits */}
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">What We Offer</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                {job.benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-3 text-gray-700">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                    {benefit}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Apply Button */}
                            <div className="pt-4 sm:pt-6 border-t border-gray-200">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openApplicationModal(job);
                                }}
                                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                              >
                                Apply for this Position
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-8">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Apply for Position</h3>
                      <p className="text-gray-600">{selectedJob?.title} - {selectedJob?.department}</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Application Form */}
                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-2" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={applicationData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={applicationData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={applicationData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience
                        </label>
                        <select
                          value={applicationData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Resume/CV *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-yellow-500 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          {applicationData.resume ? applicationData.resume.name : "Upload your resume"}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          Choose File
                        </label>
                        <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Letter
                      </label>
                      <textarea
                        value={applicationData.coverLetter}
                        onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6 sm:mt-8">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitApplication}
                      disabled={!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.resume || submitting}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && shareJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={closeShareModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Share Job</h3>
                      <p className="text-gray-600 text-sm">{shareJob.title}</p>
                    </div>
                    <button
                      onClick={closeShareModal}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Copy Link */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Link
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={getJobUrl(shareJob)}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                      />
                      <button
                        onClick={() => copyJobLink(shareJob)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {copySuccess ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Social Media Share */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Share on Social Media
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => shareOnSocial(shareJob, 'facebook')}
                        className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                      >
                        <Facebook className="w-6 h-6 text-blue-600" />
                        <span className="text-xs text-gray-600 group-hover:text-blue-600">Facebook</span>
                      </button>
                      
                      <button
                        onClick={() => shareOnSocial(shareJob, 'twitter')}
                        className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                      >
                        <Twitter className="w-6 h-6 text-blue-400" />
                        <span className="text-xs text-gray-600 group-hover:text-blue-400">Twitter</span>
                      </button>
                      
                      <button
                        onClick={() => shareOnSocial(shareJob, 'linkedin')}
                        className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                      >
                        <Linkedin className="w-6 h-6 text-blue-700" />
                        <span className="text-xs text-gray-600 group-hover:text-blue-700">LinkedIn</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}
