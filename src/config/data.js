const personalInfo = {
  // Basic Information
  name: "Rahul Ladumor",
  title: "4x AWS Community Builder (Serverless) | Serverless Expert | LLM | AI ML",
  tagline: "30-70% Cost Reduction Specialist | DevOps & CI/CD Automation | Helping Enterprises Scale with Lambda & Kubernetes",
  location: "Surat, Gujarat, India",
  timezone: "GMT+5:30",
  image: "/assets/images/profile.avif",

  // Contact Information
  email: "contact@acloudwithrahul.in",
  phone: "+91-9586661233",
  website: "https://www.rahulladumor.in",

  // Social Media
  social: {
    linkedin: "https://linkedin.com/in/rahulladumor",
    github: "https://github.com/Rahulladumor",
    twitter: "https://twitter.com/Rahul__ladumor",
  },

  // Metrics
  metrics: [
    { value: "60%", label: "Average Cost Reduction" },
    { value: "200+", label: "Engineers Mentored" },
    { value: "8+", label: "Years Experience" },
    { value: "3+", label: "AWS Certifications" },
  ],

  // Professional Summary
  bio: `<div class="space-y-4">
    <p class="text-gray-800">
      Hey, I'm Rahul, <strong>4x AWS Community Builder</strong>, three-time certified, and the guy start-ups call when "it just needs to <em>WORK (securely)</em> by launch day."
    </p>
    
    <div class="mt-4">
      <p class="font-semibold text-gray-900 mb-3">8 years building micro-service & event-driven stacks:</p>
      <ul class="space-y-2 text-gray-700">
        <li>• Architected a <strong>zero-downtime migration</strong> to AWS Lambda + EventBridge that now processes <span class="font-medium">5M orders/mo &lt;200ms</span>.</li>
        <li>• Hardened fintech APIs with <strong>DevSecOps pipelines</strong> (SCA + DAST) reducing vuln MTTR from <span class="font-medium">14 days → 48 hrs</span>.</li>
        <li>• Rolled out <strong>IAM least-privilege</strong> and KMS envelope encryption across <span class="font-medium">200+ resources</span>—passed audit first try.</li>
        <li>• Prototyped an <strong>Agentic-AI workflow</strong> (Bedrock + LangChain) that auto-triages cloud incidents.</li>
      </ul>
    </div>
    
    <p class="text-gray-800 mt-4">
      Trusted by <strong>Series A-C startups</strong> & <strong>Fortune 500 companies</strong> for mission-critical cloud transformations. Currently pursuing <em>PG Certificate in Agentic AI from IIT Roorkee</em>.
    </p>
  </div>`,

  // Experience
  experience: {
    years: "8+",
    companies: "10+",
    projects: "50+",
  },

  // Core Value Propositions
  valuePropositions: [
    "Cost Optimization Expert: Proven record cutting costs by $100K+ annually through serverless architecture",
    "High Availability Specialist: Achieving 99.99% uptime across multiple production systems",
    "Automation Pioneer: Freeing 100+ engineering hours/month through intelligent automation",
    "Performance Engineer: Reducing deployment times by 70% and latency by 30%",
    "AI Integration Leader: Boosting development velocity by 60% with AI-powered DevOps",
  ],

  // Skills
  skills: {
    primary: [
      "AWS Lambda & Serverless Architecture",
      "Chatbot Development (AWS Lex, Azure Bot Service)",
      "Kubernetes & Container Orchestration",
      "Go (Programming Language)",
      "AI-Powered Cloud Systems Integration",
      "LLM Training & Agentic AI",
      "Technical Leadership & System Architecture",
    ],
    secondary: [
      "API Gateway & Microservices",
      "DynamoDB & Database Design",
      "CI/CD Pipeline Optimization",
      "Cloud Security & Compliance (PCI-DSS, ISO 27001)",
      "Real-time Data Processing (5M orders/mo)",
      "Performance Optimization & Cost Reduction (30-70%)",
      "DevSecOps & Security Automation",
      "Event-Driven Architecture",
    ],
    tools: [
      "AWS (Lambda, EventBridge, ECS/EKS, Bedrock, CDK)",
      "Terraform & CloudFormation (Infrastructure as Code)",
      "Docker & Kubernetes",
      "Node.js, Go, Python, TypeScript",
      "LangChain, AWS Lex, Azure Bot Service",
      "Jest, GitHub Actions, Helm",
      "ElasticSearch, DynamoDB, GraphQL",
    ],
  },

  // Certifications
  certifications: [
    
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-DVA-2023",
      level: "Associate",
      icon: "Award",
    },
    {
      name: "AWS Certified Solutions Architect - Associate",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-ASA-2023",
      level: "Associate",
      icon: "Award",
    },
    {
      name: "Technical Professional",
      issuer: "AWS",
      year: "2024",
      credentialId: "AWS-TP-2024",
      level: "Professional",
      icon: "Award",
    },
    {
      name: "Cutshort Certified Javascript - Basic",
      issuer: "Cutshort",
      year: "2024",
      credentialId: "CS-JS-2024",
      level: "Basic",
      icon: "Award",
    },
    {
      name: "AWS Community Builder (4x)",
      issuer: "Amazon Web Services",
      year: "2022-Present",
      credentialId: "AWS-CB-2022",
      level: "Community",
      icon: "Award",
    },
  ],

  // Achievement Highlights
  achievements: [
    "8+ years architecting high-impact web and cloud-native AI-powered solutions",
    "4x AWS Community Builder (Serverless) - Multi-year recognition",
    "Architected zero-downtime migration processing 5M orders/mo <200ms",
    "Hardened fintech APIs reducing vulnerability MTTR from 14 days → 48 hrs",
    "Distinguished Alumni Recognition - 60th Anniversary Celebration",
    "Implemented IAM least-privilege across 200+ resources—passed audit first try",
    "Prototyped Agentic-AI workflow (Bedrock + LangChain) for auto-incident triage",
    "Currently pursuing PG Certificate in Agentic AI from IIT Roorkee",
  ],

  // Languages
  languages: ["English (Fluent)", "Hindi (Native)", "Gujarati (Native)"],

  // Availability
  availability: {
    status: "open",
    types: ["full-time", "contract", "consulting"],
    remote: true,
    relocation: true,
    preferredRoles: [
      "Senior Cloud Engineer",
      "Solutions Architect",
      "Technical Lead",
      "DevOps Engineer",
    ],
  },

  // Professional Services
  services: [
    {
      name: "AWS Cloud Architecture Review",
      description:
        "Comprehensive assessment of your AWS infrastructure with cost optimization recommendations and security best practices implementation.",
      duration: "2-4 weeks",
      deliverables: [
        "Architecture assessment report",
        "Cost optimization plan",
        "Security recommendations",
        "Migration roadmap",
      ],
    },
    {
      name: "Serverless Application Development",
      description:
        "End-to-end serverless application development using AWS Lambda, API Gateway, and DynamoDB with CI/CD pipeline setup.",
      duration: "4-12 weeks",
      deliverables: [
        "Serverless application",
        "API documentation",
        "Monitoring setup",
        "Deployment pipeline",
      ],
    },
    {
      name: "DevOps Automation & CI/CD",
      description:
        "Implementation of automated deployment pipelines, infrastructure as code, and monitoring solutions to improve development velocity.",
      duration: "3-8 weeks",
      deliverables: [
        "CI/CD pipelines",
        "Infrastructure as code",
        "Monitoring dashboards",
        "Documentation",
      ],
    },
    {
      name: "Cloud Migration Consulting",
      description:
        "Strategic planning and execution of cloud migration projects with minimal downtime and optimized costs.",
      duration: "6-16 weeks",
      deliverables: [
        "Migration strategy",
        "Risk assessment",
        "Implementation plan",
        "Post-migration optimization",
      ],
    },
    {
      name: "Technical Mentorship",
      description:
        "One-on-one mentorship for developers and engineers looking to advance their cloud and DevOps skills.",
      duration: "Ongoing",
      deliverables: [
        "Personalized learning plan",
        "Code reviews",
        "Career guidance",
        "Technical interviews prep",
      ],
    },
  ],

  // Problem Section Data
  problemSection: {
    title: "Are These AWS Challenges Costing You Money?",
    subtitle:
      "Most startups and engineering teams face these critical cloud challenges that drain resources and limit growth potential.",

    costCalculator: {
      title: "Calculate Your Potential AWS Savings",
      subtitle: "See how much you could save with proper optimization",
      defaultSpend: 10000,
      savingsPercentage: 0.4,
      minSpend: 5000,
      maxSpend: 500000,
      step: 5000,
      currency: "₹",
    },

    problems: [
      {
        icon: "TrendingUp",
        title: "Skyrocketing AWS Bills",
        description:
          "Your cloud costs are growing faster than your revenue, eating into profits and making scaling financially unsustainable.",
        impact: "₹2-10L+ monthly overspend",
      },
      {
        icon: "AlertTriangle",
        title: "Complex Architecture Decisions",
        description:
          "Choosing the right AWS services feels overwhelming, leading to over-provisioning and inefficient resource allocation.",
        impact: "40-60% resource waste",
      },
      {
        icon: "Users",
        title: "Team Knowledge Gaps",
        description:
          "Your engineers lack deep AWS expertise, causing security vulnerabilities and performance bottlenecks.",
        impact: "Delayed product launches",
      },
      {
        icon: "Clock",
        title: "Career Stagnation",
        description:
          "Mid-level engineers struggle to advance without hands-on cloud experience and mentorship from industry experts.",
        impact: "Limited growth opportunities",
      },
    ],

    cta: {
      title: "Stop Losing Money on Inefficient AWS Usage",
      subtitle:
        "Get a free architecture review and discover exactly where you're overspending",
      buttonText: "Get Free Cost Analysis",
      buttonIcon: "Calculator",
    },
  },

  // Solution Section Data
  solutionSection: {
    title: "Three Pillars of AWS Success",
    subtitle:
      "Proven methodologies that have helped 100+ startups and engineers achieve measurable results in cloud optimization and career growth.",

    solutions: [
      {
        icon: "Search",
        title: "Architecture Review",
        subtitle: "Comprehensive AWS Infrastructure Audit",
        description:
          "Deep-dive analysis of your current AWS setup to identify cost optimization opportunities, security vulnerabilities, and performance bottlenecks.",
        deliverables: [
          "Complete infrastructure assessment report",
          "Cost optimization recommendations with ROI projections",
          "Security audit and compliance checklist",
          "Performance optimization roadmap",
          "Best practices implementation guide",
        ],
        timeline: "2-3 weeks",
        outcome: "30-50% cost reduction typically achieved",
        color: "blue",
      },
      {
        icon: "DollarSign",
        title: "Cost Optimization",
        subtitle: "Immediate AWS Spend Reduction",
        description:
          "Hands-on implementation of cost-saving strategies including right-sizing, reserved instances, and automated scaling configurations.",
        deliverables: [
          "Resource right-sizing implementation",
          "Reserved instance strategy and purchase",
          "Auto-scaling configuration optimization",
          "Unused resource identification and cleanup",
          "Cost monitoring and alerting setup",
        ],
        timeline: "1-2 weeks",
        outcome: "₹50K-5L+ monthly savings guaranteed",
        color: "green",
      },
      {
        icon: "Users",
        title: "Career Mentorship",
        subtitle: "Accelerate Your AWS Career Growth",
        description:
          "Personalized 1-on-1 mentorship program designed to fast-track your AWS expertise and advance your cloud engineering career.",
        deliverables: [
          "Personalized learning roadmap creation",
          "Weekly 1-on-1 mentorship sessions",
          "Hands-on project guidance and code reviews",
          "Interview preparation and resume optimization",
          "Industry networking and job referrals",
        ],
        timeline: "3-6 months",
        outcome: "40-60% salary increase on average",
        color: "purple",
      },
    ],

    process: {
      title: "How We Work Together",
      steps: [
        {
          step: "1",
          title: "Discovery Call",
          description: "Free 30-min consultation to understand your challenges",
        },
        {
          step: "2",
          title: "Custom Proposal",
          description: "Tailored solution with clear deliverables and timeline",
        },
        {
          step: "3",
          title: "Implementation",
          description: "Hands-on execution with regular progress updates",
        },
        {
          step: "4",
          title: "Results & Support",
          description: "Measurable outcomes with ongoing support included",
        },
      ],
    },
  },

  // Credentials Section Data
  credentialsSection: {
    title: "Proven AWS Expertise & Recognition",
    subtitle:
      "7+ years of hands-on AWS experience backed by industry certifications, community recognition, AI-powered solutions, and measurable client results.",

    achievements: [
      {
        title: "AWS Community Builder",
        description:
          "Official recognition from AWS for community contributions",
        icon: "Users",
        color: "#FF9900",
      },
      {
        title: "Speaking Engagements",
        description: "Featured speaker at tech conferences and AWS meetups",
        icon: "Mic",
        color: "#1B365D",
      },
      {
        title: "Open Source Contributor",
        description: "Active contributor to AWS-related projects",
        icon: "Github",
        color: "#38A169",
      },
      {
        title: "Technical Writer & Content Creator",
        description:
          "Published 50+ articles on AWS, AI integration, and cloud architecture with 100K+ combined views",
        icon: "PenTool",
        color: "#7C3AED",
      },
    ],

    communityMetrics: {
      followers: 6000,
      articleViewsTarget: 100000,
      animationSpeed: {
        followers: 100,
        views: 50,
      },
    },

    cta: {
      title: "Work with a Proven AWS Expert",
      subtitle:
        "Get the same expertise that's helped projects and companies succeed",
      buttonText: "Schedule Your Consultation",
      buttonIcon: "Calendar",
    },
  },

  // Services Section Data
  servicesSection: {
    title: "Choose Your AWS Success Path",
    subtitle:
      "Flexible engagement models designed to meet your specific needs and budget, with guaranteed results and transparent pricing.",

    services: [
      {
        name: "Discovery Consultation",
        subtitle: "Perfect for initial assessment",
        price: { INR: 5000, USD: 60 },
        originalPrice: { INR: 8000, USD: 95 },
        duration: "one-time",
        popular: false,
        features: [
          "30-minute free discovery call",
          "Comprehensive AWS architecture review",
          "Cost optimization quick wins identification",
          "Security assessment checklist",
          "Detailed recommendations report",
          "Follow-up email support for 1 week",
        ],
        deliverables: [
          "Architecture assessment report",
          "Cost optimization roadmap",
          "Security recommendations",
          "Implementation priority matrix",
        ],
        idealFor: "Startups wanting quick wins",
        color: "blue",
        buttonText: "Book Free Call",
      },
      {
        name: "Monthly Mentorship",
        subtitle: "Accelerate your AWS career",
        price: { INR: 8000, USD: 95 },
        originalPrice: { INR: 12000, USD: 145 },
        duration: "monthly",
        popular: true,
        features: [
          "4 weekly 1-on-1 mentorship sessions (1 hour each)",
          "Personalized learning roadmap creation",
          "Hands-on project guidance and code reviews",
          "Resume optimization and interview preparation",
          "Industry networking and job referral support",
          "24/7 Slack/WhatsApp support for quick questions",
          "Monthly progress tracking and goal setting",
        ],
        deliverables: [
          "Custom learning path",
          "Weekly session recordings",
          "Project portfolio development",
          "Interview preparation materials",
        ],
        idealFor: "Engineers seeking career growth",
        color: "purple",
        buttonText: "Start Mentorship",
      },
      {
        name: "Enterprise Consulting",
        subtitle: "Complete AWS transformation",
        price: { INR: 50000, USD: 600 },
        originalPrice: null,
        duration: "project-based",
        popular: false,
        features: [
          "Complete AWS infrastructure audit and redesign",
          "Cost optimization implementation (guaranteed 30%+ savings)",
          "Security hardening and compliance setup",
          "CI/CD pipeline design and implementation",
          "Team training and knowledge transfer sessions",
          "3 months of post-implementation support",
          "Monthly performance and cost review meetings",
        ],
        deliverables: [
          "Complete infrastructure redesign",
          "Automated deployment pipelines",
          "Security compliance documentation",
          "Team training materials",
        ],
        idealFor: "Growing companies & enterprises",
        color: "green",
        buttonText: "Get Custom Quote",
        guarantee: "30%+ cost savings guaranteed",
      },
    ],

    comparison: {
      title: "Detailed Service Comparison",
      features: [
        {
          feature: "Initial Assessment",
          consultation: true,
          mentorship: true,
          enterprise: true,
        },
        {
          feature: "1-on-1 Sessions",
          consultation: "1 session",
          mentorship: "4/month",
          enterprise: "Unlimited",
        },
        {
          feature: "Code Reviews",
          consultation: false,
          mentorship: true,
          enterprise: true,
        },
        {
          feature: "Implementation Support",
          consultation: false,
          mentorship: "Guidance",
          enterprise: "Full",
        },
        {
          feature: "Team Training",
          consultation: false,
          mentorship: false,
          enterprise: true,
        },
        {
          feature: "Ongoing Support",
          consultation: "1 week",
          mentorship: "24/7",
          enterprise: "3 months",
        },
      ],
    },

    guarantee: {
      title: "100% Satisfaction Guarantee",
      description:
        "If you're not completely satisfied with the results within the first 30 days, I'll refund your investment completely. No questions asked.",
    },
  },

  // Testimonials Section Data
  testimonialsSection: {
    title: "Real Results from Real Clients",
    subtitle:
      "Don't just take my word for it. Here's what clients say about the measurable impact of our AWS optimization and mentorship programs.",

    socialProof: {
      title: "Trusted by 100+ Professionals",
      stats: [
        { value: "₹50Cr+", label: "Total Cost Savings" },
        { value: "127", label: "Engineers Mentored" },
        { value: "45%", label: "Average Cost Reduction" },
        { value: "98%", label: "Client Satisfaction" },
      ],
    },

    defaultResults: {
      impact: "60% Cost Reduction",
      timeline: "30 days",
      satisfaction: "Excellent",
    },

    defaultBeforeAfter: {
      before: "High AWS costs, manual processes",
      after: "Optimized architecture, automated workflows",
    },

    testimonials: [
      {
        name: "Sarah Chen",
        position: "CTO",
        company: "TechFlow Solutions",
        testimonial:
          "Rahul's expertise in serverless architecture helped us reduce our infrastructure costs by 60% while improving system reliability. His deep understanding of AWS services and cost optimization strategies is exceptional.",
        image: "/assets/images/testimonial-sarah.jpg",
        linkedin: "https://linkedin.com/in/sarahchen-cto",
      },
      {
        name: "Michael Rodriguez",
        position: "VP Engineering",
        company: "DataCorp Industries",
        testimonial:
          "Working with Rahul on our cloud migration project was outstanding. He delivered a comprehensive solution that not only met our technical requirements but also provided significant cost savings. His attention to detail and proactive communication made the entire process smooth.",
        image: "/assets/images/testimonial-michael.jpg",
        linkedin: "https://linkedin.com/in/michael-rodriguez-vp",
      },
      {
        name: "Priya Sharma",
        position: "Senior DevOps Engineer",
        company: "CloudTech Innovations",
        testimonial:
          "Rahul is one of the most skilled cloud engineers I've worked with. His ability to design scalable, cost-effective solutions while maintaining high performance standards is remarkable. He's also an excellent mentor who helped our team level up their AWS skills.",
        image: "/assets/images/testimonial-priya.jpg",
        linkedin: "https://linkedin.com/in/priya-sharma-devops",
      },
      {
        name: "James Wilson",
        position: "Founder & CEO",
        company: "StartupHub Technologies",
        testimonial:
          "Rahul played a crucial role in scaling our platform from startup to enterprise level. His serverless solutions and automation expertise helped us handle 10x traffic growth without proportional infrastructure costs. Highly recommended for any cloud transformation project.",
        image: "/assets/images/testimonial-james.jpg",
        linkedin: "https://linkedin.com/in/james-wilson-ceo",
      },
    ],
  },

  // Case Studies Section Data
  caseStudiesSection: {
    title: "Success Stories with Measurable Impact",
    subtitle:
      "Deep-dive into real client transformations with detailed metrics, timelines, and quantified business outcomes.",

    caseStudies: [
      {
        id: 1,
        title: "E-commerce Platform Cost Optimization",
        company: "ShopEasy India",
        industry: "E-commerce",
        challenge: "Rapidly growing AWS costs eating into profit margins",
        image:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        timeline: "6 weeks",
        teamSize: "15 engineers",
        metrics: {
          costReduction: "52%",
          monthlySaving: "₹4.2L",
          performanceGain: "35%",
          uptimeImprovement: "99.9%",
        },
        beforeStats: {
          monthlySpend: "₹8.1L",
          avgResponseTime: "2.3s",
          uptime: "97.2%",
          scalingIssues: "Manual scaling",
        },
        afterStats: {
          monthlySpend: "₹3.9L",
          avgResponseTime: "1.5s",
          uptime: "99.9%",
          scalingIssues: "Auto-scaling",
        },
        solution:
          "Implemented comprehensive AWS cost optimization strategy including right-sizing EC2 instances, migrating to Spot instances for non-critical workloads, setting up auto-scaling groups, and optimizing RDS configurations. Introduced CloudWatch monitoring and cost alerts to prevent future overspend.",
        results: [
          "Reduced monthly AWS costs from ₹8.1L to ₹3.9L (52% reduction)",
          "Improved average response time by 35% through performance optimization",
          "Achieved 99.9% uptime with automated failover mechanisms",
          "Implemented auto-scaling to handle traffic spikes efficiently",
          "Set up comprehensive monitoring and alerting system",
        ],
        technologies: [
          "EC2",
          "RDS",
          "CloudWatch",
          "Auto Scaling",
          "Load Balancer",
        ],
        clientQuote:
          "Rahul's optimization saved us over ₹50L annually while making our platform more reliable and faster. The ROI was immediate and substantial.",
      },
      {
        id: 2,
        title: "FinTech Security & Compliance Overhaul",
        company: "SecureFinance Pro",
        industry: "Financial Technology",
        challenge:
          "Meeting regulatory compliance while maintaining performance",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        timeline: "8 weeks",
        teamSize: "12 engineers",
        metrics: {
          securityScore: "95%",
          complianceAchieved: "100%",
          performanceGain: "28%",
          costOptimization: "31%",
        },
        beforeStats: {
          securityScore: "62%",
          compliance: "Partial",
          auditTime: "3 weeks",
          incidents: "5/month",
        },
        afterStats: {
          securityScore: "95%",
          compliance: "Full SOC2",
          auditTime: "3 days",
          incidents: "0/month",
        },
        solution:
          "Designed and implemented comprehensive security architecture including VPC isolation, WAF configuration, encryption at rest and in transit, IAM role optimization, and automated compliance monitoring. Set up centralized logging and real-time threat detection.",
        results: [
          "Achieved 100% SOC2 compliance certification",
          "Improved security score from 62% to 95%",
          "Reduced security incidents to zero",
          "Automated compliance reporting and monitoring",
          "Optimized costs by 31% through efficient resource allocation",
        ],
        technologies: ["VPC", "WAF", "IAM", "CloudTrail", "GuardDuty", "KMS"],
        clientQuote:
          "The security transformation was flawless. We passed our SOC2 audit with flying colors and our customers trust us more than ever.",
      },
      {
        id: 3,
        title: "Startup Serverless Migration",
        company: "InnovateTech Solutions",
        industry: "SaaS Platform",
        challenge: "Scaling efficiently with limited engineering resources",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        timeline: "4 weeks",
        teamSize: "8 engineers",
        metrics: {
          costReduction: "67%",
          scalability: "10x capacity",
          deploymentSpeed: "90% faster",
          maintenance: "80% less",
        },
        beforeStats: {
          monthlySpend: "₹3.2L",
          deploymentTime: "2 hours",
          scaling: "Manual",
          maintenance: "40 hrs/week",
        },
        afterStats: {
          monthlySpend: "₹1.1L",
          deploymentTime: "12 minutes",
          scaling: "Automatic",
          maintenance: "8 hrs/week",
        },
        solution:
          "Migrated monolithic application to serverless architecture using Lambda, API Gateway, and DynamoDB. Implemented CI/CD pipeline with automated testing and deployment. Set up monitoring and logging for complete observability.",
        results: [
          "Reduced infrastructure costs by 67% through serverless adoption",
          "Achieved 10x scaling capacity with zero manual intervention",
          "Improved deployment speed by 90% with automated CI/CD",
          "Reduced maintenance overhead by 80%",
          "Enhanced application reliability and performance",
        ],
        technologies: [
          "Lambda",
          "API Gateway",
          "DynamoDB",
          "CloudFormation",
          "CodePipeline",
        ],
        clientQuote:
          "The serverless migration transformed our business. We can now focus on features instead of infrastructure management.",
      },
    ],

    cta: {
      title: "Ready for Similar Results?",
      subtitle:
        "Every client's situation is unique, but the methodology for success remains consistent. Let's discuss how we can achieve similar outcomes for your organization.",
      primaryButton: {
        text: "Schedule Strategy Call",
        icon: "Calendar",
      },
      secondaryButton: {
        text: "View More Success Stories",
        icon: "Users",
      },
    },
  },

  // About Section Configuration
  aboutSection: {
    title: "Meet Your AWS Success Partner",
    subtitle:
      "Learn about the experience, methodology, and values that drive consistent results for clients across industries.",

    tabs: [
      { id: "journey", label: "My Journey", icon: "MapPin" },
      { id: "expertise", label: "Expertise", icon: "Award" },
      { id: "approach", label: "My Approach", icon: "Target" },
      { id: "values", label: "Values", icon: "Heart" },
    ],

    expertiseAreas: [
      {
        category: "Cloud Architecture",
        level: 95,
        color: "#1B365D",
        skills: ["AWS Lambda", "EC2", "S3", "CloudFormation"],
      },
      {
        category: "Cost Optimization",
        level: 98,
        color: "#38A169",
        skills: [
          "Right-sizing",
          "Reserved Instances",
          "Spot Instances",
          "Resource Tagging",
        ],
      },
      {
        category: "Security & Compliance",
        level: 92,
        color: "#E53E3E",
        skills: ["IAM Policies", "VPC Design", "Encryption", "SOC2 Compliance"],
      },
      {
        category: "DevOps & Automation",
        level: 90,
        color: "#7C3AED",
        skills: [
          "CI/CD Pipelines",
          "Infrastructure as Code",
          "Monitoring",
          "Auto-scaling",
        ],
      },
    ],

    approachSteps: [
      {
        step: "1",
        title: "Deep Discovery",
        description:
          "I start by understanding your unique challenges, current architecture, and business goals through detailed assessment.",
        icon: "Search",
      },
      {
        step: "2",
        title: "Strategic Planning",
        description:
          "Create a customized roadmap with clear priorities, timelines, and expected outcomes based on your specific needs.",
        icon: "Map",
      },
      {
        step: "3",
        title: "Hands-on Implementation",
        description:
          "Work alongside your team to implement solutions, ensuring knowledge transfer and sustainable practices.",
        icon: "Tool",
      },
      {
        step: "4",
        title: "Continuous Optimization",
        description:
          "Monitor results, fine-tune performance, and provide ongoing support to maximize long-term value.",
        icon: "TrendingUp",
      },
    ],

    coreValues: [
      {
        title: "Transparency",
        description:
          "Clear communication about what's possible, realistic timelines, and honest assessments of your current state.",
        icon: "Eye",
        color: "#1B365D",
      },
      {
        title: "Results-Driven",
        description:
          "Every recommendation comes with measurable outcomes and clear ROI projections based on real-world experience.",
        icon: "Target",
        color: "#38A169",
      },
      {
        title: "Knowledge Sharing",
        description:
          "I believe in empowering your team with knowledge, not creating dependency. You'll learn while we work together.",
        icon: "BookOpen",
        color: "#FF9900",
      },
      {
        title: "Long-term Partnership",
        description:
          "Building lasting relationships focused on your continued success, not just completing projects.",
        icon: "Handshake",
        color: "#7C3AED",
      },
    ],

    cta: {
      title: "Ready to Transform Your AWS Journey?",
      subtitle:
        "Let's discuss how my experience and methodology can help you achieve your cloud goals.",
      buttonText: "Schedule Your Free Consultation",
      buttonIcon: "Calendar",
    },
  },

  // Professional Work Experience
  workExperience: [
    {
      company: "ASTM International",
      position: "Senior AWS Solution Architect",
      duration: "Sep 2025 - Present",
      location: "Pennsylvania, United States",
      description:
        "Leading AWS solution architecture for international standards organization, focusing on cloud-native transformations and enterprise-grade infrastructure.",
      technologies: [
        "AWS",
        "Solutions Architecture",
        "Cloud Migration",
        "Enterprise Systems",
      ],
      achievements: [
        "Architecting enterprise-grade AWS solutions for global standards organization",
        "Leading cloud transformation initiatives for mission-critical systems",
      ],
    },
    {
      company: "Turing",
      position: "LLM Trainer - DevOps | Amazon IAC RLHF Project",
      duration: "Jul 2025 - Present",
      location: "Remote",
      description:
        "Design, implement, and manage scalable, secure AWS environments using AWS CDK with TypeScript. Translate complex requirements into reusable, testable CDK constructs.",
      technologies: [
        "AWS CDK",
        "TypeScript",
        "CloudFormation",
        "Jest",
        "CI/CD",
        "Infrastructure as Code",
      ],
      achievements: [
        "Designed and deployed AWS infrastructure-as-code solutions with AWS CDK + TypeScript",
        "Migrated legacy/on-prem systems to AWS with secure VPCs and networking",
        "Developed reusable TypeScript constructs with interfaces, classes, and generics",
        "Automated deployments using CDK CLI and integrated with CI/CD pipelines",
        "Wrote and maintained Jest unit tests ensuring code quality and reliability",
      ],
    },
    {
      company: "Freelance | Self-Employed",
      position: "Cloud Consultant",
      duration: "Mar 2025 - Present",
      location: "Surat, Gujarat, India",
      description:
        "AWS Certified Full-Stack JavaScript & Cloud Engineer providing independent consulting for contract engagements and freelance projects. Specialized in serverless architecture and cloud optimization.",
      technologies: [
        "AWS Lambda",
        "Serverless Framework",
        "Node.js",
        "React",
        "DevOps",
        "Infrastructure as Code",
      ],
      achievements: [
        "Cut client costs by $100K+ annually through serverless architecture",
        "Achieved 99.99% uptime across multiple client systems",
        "Freed 100+ engineering hours per month through automation",
        "Delivered cloud architecture and full-stack solutions globally",
      ],
    },
    {
      company: "Topmate.io",
      position: "Cloud Coach & Consultant (1:1 AWS | DevOps | Career)",
      duration: "Nov 2024 - Present",
      location: "Surat, Gujarat, India",
      description:
        "Verified cloud mentor delivering personalized 1:1 coaching across AWS Architecture, Cost Optimization, Certification Roadmapping, and Career Guidance.",
      technologies: [
        "AWS Architecture",
        "Cost Optimization",
        "Serverless",
        "Lambda/API/IAM/Terraform",
        "Career Mentoring",
      ],
      achievements: [
        "Helped startups save ₹50L+ annually through AWS cost optimization",
        "Guided professionals to ace AWS exams with custom strategies",
        "Resolved real-world serverless debugging issues live",
        "Provided cloud career guidance to professionals across India, US, and SEA",
      ],
    },
    {
      company: "NTT",
      position: "Senior Software Engineer - Contract",
      duration: "Jan 2025 - Mar 2025",
      location: "Tokyo, Japan",
      description:
        "Contract engagement focusing on enterprise-grade software solutions and cloud infrastructure development.",
      technologies: [
        "AWS",
        "Node.js",
        "Enterprise Systems",
        "Cloud Infrastructure",
      ],
      achievements: [
        "Delivered enterprise-grade software solutions",
        "Implemented scalable cloud infrastructure architectures",
      ],
    },
    {
      company: "ProdigyBuild",
      position: "Lead Engineer",
      duration: "Jul 2023 - Mar 2025",
      location: "San Francisco Bay Area",
      description:
        "Designed AWS serverless platforms with AI integration for enhanced development velocity and cost optimization.",
      technologies: [
        "AWS Serverless",
        "Terraform",
        "GitOps",
        "AI Agents",
        "IaC",
      ],
      achievements: [
        "Designed AWS serverless platform with 99.99% uptime & 40% cost savings",
        "Integrated AI agents for code review, boosting dev velocity by 60%",
        "Built Terraform IaC & GitOps pipelines, reducing release times by 70%",
      ],
    },
    {
      company: "ProtectOnce",
      position: "SDE-II",
      duration: "May 2022 - Aug 2024",
      location: "San Francisco Bay Area",
      description:
        "Developed serverless security solutions protecting large user bases with focus on automation and incident reduction.",
      technologies: [
        "Node.js",
        "AWS Serverless",
        "Security Automation",
        "Vulnerability Scanning",
      ],
      achievements: [
        "Developed serverless security solution in Node.js protecting 100K+ users",
        "Maintained <1% false-positive rate",
        "Automated vulnerability scanning & patching, reducing incidents by 80%",
      ],
    },
    {
      company: "NDS Global",
      position: "Senior Software Developer",
      duration: "Aug 2021 - May 2022",
      location: "India",
      description:
        "Architected enterprise chatbots and integrated AI solutions with high accuracy rates and significant operational improvements.",
      technologies: [
        "AWS Lex",
        "Azure Bot Service",
        "CRM Integration",
        "AI/ML",
      ],
      achievements: [
        "Architected enterprise chatbots using AWS Lex & Azure Bot Service",
        "Achieved 95%+ intent recognition accuracy",
        "Integrated chatbots into CRM, reducing support workload by 50%",
      ],
    },
    {
      company: "AppGambit",
      position: "Full-Stack Cloud Developer",
      duration: "Jan 2020 - Jul 2021",
      location: "Surat, India",
      description:
        "Built high-volume real-time systems and communication solutions handling massive daily traffic.",
      technologies: ["Node.js", "AWS", "Real-time Systems", "IVR Solutions"],
      achievements: [
        "Built real-time audit logging system processing 1M+ events/day",
        "Developed IVR solution handling 100K+ calls/month",
      ],
    },
    {
      company: "Bynebits",
      position: "Software Developer",
      duration: "Dec 2017 - Jul 2019",
      location: "Indore, India",
      description:
        "Developed investment analytics platforms with focus on performance optimization and sub-second query capabilities.",
      technologies: [
        "Node.js",
        "AWS",
        "Analytics Platform",
        "Performance Optimization",
      ],
      achievements: [
        "Developed RenagatePartner investment analytics platform on Node.js & AWS",
        "Optimized pipelines for sub-second query performance",
      ],
    },
    {
      company: "Creative Infotech",
      position: "Full-Stack Developer",
      duration: "Apr 2016 - Sep 2017",
      location: "Surat, India",
      description:
        "Built e-commerce applications with real-time features and performance optimization through caching strategies.",
      technologies: [
        "PHP",
        "CodeIgniter",
        "E-commerce",
        "Performance Optimization",
      ],
      achievements: [
        "Built PHP/CodeIgniter e-commerce app with real-time cart management",
        "Optimized performance with caching & indexing",
      ],
    },
  ],

  // Volunteering
  volunteering: [
    {
      organization: "AWS User Group Surat",
      role: "Serverless Mentor & Event Organizer",
      description:
        "Mentoring developers on serverless technologies and organizing community events",
    },
    {
      organization: "Topmate.io",
      role: "Startup Mentor",
      description:
        "1:1 Coaching on Cloud & DevOps for startups and individual developers",
    },
  ],

  // Featured Projects
  featuredProjects: [
    {
      name: "Crypto Trading Aggregator Platform",
      role: "Lead Architect",
      description:
        "Built comprehensive trading platform with real-time data processing",
    },
    {
      name: "AI-Powered DevOps Automation (ProdigyBuild)",
      role: "Lead Engineer",
      description:
        "Built analytics dashboard for SaaS app, improving data visualization",
    },
    {
      name: "Real-Time Audit Logging System (AppGambit)",
      role: "Senior Engineer",
      description:
        "High-volume event processing system handling 1M+ events daily",
    },
    {
      name: "Investment Analytics Dashboard (Bynebits)",
      role: "Developer",
      description:
        "Performance-optimized analytics platform with sub-second queries",
    },
    {
      name: "Serverless Cost Analyzer CLI",
      role: "Creator",
      description: "Node.js CLI parsing AWS cost reports, reduced spend by 15%",
    },
    {
      name: "Kubernetes Log Aggregator",
      role: "Developer",
      description:
        "WebSocket + React dashboard for cluster logs, 3× faster anomaly detection",
    },
    {
      name: "Multi-Cloud Disaster Recovery Orchestrator",
      role: "Architect",
      description:
        "Python script syncing AWS → GCP backups, achieved RTO < 2 hours during DR drills",
    },
  ],

  // Educational Background
  education: [
    {
      institution: "Indian Institute of Technology, Roorkee",
      degree: "PG Certificate in Agentic AI, GenAI & Machine Learning",
      duration: "May 2025 - February 2026",
      gpa: "In Progress",
      location: "Roorkee, India",
    },
    {
      institution: "Veer Narmad South Gujarat University",
      degree: "Master of Science - MS, Information Technology",
      duration: "2018 - 2020",
      gpa: "8.7",
      location: "Surat, Gujarat, India",
    },
    {
      institution: "Veer Narmad South Gujarat University",
      degree: "Bachelor of Science - BS, Information Technology",
      duration: "2016 - 2018",
      gpa: "7.4",
      location: "Surat, Gujarat, India",
    },
  ],

  // Featured Projects Portfolio
  projects: [
    {
      name: "Real-Time Crypto Trading Aggregator",
      description:
        "Serverless cryptocurrency trading platform aggregating data from 15+ exchanges with real-time price alerts and automated trading strategies. Handles 100K+ API calls monthly with sub-100ms latency.",
      technologies: [
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "WebSocket API",
        "Node.js",
        "React",
        "Redis",
      ],
      github: "https://github.com/rahulladumor/crypto-aggregator",
      demo: "https://crypto-aggregator.rahulladumor.in",
      image: "/assets/images/crypto-aggregator.jpg",
      highlights: [
        "99.9% uptime with auto-scaling architecture",
        "Real-time data processing from 15+ exchanges",
        "25% improvement in trading decision speed",
        "Cost-optimized serverless infrastructure",
      ],
    },
    {
      name: "Enterprise Security Audit System",
      description:
        "Comprehensive security monitoring and audit logging system for enterprise applications. Automated vulnerability scanning with intelligent threat detection and compliance reporting.",
      technologies: [
        "AWS ECS",
        "Elasticsearch",
        "Kibana",
        "Python",
        "Docker",
        "Terraform",
      ],
      github: "https://github.com/rahulladumor/security-audit-system",
      demo: "https://security-demo.rahulladumor.in",
      image: "/assets/images/security-audit.jpg",
      highlights: [
        "500K+ security events processed daily",
        "85% reduction in false positives",
        "Automated compliance reporting",
        "Real-time threat detection and alerts",
      ],
    },
    {
      name: "Serverless E-commerce Platform",
      description:
        "Fully serverless e-commerce solution with microservices architecture, supporting multi-tenant operations, payment processing, and inventory management.",
      technologies: [
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "S3",
        "CloudFront",
        "Stripe API",
      ],
      github: "https://github.com/rahulladumor/serverless-ecommerce",
      demo: "https://ecommerce-demo.rahulladumor.in",
      image: "/assets/images/serverless-ecommerce.jpg",
      highlights: [
        "70% cost reduction vs traditional hosting",
        "Auto-scaling to handle traffic spikes",
        "Multi-region deployment for global reach",
        "PCI DSS compliant payment processing",
      ],
    },
    {
      name: "DevOps Automation Pipeline",
      description:
        "Complete CI/CD automation solution with infrastructure as code, automated testing, security scanning, and deployment orchestration across multiple environments.",
      technologies: [
        "Jenkins",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Ansible",
        "SonarQube",
      ],
      github: "https://github.com/rahulladumor/devops-pipeline",
      demo: "https://devops-demo.rahulladumor.in",
      image: "/assets/images/devops-pipeline.jpg",
      highlights: [
        "Deployment time reduced from 4 hours to 15 minutes",
        "Zero-downtime deployments achieved",
        "Automated security and quality gates",
        "Multi-environment deployment orchestration",
      ],
    },
    {
      name: "AI-Powered Chatbot Platform",
      description:
        "Intelligent chatbot platform with natural language processing, multi-channel support, and analytics dashboard. Integrates with popular messaging platforms and CRM systems.",
      technologies: [
        "AWS Lex",
        "Lambda",
        "API Gateway",
        "React",
        "Node.js",
        "MongoDB",
      ],
      github: "https://github.com/rahulladumor/ai-chatbot-platform",
      demo: "https://chatbot-demo.rahulladumor.in",
      image: "/assets/images/ai-chatbot.jpg",
      highlights: [
        "90% query resolution accuracy",
        "Multi-language support (5+ languages)",
        "Integration with 10+ messaging platforms",
        "Real-time analytics and insights",
      ],
    },
    {
      name: "Cloud Migration Toolkit",
      description:
        "Comprehensive toolkit for automated cloud migration assessment, planning, and execution. Includes cost calculators, dependency mapping, and migration orchestration tools.",
      technologies: [
        "Python",
        "AWS CLI",
        "Terraform",
        "Docker",
        "React",
        "PostgreSQL",
      ],
      github: "https://github.com/rahulladumor/cloud-migration-toolkit",
      demo: "https://migration-toolkit.rahulladumor.in",
      image: "/assets/images/migration-toolkit.jpg",
      highlights: [
        "Automated dependency discovery",
        "Cost optimization recommendations",
        "Risk assessment and mitigation",
        "Step-by-step migration guidance",
      ],
    },
  ],

  // Additional Professional Information
  additionalInfo: {
    // Speaking Engagements
    speakingEngagements: [
      {
        event: "AWS User Group Surat",
        topic: "Serverless Cost Optimization Strategies",
        date: "2023",
        audience: "150+ developers and architects",
      },
      {
        event: "DevOps India Conference",
        topic: "Building Resilient Cloud Infrastructure",
        date: "2023",
        audience: "300+ DevOps professionals",
      },
      {
        event: "Cloud Computing Summit",
        topic: "Microservices to Serverless Migration",
        date: "2022",
        audience: "200+ cloud engineers",
      },
    ],

    // Publications & Articles
    publications: [
      {
        title: "AWS in 2025: Latest Updates and Best Practices for Developers",
        platform: "Dev.to",
        date: "2025",
        url: "https://dev.to/rahulladumor/aws-in-2025-latest-updates-and-best-practices-for-developers-56ah",
        views: "5K+",
      },
      {
        title: "DeepSeek R1 AI: Game-Changer or Regionally Limited? 2025 Analysis",
        platform: "Dev.to",
        date: "2025",
        url: "https://dev.to/rahulladumor/deepseek-r1-a-game-changer-or-a-regionally-constrained-ai-3iaj",
        views: "3K+",
      },
      {
        title: "Mastering AWS Lambda Performance: Advanced Optimization Strategies for 2025",
        platform: "Dev.to",
        date: "2025",
        url: "https://dev.to/rahulladumor/mastering-aws-lambda-performance-advanced-optimization-strategies-for-2025-3bfe",
        views: "8K+",
      },
      {
        title: "Working with Amazon OpenSearch Service Direct Queries with Amazon S3",
        platform: "Dev.to",
        date: "2024",
        url: "https://dev.to/rahulladumor/working-with-amazon-opensearch-service-direct-queries-with-amazon-s3-the-first-ever-detailed-guide-4m2a",
        views: "25K+",
      },
      {
        title: "Serverless Cost Optimization Nightmares: A 2025 Survival Guide",
        platform: "Dev.to",
        date: "2025",
        url: "https://dev.to/rahulladumor/serverless-horror-stories-real-world-nightmares-and-how-to-avoid-them-5eoi",
        views: "12K+",
      },
      {
        title: "Understanding Passkeys: The Behind-the-Scenes Magic",
        platform: "Dev.to",
        date: "2025",
        url: "https://dev.to/rahulladumor/understanding-passkeys-the-behind-the-scenes-magic-of-passwordless-authentication-7i",
        views: "6K+",
      },
      {
        title: "10 Trending Node.js Libraries and Frameworks to Boost Your Web Development",
        platform: "Dev.to",
        date: "2024",
        url: "https://dev.to/rahulladumor/10-trending-nodejs-libraries-and-frameworks-to-boost-your-web-development-3aa5",
        views: "15K+",
      },
      {
        title: "A Deep Dive into .then() Method in JavaScript: How to Use it Like a Pro",
        platform: "Dev.to",
        date: "2024",
        url: "https://dev.to/thetechguruworld/the-power-of-then-in-javascript-8ma",
        views: "12K+",
      },
      {
        title: "Understanding Netflix's Backend Architecture: A Deep Dive",
        platform: "Dev.to",
        date: "2023",
        url: "https://dev.to/rahulladumor/understanding-netflixs-backend-architecture-a-deep-dive-1f2c",
        views: "20K+",
      },
    ],

    // Community Involvement
    communityInvolvement: [
      {
        organization: "AWS Community Builder",
        role: "Community Builder",
        duration: "2022 - Present",
        activities: [
          "Technical content creation",
          "Community mentoring",
          "Event speaking",
        ],
      },
      {
        organization: "Topmate.io",
        role: "Technical Mentor",
        duration: "2021 - Present",
        activities: [
          "1-on-1 mentoring sessions",
          "Career guidance",
          "Technical interview preparation",
        ],
      },
      {
        organization: "Open Source Contributor",
        role: "Contributor",
        duration: "2019 - Present",
        activities: [
          "AWS tools development",
          "Documentation improvements",
          "Bug fixes and features",
        ],
      },
    ],

    // Awards & Recognition
    awards: [
      {
        title: "Distinguished Alumni Recognition - 60th Anniversary",
        issuer: "Veer Narmad South Gujarat University",
        year: "2024",
        description:
          "Recognized for outstanding professional achievements and contributions",
      },
      {
        title: "Best Technical Innovation",
        issuer: "TechCorp Solutions",
        year: "2023",
        description:
          "For developing cost-saving serverless architecture solutions",
      },
      {
        title: "Excellence in Cloud Engineering",
        issuer: "CloudTech Innovations",
        year: "2022",
        description:
          "For exceptional performance in cloud infrastructure projects",
      },
    ],
    subjectOptions: [
        {
            value: "aws-consulting",
            label: "AWS Consulting Services"
        },
        {
            value: "cost-optimization",
            label: "AWS Cost Optimization Inquiry"
        },
        {
            value: "mentorship",
            label: "Career Mentorship Interest"
        },
        {
            value: "enterprise-consulting",
            label: "Enterprise Consulting"
        },
        {
            value: "speaking-engagement",
            label: "Speaking Engagement"
        },
        {
            value: "partnership",
            label: "Partnership Opportunity"
        },
        {
            value: "other",
            label: "Other"
        }
    ]
  },
};

