import React from 'react';
import { Heart, MessageCircle, Send, UserRoundPlus } from 'lucide-react';
import member1 from '../../assets/team/member1.optimized.webp';
import member2 from '../../assets/team/vijay-photo.optimized.webp';
import member3 from '../../assets/team/karthikeyan-photo.optimized.webp';
import member4 from '../../assets/team/rashiban-cutout-hd.optimized.webp';
import member5 from '../../assets/team/sivath-cutout-hd.optimized.webp';
import member6 from '../../assets/team/naveen-photo.optimized.webp';
import cutoutsFirst from '../../assets/team/team-cutouts-1.optimized.webp';
import cutoutsSecond from '../../assets/team/team-cutouts-2.optimized.webp';
import karthikeyanCutout from '../../assets/team/karthikeyan-cutout.optimized.webp';
import vijayCutout from '../../assets/team/vijay-cutout.optimized.webp';
import naveenCutout from '../../assets/team/naveen-cutout.optimized.webp';
import './TeamSection.css';

const TEAM_MEMBERS = [
  { name: 'Karthi', portraitIndex: 2, role: 'Digital Marketing Specialist', nameLines: ['Karthi'], image: member3 },
  { name: 'Rashiban', portraitIndex: 3, role: 'Digital Marketing Specialist', nameLines: ['Rashiban'], image: member4 },
  { name: 'Naveen', portraitIndex: 5, role: 'Full Stack Developer', nameLines: ['Naveen'], image: member6 },
  { name: 'Karan', portraitIndex: 0, role: 'Digital Video Editor', nameLines: ['Karan'], image: member1 },
  { name: 'Vijay', portraitIndex: 1, role: 'Social Media & Video Executive', nameLines: ['Vijay'], image: member2 },
  { name: 'Sivath', portraitIndex: 4, role: 'Fullstack Developer', nameLines: ['Sivath'], image: member5 },
];

const portraitStyle = (index: number): React.CSSProperties => index === 2
  ? { backgroundImage: `url(${karthikeyanCutout})`, backgroundPosition: 'center top', backgroundSize: '100% auto' }
  : index === 1
  ? { backgroundImage: `url(${vijayCutout})`, backgroundPosition: 'center top', backgroundSize: '110% auto' }
  : index === 5
  ? { backgroundImage: `url(${naveenCutout})`, backgroundPosition: 'center -7.8cqw', backgroundSize: '92% auto' }
  : index === 3
  ? { backgroundImage: `url(${member4})`, backgroundPosition: 'center top', backgroundSize: '100% auto' }
  : index === 4
  ? { backgroundImage: `url(${member5})`, backgroundPosition: 'center top', backgroundSize: '100% auto' }
  : { backgroundImage: `url(${index < 3 ? cutoutsFirst : cutoutsSecond})`, backgroundPosition: `${(index % 3) * 50}% top` };

export const TeamSection: React.FC = () => (
  <section id="our-team" className="team-editorial" aria-labelledby="our-team-title">
    <div className="team-editorial__canvas">
    <header className="team-editorial__header">
      <p className="team-editorial__eyebrow"><span /> Yaazh 360 <span /></p>
      <h3 id="our-team-title" className="text-3xl font-bold">Meet our team</h3>
    </header>
    <div className="team-editorial__roster">
      {TEAM_MEMBERS.map((member, index) => (
        <article key={member.image} className={`team-editorial__member${index % 2 ? ' team-editorial__member--reverse' : ''}`} aria-label={`Team member ${index + 1}: ${member.name}`}>
          <div className="team-editorial__band">
            <div className="team-editorial__backdrop" aria-hidden="true"
              style={portraitStyle(member.portraitIndex)} />
          </div>
          <div className="team-editorial__content">
            <div className="team-editorial__portrait-slot">
              <div className="team-editorial__portrait" role="img" aria-label={`Portrait of ${member.name}`}
                style={portraitStyle(member.portraitIndex)} />
            </div>
            <div className="team-editorial__name">
              <h3 aria-label={member.name} style={{ fontSize: member.nameLines.some(line => line.length > 7) ? '8cqw' : undefined }}>
                {member.nameLines.map((word, i) => <span key={`${word}-${i}`}>{word}</span>)}
              </h3>
            </div>
            <div className="team-editorial__profile">
              {member.portraitIndex === 1 || member.portraitIndex === 5
                ? <div className="team-editorial__avatar" aria-hidden="true" style={{ backgroundImage: `url(${member.image})`, backgroundSize: member.portraitIndex === 1 ? '240% auto' : '130% auto', backgroundPosition: member.portraitIndex === 1 ? '60% 33%' : 'center 32%' }} />
                : member.portraitIndex === 2
                ? <div className="team-editorial__avatar" aria-hidden="true" style={{ backgroundImage: `url(${member.image})`, backgroundSize: '220% auto', backgroundPosition: '52% 48%' }} />
                : member.portraitIndex === 3
                ? <div className="team-editorial__avatar" aria-hidden="true" style={{ backgroundImage: `url(${member.image})`, backgroundSize: '200% auto', backgroundPosition: '52% top', backgroundRepeat: 'no-repeat' }} />
                : <img decoding="async" className="team-editorial__avatar" src={member.image} alt={`${member.name} - ${member.role}`} title={`${member.name} - ${member.role}`} width={400} height={400} loading="lazy" />}
              <p className="team-editorial__profile-name">{member.name}</p>
              <p className="team-editorial__role">{member.role}</p>
              <div className="team-editorial__social" aria-hidden="true">
                <Heart fill="currentColor" /><MessageCircle fill="currentColor" /><Send /><UserRoundPlus className="team-editorial__follow" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
    </div>
  </section>
);
export default TeamSection;
