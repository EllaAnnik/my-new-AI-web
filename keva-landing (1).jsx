import { useState, useEffect, useRef } from "react";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Mono:wght@400;500&display=swap');
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#05080d;color:#dde3ec;font-family:'Bricolage Grotesque',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
:root{
  --bg:#05080d;--bg1:#080d14;--bg2:#0c1320;--bg3:#101826;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.11);--border3:rgba(255,255,255,0.2);
  --cyan:#00d4f5;--cyan2:#00b8d9;--cyanDim:rgba(0,212,245,0.1);--cyanGlow:rgba(0,212,245,0.28);
  --green:#00f5a0;--greenDim:rgba(0,245,160,0.1);
  --text:#dde3ec;--muted:#6b7a8f;--dimmer:#2e3a4a;
  --mono:'DM Mono',monospace;
}
body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:0.022;background-size:160px}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:18px 52px;background:rgba(5,8,13,0.8);backdrop-filter:blur(24px) saturate(160%);border-bottom:1px solid var(--border)}
.nav-logo{font-size:20px;font-weight:800;letter-spacing:-0.5px;color:var(--text);display:flex;align-items:center}
.nav-logo .dot{color:var(--cyan);font-size:26px;line-height:0;position:relative;top:-1px}
.nav-links{display:flex;gap:32px}
.nav-links a{font-size:13.5px;font-weight:500;color:var(--muted);text-decoration:none;transition:color 0.18s;cursor:pointer}
.nav-links a:hover{color:var(--text)}
.nav-pill{background:var(--cyan);color:#000;font-size:13px;font-weight:700;letter-spacing:0.3px;padding:9px 22px;border:none;cursor:pointer;border-radius:2px;transition:all 0.2s;position:relative;overflow:hidden}
.nav-pill::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.15);transform:scaleX(0);transform-origin:left;transition:transform 0.25s}
.nav-pill:hover::after{transform:scaleX(1)}
.nav-pill:hover{box-shadow:0 0 28px var(--cyanGlow)}

/* HERO */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:140px 52px 100px;text-align:center}
.hero-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
.hero-orb{position:absolute;border-radius:50%;filter:blur(70px);animation:orbFloat 8s ease-in-out infinite}
.hero-orb.o1{width:700px;height:700px;top:-250px;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(0,212,245,0.12) 0%,transparent 70%);animation-delay:0s}
.hero-orb.o2{width:320px;height:320px;top:25%;left:8%;background:radial-gradient(circle,rgba(0,212,245,0.06) 0%,transparent 70%);animation-delay:-3s}
.hero-orb.o3{width:260px;height:260px;top:18%;right:6%;background:radial-gradient(circle,rgba(0,245,160,0.05) 0%,transparent 70%);animation-delay:-5.5s}
@keyframes orbFloat{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-28px)}}
.hero-grid{position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(0,212,245,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,245,0.035) 1px,transparent 1px);
  background-size:68px 68px;
  mask-image:radial-gradient(ellipse 85% 65% at 50% 40%,rgba(0,0,0,0.85) 5%,transparent 100%)}
.hero-inner{position:relative;z-index:1;max-width:900px}
.hero-chip{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--border2);background:linear-gradient(135deg,rgba(0,212,245,0.1),rgba(0,212,245,0.03));padding:7px 18px 7px 12px;border-radius:100px;margin-bottom:44px;font-size:12px;letter-spacing:1.4px;text-transform:uppercase;color:var(--cyan);font-weight:600;font-family:var(--mono)}
.chip-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:chipPulse 2s ease-in-out infinite}
@keyframes chipPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.55;transform:scale(0.75)}}
h1.hero-h{font-size:clamp(50px,7.5vw,88px);font-weight:800;letter-spacing:-3px;line-height:0.95;color:var(--text);margin-bottom:28px}
h1.hero-h em{font-style:normal;color:var(--cyan)}
h1.hero-h .h-dim{display:block;color:rgba(221,227,236,0.5);font-weight:700}
.hero-sub{font-size:18px;color:var(--muted);line-height:1.72;max-width:510px;margin:0 auto 52px}
.hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn-cta{background:var(--cyan);color:#000;font-size:14px;font-weight:700;letter-spacing:0.3px;padding:15px 34px;border:none;cursor:pointer;border-radius:2px;transition:all 0.22s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;position:relative;overflow:hidden}
.btn-cta::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transform:translateX(-100%);transition:transform 0.5s}
.btn-cta:hover::before{transform:translateX(100%)}
.btn-cta:hover{box-shadow:0 0 40px var(--cyanGlow),0 8px 24px rgba(0,0,0,0.4);transform:translateY(-2px)}
.btn-ghost{background:transparent;color:var(--text);font-size:14px;font-weight:600;letter-spacing:0.3px;padding:14px 32px;border:1px solid var(--border2);cursor:pointer;border-radius:2px;transition:all 0.22s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-ghost:hover{border-color:var(--cyan);color:var(--cyan);background:var(--cyanDim)}
.stat-bar{display:flex;margin-top:80px;border:1px solid var(--border);border-radius:3px;overflow:hidden;background:var(--bg1)}
.stat-item{flex:1;padding:24px 20px;text-align:center;border-right:1px solid var(--border);position:relative;transition:background 0.2s}
.stat-item:last-child{border-right:none}
.stat-item:hover{background:var(--bg2)}
.stat-item::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0;transition:opacity 0.3s}
.stat-item:hover::before{opacity:1}
.stat-num{font-family:var(--mono);font-size:26px;font-weight:500;color:var(--cyan);display:block;margin-bottom:4px}
.stat-label{font-size:11.5px;color:var(--muted);letter-spacing:0.3px}

