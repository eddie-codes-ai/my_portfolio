import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'luxe-nails',
    name: 'Luxe Nails Parlour',
    description:
      'Full-stack business platform for a nail salon — covering the complete product lifecycle from design to deployment. Features a public-facing booking system with M-Pesa payments and a fully managed admin dashboard.',
    type: 'fullstack',
    status: 'live',
    year: '2024',
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'Vercel', 'M-Pesa', 'PostgreSQL'],
    highlights: [
      'Multi-step booking system with real-time slot availability and artist selection',
      'M-Pesa deposit payment via dynamic payment links',
      'Admin dashboard with full booking lifecycle management',
      'Services manager with full CRUD — no code changes needed',
      'WhatsApp-integrated payment link flow for confirmations',
      'Cron job for automatic booking expiry',
      'Full SEO — meta tags, Open Graph images, sitemap and robots.txt',
      'Google Analytics 4 and Vercel Analytics integration',
    ],
    github: '',
    live: '',
  },
  {
    id: 'finance-tracker',
    name: 'Smart Personal Finance Tracker',
    description:
      'Mobile-first financial management system built for Kenyan university students. Addresses the gap left by global apps that don\'t support M-Pesa and cash-based transactions, with an AI-powered expert system for financial health scoring.',
    type: 'mobile',
    status: 'live',
    year: '2025',
    techStack: ['Flutter', 'Python', 'Flask', 'SQLite', 'Experta', 'Twilio', 'JWT'],
    highlights: [
      'Python Flask REST API with JWT authentication across 16 endpoints',
      'Experta rule-based expert system with 43 rules scoring financial health (0–100)',
      'Assigns financial persona and generates personalised advice',
      'Flutter Android frontend with pie/bar charts and budget variance dashboard',
      'Biometric and PIN authentication',
      'Guardian Link module — WhatsApp/SMS alerts via Twilio on critical scores',
      '24-hour cooldown on notifications to prevent spam',
    ],
    github: '',
    live: '',
  },
];