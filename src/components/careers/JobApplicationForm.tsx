import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, X } from 'lucide-react';
import './JobApplicationForm.css';

interface Props { role: string; roles: string[]; onClose: () => void; }

export function JobApplicationForm({ role, roles, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [maximumGraduationYear] = useState(() => new Date().getFullYear() + 6);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const resume = form.elements.namedItem('resumeUrl') as HTMLInputElement;
    const url = new URL(String(values.resumeUrl));
    if (url.protocol !== 'https:' || !['drive.google.com', 'docs.google.com'].includes(url.hostname) || url.pathname === '/') {
      resume.setCustomValidity('Enter a valid Google Drive résumé link beginning with https://drive.google.com/ or https://docs.google.com/.');
      resume.reportValidity();
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/applications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'We could not submit your application. Please try again.');
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error && err.name !== 'TimeoutError' ? err.message : 'The connection timed out. Please try again.');
    } finally { setSubmitting(false); }
  }

  return <dialog ref={dialog} className="career-application" data-lenis-prevent="" aria-labelledby="application-title" aria-describedby="application-intro" onCancel={event => { event.preventDefault(); if (!submitting) onClose(); }}>
    <div className="career-application__header">
      <span className="career-application__brand"><BriefcaseBusiness size={19} aria-hidden="true" /> YAAZH 360 · CAREERS</span>
      <button className="career-application__close" type="button" onClick={onClose} disabled={submitting} aria-label="Close application form"><X size={21} /></button>
    </div>
    {submitted ? <div className="career-application__success" role="status">
      <CheckCircle2 size={46} aria-hidden="true" />
      <h2 id="application-title" tabIndex={-1} ref={element => element?.focus()}>Application received</h2>
      <p id="application-intro">Thank you for your interest in Yaazh 360. Your profile has been submitted for consideration.</p>
      <button className="career-application__submit" type="button" onClick={onClose}>Back to openings <ArrowRight size={16} /></button>
    </div> : <>
      <div className="career-application__intro"><span>CAREER OPPORTUNITIES</span><h2 id="application-title">Build your career with us.</h2><p id="application-intro">Share your details and résumé with our hiring team.</p></div>
      <form onSubmit={submit} className="career-application__form" aria-busy={submitting}>
        <fieldset disabled={submitting}>
          <legend className="sr-only">Applicant details</legend>
          <label>Applying for <span aria-hidden="true">*</span><select name="role" required defaultValue={role}>{['General Application', ...roles].map(title => <option key={title}>{title}</option>)}</select></label>
          <label>Year of graduation / pass-out <span aria-hidden="true">*</span><input name="graduationYear" type="number" inputMode="numeric" min={1950} max={maximumGraduationYear} step={1} placeholder="e.g. 2026" required aria-describedby="application-year-help" /><small id="application-year-help">Still studying? Enter your expected graduation year.</small></label>
          <label>Full name <span aria-hidden="true">*</span><input name="name" autoComplete="name" placeholder="Enter your full name" required maxLength={120} pattern=".*\S.*" /></label>
          <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
          <label className="career-application__wide">Google Drive résumé link <span aria-hidden="true">*</span><input name="resumeUrl" type="url" placeholder="https://drive.google.com/file/d/.../view" required maxLength={2048} onInput={event => event.currentTarget.setCustomValidity('')} aria-describedby="application-resume-help" /><small id="application-resume-help">Set access to “Anyone with the link” → “Viewer” so our hiring team can open your résumé.</small></label>
        </fieldset>
        <p className="career-application__notice">All fields are required. By submitting, you agree to share these details with Yaazh 360 for recruitment.</p>
        {error && <p className="career-application__error" role="alert">{error}</p>}
        <div className="career-application__footer"><button type="button" onClick={onClose} disabled={submitting}>Cancel</button><button className="career-application__submit" type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit application'}<ArrowRight size={16} aria-hidden="true" /></button></div>
      </form>
    </>}
  </dialog>;
}
