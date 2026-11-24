import { Component, useEffect, useState, type ReactNode } from 'react';

function reloadPage() { window.location.reload(); }

export function PageLoading() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <section className="min-h-[50vh] pt-32 pb-16 px-6 flex flex-col items-center justify-center text-center" aria-live="polite" aria-busy="true">
      <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[#0052CC] animate-spin" />
      {slow && (
        <div className="mt-4">
          <p className="text-sm text-slate-600">Taking longer than usual.</p>
          <button type="button" onClick={reloadPage} className="mt-3 rounded-lg bg-[#0052CC] px-5 py-2 text-xs font-semibold text-white">
            Reload
          </button>
        </div>
      )}
    </section>
  );
}

interface PageErrorBoundaryProps { children: ReactNode; onHome: () => void; }

// Keep the navigation, chat and footer mounted when a page chunk cannot load.
// A full reload is intentional: React.lazy/browser imports cache rejected loads.
export class PageErrorBoundary extends Component<PageErrorBoundaryProps, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (!this.state.failed) return this.props.children;
    return <section className="min-h-[50vh] pt-32 pb-16 px-6 flex flex-col items-center justify-center text-center" aria-labelledby="page-recovery-title">
      <h1 id="page-recovery-title" className="text-2xl font-bold text-slate-900">We couldn’t open this page</h1>
      <p role="alert" className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">Check your internet connection and reload to get the latest version of this page.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={reloadPage} className="rounded-lg bg-[#0052CC] px-6 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Reload page</button><button type="button" onClick={this.props.onHome} className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Go to Home</button></div>
    </section>;
  }
}