/* LAYOUT */
.section{padding:110px 52px;max-width:1240px;margin:0 auto}
.stripe{background:var(--bg1);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.stripe .si{max-width:1240px;margin:0 auto;padding:110px 52px}
.tag{display:inline-flex;align-items:center;gap:8px;font-family:var(--mono);font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--cyan);font-weight:500;margin-bottom:22px}
.tag::before{content:'';width:20px;height:1px;background:var(--cyan);flex-shrink:0}
h2.sh{font-size:clamp(34px,4.5vw,54px);font-weight:800;letter-spacing:-2px;line-height:1.05;color:var(--text);margin-bottom:14px}
h2.sh em{font-style:normal;color:var(--cyan)}
.sdesc{font-size:17px;color:var(--muted);max-width:500px;line-height:1.72;margin-bottom:64px}

/* TRUST */
.trust{border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--bg1);padding:26px 52px;display:flex;align-items:center;justify-content:center;gap:44px;flex-wrap:wrap}
.ti{display:flex;align-items:center;gap:9px;font-size:13px;color:var(--muted);white-space:nowrap;font-weight:500}
.ti span{color:var(--green);font-size:14px}

/* SERVICES */
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:3px;overflow:hidden}
.svc-card{background:var(--bg1);padding:38px 34px;position:relative;overflow:hidden;transition:background 0.22s;cursor:default}
.svc-card::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--cyan),var(--cyan2),transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.3s}
.svc-card:hover{background:var(--bg2)}
.svc-card:hover::after{transform:scaleX(1)}
.svc-icon{width:44px;height:44px;border-radius:3px;margin-bottom:22px;display:flex;align-items:center;justify-content:center;font-size:18px;background:var(--cyanDim);border:1px solid rgba(0,212,245,0.18);transition:all 0.22s}
.svc-card:hover .svc-icon{background:rgba(0,212,245,0.18);box-shadow:0 0 18px var(--cyanDim)}
.svc-card h3{font-size:17px;font-weight:700;margin-bottom:11px;letter-spacing:-0.2px}
.svc-card p{font-size:14.5px;color:var(--muted);line-height:1.68}

/* STEPS */
.steps-row{display:grid;grid-template-columns:repeat(3,1fr)}
.step{padding:0 40px;border-right:1px solid var(--border);position:relative}
.step:last-child{border-right:none}
.step-n{font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--cyan);margin-bottom:26px;display:flex;align-items:center;gap:12px}
.step-n::after{content:'';flex:1;height:1px;background:var(--border)}
.step h3{font-size:21px;font-weight:800;letter-spacing:-0.4px;margin-bottom:12px}
.step p{font-size:15px;color:var(--muted);line-height:1.68}

/* INDUSTRIES */
.ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.ind-card{border:1px solid var(--border);background:var(--bg1);border-radius:3px;padding:26px 18px;text-align:center;transition:all 0.22s;cursor:default;position:relative;overflow:hidden}
.ind-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,var(--cyanDim),transparent 70%);opacity:0;transition:opacity 0.3s}
.ind-card:hover{border-color:var(--border3);transform:translateY(-4px);box-shadow:0 14px 36px rgba(0,0,0,0.45)}
.ind-card:hover::before{opacity:1}
.ind-icon{font-size:26px;margin-bottom:9px}
.ind-label{font-size:13px;font-weight:600;color:var(--text)}

