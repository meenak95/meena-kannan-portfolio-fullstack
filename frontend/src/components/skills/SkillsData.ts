export const skillsData = [
  {
    id: 1,
    name: "Java",
    category: "programming",
    proficiency: 95,
    years_experience: 9,
    description: "Core Java, Java 21, J2EE - Primary programming language for enterprise applications"
  },
  {
    id: 2,
    name: "Spring Boot",
    category: "backend",
    proficiency: 92,
    years_experience: 7,
    description: "Microservices architecture, REST APIs, Spring Security, Spring Data JPA"
  },
  {
    id: 3,
    name: "Angular",
    category: "frontend",
    proficiency: 88,
    years_experience: 5,
    description: "Angular 18, RxJS, NgRx state management, TypeScript"
  },
  {
    id: 4,
    name: "AWS",
    category: "cloud",
    proficiency: 85,
    years_experience: 4,
    description: "EC2, S3, RDS, Lambda, ECS, IAM - Cloud-native application deployment"
  },
  {
    id: 5,
    name: "PostgreSQL",
    category: "database",
    proficiency: 90,
    years_experience: 6,
    description: "Database design, optimization, complex queries, data modeling"
  },
  {
    id: 6,
    name: "Docker",
    category: "devops",
    proficiency: 87,
    years_experience: 5,
    description: "Containerization, Docker Compose, multi-stage builds"
  },
  {
    id: 7,
    name: "Kubernetes",
    category: "devops",
    proficiency: 82,
    years_experience: 3,
    description: "Container orchestration, Helm charts, service mesh with Istio"
  },
  {
    id: 8,
    name: "Apache Kafka",
    category: "backend",
    proficiency: 85,
    years_experience: 4,
    description: "Event streaming, Kafka Streams, message queuing for microservices"
  },
  {
    id: 9,
    name: "React",
    category: "frontend",
    proficiency: 80,
    years_experience: 3,
    description: "Component-based architecture, Hooks, Context API, Next.js"
  },
  {
    id: 10,
    name: "Jenkins",
    category: "devops",
    proficiency: 85,
    years_experience: 5,
    description: "CI/CD pipelines, automated testing, deployment orchestration"
  },
  {
    id: 11,
    name: "MongoDB",
    category: "database",
    proficiency: 75,
    years_experience: 3,
    description: "NoSQL database design, aggregation pipelines, document modeling"
  },
  {
    id: 12,
    name: "JUnit",
    category: "testing",
    proficiency: 90,
    years_experience: 7,
    description: "Unit testing, test-driven development, Mockito for mocking"
  },
  {
    id: 13,
    name: "Python",
    category: "programming",
    proficiency: 70,
    years_experience: 2,
    description: "Data processing, automation scripts, API development"
  },
  {
    id: 14,
    name: "Terraform",
    category: "devops",
    proficiency: 75,
    years_experience: 2,
    description: "Infrastructure as Code, cloud resource provisioning"
  },
  {
    id: 15,
    name: "Redis",
    category: "database",
    proficiency: 80,
    years_experience: 4,
    description: "Caching strategies, session management, pub/sub messaging"
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Vehicle-Related Licensing System 2.0 (VRLS)",
    company: "NCS, Singapore",
    role: "Lead Software Engineer",
    duration: "Dec 2021 - Present",
    category: "government",
    description: "The modernized VRLS 2.0 is built using microservices architecture with Spring Boot and Angular, deployed on AWS Government Cloud with high availability, security, and scalability to support nationwide digital services for Singapore's Land Transport Authority.",
    technologies: ["Spring Boot", "Angular 13", "AWS ECS", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Prometheus", "Grafana"],
    highlights: [
      "Led modernization of critical government system serving entire Singapore population",
      "Architected microservices solution reducing system downtime by 99.9%",
      "Implemented event-driven architecture with Kafka for real-time processing",
      "Mentored team of 8 developers on cloud-native development practices",
      "Achieved SOC2 compliance and enhanced security protocols"
    ]
  },
  {
    id: 2,
    title: "Promo Power Solution",
    company: "BlackStraw.AI",
    role: "Senior Software Engineer",
    duration: "May 2021 - Nov 2021",
    category: "ai",
    description: "The automated Promo Power solution helps retailers streamline store-level execution by eliminating manual processes, improving efficiency, and forecasting sales. It supports CPG companies in maximizing the impact of trade promotions.",
    technologies: ["Java", "Spring Boot", "Groovy", "Kafka", "AWS Lambda", "PostgreSQL", "REST APIs", "Jenkins", "SonarQube"],
    highlights: [
      "Developed AI-powered promotion optimization algorithms",
      "Implemented serverless architecture reducing infrastructure costs by 40%",
      "Built real-time analytics dashboard for retail performance tracking",
      "Integrated machine learning models for demand forecasting"
    ]
  },
  {
    id: 3,
    title: "Housing Development Board Resale Portal",
    company: "HDB (via AllTech Systems)",
    role: "Software Engineer",
    duration: "Aug 2019 - Dec 2020",
    category: "real-estate",
    description: "The Resale One Stop Portal simplifies the resale process for flat buyers and sellers through a guided, step-by-step journey. The system includes eligibility checks, fee computation, and multi-level approval workflows.",
    technologies: ["Java", "JSF", "PrimeFaces", "Oracle DB", "WebLogic", "SOAP Web Services", "SVN"],
    highlights: [
      "Streamlined property transaction process for 50,000+ annual transactions",
      "Implemented complex business logic for eligibility validation",
      "Reduced processing time from weeks to days through automation",
      "Developed comprehensive approval workflow system"
    ]
  },
  {
    id: 4,
    title: "Legal View Bill Analyzer",
    company: "Wolters Kluwer",
    role: "Software Engineer",
    duration: "Jul 2018 - Jul 2019",
    category: "ai",
    description: "Developed a Spring Boot microservice for an end-to-end bill review system that combines AI models and legal expert input to analyze data and provide smart insights to legal professionals.",
    technologies: ["Spring Boot", "MongoDB", "REST APIs", "AI/ML Models", "Jenkins", "Git", "SonarQube"],
    highlights: [
      "Integrated AI engines for automated legal document analysis",
      "Built microservices architecture for scalable legal tech platform",
      "Implemented smart insights generation reducing manual review time by 60%",
      "Developed REST APIs serving 10,000+ daily requests"
    ]
  },
  {
    id: 5,
    title: "Lending Automation Processing System (LAPS)",
    company: "SysArc Infomatix",
    role: "Associate Software Engineer",
    duration: "May 2016 - Jul 2018",
    category: "fintech",
    description: "LAPS is a comprehensive banking solution that automates the entire lending process, including risk analysis, workflow management, document handling, and scanning, streamlining all lending functions for financial institutions.",
    technologies: ["Java", "Struts", "JSP", "Oracle DB", "WebLogic", "JDBC", "SVN"],
    highlights: [
      "Automated end-to-end lending workflow reducing processing time by 50%",
      "Implemented risk assessment algorithms for loan approval",
      "Built document management system with OCR integration",
      "Developed comprehensive reporting dashboard for loan officers"
    ]
  }
];