module.exports = {
  // Personal Information (extract from the main object)
  personalInfo: {
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    location: personalInfo.location,
    timezone: personalInfo.timezone,
    image: personalInfo.image,
    email: personalInfo.email,
    phone: personalInfo.phone,
    website: personalInfo.website,
    social: personalInfo.social,
    metrics: personalInfo.metrics,
    bio: personalInfo.bio,
    experience: personalInfo.experience,
    valuePropositions: personalInfo.valuePropositions,
    languages: personalInfo.languages,
    availability: personalInfo.availability,
    achievements: personalInfo.achievements,
  },
  
  // Skills
  skills: personalInfo.skills,
  
  // Certifications
  certifications: personalInfo.certifications,
  
  // Education
  education: personalInfo.education,
  
  // Services
  services: personalInfo.services,
  
  // Work Experience
  workExperience: personalInfo.workExperience,
  
  // Testimonials
  testimonials: personalInfo.testimonials,
  
  // Case Studies
  caseStudies: personalInfo.caseStudies,
  
  // Section Data
  problemSection: personalInfo.problemSection,
  solutionSection: personalInfo.solutionSection,
  credentialsSection: personalInfo.credentialsSection,
  servicesSection: personalInfo.servicesSection,
  testimonialsSection: personalInfo.testimonialsSection,
  caseStudiesSection: personalInfo.caseStudiesSection,
  aboutSection: personalInfo.aboutSection,
  
  // Additional Information
  additionalInfo: personalInfo.additionalInfo,
};
