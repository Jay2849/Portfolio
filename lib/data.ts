export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  status: "LIVE" | "IN_DEV" | "ARCHIVED"
  link?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

export interface Skill {
  category: string
  items: string[]
}

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Distributed Task Queue",
    description:
      "High-throughput distributed task queue system built with Redis and Node.js. Handles 10K+ jobs/sec with automatic retry logic, dead-letter queues, and real-time monitoring dashboards.",
    tech: ["Node.js", "Redis", "Docker", "Prometheus"],
    status: "LIVE",
    link: "https://github.com",
  },
  {
    id: "proj-002",
    name: "API Gateway Service",
    description:
      "Centralized API gateway with rate limiting, JWT auth, request/response transformation, and circuit-breaker patterns. Serves as the single entry point for a microservices architecture.",
    tech: ["Go", "gRPC", "PostgreSQL", "Kubernetes"],
    status: "LIVE",
    link: "https://github.com",
  },
  {
    id: "proj-003",
    name: "Real-time Analytics Pipeline",
    description:
      "Event-driven analytics pipeline processing millions of events daily. Features stream processing, windowed aggregations, and low-latency dashboards.",
    tech: ["Python", "Kafka", "ClickHouse", "Grafana"],
    status: "LIVE",
    link: "https://github.com",
  },
  {
    id: "proj-004",
    name: "Infrastructure as Code Platform",
    description:
      "Internal platform for managing cloud infrastructure through declarative configs. Supports multi-cloud deployments with drift detection and automated rollbacks.",
    tech: ["Terraform", "AWS", "TypeScript", "React"],
    status: "IN_DEV",
  },
  {
    id: "proj-005",
    name: "Log Aggregation System",
    description:
      "Centralized logging system with full-text search, structured queries, and anomaly detection. Processes and indexes terabytes of logs with sub-second query times.",
    tech: ["Rust", "Elasticsearch", "Fluentd", "S3"],
    status: "ARCHIVED",
  },
]

export const experience: Experience[] = [
  {
    role: "Senior Backend Engineer",
    company: "TechCorp",
    period: "2023 -- Present",
    description:
      "Leading backend architecture for distributed systems serving 2M+ daily active users. Designed and implemented event-driven microservices, reducing latency by 40%.",
    tech: ["Go", "Kubernetes", "PostgreSQL", "Kafka"],
  },
  {
    role: "Backend Developer",
    company: "DataFlow Inc.",
    period: "2021 -- 2023",
    description:
      "Built and maintained high-throughput data pipelines processing 500M+ events/day. Implemented real-time stream processing and automated alerting systems.",
    tech: ["Python", "Apache Spark", "Redis", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "StartupXYZ",
    period: "2019 -- 2021",
    description:
      "Full-stack development with a focus on backend services. Built RESTful APIs, implemented CI/CD pipelines, and managed cloud infrastructure.",
    tech: ["Node.js", "TypeScript", "Docker", "MongoDB"],
  },
]

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["Go", "Python", "TypeScript", "Rust", "SQL"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Kubernetes", "Terraform", "AWS", "GCP"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Redis", "MongoDB", "ClickHouse", "Elasticsearch"],
  },
  {
    category: "Tools & Frameworks",
    items: ["gRPC", "Kafka", "GraphQL", "Next.js", "Express"],
  },
]
