import React, { useState } from 'react';
import { ArrowDown, ArrowRight, Clock, Code2, GraduationCap, MapPin, Search, Users } from 'lucide-react';
import careersHero from '../assets/careers/careers-hero.optimized.webp';
import './CareersPage.css';
import { JobApplicationForm } from '../components/careers/JobApplicationForm';

interface JobRole {
  id: string;
  title: string;
  department: 'Engineering' | 'Marketing';
  location: string;
  type: string;
  description: string;
  skills: string[];
  openings: number;
}

const JOB_ROLES: JobRole[] = [
  {
    id: 'seo-specialist',
    title: 'SEO Specialist',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description:
      'Drive keyword research, on-page optimization, and organic search ranking growth with our digital marketing team.',
    skills: ['SEO', 'Keyword Research', 'Content Optimization', 'Search Console'],
    openings: 1,
  },
  {
    id: 'social-media-operator',
    title: 'Social Media Operator',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description:
      'Plan, create, and publish engaging social media campaigns, foster community engagement, and monitor content metrics.',
    skills: ['Social Media', 'Content Scheduling', 'Community Engagement', 'Canva'],
    openings: 1,
  },
  {
    id: 'performance-marketing-specialist',
    title: 'Performance Marketing Specialist',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description:
      'Manage high-converting Google and Meta ad campaigns, analyze performance metrics, and optimize campaign ROI.',
    skills: ['Digital Marketing', 'Google Ads', 'Meta Ads', 'Campaign Reporting'],
    openings: 1,
  },
  {
    id: 'video-editor',
    title: 'Video Editor',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description: 'Edit dynamic short-form videos, reels, and visual creative assets for brand growth campaigns.',
    skills: ['Video Editing', 'Premiere Pro', 'Reels', 'Storytelling'],
    openings: 1,
  },
  {
    id: 'business-executive',
    title: 'Business Executive',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description: 'Drive client communications, handle business inquiries, and lead consultative business development.',
    skills: ['Business Development', 'Client Communication', 'Digital Marketing', 'Lead Generation'],
    openings: 1,
  },
  {
    id: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description: 'Execute end-to-end SEO, social media, and paid growth initiatives to deliver measurable results.',
    skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
    openings: 1,
  },
  {
    id: 'content-creator',
    title: 'Content Creator',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description: 'Produce high-converting visual content, brand copy, and engaging digital media for client campaigns.',
    skills: ['Content Creation', 'Copywriting', 'Social Media', 'Canva'],
    openings: 1,
  },
  {
    id: 'script-writer',
    title: 'Script Writer',
    department: 'Marketing',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description:
      'Research, conceptualize, and write compelling scripts, hooks, and storyboards for brand reels, video ads, and digital campaigns.',
    skills: ['Script Writing', 'Creative Storytelling', 'Storyboarding', 'Reels & Video Concepts', 'Content Strategy'],
    openings: 1,
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Peelamedu, Coimbatore',
    type: 'Internship',
    description:
      'Architect and build modern web applications, responsive user interfaces, scalable APIs, and robust databases.',
    skills: ['React', 'Node.js', 'JavaScript', 'Databases', 'Git'],
    openings: 1,
  },
];

const BENEFITS = [
  { icon: GraduationCap, title: 'Learning & Growth', description: 'Build your skills through hands-on projects, shared ideas, and collaboration.' },
  { icon: Users, title: 'Collaborative Team', description: 'Work alongside developers, designers, and marketers who bring different perspectives.' },
  { icon: Code2, title: 'Meaningful Work', description: 'Create digital products and campaigns that solve real business challenges.' },
];
const DEPARTMENTS = ['Engineering', 'Marketing'] as const;

