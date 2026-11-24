interface ContactEnquiry {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  services?: string[];
  website?: string;
  source: 'Contact page' | 'Appointment enquiry';
}

export async function sendContactEnquiry(enquiry: ContactEnquiry, options: { accessKey?: string; fetchImpl?: typeof fetch } = {}) {
  const accessKey = options.accessKey || import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) throw new Error('The contact form is temporarily unavailable. Please use the contact details on this page.');
  if (enquiry.website?.trim()) throw new Error('Unable to send this enquiry. Please try again.');
  const name = enquiry.name.trim();
  const email = enquiry.email.trim();
  const message = enquiry.message.trim();
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000) {
    throw new Error('Please enter your name, a valid email address, and a message.');
  }
  let response;
  try {
    response = await (options.fetchImpl || fetch)('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: enquiry.source === 'Appointment enquiry' ? 'New consultation enquiry | Yaazh 360' : 'New business enquiry | Yaazh 360',
        from_name: 'Yaazh 360 Website',
        name, email, replyto: email,
        ...(enquiry.phone?.trim() ? { phone: enquiry.phone.trim().slice(0, 40) } : {}),
        ...(enquiry.company?.trim() ? { company: enquiry.company.trim().slice(0, 160) } : {}),
        ...(enquiry.services?.length ? { services: enquiry.services.join(', ') } : {}),
        message,
        source: enquiry.source,
        botcheck: false,
      }),
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new Error('Unable to connect. Please check your connection and try again. Your details are still in the form.');
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error(response.status === 429 ? 'Too many attempts. Please wait a little before trying again.' : 'Your enquiry could not be sent. Please try again or contact us directly.');
  }
}
