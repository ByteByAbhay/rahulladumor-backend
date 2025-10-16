# 🚀 Rahul Ladumor Portfolio Backend - Frontend API Guide

## 📋 Table of Contents
- [🔧 Quick Start](#-quick-start)
- [🔐 Authentication System](#-authentication-system)
- [📊 Admin Panel APIs](#-admin-panel-apis)
- [🎯 Portfolio Data APIs](#-portfolio-data-apis)
- [📧 Contact & Communication](#-contact--communication)
- [🔄 Bulk Operations](#-bulk-operations)
- [📝 Data Models & Schemas](#-data-models--schemas)
- [⚡ Error Handling](#-error-handling)
- [🛡️ Security & Middleware](#️-security--middleware)
- [🔍 API Testing](#-api-testing)

---

## 🔧 Quick Start

### Base URL
```
Production: https://rahulladumor-backend.onrender.com
Development: http://localhost:8000
```

### API Documentation
- **Swagger UI**: `{BASE_URL}/api-docs`
- **Interactive Testing**: Available in Swagger UI with auto-authentication

### Default Admin Credentials
```json
{
  "identifier": "admin",
  "password": "admin123"
}
```

---

## 🔐 Authentication System

### Overview
- **JWT-based authentication** with Bearer tokens
- **Role-based access control** (admin/user)
- **Auto-token setting** in Swagger UI after login
- **Session management** with logout functionality

### Authentication Endpoints

#### 1. **Login** 🔑
```http
POST /api/auth/login
```
**Payload:**
```json
{
  "identifier": "admin",  // username or email
  "password": "admin123"
}
```
**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "admin",
      "email": "admin@acloudwithrahul.in",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. **Register** 📝
```http
POST /api/auth/register
```
**Payload:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"  // optional, defaults to "user"
}
```

#### 3. **Get Current User** 👤
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### 4. **Update Profile** ✏️
```http
PUT /api/auth/me
Authorization: Bearer {token}
```
**Payload:**
```json
{
  "username": "updatedusername",
  "email": "updated@example.com"
}
```

#### 5. **Change Password** 🔒
```http
PUT /api/auth/change-password
Authorization: Bearer {token}
```
**Payload:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### 6. **Logout** 🚪
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

---

## 📊 Admin Panel APIs

### User Management (Admin Only)

#### 1. **Get All Users** 👥
```http
GET /api/auth/users?page=1&limit=10
Authorization: Bearer {admin_token}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### 2. **Get Pending Users** ⏳
```http
GET /api/auth/users/pending?page=1&limit=10
Authorization: Bearer {admin_token}
```

#### 3. **Update User Status** 🔄
```http
PUT /api/auth/users/{userId}/status
Authorization: Bearer {admin_token}
```
**Payload:**
```json
{
  "isActive": true
}
```

#### 4. **Activate User** ✅
```http
PUT /api/auth/users/{userId}/activate
Authorization: Bearer {admin_token}
```

#### 5. **Deactivate User** ❌
```http
PUT /api/auth/users/{userId}/deactivate
Authorization: Bearer {admin_token}
```

---

## 🎯 Portfolio Data APIs

All portfolio APIs require authentication (`Authorization: Bearer {token}`)

### 1. **Personal Information** 👤
```http
GET    /api/personal-info
POST   /api/personal-info
PUT    /api/personal-info/{id}
DELETE /api/personal-info/{id}
```

**Data Structure:**
```json
{
  "name": "Rahul Ladumor",
  "title": "3x AWS Certified Full-Stack JavaScript & Cloud Engineer",
  "tagline": "Serverless Architecture Expert | Saving Companies $100K+ Annually",
  "location": "Surat, Gujarat, India",
  "timezone": "Asia/Kolkata",
  "image": "https://example.com/profile.jpg",
  "email": "contact@acloudwithrahul.in",
  "phone": "+91-7567611653",
  "website": "https://www.rahulladumor.in",
  "social": {
    "linkedin": "https://linkedin.com/in/rahulladumor",
    "github": "https://github.com/rahulladumor",
    "twitter": "https://twitter.com/ladumorrahul"
  },
  "metrics": [
    {"value": "8+", "label": "Years Experience"},
    {"value": "50+", "label": "Projects Completed"}
  ],
  "bio": "Professional biography...",
  "experience": {
    "years": "8+",
    "companies": "10+",
    "projects": "50+"
  },
  "valuePropositions": ["Serverless Architecture", "Cost Optimization"],
  "languages": ["English", "Hindi", "Gujarati"],
  "availability": {
    "status": "open",
    "types": ["Full-time", "Contract"],
    "remote": true,
    "relocation": false,
    "preferredRoles": ["Full-Stack Developer", "Cloud Architect"]
  },
  "achievements": ["AWS Certified", "Cost Savings Expert"]
}
```

### 2. **Skills** 🛠️
```http
GET    /api/skills
POST   /api/skills
PUT    /api/skills/{id}
DELETE /api/skills/{id}
```

**Data Structure:**
```json
{
  "primary": ["AWS Lambda & Serverless Architecture", "Full-Stack JavaScript Development"],
  "secondary": ["Python", "DevOps", "Machine Learning"],
  "tools": ["AWS", "Docker", "Kubernetes", "Terraform"]
}
```

### 3. **Education** 🎓 ⭐ NEW
```http
GET    /api/education
POST   /api/education
GET    /api/education/{id}
PUT    /api/education/{id}
DELETE /api/education/{id}
```

**Data Structure:**
```json
{
  "institution": "Indian Institute of Technology, Roorkee",
  "degree": "PG Certificate in Agentic AI, GenAI & Machine Learning",
  "duration": "May 2025 - February 2026",
  "location": "Roorkee, India",
  "gpa": "In Progress"  // Optional field
}
```

### 4. **Work Experience** 💼
```http
GET    /api/work-experience
POST   /api/work-experience
GET    /api/work-experience/{id}
PUT    /api/work-experience/{id}
DELETE /api/work-experience/{id}
```

**Data Structure:**
```json
{
  "company": "Tech Solutions Inc.",
  "position": "Senior Full-Stack Developer",
  "duration": "2022 - Present",
  "location": "Remote",
  "description": "Led development of serverless applications...",
  "technologies": ["AWS Lambda", "Node.js", "React"],
  "achievements": ["Reduced costs by 40%", "Improved performance by 60%"]
}
```

### 5. **Services** 🔧
```http
GET    /api/services
POST   /api/services
GET    /api/services/{id}
PUT    /api/services/{id}
DELETE /api/services/{id}
```

**Data Structure:**
```json
{
  "name": "AWS Cloud Migration",
  "description": "Complete migration to AWS cloud infrastructure...",
  "duration": "4-8 weeks",
  "deliverables": ["Migration Plan", "Infrastructure Setup", "Documentation"]
}
```

### 6. **Certifications** 📜
```http
GET    /api/certifications
POST   /api/certifications
GET    /api/certifications/{id}
PUT    /api/certifications/{id}
DELETE /api/certifications/{id}
```

### 7. **Testimonials** 💬
```http
GET    /api/testimonials
POST   /api/testimonials
GET    /api/testimonials/{id}
PUT    /api/testimonials/{id}
DELETE /api/testimonials/{id}
```

### 8. **Case Studies** 📊
```http
GET    /api/case-studies
POST   /api/case-studies
GET    /api/case-studies/{id}
PUT    /api/case-studies/{id}
DELETE /api/case-studies/{id}
```

### 9. **Section Data** 📄
```http
GET    /api/section-data
POST   /api/section-data
GET    /api/section-data/{id}
PUT    /api/section-data/{id}
DELETE /api/section-data/{id}
```

### 10. **Additional Info** ℹ️
```http
GET    /api/additional-info
POST   /api/additional-info
GET    /api/additional-info/{id}
PUT    /api/additional-info/{id}
DELETE /api/additional-info/{id}
```

### 11. **Articles** 📝
```http
GET    /api/articles
POST   /api/articles
GET    /api/articles/{id}
PUT    /api/articles/{id}
DELETE /api/articles/{id}
```

---

## 📧 Contact & Communication

### Enhanced Contact Form ⭐ NEW
```http
POST /contact
```

**Enhanced Payload with Contact Method:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "aws-consulting",
  "message": "I would like to discuss your AWS optimization services...",
  "contactMethod": "email"  // "email", "phone", or "whatsapp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "userEmailSent": true,
    "adminEmailSent": true,
    "timestamp": "2023-12-01T10:30:00.000Z"
  }
}
```

**Contact Method Options:**
- `"email"` → Email communication
- `"phone"` → Phone call preferred  
- `"whatsapp"` → WhatsApp messaging

---

## 🔄 Bulk Operations

### Bulk Update Portfolio Data
```http
PUT /api/bulk-update
Authorization: Bearer {token}
```

**Payload:** Complete portfolio data structure matching `src/config/data.js`

### Bulk Export Portfolio Data
```http
GET /api/bulk-update/export
Authorization: Bearer {token}
```

**Response:** Complete portfolio data in original JSON structure with education support ⭐

---

## 📝 Data Models & Schemas

### 1. User Model
```typescript
interface User {
  _id: string;
  username: string;        // 3-30 chars, unique
  email: string;           // unique, lowercase
  password: string;        // 6+ chars, hashed (not returned in responses)
  role: "admin" | "user";
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "admin",
      "email": "admin@acloudwithrahul.in",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 2. Personal Info Model
```typescript
interface PersonalInfo {
  _id: string;
  name: string;
  title: string;
  tagline: string;
  location: string;
  timezone: string;
  image: string;
  email: string;
  phone: string;
  website: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  metrics: Array<{
    value: string;
    label: string;
  }>;
  bio: string;
  experience: {
    years: string;
    companies: string;
    projects: string;
  };
  valuePropositions: string[];
  languages: string[];
  availability: {
    status: "open" | "busy" | "unavailable";
    types: string[];
    remote: boolean;
    relocation: boolean;
    preferredRoles: string[];
  };
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Rahul Ladumor",
    "title": "3x AWS Certified Full-Stack JavaScript & Cloud Engineer",
    "tagline": "Serverless Architecture Expert | Saving Companies $100K+ Annually",
    "location": "Surat, Gujarat, India",
    "timezone": "Asia/Kolkata",
    "image": "https://example.com/profile.jpg",
    "email": "contact@acloudwithrahul.in",
    "phone": "+91-7567611653",
    "website": "https://www.rahulladumor.in",
    "social": {
      "linkedin": "https://linkedin.com/in/rahulladumor",
      "github": "https://github.com/rahulladumor",
      "twitter": "https://twitter.com/ladumorrahul"
    },
    "metrics": [
      {"value": "8+", "label": "Years Experience"},
      {"value": "50+", "label": "Projects Completed"}
    ],
    "bio": "Professional biography...",
    "experience": {
      "years": "8+",
      "companies": "10+",
      "projects": "50+"
    },
    "valuePropositions": ["Serverless Architecture", "Cost Optimization"],
    "languages": ["English", "Hindi", "Gujarati"],
    "availability": {
      "status": "open",
      "types": ["Full-time", "Contract"],
      "remote": true,
      "relocation": false,
      "preferredRoles": ["Full-Stack Developer", "Cloud Architect"]
    },
    "achievements": ["AWS Certified", "Cost Savings Expert"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Skills Model
```typescript
interface Skills {
  _id: string;
  primary: string[];
  secondary: string[];
  tools: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "primary": ["AWS Lambda & Serverless Architecture", "Full-Stack JavaScript Development"],
    "secondary": ["Python", "DevOps", "Machine Learning"],
    "tools": ["AWS", "Docker", "Kubernetes", "Terraform"],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Education Model ⭐ NEW
```typescript
interface Education {
  _id: string;
  institution: string;     // required
  degree: string;          // required
  duration: string;        // required
  location: string;        // required
  gpa?: string;           // optional
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "institution": "Indian Institute of Technology, Roorkee",
      "degree": "PG Certificate in Agentic AI, GenAI & Machine Learning",
      "duration": "May 2025 - February 2026",
      "location": "Roorkee, India",
      "gpa": "In Progress",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 5. Work Experience Model
```typescript
interface WorkExperience {
  _id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "company": "Tech Solutions Inc.",
      "position": "Senior Full-Stack Developer",
      "duration": "2022 - Present",
      "location": "Remote",
      "description": "Led development of serverless applications...",
      "technologies": ["AWS Lambda", "Node.js", "React"],
      "achievements": ["Reduced costs by 40%", "Improved performance by 60%"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 6. Services Model
```typescript
interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  deliverables: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 4,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "AWS Cloud Migration",
      "description": "Complete migration to AWS cloud infrastructure...",
      "duration": "4-8 weeks",
      "deliverables": ["Migration Plan", "Infrastructure Setup", "Documentation"],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 7. Certifications Model
```typescript
interface Certification {
  _id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  level: string;
  icon?: string;           // default: "Award"
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "AWS Certified Solutions Architect - Professional",
      "issuer": "Amazon Web Services",
      "year": "2023",
      "credentialId": "AWS-SAP-123456",
      "level": "Professional",
      "icon": "Award",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 8. Testimonials Model
```typescript
interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  image: string;
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 6,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Smith",
      "position": "CTO",
      "company": "Tech Innovations Ltd.",
      "testimonial": "Rahul's expertise in serverless architecture helped us reduce costs by 60%...",
      "image": "https://example.com/testimonial1.jpg",
      "linkedin": "https://linkedin.com/in/johnsmith",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 9. Case Studies Model
```typescript
interface CaseStudy {
  _id: string;
  id: number;              // unique identifier
  title: string;
  company: string;
  industry: string;
  challenge: string;
  image: string;
  timeline: string;
  teamSize: string;
  metrics: {
    costReduction?: string;
    monthlySaving?: string;
    performanceGain?: string;
    uptimeImprovement?: string;
    securityScore?: string;
    complianceAchieved?: string;
    costOptimization?: string;
    scalability?: string;
    deploymentSpeed?: string;
    maintenance?: string;
  };
  beforeStats: {
    monthlySpend?: string;
    avgResponseTime?: string;
    uptime?: string;
    scalingIssues?: string;
    securityScore?: string;
    compliance?: string;
    auditTime?: string;
    incidents?: string;
    deploymentTime?: string;
    scaling?: string;
    maintenance?: string;
  };
  afterStats: {
    monthlySpend?: string;
    avgResponseTime?: string;
    uptime?: string;
    scalingIssues?: string;
    securityScore?: string;
    compliance?: string;
    auditTime?: string;
    incidents?: string;
    deploymentTime?: string;
    scaling?: string;
    maintenance?: string;
  };
  solution: string;
  results: string[];
  technologies: string[];
  clientQuote: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "id": 1,
      "title": "E-commerce Platform Modernization",
      "company": "RetailCorp",
      "industry": "E-commerce",
      "challenge": "Legacy monolithic architecture causing scalability issues...",
      "image": "https://example.com/case-study-1.jpg",
      "timeline": "6 months",
      "teamSize": "5 developers",
      "metrics": {
        "costReduction": "60%",
        "performanceGain": "300%",
        "uptimeImprovement": "99.9%"
      },
      "beforeStats": {
        "monthlySpend": "$15,000",
        "avgResponseTime": "2.5s",
        "uptime": "95%"
      },
      "afterStats": {
        "monthlySpend": "$6,000",
        "avgResponseTime": "400ms",
        "uptime": "99.9%"
      },
      "solution": "Migrated to serverless architecture using AWS Lambda...",
      "results": ["60% cost reduction", "300% performance improvement"],
      "technologies": ["AWS Lambda", "API Gateway", "DynamoDB"],
      "clientQuote": "Rahul transformed our entire infrastructure...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 10. Section Data Model
```typescript
interface SectionData {
  _id: string;
  sectionType: "problemSection" | "solutionSection" | "credentialsSection" | "servicesSection" | "testimonialsSection" | "caseStudiesSection" | "aboutSection";
  data: any;               // Mixed type - can contain any structure
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "sectionType": "problemSection",
    "data": {
      "title": "Common Cloud Challenges",
      "problems": ["High costs", "Poor performance", "Security concerns"],
      "solutions": ["Cost optimization", "Performance tuning", "Security hardening"]
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 11. Additional Info Model
```typescript
interface AdditionalInfo {
  _id: string;
  speakingEngagements: Array<{
    event: string;
    topic: string;
    date: string;
    audience: string;
  }>;
  publications: Array<{
    title: string;
    platform: string;
    date: string;
    url: string;
    views: string;
  }>;
  communityInvolvement: Array<{
    organization: string;
    role: string;
    duration: string;
    activities: string[];
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    year: string;
    description: string;
  }>;
  subjectOptions: Array<{
    value: string;
    label: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```

**Response Example:**
```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "speakingEngagements": [
      {
        "event": "AWS re:Invent 2023",
        "topic": "Serverless Architecture Best Practices",
        "date": "2023-11-28",
        "audience": "Cloud Architects"
      }
    ],
    "publications": [
      {
        "title": "Mastering AWS Lambda",
        "platform": "Medium",
        "date": "2023-10-15",
        "url": "https://medium.com/@rahul/mastering-aws-lambda",
        "views": "10,000+"
      }
    ],
    "communityInvolvement": [
      {
        "organization": "AWS User Group Gujarat",
        "role": "Community Leader",
        "duration": "2022 - Present",
        "activities": ["Organizing meetups", "Technical talks"]
      }
    ],
    "awards": [
      {
        "title": "AWS Community Builder",
        "issuer": "Amazon Web Services",
        "year": "2023",
        "description": "Recognized for contributions to AWS community"
      }
    ],
    "subjectOptions": [
      {
        "value": "aws-consulting",
        "label": "AWS Consulting"
      },
      {
        "value": "serverless-migration",
        "label": "Serverless Migration"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 12. Articles Model (DEV Community Integration)
```typescript
interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  canonical_url?: string;
  published_at: string;
  created_at: string;
  edited_at?: string;
  crossposted_at?: string;
  published_timestamp: string;
  tag_list: string[];
  tags: string;
  slug: string;
  path: string;
  user: {
    name: string;
    username: string;
    twitter_username?: string;
    github_username?: string;
    user_id: number;
    website_url?: string;
    profile_image: string;
    profile_image_90: string;
  };
  organization?: any;
  flare_tag?: any;
  cover_image?: string;
  social_image: string;
  readable_publish_date: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id?: number;
  body_markdown?: string;        // Only available in single article endpoint
  positive_reactions_count: number;
  page_views_count: number;
  published: boolean;
  reading_time_minutes: number;
}

interface ArticlesResponse {
  status: string;
  message: string;
  count: number;
  data: Article[];
  pagination: {
    page: number;
    per_page: number;
    count: number;
    has_next_page: boolean;
    has_prev_page: boolean;
    next_page?: number;
    prev_page?: number;
  };
  filters: {
    tag?: string;
    state: string;
    top?: string;
  };
}
```

**Response Example:**
```json
{
  "status": "success",
  "message": "Articles fetched successfully from DEV Community",
  "count": 3,
  "data": [
    {
      "id": 1234567,
      "title": "Building Modern Web Applications with React and Node.js",
      "description": "Learn how to build scalable web applications using React and Node.js with best practices and modern tools.",
      "url": "https://dev.to/rahulladumor/building-modern-web-applications-123",
      "published_at": "2024-01-15T10:30:00Z",
      "tag_list": ["react", "nodejs", "javascript", "webdev"],
      "tags": "react, nodejs, javascript, webdev",
      "slug": "building-modern-web-applications-123",
      "path": "/rahulladumor/building-modern-web-applications-123",
      "user": {
        "name": "Rahul Ladumor",
        "username": "rahulladumor",
        "user_id": 123456,
        "profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/example.jpg",
        "profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/example.jpg"
      },
      "cover_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example.jpg",
      "social_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--example--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/example.jpg",
      "readable_publish_date": "Jan 15",
      "comments_count": 25,
      "public_reactions_count": 150,
      "positive_reactions_count": 142,
      "page_views_count": 1250,
      "published": true,
      "reading_time_minutes": 8
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 9,
    "count": 3,
    "has_next_page": false,
    "has_prev_page": false,
    "next_page": null,
    "prev_page": null
  },
  "filters": {
    "tag": "javascript",
    "state": "fresh",
    "top": null
  }
}
```

### 13. Contact Form Response Model ⭐ NEW
```typescript
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactMethod?: "email" | "phone" | "whatsapp";  // NEW: Contact preference
}

interface ContactResponse {
  success: boolean;
  message: string;
  data: {
    userEmailSent: boolean;
    adminEmailSent: boolean;
    timestamp: string;
    contactMethod?: string;        // NEW: Shows preferred contact method
  };
}
```

**Response Example:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "userEmailSent": true,
    "adminEmailSent": true,
    "timestamp": "2024-01-15T10:30:00.000Z",
    "contactMethod": "email"
  }
}
```

### 14. Profile API Response Model (Complete Portfolio Data)
```typescript
interface ProfileResponse {
  data: {
    // Personal Information
    name: string;
    title: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    bio: string;
    social: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
    };
    
    // Skills
    skills: {
      primary: string[];
      languages: string[];
      frameworks: string[];
      tools: string[];
    };
    
    // Education ⭐ NEW
    education: Array<{
      institution: string;
      degree: string;
      duration: string;
      location: string;
      gpa?: string;
    }>;
    
    // Experience
    experience: {
      years: string;
      companies: string;
      projects: string;
    };
    
    // Work History
    workHistory: Array<{
      company: string;
      position: string;
      period: string;
      description: string;
      achievements: string[];
    }>;
    
    // Certifications
    certifications: Array<{
      name: string;
      issuer: string;
      date: string;
      credentialId: string;
      url: string;
    }>;
    
    // Services
    services: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    
    // Testimonials
    testimonials: Array<{
      name: string;
      role: string;
      company: string;
      content: string;
      rating: number;
    }>;
    
    // Case Studies
    caseStudies: Array<{
      title: string;
      client: string;
      challenge: string;
      solution: string;
      results: string[];
      technologies: string[];
    }>;
    
    // Additional Info
    additionalInfo: {
      interests: string[];
      languages: Array<{
        name: string;
        proficiency: string;
      }>;
      availability: string;
    };
  };
}
```

**Profile API Response Example:**
```json
{
  "data": {
    "name": "Rahul Ladumor",
    "title": "3x AWS Certified Full-Stack JavaScript & Cloud Engineer",
    "tagline": "Serverless Architecture Expert | Saving Companies $100K+ Annually",
    "email": "contact@acloudwithrahul.in",
    "phone": "+91-7567611653",
    "location": "Surat, Gujarat, India",
    "website": "https://www.rahulladumor.in",
    "bio": "3x AWS Certified Full-Stack JavaScript & Cloud Engineer with 8+ years of experience...",
    "social": {
      "linkedin": "https://linkedin.com/in/rahulladumor",
      "github": "https://github.com/rahulladumor",
      "twitter": "https://twitter.com/ladumorrahul"
    },
    "skills": {
      "primary": ["AWS Lambda & Serverless Architecture", "Full-Stack JavaScript Development"],
      "languages": ["JavaScript", "Python", "TypeScript"],
      "frameworks": ["React", "Node.js", "Express"],
      "tools": ["AWS", "Docker", "Kubernetes"]
    },
    "education": [
      {
        "institution": "Indian Institute of Technology, Roorkee",
        "degree": "PG Certificate in Agentic AI, GenAI & Machine Learning",
        "duration": "May 2025 - February 2026",
        "location": "Roorkee, India",
        "gpa": "In Progress"
      }
    ],
    "experience": {
      "years": "8+",
      "companies": "10+",
      "projects": "50+"
    },
    "certifications": [
      {
        "name": "AWS Certified Solutions Architect - Professional",
        "issuer": "Amazon Web Services",
        "date": "2023",
        "credentialId": "AWS-SAP-123456"
      }
    ]
  }
}
```

---

## ⚡ Error Handling

### Standard Error Response
```json
{
  "status": "error",
  "message": "Error description",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Validation Error Response
```json
{
  "status": "error",
  "message": "Validation failed",
  "details": [
    {
      "field": "institution",
      "message": "Institution is required"
    },
    {
      "field": "degree",
      "message": "Degree is required"
    }
  ]
}
```

### Authentication Error Response
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

### Authorization Error Response
```json
{
  "status": "error",
  "message": "Admin privileges required"
}
```

### Not Found Error Response
```json
{
  "status": "error",
  "message": "Education record not found"
}
```

### HTTP Status Codes
- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request / Validation Error
- `401` - Unauthorized (Invalid/Missing token)
- `403` - Forbidden (Admin privileges required)
- `404` - Not Found (Resource doesn't exist)
- `409` - Conflict (Duplicate data)
- `422` - Unprocessable Entity (Validation failed)
- `500` - Internal Server Error

---

## 🛡️ Security & Middleware

### Authentication Middleware
- **protect**: Requires valid JWT token
- **adminOnly**: Requires admin role (use after protect)

### Validation Middleware
All POST/PUT requests include validation:
- `validateAuth` - User registration/login
- `validateEducation` - Education records
- `validateSkills` - Skills data
- `validateService` - Service records
- `validateWorkExperience` - Work experience
- `validateBulkUpdate` - Bulk operations

### CORS Configuration
```javascript
// Allowed origins in development: All
// Allowed origins in production: Specific domains + *.onrender.com
// Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
// Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin
```

---

## 🔍 API Testing

### Using Swagger UI
1. Navigate to `{BASE_URL}/api-docs`
2. Click "Authorize" button
3. Login using `/api/auth/login` endpoint
4. Token will be automatically set for all protected endpoints
5. Test any endpoint directly in the UI

### Using Postman/Insomnia
1. Login via `/api/auth/login`
2. Copy the JWT token from response
3. Add to headers: `Authorization: Bearer {token}`
4. Make requests to protected endpoints

### Sample Admin Panel Workflow
```javascript
// 1. Login as admin
POST /api/auth/login
{
  "identifier": "admin",
  "password": "admin123"
}

// 2. Get all users
GET /api/auth/users?page=1&limit=10
Authorization: Bearer {token}

// 3. Get pending users
GET /api/auth/users/pending
Authorization: Bearer {token}

// 4. Activate a user
PUT /api/auth/users/{userId}/activate
Authorization: Bearer {token}

// 5. Update portfolio data
POST /api/education
Authorization: Bearer {token}
{
  "institution": "New University",
  "degree": "Master's Degree",
  "duration": "2024-2026",
  "location": "City, Country",
  "gpa": "9.0"
}

// 6. Bulk export all data
GET /api/bulk-update/export
Authorization: Bearer {token}
```

---

## 🎯 Frontend Integration Tips

### React/Next.js Example
```javascript
// API client setup
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Authentication helper
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

// Login function
const login = async (credentials) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  if (data.status === 'success') {
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }
  return data;
};

// Get portfolio data
const getEducation = async () => {
  const response = await fetch(`${API_BASE}/api/education`, {
    headers: getAuthHeaders()
  });
  return response.json();
};

// Create education record
const createEducation = async (educationData) => {
  const response = await fetch(`${API_BASE}/api/education`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(educationData)
  });
  return response.json();
};
```

### State Management (Redux/Zustand)
```javascript
// User store
const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async (credentials) => {
    const result = await login(credentials);
    if (result.status === 'success') {
      set({
        user: result.data.user,
        token: result.data.token,
        isAuthenticated: true
      });
    }
    return result;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
```

---

## 🚀 Recent Updates & New Features

### ⭐ Education Module (NEW)
- Full CRUD operations for education records
- GPA field support (optional)
- Integration with Profile API and Bulk Operations
- Migration support for existing data

### ⭐ Enhanced Contact Form (NEW)
- Contact method preferences (Email/Phone/WhatsApp)
- Enhanced email templates with contact method display
- Backward compatibility maintained

### ⭐ Improved Admin Features
- User activation/deactivation
- Pending users management
- Enhanced user status controls
- Comprehensive user management dashboard support

---

## 📞 Support & Documentation

- **Live API Documentation**: `{BASE_URL}/api-docs`
- **Interactive Testing**: Available in Swagger UI
- **Auto-Authentication**: Login once, test all endpoints
- **Comprehensive Examples**: All endpoints include request/response examples

---

**Happy Coding! 🎉**

*This guide covers all available backend APIs for building a comprehensive admin panel in Next.js. All endpoints are fully documented with examples and include proper authentication, validation, and error handling.*