export const CareersPage: React.FC = () => {
  const [applicationRole, setApplicationRole] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [location, setLocation] = useState('All');
  const roles = JOB_ROLES.filter(role => {
    const matchesQuery = `${role.title} ${role.skills.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesQuery && (department === 'All' || role.department === department) &&
      (jobType === 'All' || role.type === jobType) &&
      (location === 'All' || location === 'On-site');
  });
  const resetFilters = () => { setQuery(''); setDepartment('All'); setJobType('All'); setLocation('All'); };
  const apply = (title: string) => setApplicationRole(title);

  return (
    <div className="reference-careers">
      {applicationRole && <JobApplicationForm role={applicationRole} roles={JOB_ROLES.map(job => job.title)} onClose={() => setApplicationRole(null)} />}
      <section className="reference-careers__hero" aria-labelledby="careers-title">
        <img
          src={careersHero}
          alt="Professionals collaborating outside a modern office"
          title="Careers at Yaazh 360 Digitech Coimbatore"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="reference-careers__shade" />
        <div className="reference-careers__hero-copy"><h1 id="careers-title">Careers</h1><p>Let us together build the future. Take a look at our open roles and let us know which excites you the most.</p><a href="#career-openings">View Openings <ArrowDown size={15} aria-hidden="true" /></a></div>
      </section>

      <section className="reference-careers__benefits" aria-labelledby="careers-benefits-title"><h2 id="careers-benefits-title" className="text-3xl font-bold mb-8">Benefits</h2><div className="reference-careers__benefit-grid">{BENEFITS.map(({icon: Icon, title, description}) => <article key={title}><Icon size={44} strokeWidth={1.2} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section id="career-openings" className="reference-careers__openings" aria-labelledby="career-openings-title">
        <h3 id="career-openings-title" className="text-3xl font-bold mb-8">Job Openings</h3>
        <div className="reference-careers__board">
          <div className="reference-careers__results">
            <div className="reference-careers__result-heading"><h4>{department === 'All' ? 'General' : department}</h4><p role="status" aria-live="polite">{roles.length} {roles.length === 1 ? 'role' : 'roles'} available</p></div>
            <div className="reference-careers__jobs">{roles.map(role => <article className="reference-careers__job" key={role.id}>
              <span className="reference-careers__department">{role.department}</span>
              <h5>{role.title.replace(/\s*\([^)]*\)/g, '')}</h5>
              <div className="reference-careers__metadata"><span><MapPin size={13} aria-hidden="true" />Coimbatore · On-site</span><span><Clock size={13} aria-hidden="true" />{role.type}</span></div>
              <button type="button" onClick={() => apply(role.title)} aria-label={`Apply for ${role.title}`}>Apply now <ArrowRight size={14} aria-hidden="true" /></button>
            </article>)}</div>
            {!roles.length && <div className="reference-careers__empty"><Search size={28} /><h4>No matching openings</h4><p>Try another search or change your filters.</p><button type="button" onClick={resetFilters}>Show all roles</button></div>}
          </div>
          <aside className="reference-careers__filters" aria-label="Filter job openings">
            <h4>Find your role</h4>
            <label className="reference-careers__search"><span className="sr-only">Search jobs</span><input type="search" placeholder="Search jobs" value={query} onChange={event => setQuery(event.target.value)} /><Search size={17} aria-hidden="true" /></label>
            <label><span className="sr-only">Department</span><select aria-label="Department" value={department} onChange={event => setDepartment(event.target.value)}><option value="All">All Departments</option>{DEPARTMENTS.map(dept => <option key={dept}>{dept}</option>)}</select></label>
            <label><span className="sr-only">Job type</span><select aria-label="Job type" value={jobType} onChange={event => setJobType(event.target.value)}><option value="All">All Job Types</option><option value="Internship">Internship</option></select></label>
            <label><span className="sr-only">Location</span><select aria-label="Location" value={location} onChange={event => setLocation(event.target.value)}><option value="All">All Locations</option><option value="On-site">Coimbatore · On-site</option></select></label>
            {(query || department !== 'All' || jobType !== 'All' || location !== 'All') && <button type="button" className="reference-careers__reset" onClick={resetFilters}>Clear filters</button>}
          </aside>
        </div>
        <div className="reference-careers__general"><p>Don’t see the right role? We’d still love to hear from you.</p><button type="button" onClick={() => apply('General Application')}>Send your profile <ArrowRight size={14} /></button></div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 text-[#111111] border-t border-neutral-200">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Why Build Your Career at Yaazh 360 Digitech?</h3>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 mb-4">
          We build top web apps, mobile apps, and ad campaigns in Coimbatore. Our team loves solving real business goals. We welcome energetic coders, creative designers, and growth marketers. Here, your work directly helps client brands grow in India and across the world.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-neutral-700 mb-4">
          Our Peelamedu office offers hands-on lead mentorship and modern tools. We believe in open talk, fast learning, and daily ownership. You build real products and quickly step up into bigger project roles.
        </p>
      </section>
    </div>
  );
};
export default CareersPage;
