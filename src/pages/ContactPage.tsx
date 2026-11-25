import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { sendContactEnquiry } from '../lib/web3forms';
import { SocialLinksRow } from '../components/common/SocialLinksRow';

interface ContactPageProps {
  defaultService?: string;
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ defaultService, onNavigate: _onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    question: defaultService ? `Inquiring about ${defaultService}: ` : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digits }));
      if (submitError) setSubmitError('');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;

    if (formData.phone && formData.phone.length !== 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await sendContactEnquiry({
        ...formData,
        phone: formData.phone ? `+91 ${formData.phone}` : undefined,
        message: formData.question,
        source: 'Contact page',
      });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send your enquiry. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#FFF9F0] text-[#111111] font-josefin select-text selection:bg-[#0A65DB] selection:text-white">
      {/* ══════════════════════════════════════════════════════════════
          MAIN TALK TO US HERO & FORM SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-16 sm:pb-20">
        
        {/* ══════════════════════════════════════════════════════════════
            1. TOP HERO ROW:
               LEFT: "Talk to us!" & Narrative Intro
               RIGHT: Given Image Content (Bauhaus Speech Bubble Art)
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-6 sm:mb-8 md:mb-10">
          
          {/* Left Side: Headline & Intro Paragraph */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111111] leading-none"
            >
              Talk to <span className="text-[#0A65DB]">us!</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-3 text-lg sm:text-xl font-bold text-neutral-800"
            >
              Connect with our Coimbatore digital &amp; software engineering team
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-neutral-800 leading-relaxed font-normal max-w-xl"
            >
              Want to build a web app, mobile app, or grow your sales? Share your project details below. We reply within one business day.
            </motion.p>
          </div>

          {/* Right Side: Exact Visual Recreation of User Uploaded Bauhaus Speech Bubble Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm pointer-events-none select-none drop-shadow-sm"
            >
              <svg
                viewBox="0 0 760 520"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
              >
                {/* 1. Rectangular Speech Bubble Outline with Bottom-Right Tail */}
                <path
                  d="M 150 60 H 650 V 380 H 650 L 650 460 L 600 380 H 150 Z"
                  stroke="#111111"
                  strokeWidth="4"
                  strokeLinejoin="miter"
                  fill="none"
                />

                {/* 2. Top Left: Golden Yellow Full Circle */}
                <circle cx="170" cy="130" r="62" fill="#FFC802" />

                {/* 3. Top Center-Left: Concentric Radiating Arcs (Opening to the right) */}
                <g stroke="#111111" strokeWidth="3" fill="none">
                  <path d="M 280 70 A 55 55 0 0 1 280 180" />
                  <path d="M 280 85 A 40 40 0 0 1 280 165" />
                  <path d="M 280 100 A 25 25 0 0 1 280 150" />
                  <path d="M 280 115 A 10 10 0 0 1 280 135" />
                </g>

                {/* 4. Top Center: Soft Pastel Pink Circle */}
                <circle cx="390" cy="130" r="58" fill="#F6BFD4" />

                {/* 5. Top Center-Right: 8-spoke Asterisk Star Burst */}
                <g stroke="#111111" strokeWidth="3.2" strokeLinecap="round">
                  <line x1="475" y1="130" x2="495" y2="130" />
                  <line x1="485" y1="120" x2="485" y2="140" />
                  <line x1="478" y1="123" x2="492" y2="137" />
                  <line x1="478" y1="137" x2="492" y2="123" />
                </g>

                {/* 6. Top Right: Royal Blue Arch / Semi-circle Dome */}
                <path
                  d="M 510 70 H 580 A 60 60 0 0 1 640 130 V 130 A 60 60 0 0 1 580 190 H 510 Z"
                  fill="#0A65DB"
                />

                {/* 7. Bottom Left: Royal Blue Square */}
                <rect x="140" y="205" width="110" height="100" fill="#0A65DB" />

                {/* 8. Bottom Center-Left: Second Asterisk Star Burst */}
                <g stroke="#111111" strokeWidth="3.2" strokeLinecap="round">
                  <line x1="275" y1="260" x2="295" y2="260" />
                  <line x1="285" y1="250" x2="285" y2="270" />
                  <line x1="278" y1="253" x2="292" y2="267" />
                  <line x1="278" y1="267" x2="292" y2="253" />
                </g>

                {/* 9. Bottom Center: Golden Yellow Circle */}
                <circle cx="380" cy="260" r="62" fill="#FFC802" />

                {/* 10. Bottom Center Concentric Rings */}
                <circle cx="435" cy="260" r="62" stroke="#111111" strokeWidth="3" fill="none" />
                <circle cx="435" cy="260" r="46" stroke="#111111" strokeWidth="3" fill="none" />
                <circle cx="435" cy="260" r="30" stroke="#111111" strokeWidth="3" fill="none" />
                <circle cx="435" cy="260" r="14" stroke="#111111" strokeWidth="3" fill="none" />

                {/* 11. Bottom Right: Bright Red-Orange Triangle */}
                <polygon points="630,205 500,375 660,375" fill="#F3461D" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            2. LOWER CONTACT & FORM ROW:
               LEFT: Direct Contact Channels (Prefer email?, call?, address)
               RIGHT: The Older Clean Classic Inquiry Form
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Small Geometric Triangle Logo Mark */}
              <div className="mb-2">
                <svg
                  viewBox="0 0 130 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-auto"
                >
                  <polygon points="10,40 40,40 40,10" fill="#FFC802" />
                  <polygon points="40,40 70,40 70,10" fill="#F6BFD4" />
                  <polygon points="10,70 40,70 40,40" fill="#0A65DB" />
                  <polygon points="40,70 70,70 70,40" fill="#FFC802" />
                  <polygon points="72,70 120,70 120,10" fill="#F3461D" />
                </svg>
              </div>

              {/* Block 1: Prefer email? */}
              <div>
                <div className="flex items-center gap-2 text-[#0A65DB] mb-1">
                  <Mail className="w-4 h-4" />
                  <h3 className="text-base sm:text-lg font-bold text-[#111111]">Prefer email?</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">You can also reach us at</p>
                <a
                  href="mailto:yaazh360digitech@gmail.com"
                  className="text-xs sm:text-sm text-[#0A65DB] hover:underline font-semibold block mt-0.5"
                >
                  yaazh360digitech@gmail.com
                </a>
              </div>

              {/* Block 2: Prefer a call? */}
              <div>
                <div className="flex items-center gap-2 text-[#0A65DB] mb-1">
                  <Phone className="w-4 h-4" />
                  <h3 className="text-base sm:text-lg font-bold text-[#111111]">Prefer a call?</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Connect directly with our Coimbatore office at
                </p>
                <a
                  href="tel:+919047044440"
                  className="text-sm sm:text-base text-[#0A65DB] hover:underline font-extrabold block mt-0.5 tracking-tight"
                >
                  +91 90470 44440
                </a>
              </div>

              {/* Block 3: Our Office Address */}
              <div>
                <div className="flex items-center gap-2 text-[#0A65DB] mb-1">
                  <MapPin className="w-4 h-4" />
                  <h3 className="text-base sm:text-lg font-bold text-[#111111]">Our Office</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 mb-1">
                  Visit our innovation center in Coimbatore:
                </p>
                <address className="not-italic text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                  Yaazh 360 Tech Hub, 4th Floor,<br />
                  Avinashi Road, Peelamedu,<br />
                  Coimbatore, Tamil Nadu &mdash; 641014
                </address>
              </div>

              {/* Block 4: Connect With Us */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2">Connect with us</h3>
                <SocialLinksRow iconSize={40} />
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Older Clean Classic Form */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full bg-white p-5 sm:p-7 md:p-8 rounded-2xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] -mt-2 lg:-mt-4"
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" aria-busy={isSubmitting}>
                <div className="border-b border-neutral-200 pb-4"><h3 className="text-xl sm:text-2xl font-bold">Let’s discuss your project</h3><p className="mt-2 text-sm text-neutral-600">Share your requirements and our team will be in touch.</p></div>
                <div hidden aria-hidden="true"><label>Website<input name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label></div>
                <fieldset disabled={isSubmitting || isSubmitted} className="space-y-4 sm:space-y-5">
                <legend className="sr-only">Your contact details</legend>
                {/* Field 1: Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm sm:text-base font-bold text-[#111111] mb-1.5"
                  >
                    Full name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    autoComplete="name"
                    maxLength={120}
                    className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#0A65DB] transition-all shadow-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email and phone share one row on larger screens. */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm sm:text-base font-bold text-[#111111] mb-1.5"
                  >
                    Email address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    autoComplete="email"
                    maxLength={254}
                    className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#0A65DB] transition-all shadow-xs"
                  />
                </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm sm:text-base font-bold mb-1.5">
                      Phone
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-sm font-bold select-none">
                        +91
                      </span>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        autoComplete="tel-national"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="90470 44440"
                        className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-r-lg px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:bg-white focus:border-[#0A65DB]"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 3: Question / Message */}
                <div>
                  <label
                    htmlFor="contact-question"
                    className="block text-sm sm:text-base font-bold text-[#111111] mb-1.5"
                  >
                    Project requirements *
                  </label>
                  <textarea
                    id="contact-question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project, goals, or requirements..."
                    required
                    maxLength={5000}
                    className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-lg p-3.5 sm:p-4 text-sm sm:text-base text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#0A65DB] transition-all shadow-xs resize-y min-h-[110px]"
                  />
                </div>

                </fieldset>
                <p className="text-xs text-neutral-500 leading-relaxed">By submitting, you agree that Yaazh 360 may contact you about your enquiry.</p>
                {submitError && <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-lg p-3">{submitError}</p>}
                {/* Submit Button & Response Message */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="inline-flex items-center justify-center gap-3 rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-7 py-3 text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer shadow-[2px_4px_0px_#0F172A] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending enquiry…' : isSubmitted ? 'Enquiry sent' : 'Send enquiry'} <ArrowRight size={17} aria-hidden="true" />
                  </button>

                  <p role="status" aria-live="polite" className="text-xs sm:text-sm text-neutral-600 mt-3 font-medium">
                    {isSubmitted ? (
                      <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Thank you! We&apos;ll get back to you shortly.
                      </span>
                    ) : (
                      "We'll get back to you soon."
                    )}
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
          <section className="lg:col-span-12 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm" aria-labelledby="contact-location-title">
              <div className="flex flex-wrap items-start justify-between gap-3 p-5 sm:p-6">
                <div>
                  <h3 id="contact-location-title" className="flex items-center gap-2 text-lg font-bold"><MapPin size={19} className="text-[#0A65DB]" aria-hidden="true" />Find us in Coimbatore</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">Avinashi Road, Peelamedu,<br />Coimbatore, Tamil Nadu — 641014</p>
                </div>
                <a href="https://www.google.com/maps/search/?api=1&query=Avinashi%20Road%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu%20641014" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A65DB] hover:underline">Open in Google Maps <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
              <iframe
                title="Map of our office area on Avinashi Road, Peelamedu, Coimbatore"
                src="https://maps.google.com/maps?q=Avinashi%20Road%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu%20641014&z=15&output=embed"
                className="block h-[220px] sm:h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
          </section>

        </div>

        {/* Informative Consultation & Office Details */}
        <div className="mt-12 pt-8 border-t border-neutral-200/90 grid grid-cols-1 md:grid-cols-3 gap-6 text-[#111111]">
          <div>
            <h3 className="font-bold text-base mb-2">Our Consultation Process</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Every project starts with a friendly call. We look at your goals, budget, and timeline. Then we share a clear plan for your web or marketing needs.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2">Transparent Project Milestones</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We work with fixed timelines and clear weekly milestones. You get regular updates and demos as we build. Our team is always one message away.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-base mb-2">Office Hours & Visits</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our Coimbatore office is open Monday to Saturday, 9:00 AM to 7:00 PM. You can visit us in Peelamedu or join a quick Google Meet call.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM BLUE ACCENT BANNER
          ══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0A65DB] text-white py-12 sm:py-16 px-6 sm:px-10 lg:px-12 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to kick off your next project?
            </h3>
            <p className="text-sm sm:text-base text-white/90 mt-1.5 font-normal max-w-xl">
              Let&apos;s build bespoke software, execute high-converting digital marketing, or elevate your brand.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <a
              href="https://wa.me/919047044440?text=Hi%20Yaazh360%20team,%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all shadow-md active:scale-95"
            >
              <span>WhatsApp Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+919047044440"
              className="inline-flex items-center gap-2 bg-white text-[#0A65DB] hover:bg-neutral-100 font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Direct</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
