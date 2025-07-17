// Blog types
export interface BlogPost {
  id?: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt?: Timestamp;
}

export const blogService = {
  async getAllBlogs(): Promise<BlogPost[]> {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  },
  async addBlog(blog: Omit<BlogPost, 'id' | 'createdAt'>, imageFile?: File): Promise<string> {
    let imageUrl = blog.imageUrl || '';
    if (imageFile) {
      const imageRef = ref(storage, `blog-images/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    const blogsRef = collection(db, 'blogs');
    const docRef = await addDoc(blogsRef, {
      ...blog,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },
  async updateBlog(id: string, blog: Partial<BlogPost>, imageFile?: File): Promise<void> {
    let imageUrl = blog.imageUrl;
    if (imageFile) {
      const imageRef = ref(storage, `blog-images/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    const blogRef = doc(db, 'blogs', id);
    await updateDoc(blogRef, { ...blog, imageUrl });
  },
  async deleteBlog(id: string): Promise<void> {
    const blogRef = doc(db, 'blogs', id);
    await deleteDoc(blogRef);
  },
  async getBlogById(id: string): Promise<BlogPost | null> {
    const docSnap = await getDocs(query(collection(db, 'blogs')));
    const found = docSnap.docs.find(d => d.id === id);
    return found ? ({ id: found.id, ...found.data() } as BlogPost) : null;
  },
};
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

// Job listing interface
export interface JobListing {
  id?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  status: 'open' | 'closed';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Application interface
export interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeUrl: string;
  resumeFileName: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  submittedAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Job Management Functions
export const jobService = {
  // Get all active jobs
  async getActiveJobs(): Promise<JobListing[]> {
    try {
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as JobListing))
        .filter(job => job.isActive && job.status === 'open');
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Get all jobs for admin (including closed ones)
  async getAllJobs(): Promise<JobListing[]> {
    try {
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as JobListing));
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }
  },

  // Add a new job
  async addJob(jobData: Omit<JobListing, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const jobsRef = collection(db, 'jobs');
      const docRef = await addDoc(jobsRef, {
        ...jobData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding job:', error);
      throw error;
    }
  },

  // Update job
  async updateJob(jobId: string, updates: Partial<JobListing>): Promise<void> {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  // Delete job
  async deleteJob(jobId: string): Promise<void> {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobRef);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
};

// Application Management Functions
export const applicationService = {
  // Submit application
  async submitApplication(
    applicationData: Omit<Application, 'id' | 'resumeUrl' | 'submittedAt' | 'updatedAt' | 'status'>,
    resumeFile: File
  ): Promise<string> {
    try {
      // Upload resume to Firebase Storage
      const resumeRef = ref(storage, `resumes/${Date.now()}_${resumeFile.name}`);
      const snapshot = await uploadBytes(resumeRef, resumeFile);
      const resumeUrl = await getDownloadURL(snapshot.ref);

      // Add application to Firestore
      const applicationsRef = collection(db, 'applications');
      const docRef = await addDoc(applicationsRef, {
        ...applicationData,
        resumeUrl,
        resumeFileName: resumeFile.name,
        status: 'pending',
        submittedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Get applications for a specific job
  async getApplicationsForJob(jobId: string): Promise<Application[]> {
    try {
      const applicationsRef = collection(db, 'applications');
      const q = query(applicationsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Application))
        .filter(app => app.jobId === jobId);
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Get all applications
  async getAllApplications(): Promise<Application[]> {
    try {
      const applicationsRef = collection(db, 'applications');
      const q = query(applicationsRef, orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Application));
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  },

  // Update application status
  async updateApplicationStatus(applicationId: string, status: Application['status']): Promise<void> {
    try {
      const applicationRef = doc(db, 'applications', applicationId);
      await updateDoc(applicationRef, {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }
};

// Seed initial job data (run this once to populate your database)
export const seedJobData = async () => {
  const initialJobs: Omit<JobListing, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Delhi, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹15-25 LPA",
      description: "We're looking for a Senior Software Engineer to join our growing engineering team and help build the future of electric mobility solutions.",
      responsibilities: [
        "Design and develop scalable backend systems for our EV fleet management platform",
        "Collaborate with cross-functional teams to deliver high-quality software solutions",
        "Mentor junior developers and contribute to technical decision-making",
        "Optimize application performance and ensure system reliability",
        "Participate in code reviews and maintain coding standards"
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience with Node.js, React, and TypeScript",
        "Strong knowledge of databases (PostgreSQL, MongoDB)",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Understanding of microservices architecture and API design",
        "Excellent problem-solving and communication skills"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Health insurance for you and your family",
        "Flexible working hours and remote work options",
        "Professional development budget",
        "Free EV rides and charging facilities"
      ],
      isActive: true,
      status: 'open'
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹12-20 LPA",
      description: "Join our product team to drive innovation in electric vehicle technology and sustainable transportation solutions.",
      responsibilities: [
        "Define product strategy and roadmap for EV fleet management solutions",
        "Conduct market research and analyze user feedback to inform product decisions",
        "Work closely with engineering and design teams to deliver product features",
        "Monitor product metrics and optimize user experience",
        "Collaborate with stakeholders to align product goals with business objectives"
      ],
      requirements: [
        "Bachelor's degree in Business, Engineering, or related field",
        "2+ years of product management experience, preferably in tech or mobility",
        "Strong analytical skills and data-driven decision making",
        "Excellent communication and project management skills",
        "Experience with product analytics tools and agile methodologies",
        "Passion for sustainable transportation and clean energy"
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Comprehensive health and wellness benefits",
        "Stock options and equity participation",
        "Learning and development opportunities",
        "Sustainable transportation allowance"
      ],
      isActive: true,
      status: 'open'
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-3 years",
      salary: "₹8-15 LPA",
      description: "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our electric vehicle platform.",
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and high-fidelity designs",
        "Collaborate with product and engineering teams",
        "Maintain and evolve our design system"
      ],
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "2+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Strong portfolio showcasing design process and solutions",
        "Understanding of responsive design and accessibility principles",
        "Experience with user research and testing methodologies"
      ],
      benefits: [
        "Creative and collaborative work environment",
        "Latest design tools and software licenses",
        "Health insurance and wellness programs",
        "Flexible work arrangements",
        "Conference and workshop attendance budget"
      ],
      isActive: true,
      status: 'open'
    },
    {
      title: "Fleet Operations Manager",
      department: "Operations",
      location: "Delhi, India",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹10-18 LPA",
      description: "Lead our fleet operations to ensure efficient and reliable electric vehicle services across our network.",
      responsibilities: [
        "Manage day-to-day fleet operations and logistics",
        "Optimize vehicle deployment and routing strategies",
        "Monitor fleet performance and maintenance schedules",
        "Coordinate with field teams and service providers",
        "Implement operational improvements and cost reduction initiatives"
      ],
      requirements: [
        "Bachelor's degree in Operations, Logistics, or related field",
        "3+ years of experience in fleet or logistics management",
        "Strong analytical and problem-solving skills",
        "Experience with fleet management software and GPS tracking",
        "Excellent leadership and team management abilities",
        "Knowledge of electric vehicles and charging infrastructure (preferred)"
      ],
      benefits: [
        "Competitive salary with performance incentives",
        "Comprehensive benefits package",
        "Career growth and advancement opportunities",
        "Company vehicle and fuel allowance",
        "Team building and recognition programs"
      ],
      isActive: true,
      status: 'open'
    }
  ];

  try {
    for (const job of initialJobs) {
      await jobService.addJob(job);
    }
    console.log('Jobs seeded successfully!');
  } catch (error) {
    console.error('Error seeding jobs:', error);
  }
};
