import React from 'react';
import { SaiWorkShowcaseSection } from '../components/work/SaiWorkShowcaseSection';

interface WorkPageProps {
  onOpenContact: (serviceName?: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onOpenContact }) => {
  return (
    <div className="pt-[76px] bg-[#e8e7e2] min-h-screen font-sans select-text">
      {/* ── Portfolio Showcase & FAQ matching Reference Image ── */}
      <SaiWorkShowcaseSection onOpenContact={onOpenContact} />
    </div>
  );
};

export default WorkPage;
