import { useState } from 'react';
import { Bell, CalendarDays, Check, ChevronRight, CircleHelp, Eye, EyeOff, Gift, Home, LockKeyhole, Mail, Phone, Play, Search, ShieldCheck, Sparkles, Star, Trophy, WalletCards, X, Zap } from 'lucide-react';

function SlotPreviewWall() {
  return <div className="slot-preview-wall"><div className="preview-label"><LockKeyhole size={12} /> UNLOCK THE FULL LOBBY</div><div className="preview-cards"><div className="preview-card preview-card-mirage"><span className="preview-badge">HOT</span><div className="preview-symbols"><b>7</b><b>✦</b><b>7</b></div><strong>Midnight<br />Mirage</strong><small>5 reels · 20 paylines</small></div><div className="preview-card preview-card-golden"><span className="preview-badge">TOP PICK</span><div className="preview-symbols"><b>♦</b><b>7</b><b>♦</b></div><strong>Golden<br />Hour</strong><small>4 reels · 25 paylines</small></div><div className="preview-card preview-card-neon"><span className="preview-badge">NEW</span><div className="preview-symbols"><b>✦</b><b>✹</b><b>✦</b></div><strong>Neon<br />Wilds</strong><small>5 reels · 40 paylines</small></div></div><p className="preview-more"><Sparkles size={13} /> plus 20+ games waiting inside</p></div>;
}

function WelcomeScreen({ onSignup }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', phone: '', dob: '', password: '', terms: false });

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const continueSignup = (event) => {
    event.preventDefault();
    setError('');
    if (step === 1) {
      const birthday = new Date(form.dob);
      const age = new Date().getFullYear() - birthday.getFullYear();
      if (!form.email || !form.phone || !form.dob || Number.isNaN(birthday.getTime()) || age < 18) {
        setError('Enter a valid email, phone number, and confirm you are 18 or older.');
        return;
      }
      setStep(2);
      return;
    }
    if (form.password.length < 8 || !form.terms) {
      setError('Use at least 8 characters and accept the terms to continue.');
      return;
    }
    onSignup();
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-visual"><div className="welcome-brand">Ember<span>Play</span></div><div className="visual-copy"><p className="eyebrow"><Sparkles size={14} /> YOUR LUCKY HOUR STARTS HERE</p><h1>Play more.<br /><em>Feel more.</em></h1><p>Beautiful games, thoughtful rewards, and a club that actually feels good to be part of.</p></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /><SlotPreviewWall /><div className="visual-foot"><span><ShieldCheck size={14} /> Secure & private</span><span>18+ only</span></div></div>
      <div className="signup-panel"><div className="signup-top"><span className="signup-step">STEP {step} OF 2</span><span className="member-link">Already a member? <button type="button" onClick={() => setError('Sign in is coming soon. Create a new club account to enter today.')}>Sign in</button></span></div><div className="progress-track"><span style={{ width: step === 1 ? '50%' : '100%' }} /></div><div className="signup-heading"><p className="eyebrow">WELCOME TO THE CLUB</p><h2>{step === 1 ? 'Your seat is saved.' : 'Make it yours.'}</h2><p>{step === 1 ? 'Create your account and get a little extra luck on us.' : 'One secure password, then the lobby is yours.'}</p></div><div className="welcome-offer"><div className="offer-symbol"><Gift size={21} /></div><div><strong>FREE 5 SC</strong><span>upon sign up</span></div><div className="offer-arrow"><ChevronRight size={17} /></div></div><form className="signup-form" onSubmit={continueSignup}>{step === 1 ? <><label><span>Email address</span><div className="input-wrap"><Mail size={17} /><input type="email" value={form.email} onChange={(event) => updateForm('email', event.target.value)} placeholder="you@example.com" autoComplete="email" /></div></label><label><span>Mobile number</span><div className="input-wrap"><Phone size={17} /><input type="tel" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} placeholder="(555) 000-0000" autoComplete="tel" /></div></label><label><span>Date of birth</span><div className="input-wrap"><CalendarDays size={17} /><input type="date" value={form.dob} onChange={(event) => updateForm('dob', event.target.value)} autoComplete="bday" /></div></label></> : <><label><span>Create password</span><div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => updateForm('password', event.target.value)} placeholder="At least 8 characters" autoComplete="new-password" /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label><label className="check-row"><input type="checkbox" checked={form.terms} onChange={(event) => updateForm('terms', event.target.checked)} /><span>I agree to the <a href="#terms">Terms, Privacy Policy, and Sweeps Rules</a>.</span></label><div className="trust-note"><Check size={15} /> Your information is encrypted and never sold.</div></>}</form>{error && <p className="form-error">{error}</p>}<button className="signup-submit" onClick={continueSignup}>{step === 1 ? 'Continue securely' : 'Enter EmberPlay'} <ChevronRight size={17} /></button><p className="signup-disclaimer">By joining, you confirm you are 18+ and located in an eligible jurisdiction. No purchase necessary to enter. Void where prohibited.</p><div className="signup-benefits"><span><Zap size={15} /> Instant bonus</span><span><WalletCards size={15} /> Fast prize redemptions</span></div></div>
    </div>
  );
}

