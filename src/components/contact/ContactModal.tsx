import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { sendContactEnquiry } from '../../lib/web3forms';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICES_COLUMN_1 = [
  'Android App Development',
  'Customized Software',
  'Hybrid App Development',
  'Dynamic Website',
  'Web App Development',
  'Google Ads',
  'Logo Design',
];

const SERVICES_COLUMN_2 = [
  'Ios App Development',
  'Customized ERP Solutions',
  'E - Commerce Website',
  'Static Website',
  'Meta Ads',
  'SEO Marketing',
  'Brochure Design',
];

const ALL_AVAILABLE_SERVICES = [...SERVICES_COLUMN_1, ...SERVICES_COLUMN_2];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Reset modal state and initialize selected services whenever modal opens or defaultService changes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setStep(1);
      setValidationError('');
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        website: '',
      });
      if (defaultService) {
        const matched = ALL_AVAILABLE_SERVICES.find(
          (s) =>
            s.toLowerCase() === defaultService.toLowerCase() ||
            defaultService.toLowerCase().includes(s.toLowerCase()) ||
            s.toLowerCase().includes(defaultService.toLowerCase())
        );
        setSelectedServices(matched ? [matched] : []);
      } else {
        setSelectedServices([]);
      }
    }
  }, [isOpen, defaultService]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setValidationError('');
  };

  const handleNext = () => {
    if (selectedServices.length === 0) {
      setValidationError('Please select at least one service to proceed.');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setValidationError('');
    try {
      await sendContactEnquiry({
        ...formData,
        phone: `+91 ${formData.phone}`,
        services: selectedServices,
        source: 'Appointment enquiry',
        message: formData.message.trim() || `I would like to discuss: ${selectedServices.join(', ')}. Please contact me to arrange a consultation.`,
      });
      setIsSubmitted(true);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : 'Unable to send your enquiry. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 md:p-6 font-josefin select-text"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-transparent rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Spiral Bound Notebook Card: Left Orange Panel + Middle Binder Tabs + Right White Panel */}
            <div className="flex flex-col md:flex-row w-full bg-white rounded-3xl overflow-hidden border border-neutral-300/80 shadow-2xl relative">
              
              {/* ══════════════════════════════════════════════════════════════
                  LEFT PANEL: Solid Golden-Amber (#FFA000 / #F59E0B)
                  ══════════════════════════════════════════════════════════════ */}
              <div className="relative md:w-[36%] bg-[#FFA000] p-6 sm:p-8 flex flex-col justify-between text-center select-none shrink-0 min-h-[220px] md:min-h-[460px]">
                
                {/* Top/Center Text */}
                <div className="my-auto flex flex-col items-center justify-center py-4">
                  <h2 className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#111111] leading-snug max-w-[240px] mx-auto">
                    Please select service for which you want to schedule an appointment
                  </h2>

                  <div className="mt-6 sm:mt-8">
                    <p className="text-base sm:text-lg font-bold text-[#111111]">
                      Any Questions?
                    </p>

                    {/* Circular Action Buttons: Phone & WhatsApp */}
                    <div className="flex items-center justify-center gap-3.5 mt-3">
                      {/* Phone Call Button */}
                      <a
                        href="tel:+919047044440"
                        title="Call us: +91 90470 44440"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Phone className="w-5 h-5 text-black fill-black" />
                      </a>

                      {/* WhatsApp Button */}
                      <a
                        href="https://wa.me/919047044440?text=Hi%20Yaazh360,%20I%20have%20questions%20about%20scheduling%20an%20appointment."
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Chat on WhatsApp: +91 90470 44440"
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 fill-[#25D366]"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Left Panel Footer Tag */}
                <div className="text-[11.5px] text-black/75 font-semibold">
                  Yaazh 360 Tech Hub &bull; Coimbatore
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════════
                  MIDDLE BINDER RINGS / SPIRAL TABS (Desktop Seam)
                  ══════════════════════════════════════════════════════════════ */}
              <div className="hidden md:flex flex-col justify-around absolute left-[36%] -translate-x-1/2 top-8 bottom-8 z-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-2.5 bg-neutral-200/95 rounded-full border border-neutral-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                  />
                ))}
              </div>

              {/* ══════════════════════════════════════════════════════════════
                  RIGHT PANEL: Pure White (#FFFFFF) Content Area
                  ══════════════════════════════════════════════════════════════ */}
              <div className="relative md:w-[64%] bg-white p-6 sm:p-8 flex flex-col justify-between">
                
                {/* Circular Close Button (X) at Top Right */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close appointment popup"
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-7 h-7 rounded-full border border-neutral-400 hover:border-black hover:bg-neutral-100 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer z-30"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>

                {isSubmitted ? (
                  /* ── SUCCESS STATE ── */
                  <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-[#111111]">
                      Appointment Requested!
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 max-w-md leading-relaxed">
                      Thank you, <span className="font-bold text-black">{formData.name}</span>. We
                      have received your inquiry for:
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 my-3 max-w-sm">
                      {selectedServices.map((svc) => (
                        <span
                          key={svc}
                          className="px-2 py-0.5 rounded-full bg-[#FFA000]/15 text-[#111111] text-xs font-bold border border-[#FFA000]/30"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500">
                      Our leadership team will reach out at{' '}
                      <span className="font-bold text-black">+91 {formData.phone}</span> to discuss your requirements.
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs sm:text-sm transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : step === 1 ? (
                  /* ── STEP 1: 14 SERVICES CHECKLIST ── */
                  <div className="flex flex-col justify-between h-full pt-1">
                    <div>
                      {/* Title: Services You Are Interested In* */}
                      <h3 className="text-center font-bold text-sm sm:text-base md:text-[17px] text-[#111111] tracking-tight mb-5 sm:mb-6 pr-6">
                        Services You Are Interested In*
                      </h3>

                      {/* 2-Column Checkboxes Grid (7 items each) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-3">
                        {/* Left Column (7 items) */}
                        <div className="space-y-2.5 sm:space-y-3">
                          {SERVICES_COLUMN_1.map((svc) => {
                            const isChecked = selectedServices.includes(svc);
                            return (
                              <label
                                key={svc}
                                className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[#222222] font-medium cursor-pointer hover:text-black select-none group"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleService(svc)}
                                  className="w-4 h-4 rounded-xs border-neutral-400 text-[#FFA000] focus:ring-0 cursor-pointer accent-[#FFA000]"
                                />
                                <span className={isChecked ? 'font-bold text-black' : ''}>
                                  {svc}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Right Column (7 items) */}
                        <div className="space-y-2.5 sm:space-y-3">
                          {SERVICES_COLUMN_2.map((svc) => {
                            const isChecked = selectedServices.includes(svc);
                            return (
                              <label
                                key={svc}
                                className="flex items-center gap-2.5 text-xs sm:text-[13.5px] text-[#222222] font-medium cursor-pointer hover:text-black select-none group"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleService(svc)}
                                  className="w-4 h-4 rounded-xs border-neutral-400 text-[#FFA000] focus:ring-0 cursor-pointer accent-[#FFA000]"
                                />
                                <span className={isChecked ? 'font-bold text-black' : ''}>
                                  {svc}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Validation Error */}
                      {validationError && (
                        <p className="mt-4 text-xs sm:text-sm text-red-700 font-bold text-center bg-red-50 py-2 px-3 rounded-md border border-red-200 shadow-xs" role="alert">
                          {validationError}
                        </p>
                      )}
                    </div>

                    {/* Bottom Action: Golden-Amber "Next" Button */}
                    <div className="mt-6 sm:mt-8 pt-3 flex justify-end items-center">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-7 py-2 rounded-xs bg-[#FFA000] hover:bg-[#e69000] text-black font-bold text-xs sm:text-sm border border-black/25 shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── STEP 2: CONTACT DETAILS INPUTS ── */
                  <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="flex flex-col justify-between h-full pt-1">
                    <div hidden aria-hidden="true"><label>Website<input name="website" value={formData.website} onChange={event => setFormData({ ...formData, website: event.target.value })} tabIndex={-1} autoComplete="off" /></label></div>
                    <div>
                      <div className="flex items-center justify-between mb-4 pr-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Change Services</span>
                        </button>
                        <span className="text-[11px] font-semibold text-neutral-500">
                          {selectedServices.length} Selected
                        </span>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-[#111111] mb-1">
                        Where should we reach you?
                      </h3>
                      <p className="text-xs text-neutral-500 mb-4">
                        Share your details and our team will contact you to arrange a consultation.
                      </p>

                      <div className="space-y-3">
                        {/* Name Input */}
                        <div>
                          <label className="block text-xs font-bold text-[#111111] mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-md px-3.5 py-2 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#FFA000]"
                          />
                        </div>

                        {/* Phone Number Input */}
                        <div>
                          <label className="block text-xs font-bold text-[#111111] mb-1">
                            Phone / WhatsApp Number *
                          </label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-700 text-xs sm:text-sm font-bold select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]{10}"
                              maxLength={10}
                              required
                              autoComplete="tel-national"
                              placeholder="90470 44440"
                              value={formData.phone}
                              onChange={(e) => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setFormData({ ...formData, phone: digits });
                                if (validationError) setValidationError('');
                              }}
                              className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-r-md px-3.5 py-2 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#FFA000] tracking-wide"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="block text-xs font-bold text-[#111111] mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            autoComplete="email"
                            maxLength={254}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-md px-3.5 py-2 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#FFA000]"
                          />
                        </div>

                        {/* Message Input */}
                        <div>
                          <label className="block text-xs font-bold text-[#111111] mb-1">
                            Notes / Preferred Time (Optional)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Tell us any specific requirements or best time to connect..."
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            className="w-full bg-[#FAFAFA] border border-neutral-300 rounded-md p-2.5 text-xs sm:text-sm text-[#111111] placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-[#FFA000] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {validationError && <p role="alert" className="mt-3 text-sm text-red-700">{validationError}</p>}
                    {/* Bottom Actions */}
                    <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-neutral-500 hover:text-black cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-7 py-2 rounded-xs bg-[#FFA000] hover:bg-[#e69000] text-black font-bold text-xs sm:text-sm border border-black/25 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? 'Sending…' : 'Request consultation'}
                      </button>
                    </div>
                  </form>
                )}

              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