/* VOICE PLAYER */
.vd-cols{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.voice-player{background:var(--bg2);border:1px solid var(--border2);border-radius:4px;overflow:hidden}
.vp-head{padding:15px 18px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.vp-av{width:36px;height:36px;border-radius:50%;background:var(--cyanDim);border:1px solid rgba(0,212,245,0.28);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.vp-nm{font-size:13px;font-weight:700}
.vp-st{font-size:11px;color:var(--green);display:flex;align-items:center;gap:5px;margin-top:2px;font-family:var(--mono)}
.vp-dot{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);flex-shrink:0;animation:chipPulse 2s infinite}
.vp-wave{padding:18px 18px 4px;height:68px;display:flex;align-items:center;gap:2px;overflow:hidden;cursor:pointer}
.wbar{width:3px;border-radius:2px;background:var(--border3);flex-shrink:0;min-height:4px;transition:background 0.1s,height 0.08s}
.wbar.act{background:var(--cyan)}
.vp-tx{padding:14px 18px 0;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:13px;scrollbar-width:thin;scrollbar-color:var(--border) transparent}
.tr{display:flex;flex-direction:column;gap:3px}
.tr-who{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase}
.tr-who.ai{color:var(--cyan)}.tr-who.caller{color:var(--muted)}
.tr-txt{font-size:14px;line-height:1.55}
.tr-txt.ai{color:var(--text)}.tr-txt.caller{color:var(--muted)}
.vp-chips{display:flex;gap:8px;flex-wrap:wrap;padding:10px 18px 12px}
.vchip{font-family:var(--mono);font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:2px;border:1px solid var(--border2);color:var(--muted)}
.vchip.g{border-color:rgba(0,245,160,0.3);color:var(--green)}
.vp-ctrl{padding:14px 18px;border-top:1px solid var(--border);display:flex;align-items:center;gap:12px}
.play-btn{width:38px;height:38px;border-radius:50%;border:none;cursor:pointer;background:var(--cyan);color:#000;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0}
.play-btn:hover{box-shadow:0 0 20px var(--cyanGlow);transform:scale(1.06)}
.track-w{flex:1}
.prog-track{height:3px;background:var(--border2);border-radius:2px;margin-bottom:5px;position:relative;cursor:pointer}
.prog-fill{position:absolute;left:0;top:0;bottom:0;background:var(--cyan);border-radius:2px;transition:width 0.08s linear}
.prog-knob{width:10px;height:10px;border-radius:50%;background:var(--cyan);position:absolute;top:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px var(--cyan);pointer-events:none}
.time-row{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10.5px;color:var(--muted)}

/* CHAT */
.demo-cols{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start}
.chat-win{background:var(--bg2);border:1px solid var(--border2);border-radius:4px;overflow:hidden}
.cw-hd{padding:13px 17px;background:var(--bg3);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px}
.cw-dot{width:8px;height:8px;border-radius:50%}
.chat-body{padding:20px 17px;display:flex;flex-direction:column;gap:13px;min-height:440px}
.msg{display:flex;flex-direction:column;gap:3px;max-width:80%}
.msg.ai{align-self:flex-start}.msg.user{align-self:flex-end;align-items:flex-end}
.msg-who{font-family:var(--mono);font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted)}
.msg-bub{padding:11px 14px;font-size:14px;line-height:1.55;border-radius:3px}
.msg.ai .msg-bub{background:var(--bg3);color:var(--text);border-left:2px solid var(--cyan)}
.msg.user .msg-bub{background:var(--cyan);color:#000;font-weight:500}
.t-dots{display:flex;gap:4px;padding:11px 14px;background:var(--bg3);border-left:2px solid var(--cyan);border-radius:3px;width:fit-content}
.td{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:tdB 1.1s infinite}
.td:nth-child(2){animation-delay:.18s}.td:nth-child(3){animation-delay:.36s}
@keyframes tdB{0%,60%,100%{transform:translateY(0);opacity:0.4}30%{transform:translateY(-7px);opacity:1}}
.msg.fade{opacity:0;transform:translateY(8px);transition:all 0.35s ease}
.msg.show{opacity:1;transform:translateY(0)}

/* FAQ */
.faq-wrap{border:1px solid var(--border);border-radius:3px;overflow:hidden}
.faq-item{border-bottom:1px solid var(--border)}
.faq-item:last-child{border-bottom:none}
.faq-q{padding:22px 28px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;transition:background 0.18s;font-size:16px;font-weight:600;letter-spacing:-0.2px;user-select:none}
.faq-q:hover{background:var(--bg2)}
.faq-plus{color:var(--cyan);font-size:22px;font-weight:300;transition:transform 0.28s;flex-shrink:0;margin-left:18px;line-height:1}
.faq-plus.open{transform:rotate(45deg)}
.faq-ans{overflow:hidden;transition:max-height 0.35s ease;max-height:0;font-size:15px;color:var(--muted);line-height:1.72}
.faq-ans.open{max-height:220px}
.faq-ai{padding:0 28px 22px}

/* CONTACT */
.cc{display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:start}
.cd{display:flex;align-items:flex-start;gap:15px;margin-bottom:22px}
.cd-ic{width:36px;height:36px;border:1px solid var(--border2);border-radius:3px;background:var(--cyanDim);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.cd-lbl{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.cd-val{font-size:15px;font-weight:600;color:var(--text)}
.cf{display:flex;flex-direction:column;gap:13px}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:13px}
.fg{display:flex;flex-direction:column;gap:7px}
.fg label{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted)}
.fg input,.fg textarea,.fg select{background:var(--bg);border:1px solid var(--border2);color:var(--text);font-family:'Bricolage Grotesque',sans-serif;font-size:15px;padding:13px 16px;outline:none;border-radius:2px;transition:border-color 0.2s,box-shadow 0.2s;width:100%;-webkit-appearance:none}
.fg input:focus,.fg textarea:focus,.fg select:focus{border-color:var(--cyan);box-shadow:0 0 0 3px var(--cyanDim)}
.fg textarea{min-height:110px;resize:vertical}
.fg select{cursor:pointer}
.fg select option{background:var(--bg2)}
.btn-sub{background:var(--cyan);color:#000;font-family:'Bricolage Grotesque',sans-serif;font-size:14px;font-weight:700;letter-spacing:0.3px;padding:14px 34px;border:none;cursor:pointer;border-radius:2px;transition:all 0.22s;align-self:flex-start;margin-top:6px;display:inline-flex;align-items:center;gap:8px}
.btn-sub:hover{box-shadow:0 0 32px var(--cyanGlow);transform:translateY(-2px)}
.success{text-align:center;padding:60px 40px;color:var(--green);font-size:18px;font-weight:700}

footer{background:var(--bg);border-top:1px solid var(--border);padding:28px 52px;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--dimmer)}
.fl{font-size:17px;font-weight:800;color:var(--muted)}
.fl span{color:var(--cyan)}

@media(max-width:900px){
  nav{padding:16px 20px}.nav-links{display:none}
  .section,.stripe .si{padding:72px 20px}
  .hero{padding:120px 20px 72px}
  .svc-grid{grid-template-columns:1fr}
  .steps-row{grid-template-columns:1fr;gap:0}
  .step{border-right:none;border-bottom:1px solid var(--border);padding:0 0 36px;margin-bottom:36px}
  .ind-grid{grid-template-columns:repeat(2,1fr)}
  .vd-cols,.demo-cols,.cc{grid-template-columns:1fr;gap:40px}
  .fr{grid-template-columns:1fr}
  .stat-bar{flex-wrap:wrap}.stat-item{min-width:50%}
  footer{flex-direction:column;gap:12px;text-align:center}
  .trust{gap:22px}
  h1.hero-h{letter-spacing:-2px}
}
`;

const SVCS = [
  {icon:"📞",h:"24/7 Call Handling",p:"Never misses a call — midnight, Sunday, public holiday. Every caller gets answered instantly, not voicemail."},
  {icon:"📅",h:"Appointment Booking",p:"Checks availability in real-time and books directly into your calendar. No double bookings, no callbacks."},
  {icon:"🌐",h:"Multilingual Support",p:"Automatically detects and speaks the customer's language. English, Spanish, Mandarin, Arabic, and more."},
  {icon:"🧠",h:"Custom Knowledge Base",p:"Trained exclusively on your business — your services, prices, team, policies. Your AI, not a generic bot."},
  {icon:"🌙",h:"After Hours Coverage",p:"Captures leads and books appointments even when you're closed. Wake up to confirmed bookings, not missed calls."},
  {icon:"⚡",h:"Fully Managed Setup",p:"We handle everything — discovery, training, integration, testing, launch. Live in 5–7 days, zero effort from you."},
];

const STEPS = [
  {n:"01",h:"We Learn Your Business",p:"A 45-minute discovery session covers everything — services, pricing, team, policies, FAQs, tone. We do all the work."},
  {n:"02",h:"We Build Your AI",p:"Our team trains a custom AI on your business, integrates with your booking system, and tests every scenario before launch."},
  {n:"03",h:"It Starts Answering",p:"Connected to your existing number or a new one. Every call answered instantly. Full transcripts land in your inbox."},
];

const INDS = [
  {icon:"✂️",l:"Hair & Beauty"},{icon:"🍽️",l:"Restaurants"},{icon:"🦷",l:"Dental"},
  {icon:"💪",l:"Gyms & Fitness"},{icon:"🔧",l:"Trades"},{icon:"🏥",l:"Medical"},
  {icon:"🏠",l:"Real Estate"},{icon:"🐾",l:"Veterinary"},
];

const FAQS = [
  {q:"How does the AI receptionist actually work?",a:"We build a custom AI model trained on everything about your business — services, prices, hours, team, policies, and FAQs. It connects to your existing phone number and handles calls like a knowledgeable staff member. Natural conversation, not a robotic menu system."},
  {q:"How much does it cost?",a:"Pricing is tailored to your business size and call volume, starting at a flat monthly fee with no per-call charges. Book a discovery call and we'll give you a clear quote within 24 hours — no hidden fees, ever."},
  {q:"Can it handle multiple languages?",a:"Yes. The AI automatically detects which language your customer is speaking and responds naturally in that language. We currently support English, Spanish, French, Mandarin, Arabic, Portuguese, and more."},
  {q:"What if the AI can't answer something?",a:"It knows its limits. If a question falls outside its knowledge base, it takes a message and tells the caller you'll follow up. You receive a full transcript and notification immediately after."},
  {q:"Will it integrate with my booking system?",a:"Yes. We integrate with Square, Mindbody, Calendly, Acuity, SimplyBook, and more. If you use something different, we'll assess it during onboarding — most platforms have an API we can connect to."},
  {q:"How long does setup take?",a:"Most clients are live within 5–7 business days. We handle everything — no code, no settings, no effort from you."},
];

const CALL = [
  {who:"ai",  text:"Thank you for calling Bella Aesthetics. This is Aria — how can I help you today?", t:0},
  {who:"cal", text:"Hi, I want to book a facial. Do you have anything this Saturday?", t:3.5},
  {who:"ai",  text:"We do! Saturday we have 10:30 AM and 2:00 PM available. Which works better for you?", t:7},
  {who:"cal", text:"2pm works. How long does it take?", t:12},
  {who:"ai",  text:"A standard facial is 60 minutes, so you'd be done by 3 o'clock. Can I grab your name?", t:15.5},
  {who:"cal", text:"It's Priya. Priya Shah.", t:20.5},
  {who:"ai",  text:"Perfect, Priya! You're booked for this Saturday at 2:00 PM — 60-minute facial. A confirmation text is on its way. Is there anything else I can help with?", t:23.5},
  {who:"cal", text:"No that's great, thank you!", t:31},
  {who:"ai",  text:"Amazing — we'll see you Saturday at 2. Have a lovely day, Priya!", t:33.5},
];
const TOTAL = 38;

const CHAT = [
  {from:"user",text:"Hi, I'd like to book a haircut for Saturday at 2pm?"},
  {from:"ai",  text:"Hi there! I'm the AI receptionist for Luxe Hair Studio. Happy to help with Saturday at 2:00 PM. Could I get your name and preferred stylist — or shall I find the next available?"},
  {from:"user",text:"It's Marcus. Any stylist is fine."},
  {from:"ai",  text:"Perfect, Marcus! Saturday 2:00 PM is available with Sarah — a standard haircut, about 45 minutes. Shall I confirm that for you?"},
  {from:"user",text:"Yes please! Also do you do beard trims?"},
  {from:"ai",  text:"Absolutely — beard trims are $20 as an add-on. Want me to include that? I'll bump the slot to an hour."},
  {from:"user",text:"Yes add it on!"},
  {from:"ai",  text:"Done! Booked for Saturday 2:00 PM — haircut + beard trim with Sarah. Confirmation SMS on its way. See you then! 🤙"},
];

const N = 58;
const BARS = Array.from({length:N},(_,i)=>({h:Math.max(4,Math.min(38,8+Math.sin(i*.46)*11+Math.sin(i*.18)*7+(i%5===0?9:0)))}));

function fmt(s){const m=Math.floor(s/60),sec=Math.floor(s%60);return`${m}:${sec.toString().padStart(2,'0')}`}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}

export default function Keva(){
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const [openFaq,setOpenFaq] = useState(null);

  /* chat */
  const [vis,setVis] = useState([]);
  const [typing,setTyping] = useState(false);
  const chatRef = useRef(null);
  const chatGo = useRef(false);
  useEffect(()=>{
    const o = new IntersectionObserver(([e])=>{
      if(e.isIntersecting && !chatGo.current){chatGo.current=true;runChat();}
    },{threshold:0.3});
    if(chatRef.current)o.observe(chatRef.current);
    return()=>o.disconnect();
  },[]);
  async function runChat(){
    for(let i=0;i<CHAT.length;i++){
      await sleep(i===0?800:1000);
      if(CHAT[i].from==="ai"){setTyping(true);await sleep(1100);setTyping(false);}
      setVis(p=>[...p,i]);await sleep(120);
    }
  }

  /* voice */
  const [playing,setPlaying] = useState(false);
  const [prog,setProg] = useState(0);
  const [el,setEl] = useState(0);
  const [visLines,setVisLines] = useState([]);
  const [barActives,setBarActives] = useState(BARS.map(()=>false));
  const raf = useRef(null);
  const t0 = useRef(null);
  const pauseEl = useRef(0);
  const shownLines = useRef([]);

  function updateBars(p){setBarActives(BARS.map((_,i)=>(i/N)<=p));}

  function tick(now){
    if(!t0.current)t0.current=now;
    const dt=(now-t0.current)/1000;
    const tot=pauseEl.current+dt;
    if(tot>=TOTAL){setPlaying(false);setProg(1);setEl(TOTAL);updateBars(1);return;}
    const p=tot/TOTAL;
    setProg(p);setEl(tot);updateBars(p);
    CALL.forEach((ln,i)=>{
      if(tot>=ln.t && !shownLines.current.includes(i)){
        shownLines.current=[...shownLines.current,i];
        setVisLines(v=>[...v,i]);
      }
    });
    raf.current=requestAnimationFrame(tick);
  }

  function togglePlay(){
    if(playing){
      setPlaying(false);pauseEl.current=el;cancelAnimationFrame(raf.current);t0.current=null;
    } else {
      if(el>=TOTAL){pauseEl.current=0;setEl(0);setProg(0);setVisLines([]);shownLines.current=[];updateBars(0);}
      else pauseEl.current=el;
      setPlaying(true);t0.current=null;raf.current=requestAnimationFrame(tick);
    }
  }
  useEffect(()=>()=>cancelAnimationFrame(raf.current),[]);

  function seek(e){
    const r=e.currentTarget.getBoundingClientRect();
    const p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
    const ne=p*TOTAL;
    pauseEl.current=ne;setEl(ne);setProg(p);updateBars(p);
    const shown=CALL.map((l,i)=>l.t<=ne?i:-1).filter(i=>i>=0);
    shownLines.current=shown;setVisLines(shown);
    if(playing)t0.current=null;
  }

  /* form */
  const [form,setForm] = useState({name:'',email:'',phone:'',business:'',industry:'',message:''});
  const [sent,setSent] = useState(false);
  function submit(e){e.preventDefault();setTimeout(()=>setSent(true),300);}

  return(
    <>
      <style>{G}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">keva<span className="dot">.</span>store</div>
        <div className="nav-links">
          <a onClick={()=>scrollTo("services")}>Services</a>
          <a onClick={()=>scrollTo("how")}>How It Works</a>
          <a onClick={()=>scrollTo("voice-demo")}>Demo</a>
          <a onClick={()=>scrollTo("faq")}>FAQ</a>
        </div>
        <button className="nav-pill" onClick={()=>scrollTo("contact")}>Book a Call</button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg">
          <div className="hero-orb o1"/><div className="hero-orb o2"/><div className="hero-orb o3"/>
          <div className="hero-grid"/>
        </div>
        <div className="hero-inner">
          <div className="hero-chip"><div className="chip-dot"/>AI Receptionist Agency · Australia</div>
          <h1 className="hero-h">
            Your Business<br/><em>Never Misses</em>
            <span className="h-dim">A Call. Ever.</span>
          </h1>
          <p className="hero-sub">We build custom AI receptionists that answer your phone 24/7, book appointments, speak any language, and know everything about your business.</p>
          <div className="hero-ctas">
            <button className="btn-cta" onClick={()=>scrollTo("contact")}>Book a Free Discovery Call <span>→</span></button>
            <button className="btn-ghost" onClick={()=>scrollTo("voice-demo")}>Hear It Live <span>▶</span></button>
          </div>
          <div className="stat-bar">
            {[["24/7","Always On"],["<2s","Answer Time"],["10+","Languages"],["0","Setup Effort (For You)"]].map(([n,l])=>(
              <div className="stat-item" key={l}><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST */}
      <div className="trust">
        {[["✓","Full setup included"],["✓","No per-call fees"],["✓","Live in 5–7 days"],["✓","Cancel anytime"],["✓","100% managed service"]].map(([ic,t])=>(
          <div className="ti" key={t}><span>{ic}</span>{t}</div>
        ))}
      </div>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="tag">What We Do</div>
        <h2 className="sh">Everything your front desk<br/><em>should</em> be.</h2>
        <p className="sdesc">One custom-built AI handles your entire inbound call experience — trained specifically on your business, not a generic chatbot.</p>
        <div className="svc-grid">
          {SVCS.map(s=>(
            <div className="svc-card" key={s.h}>
              <div className="svc-icon">{s.icon}</div>
              <h3>{s.h}</h3><p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <div className="stripe" id="how">
        <div className="si">
          <div className="tag">The Process</div>
          <h2 className="sh">Live in a week.<br/><em>Zero effort</em> from you.</h2>
          <p className="sdesc">Three steps. We handle all of them.</p>
          <div className="steps-row">
            {STEPS.map((s,i)=>(
              <div className="step" key={s.n}>
                <div className="step-n">{s.n}</div>
                <h3>{s.h}</h3><p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INDUSTRIES */}
      <section className="section" id="industries">
        <div className="tag">Industries We Serve</div>
        <h2 className="sh">Built for businesses<br/>that run on calls.</h2>
        <p className="sdesc">If customers call to book, enquire, or get information — we can automate it.</p>
        <div className="ind-grid">
          {INDS.map(ind=>(
            <div className="ind-card" key={ind.l}>
              <div className="ind-icon">{ind.icon}</div>
              <div className="ind-label">{ind.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VOICE DEMO */}
      <div className="stripe" id="voice-demo">
        <div className="si">
          <div className="vd-cols">
            <div>
              <div className="tag">Live Voice Demo</div>
              <h2 className="sh">Hear what your customers<br/><em>actually</em> hear.</h2>
              <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.72,marginTop:18,marginBottom:28}}>
                Press play to hear a real AI receptionist handling a booking call for a beauty salon. Natural conversation, instant answers, confirmed appointment — zero humans involved.
              </p>
              {[["🎯","Books the appointment end-to-end"],["⚡","Responds in under 2 seconds"],["🌐","No hold music, no callback needed"],["📝","You receive a full transcript after every call"]].map(([ic,t])=>(
                <div key={t} style={{display:"flex",alignItems:"center",gap:10,fontSize:14,color:"var(--muted)",marginBottom:10}}><span style={{fontSize:15}}>{ic}</span>{t}</div>
              ))}
              <div style={{marginTop:28,padding:18,background:"var(--cyanDim)",border:"1px solid rgba(0,212,245,0.15)",borderRadius:3}}>
                <p style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--cyan)",marginBottom:5}}>Business Type</p>
                <p style={{fontSize:14,color:"var(--muted)"}}>Bella Aesthetics — cosmetic & facial salon</p>
              </div>
            </div>

            <div className="voice-player">
              <div className="vp-head">
                <div className="vp-av">🤖</div>
                <div>
                  <div className="vp-nm">Aria · Bella Aesthetics AI</div>
                  <div className="vp-st"><div className="vp-dot"/>{playing?"On call...":el>0?"Call ended":"Ready to play"}</div>
                </div>
              </div>

              {/* waveform */}
              <div className="vp-wave" onClick={seek}>
                {BARS.map((b,i)=>(
                  <div key={i} className={`wbar${barActives[i]?" act":""}`}
                    style={{height:`${barActives[i]&&playing?b.h+Math.abs(Math.sin(Date.now()/140+i*0.7))*3:b.h}px`}}/>
                ))}
              </div>

              {/* transcript */}
              <div className="vp-tx">
                {visLines.length===0&&<p style={{fontSize:13,color:"var(--muted)",fontFamily:"var(--mono)",letterSpacing:1}}>Press play to start the call...</p>}
                {CALL.map((ln,i)=>visLines.includes(i)&&(
                  <div className="tr" key={i}>
                    <div className={`tr-who ${ln.who==="ai"?"ai":"caller"}`}>{ln.who==="ai"?"Aria (AI)":"Customer"}</div>
                    <div className={`tr-txt ${ln.who==="ai"?"ai":"caller"}`}>{ln.text}</div>
                  </div>
                ))}
              </div>

              <div className="vp-chips">
                <div className="vchip g">✓ Appointment Booked</div>
                <div className="vchip">EN</div>
                <div className="vchip">0:38</div>
              </div>

              <div className="vp-ctrl">
                <button className="play-btn" onClick={togglePlay}>{playing?"⏸":"▶"}</button>
                <div className="track-w">
                  <div className="prog-track" onClick={seek}>
                    <div className="prog-fill" style={{width:`${prog*100}%`}}/>
                    <div className="prog-knob" style={{left:`${prog*100}%`}}/>
                  </div>
                  <div className="time-row"><span>{fmt(el)}</span><span>{fmt(TOTAL)}</span></div>
                </div>
                <span style={{fontSize:17,color:"var(--muted)",cursor:"default"}}>🔊</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHAT DEMO */}
      <section className="section" id="demo">
        <div className="demo-cols">
          <div>
            <div className="tag">Conversation Demo</div>
            <h2 className="sh">See how natural<br/>it <em>sounds</em>.</h2>
            <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.72,marginTop:18,marginBottom:28}}>
              A real booking conversation the AI handles for a hair salon. It answers questions, checks availability, confirms the appointment, and even upsells an add-on — the customer hangs up with a booking.
            </p>
            <div style={{padding:18,background:"var(--greenDim)",border:"1px solid rgba(0,245,160,0.15)",borderRadius:3}}>
              <p style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--green)",marginBottom:5}}>Outcome</p>
              <p style={{fontSize:14,color:"var(--muted)"}}>Appointment booked, add-on upsold, customer confirmed — zero human involvement.</p>
            </div>
          </div>
          <div ref={chatRef}>
            <div className="chat-win">
              <div className="cw-hd">
                <div className="cw-dot" style={{background:"#ff5f56"}}/><div className="cw-dot" style={{background:"#ffbd2e"}}/><div className="cw-dot" style={{background:"#27c93f"}}/>
                <span style={{flex:1,textAlign:"center",fontSize:11,color:"var(--muted)",fontFamily:"var(--mono)"}}>Luxe Hair Studio · AI Receptionist</span>
              </div>
              <div className="chat-body">
                {CHAT.map((msg,i)=>(
                  <div key={i} className={`msg ${msg.from} ${vis.includes(i)?"show":"fade"}`}>
                    <div className="msg-who">{msg.from==="ai"?"AI Receptionist":"Customer"}</div>
                    <div className="msg-bub">{msg.text}</div>
                  </div>
                ))}
                {typing&&(
                  <div className="msg ai show">
                    <div className="msg-who">AI Receptionist</div>
                    <div className="t-dots"><div className="td"/><div className="td"/><div className="td"/></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="stripe" id="faq">
        <div className="si">
          <div className="tag">Common Questions</div>
          <h2 className="sh">Everything you want<br/>to <em>know</em>.</h2>
          <p className="sdesc" style={{marginBottom:48}}>Still unsure? Book a free call — we'll walk you through it.</p>
          <div className="faq-wrap">
            {FAQS.map((faq,i)=>(
              <div className="faq-item" key={i}>
                <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                  {faq.q}<span className={`faq-plus${openFaq===i?" open":""}`}>+</span>
                </div>
                <div className={`faq-ans${openFaq===i?" open":""}`}>
                  <div className="faq-ai">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="cc">
          <div>
            <div className="tag">Get In Touch</div>
            <h2 className="sh">Let's build your<br/><em>AI receptionist.</em></h2>
            <p style={{fontSize:16,color:"var(--muted)",lineHeight:1.72,marginTop:18,marginBottom:40}}>
              Book a free 30-minute discovery call. We'll learn about your business, answer every question, and show you exactly what's possible — no pressure, no pitch.
            </p>
            <div className="cd"><div className="cd-ic">📧</div><div><div className="cd-lbl">Email</div><div className="cd-val">kirkkodre@gmail.com</div></div></div>
            <div className="cd"><div className="cd-ic">📱</div><div><div className="cd-lbl">Phone / WhatsApp</div><div className="cd-val">0480 358 990</div></div></div>
            <div style={{padding:18,border:"1px solid var(--border)",background:"var(--bg1)",borderRadius:3,marginTop:4}}>
              <p style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"1.5px",textTransform:"uppercase",color:"var(--cyan)",marginBottom:5}}>Response Time</p>
              <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.65}}>We reply within 4 business hours. Discovery calls typically available within 48 hours.</p>
            </div>
          </div>
          <div>
            {sent?(
              <div className="success"><div style={{fontSize:44,marginBottom:16}}>✅</div><div>Message received.</div><div style={{fontSize:15,color:"var(--muted)",fontWeight:400,marginTop:10}}>We'll be in touch within 4 hours.</div></div>
            ):(
              <form className="cf" onSubmit={submit}>
                <div className="fr">
                  <div className="fg"><label>Name</label><input type="text" placeholder="Jane Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></div>
                  <div className="fg"><label>Email</label><input type="email" placeholder="jane@yourbiz.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
                </div>
                <div className="fr">
                  <div className="fg"><label>Phone</label><input type="tel" placeholder="04XX XXX XXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                  <div className="fg"><label>Business Name</label><input type="text" placeholder="Bella Aesthetics" value={form.business} onChange={e=>setForm({...form,business:e.target.value})}/></div>
                </div>
                <div className="fg">
                  <label>Industry</label>
                  <select value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})}>
                    <option value="">Select your industry</option>
                    <option>Hair & Beauty</option><option>Restaurant / Café</option><option>Dental</option>
                    <option>Gym / Fitness</option><option>Trades / Services</option>
                    <option>Medical / Allied Health</option><option>Real Estate</option>
                    <option>Veterinary</option><option>Other</option>
                  </select>
                </div>
                <div className="fg">
                  <label>Tell us about your situation</label>
                  <textarea placeholder="How many calls per day? Main challenge — missed calls, after hours, language barriers?" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                </div>
                <button type="submit" className="btn-sub">Send Enquiry <span>→</span></button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="fl">keva<span>.</span>store</div>
        <div>AI Receptionist Agency · Australia</div>
        <div>© 2025 Keva. All rights reserved.</div>
      </footer>
    </>
  );
}
