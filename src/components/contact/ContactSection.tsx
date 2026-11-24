import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState('Full 360° Package');
  const [budget, setBudget] = useState('₹1,00,000 - ₹3,00,000');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const services = [
    'Full 360° Package',
    'SEO & Organic Growth',
    'Paid Ads & PPC (Meta / Google)',
    'Custom Software & Web Apps',
    'UI/UX & Branding',
  ];

  const budgets = [
    '< ₹1,00,000',
    '₹1,00,000 - ₹3,00,000',
    '₹3,00,000 - ₹8,00,000',
    '₹8,00,000+',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (formData.phone && formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Trigger celebration confetti in Logo Blue & Gold
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0052CC', '#0073FE', '#D49B28', '#FDD460', '#0A2558'],
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-neutral-50 border-t border-neutral-200/80 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0052CC] bg-[#0052CC]/10 border border-[#0052CC]/20 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              {/* Section Heading following specs: Weight 500/600, Size 40px-48px, Line-height 1.2, Letter-spacing -1px */}
              <h2 className="mt-4 font-sans font-semibold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.2] tracking-[-1px] text-[#111111]">
                Let's Build Your 360° Growth Engine.
              </h2>
              {/* Body Text: Weight 400, Size 18px-20px, Line-height 1.6, Color #555555 */}
              <p className="mt-4 font-sans font-normal text-[18px] sm:text-[19px] lg:text-[20px] leading-[1.6] text-[#555555]">
                Whether you need a high-converting digital marketing campaign or enterprise-grade bespoke software, our senior team is ready to deliver.
              </p>
            </div>

            {/* Direct Contact Points in Logo Colors */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#0052CC] shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Coimbatore Headquarters</div>
                  <div className="text-[15px] font-semibold text-[#111111] mt-0.5">
                    Yaazh 360 Tech Hub, Avinashi Road, Coimbatore, Tamil Nadu - 641014
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#D49B28] shrink-0 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Direct Email</div>
                  <a href="mailto:yaazh360digitech@gmail.com" className="text-[15px] font-semibold text-[#111111] hover:text-[#0052CC] mt-0.5 block">
                    yaazh360digitech@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#0052CC] shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Phone &amp; WhatsApp</div>
                  <div className="text-[15px] font-semibold text-[#111111] mt-0.5">
                    <a href="tel:+919047044440" className="hover:text-[#0052CC] transition-colors">+91 90470 44440</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-2xl p-5 border border-neutral-200 space-y-3">
              <div className="flex items-center space-x-2.5 text-[14px] font-medium text-[#111111]">
                <Clock className="w-4 h-4 text-[#D49B28]" />
                <span>Response Guaranteed within 2 Business Hours</span>
              </div>
              <div className="flex items-center space-x-2.5 text-[14px] font-medium text-[#111111]">
                <ShieldCheck className="w-4 h-4 text-[#0052CC]" />
                <span>100% Confidentiality &amp; NDA Signed Upon Request</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] font-sans">
                  Proposal Request Received!
                </h3>
                <p className="text-[15px] text-[#555555] max-w-md mx-auto leading-[1.6]">
                  Thank you, <span className="font-semibold text-[#111111]">{formData.name}</span>. Our lead strategist is reviewing your scope and will reach out to <span className="font-semibold text-[#111111]">{formData.email}</span> within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[14px] font-semibold text-[#111111] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Service Picker */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                    1. Select Core Requirement
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSelectedService(s)}
                        className={`px-3.5 py-2 rounded-xl text-[14px] font-medium transition-all ${
                          selectedService === s
                            ? 'bg-[#0052CC] text-white shadow-sm'
                            : 'bg-neutral-100 text-[#555555] hover:bg-neutral-200 hover:text-[#111111]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-2">
                    2. Estimated Monthly Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`py-2 px-2 text-center rounded-xl text-[13px] font-medium transition-all ${
                          budget === b
                            ? 'bg-[#0A2558] text-white font-semibold shadow-xs'
                            : 'bg-neutral-100 text-[#555555] hover:bg-neutral-200 hover:text-[#111111]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#0052CC] text-[15px] font-medium text-[#111111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="arun@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#0052CC] text-[15px] font-medium text-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-xs font-bold select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      autoComplete="tel-national"
                      placeholder="90470 44440"
                      value={formData.phone}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setFormData({ ...formData, phone: digits });
                      }}
                      className="w-full px-4 py-3 rounded-r-xl border border-neutral-300 focus:outline-none focus:border-[#0052CC] text-[15px] font-medium text-[#111111]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Project Goals / Current Bottlenecks
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current website, traffic numbers, software requirements, or growth goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-[#0052CC] text-[15px] font-normal text-[#111111] leading-[1.6]"
                  />
                </div>

                {/* Form submit button in Logo Royal Blue */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#0052CC] hover:bg-[#0A2558] text-white font-semibold text-[15px] sm:text-[16px] tracking-normal shadow-lg shadow-[#0052CC]/25 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Request Free 360° Growth Audit &amp; Proposal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <p className="text-center text-[12px] text-[#777777]">
                  By submitting, you agree to our privacy policy. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