export default function App() {
  const [isMember, setIsMember] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const categories = ['Trending', 'Slots', 'Table games', 'New releases'];
  const games = [
    { title: 'Midnight Mirage', type: '5 reels · 20 paylines', art: 'mirage', tag: 'HOT', rating: '4.9' },
    { title: 'Golden Hour', type: '4 reels · 25 paylines', art: 'golden', tag: 'TOP PICK', rating: '4.8' },
    { title: 'Lucky Lanterns', type: '3 reels · 10 paylines', art: 'lanterns', tag: 'NEW', rating: '4.7' },
    { title: 'Neon Wilds', type: '5 reels · 40 paylines', art: 'neon', tag: 'EXCLUSIVE', rating: '4.9' },
  ];

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2800);
  };

  if (!isMember) return <WelcomeScreen onSignup={() => setIsMember(true)} />;

  return (
    <div className="casino-shell">
      <aside className="side-rail"><button className="brand-mark" onClick={() => showNotice('Welcome to EmberPlay')} aria-label="EmberPlay home">E<span>•</span></button><nav className="rail-nav" aria-label="Main navigation"><button className="rail-link active" onClick={() => showNotice('You are already home')}><Home size={19} /><span>Lobby</span></button><button className="rail-link" onClick={() => showNotice('Your favorites are ready to collect')}><Star size={19} /><span>Favorites</span></button><button className="rail-link" onClick={() => showNotice('Tournaments open every Friday')}><Trophy size={19} /><span>Playoffs</span></button><button className="rail-link" onClick={() => showNotice('Rewards are on their way')}><Gift size={19} /><span>Rewards</span></button></nav><button className="rail-help" onClick={() => showNotice('Support is online 24/7')}><CircleHelp size={18} /><span>Help</span></button></aside>
      <main className="main-stage"><header className="topbar"><div className="mobile-brand">Ember<span>Play</span></div><div className="topbar-links"><span>18+ only</span><span className="live-dot" /> <span>Play responsibly</span></div><div className="top-actions"><button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search games"><Search size={19} /></button><button className="icon-button notification" onClick={() => showNotice('No new notifications')} aria-label="Notifications"><Bell size={19} /><i /></button><button className="avatar" onClick={() => showNotice('Profile settings coming soon')} aria-label="Open profile">JD</button></div></header>
        {searchOpen && <div className="search-popover"><Search size={17} /><input autoFocus placeholder="Search games, themes, or features" /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button></div>}
        <div className="content-wrap"><section className="welcome-row"><div><p className="eyebrow"><Sparkles size={14} /> THE GOOD STUFF</p><h1>Play something <em>beautiful.</em></h1><p className="welcome-copy">Fresh games, generous rewards, and zero weird vibes.</p></div><div className="wallet-card"><div className="wallet-heading"><span>YOUR BALANCE</span><WalletCards size={17} /></div><strong>2,450 <small>GC</small></strong><div className="sc-balance">+ 12.50 SC <span>available</span></div><button onClick={() => showNotice('Buy Gold Coins is ready for you')}>Get Gold Coins <ChevronRight size={15} /></button></div></section>
          <section className="hero-game"><div className="hero-copy"><span className="pill"><Zap size={13} fill="currentColor" /> FEATURED DROP</span><p className="hero-kicker">A little mystery never hurt</p><h2>Moonlit<br /><span>Fortune</span></h2><p className="hero-description">Chase the moon. Catch the wilds. Find your lucky hour.</p><button className="primary-button" onClick={() => showNotice('Launching Moonlit Fortune demo')}><Play size={16} fill="currentColor" /> Play now</button></div><div className="hero-art" aria-label="Moonlit Fortune game artwork"><div className="moon" /><div className="mountain mountain-one" /><div className="mountain mountain-two" /><div className="hero-reel"><span>✦</span><span>7</span><span>✦</span></div></div><div className="hero-meta"><span><strong>98.7%</strong> player return</span><span><Star size={14} fill="currentColor" /> 4.9</span></div></section>
          <section className="section-heading"><div><p className="eyebrow">BROWSE THE LOBBY</p><h2>Find your kind of fun</h2></div><button className="text-button" onClick={() => showNotice('Showing every game in the lobby')}>View all <ChevronRight size={16} /></button></section><div className="category-tabs" role="tablist">{categories.map((category) => <button key={category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div><div className="game-grid">{games.map((game) => <article className="game-card" key={game.title} onClick={() => showNotice(`Launching ${game.title} demo`)}><div className={`game-art ${game.art}`}><span className="game-tag">{game.tag}</span><div className="game-art-title">{game.title}</div><button className="card-play" aria-label={`Play ${game.title}`}><Play size={15} fill="currentColor" /></button></div><div className="game-info"><div><h3>{game.title}</h3><p>{game.type}</p></div><span className="rating"><Star size={12} fill="currentColor" />{game.rating}</span></div></article>)}</div>
          <section className="promo-strip"><div className="promo-icon"><Gift size={22} /></div><div><p className="eyebrow">WEEKLY DROP</p><h2>Get 5,000 GC on us.</h2><p>New players get a welcome boost. No catch, just play.</p></div><button className="secondary-button" onClick={() => showNotice('Welcome offer claimed')}>Claim offer <ChevronRight size={16} /></button></section><footer><span>© 2025 EmberPlay</span><span>Terms · Privacy · Sweeps rules</span><span>Gold Coins have no cash value. SC prizes subject to eligibility.</span></footer></div></main>{notice && <div className="toast"><Sparkles size={16} /> {notice}</div>}
    </div>
  );
}