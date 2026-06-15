import type { Profile } from '../types';

export const profile: Profile = {
  name: 'Edwin Mwai',
  title: 'Full-Stack Developer',
  location: 'Nairobi, Kenya',
  status: 'open to opportunities',
  uptime: '2+ years',
  philosophy: {
    paragraphs: [
      'I build products that feel obvious to use and impossible to break into. Every interface I ship is designed for the person who\'s never heard of an API — and every system behind it is built for the engineer who\'ll maintain it at 3 AM.',
      'Clean code isn\'t aesthetic — it\'s respect. For the user, the team, and the next version of yourself.',
    ],
    quote: 'The best software is the kind nobody notices — it just works.',
    tags: ['User-First Design', 'Secure by Default', 'Clean Code', 'Real-World Ready'],
  },
  social: {
    github: 'https://github.com/eddie-codes-ai',
    linkedin: 'https://www.linkedin.com/in/edwin-mwai-470480359',
    email: 'edwinmwai.outlook@gmail.com',
  },
  stats: [
    { label: 'uptime', value: '2+ years' },
    { label: 'projects shipped', value: '10+ production' },
  ],
};