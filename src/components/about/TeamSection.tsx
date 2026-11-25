import React from 'react';
import { Heart, MessageCircle, Send, UserRoundPlus } from 'lucide-react';
import member1 from '../../assets/team/member1.optimized.webp';
import member2 from '../../assets/team/vijay-photo.optimized.webp';
import member3 from '../../assets/team/karthikeyan-photo.optimized.webp';
import member4 from '../../assets/team/rashiban-cutout-hd.optimized.webp';
import member5 from '../../assets/team/sivath-cutout-hd.optimized.webp';
import member6 from '../../assets/team/naveen-photo.optimized.webp';
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
  : { backgroundImage: `url(${member1})` };

export const TeamSection: React.FC = () => (
  <section id="our-team" className="team-editorial" aria-labelledby="our-team-title">
    <svg className="absolute" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="karan-portrait-outline" clipPathUnits="objectBoundingBox">
          {/* Trace the 682 × 1024 source photo in its native pixel coordinates. */}
          <path
            transform="scale(0.00146627566 0.0009765625)"
            d="M 358 106
               C 326 108 299 110 277 122 C 251 136 243 153 232 173
               C 222 192 215 205 205 220 C 196 235 191 248 195 266
               C 197 286 210 299 221 309 C 225 315 221 330 223 347
               C 224 371 230 387 243 393 C 250 399 247 423 253 439
               C 258 451 265 460 257 475 C 263 473 269 482 267 500
               C 275 513 278 515 268 524 C 248 536 231 550 208 552
               Q 202 552 198 548 C 174 576 133 579 95 606
               C 56 631 26 670 12 708 C 6 741 3 777 0 801
               V 1024 H 682 V 684 C 664 646 643 631 617 614
               C 568 579 514 572 479 549 C 465 539 460 538 454 539
               C 450 524 451 505 452 486 C 448 476 449 459 453 445
               C 462 422 466 400 472 387 C 492 379 502 359 499 343
               C 500 322 495 309 489 300 C 503 281 516 256 514 236
               C 518 218 509 196 501 184 C 492 145 474 129 455 117
               C 436 104 406 101 385 104 Q 369 101 358 106 Z"
          />
        </clipPath>
      </defs>
    </svg>
    <div className="team-editorial__canvas">
    <header className="team-editorial__header">
      <p className="team-editorial__eyebrow"><span /> Yaazh 360 <span /></p>
      <h3 id="our-team-title" className="text-3xl font-bold">Meet our team</h3>
    </header>
    <div className="team-editorial__roster">
      {TEAM_MEMBERS.map((member, index) => (
        <article key={member.image} className={`team-editorial__member${index % 2 ? ' team-editorial__member--reverse' : ''}${member.portraitIndex === 0 ? ' team-editorial__member--karan' : ''}`} aria-label={`Team member ${index + 1}: ${member.name}`}>
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
                : member.portraitIndex === 0
                ? <div className="team-editorial__avatar" aria-hidden="true" style={portraitStyle(member.portraitIndex)} />
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
