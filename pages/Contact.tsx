import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  Shield,
  Linkedin,
  Instagram,
  Twitter,
  Send
} from 'lucide-react';

const CONTACT_EMAIL = 'contact@aurexissolution.com';
const CONTACT_PHONE = '+60 16-407 1129';
const CONTACT_ADDRESS = 'Sungai Petani, Kedah, Malaysia';
const CALENDLY_URL = 'https://calendly.com/admin-aurexissolution/30min';
const WHATSAPP_URL = 'https://wa.me/60164071129?text=Hi%20Aurexis%20Solution';

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/aurexis-solution',
    icon: Linkedin,
    handle: '@aurexis-solution'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aurexis',
    icon: Instagram,
    handle: '@aurexis'
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/aurexis',
    icon: Twitter,
    handle: '@aurexis'
  }
];

const AVAILABILITY_STATS = [
  { label: 'Calendly slots', value: '3 open today' },
  { label: 'Ops lead on duty', value: 'Sanjay · CEO & Founder' },
  { label: 'Response pledge', value: '< 4 hrs' }
];

const TIMELINE_STEPS = [
  { label: 'Orbit 1', time: '09:30', status: 'open' },
  { label: 'Orbit 2', time: '13:00', status: 'filling' },
  { label: 'Orbit 3', time: '16:30', status: 'holding' }
];

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const body = [`Name: ${form.name}`, `Email: ${form.email}`, `Message: ${form.message}`].join('\n');

    try {
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New contact message')}&body=${encodeURIComponent(
        body
      )}`;
      window.location.href = mailto;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="contact-hero-tag">
            <Shield size={16} />
            Mission-grade response
          </p>
          <h1>Book a consult, drop ops a line, or plug into our channels.</h1>
          <p className="contact-hero-lede">
            Aurexis operators are live across GMT+8. Book a Calendly slot, message the desk directly, or grab our details to
            route through your internal workflow.
          </p>
          <div className="contact-hero-actions">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="contact-btn primary">
              <Calendar size={18} />
              Book via Calendly
              <ArrowRight size={18} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="contact-btn ghost">
              <MessageCircle size={18} />
              Message ops
            </a>
          </div>
          <div className="contact-hero-meta">
            <div>
              <p>Response time</p>
              <strong>&lt; 4 hrs</strong>
            </div>
            <div>
              <p>Ops window</p>
              <strong>09:00 – 20:00 GMT+8</strong>
            </div>
            <div>
              <p>Channels live</p>
              <strong>Email · WhatsApp · Slack</strong>
            </div>
          </div>
        </div>
        <div className="contact-hero-card">
          <div className="availability-chip">
            <span className="live-dot" />
            Next availability
          </div>
          <h3>Consultation orbit</h3>
          <p className="contact-hero-card-lede">Sync live with the ops desk. Slots lock instantly via Calendly.</p>
          <ul className="availability-stats">
            {AVAILABILITY_STATS.map((stat) => (
              <li key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </li>
            ))}
          </ul>
          <div className="availability-timeline">
            {TIMELINE_STEPS.map((step, index) => (
              <div className={`timeline-step ${step.status}`} key={step.label}>
                {index < TIMELINE_STEPS.length - 1 && <span className="timeline-connector" />}
                <span className="timeline-dot" />
                <div>
                  <p>{step.label}</p>
                  <strong>{step.time}</strong>
                </div>
              </div>
            ))}
          </div>
          <div className="availability-footer">
            <div>
              <p>Escalation path</p>
              <strong>Slack + Meet war room</strong>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="contact-btn glass">
              Reserve a slot
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-details">
        <article className="contact-card">
          <div className="contact-card-icon">
            <Mail size={20} />
          </div>
          <div>
            <p>Email</p>
            <strong>{CONTACT_EMAIL}</strong>
            <span>Send briefs, scopes, or NDAs.</span>
          </div>
        </article>
        <article className="contact-card">
          <div className="contact-card-icon">
            <Phone size={20} />
          </div>
          <div>
            <p>Phone / WhatsApp</p>
            <strong>{CONTACT_PHONE}</strong>
            <span>Immediate launch coordination.</span>
          </div>
        </article>
        <article className="contact-card">
          <div className="contact-card-icon">
            <MapPin size={20} />
          </div>
          <div>
            <p>Ops HQ</p>
            <strong>{CONTACT_ADDRESS}</strong>
            <span>Remote-first, on-site by request.</span>
          </div>
        </article>
      </section>

      <section className="contact-grid">
        <div className="contact-form-panel">
          <div className="contact-form-head">
            <p>Direct message</p>
            <h3>Send ops a note</h3>
            <span>We reply with next steps + timeline within four business hours.</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Name*</span>
              <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Jane Founder" required />
            </label>
            <label>
              <span>Email*</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@company.com"
                required
              />
            </label>
            <label className="full">
              <span>Message*</span>
              <textarea
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell us about the mission, stack, and timing."
                rows={5}
                required
              />
            </label>
            <button type="submit" className="contact-btn primary full" disabled={status === 'sending'}>
              <Send size={18} />
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && <p className="contact-form-feedback success">Draft opened in your mail client.</p>}
            {status === 'error' && (
              <p className="contact-form-feedback error">Unable to open mail client. Write us at {CONTACT_EMAIL}.</p>
            )}
          </form>
        </div>

        <div className="contact-social-panel">
          <div className="contact-form-head">
            <p>Channels</p>
            <h3>Social + community</h3>
            <span>Follow launches, hiring calls, and ops diaries.</span>
          </div>
          <ul>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <div>
                  <link.icon size={18} />
                  <div>
                    <strong>{link.label}</strong>
                    <span>{link.handle}</span>
                  </div>
                </div>
                <a href={link.href} target="_blank" rel="noreferrer" className="contact-btn ghost">
                  Visit
                  <ArrowRight size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Contact;
