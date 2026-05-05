import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'networking', label: '🤝 Networking', color: '#1D9E75', bg: '#E1F5EE', text: '#085041' },
  { id: 'professional', label: '💼 Professional', color: '#185FA5', bg: '#E6F1FB', text: '#0C447C' },
  { id: 'social', label: '🎉 Social', color: '#D85A30', bg: '#FAECE7', text: '#712B13' },
  { id: 'panel', label: '🎙️ Panel Discussion', color: '#534AB7', bg: '#EEEDFE', text: '#3C3489' },
  { id: 'alumni', label: '🎓 Alumni Talks', color: '#B31B1B', bg: '#FCEBEB', text: '#791F1F' },
  { id: 'workshop', label: '🛠️ Workshop', color: '#BA7517', bg: '#FAEEDA', text: '#633806' },
  { id: 'info', label: 'ℹ️ Info Session', color: '#3B6D11', bg: '#EAF3DE', text: '#27500A' },
  { id: 'cultural', label: '🌍 Cultural', color: '#993556', bg: '#FBEAF0', text: '#72243E' },
  { id: 'fundraiser', label: '💛 Fundraiser', color: '#639922', bg: '#EAF3DE', text: '#3B6D11' },
  { id: 'sports', label: '🏃 Sports & Wellness', color: '#3B6D11', bg: '#EAF3DE', text: '#27500A' },
];

const PERKS = ['🍕 Free food', '👕 Free merch', '🎟️ Raffle', '🌐 Open to all', '📷 Photo op'];

export default function PostEvent() {
  const navigate = useNavigate();
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [bannerPreview, setBannerPreview] = useState(null);

  const toggleCat = (id) => {
    setSelectedCats(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const togglePerk = (p) => {
    setSelectedPerks(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => { setPublishing(false); setPublished(true); }, 900);
  };

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBannerPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  if (published) return (
    <div style={{ maxWidth: 390, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center', gap: 14, background: '#F5F5F5' }}>
      <div style={{ fontSize: 52 }}>🎉</div>
      <div style={{ fontSize: 18, fontWeight: 500, color: '#111' }}>Event posted!</div>
      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>Your event is now live on Big Red Happenings. Students can find, RSVP, and add it to their calendars.</div>
      <div onClick={() => { setPublished(false); setSelectedCats([]); setSelectedPerks([]); setBannerPreview(null); }}
        style={{ marginTop: 8, fontSize: 13, color: '#B31B1B', border: '0.5px solid #B31B1B', borderRadius: 10, padding: '10px 24px', cursor: 'pointer' }}>Post another event</div>
      <div onClick={() => navigate('/')}
        style={{ fontSize: 13, color: '#666', cursor: 'pointer' }}>← Back to home</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', background: '#F5F5F5', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #E5E5E5', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
        <div onClick={() => navigate('/')}
          style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>←</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>Post a new event</div>
          <div style={{ fontSize: 11, color: '#999' }}>Cornell Product Club</div>
        </div>
      </div>

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Section: Basics */}
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>Event basics</div>

        {[
          { label: 'Event name', required: true, placeholder: 'e.g. PM & Strategy Networking Night', type: 'text' },
        ].map(f => (
          <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{f.label} {f.required && <span style={{ color: '#B31B1B' }}>*</span>}</div>
            <input type={f.type} placeholder={f.placeholder}
              style={{ width: '100%', fontSize: 13, padding: '9px 11px', borderRadius: 10, border: '0.5px solid #E5E5E5', background: '#fff', color: '#111', fontFamily: 'inherit' }} />
          </div>
        ))}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>Short description <span style={{ color: '#B31B1B' }}>*</span></div>
          <textarea rows={3} placeholder="Tell students what to expect in 2–3 sentences..."
            style={{ width: '100%', fontSize: 13, padding: '9px 11px', borderRadius: 10, border: '0.5px solid #E5E5E5', background: '#fff', color: '#111', fontFamily: 'inherit', resize: 'none' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[{ label: 'Date', type: 'date', required: true }, { label: 'Start time', type: 'time', required: true }, { label: 'End time', type: 'time' }, { label: 'Capacity', type: 'number', placeholder: 'e.g. 120' }].map(f => (
            <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>{f.label} {f.required && <span style={{ color: '#B31B1B' }}>*</span>}</div>
              <input type={f.type} placeholder={f.placeholder}
                style={{ width: '100%', fontSize: 13, padding: '9px 11px', borderRadius: 10, border: '0.5px solid #E5E5E5', background: '#fff', color: '#111', fontFamily: 'inherit' }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>Location <span style={{ color: '#B31B1B' }}>*</span></div>
          <input type="text" placeholder="Building & room, e.g. Statler Hall 100"
            style={{ width: '100%', fontSize: 13, padding: '9px 11px', borderRadius: 10, border: '0.5px solid #E5E5E5', background: '#fff', color: '#111', fontFamily: 'inherit' }} />
        </div>

        {/* Section: Banner */}
        <div style={{ height: '0.5px', background: '#E5E5E5' }} />
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>Event banner</div>

        {!bannerPreview ? (
          <label style={{ border: '1px dashed #CCC', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', background: '#fff' }}>
            <div style={{ fontSize: 24 }}>📷</div>
            <div style={{ fontSize: 13, color: '#666' }}>Tap to upload a banner</div>
            <div style={{ fontSize: 11, color: '#999' }}>Recommended: 1200×630px · JPG or PNG</div>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleBanner} />
          </label>
        ) : (
          <div>
            <img src={bannerPreview} alt="banner" style={{ width: '100%', borderRadius: 14, display: 'block' }} />
            <div onClick={() => setBannerPreview(null)} style={{ fontSize: 11, color: '#B31B1B', textAlign: 'center', marginTop: 6, cursor: 'pointer' }}>Remove banner</div>
          </div>
        )}

        {/* Section: Categories */}
        <div style={{ height: '0.5px', background: '#E5E5E5' }} />
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>Categories <span style={{ color: '#B31B1B', textTransform: 'none', fontSize: 11 }}>· pick at least one</span></div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {CATEGORIES.map(cat => {
            const selected = selectedCats.includes(cat.id);
            return (
              <div key={cat.id} onClick={() => toggleCat(cat.id)}
                style={{ fontSize: 12, padding: '7px 10px', borderRadius: 10, border: `0.5px solid ${selected ? cat.color : '#E5E5E5'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, background: selected ? cat.bg : '#fff', color: selected ? cat.text : '#555' }}>
                {cat.label}
                <div style={{ marginLeft: 'auto', width: 14, height: 14, borderRadius: 3, border: `1px solid ${selected ? cat.color : '#CCC'}`, background: selected ? cat.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', flexShrink: 0 }}>
                  {selected ? '✓' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: Perks */}
        <div style={{ height: '0.5px', background: '#E5E5E5' }} />
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>Perks & extras</div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PERKS.map(p => {
            const on = selectedPerks.includes(p);
            return (
              <div key={p} onClick={() => togglePerk(p)}
                style={{ fontSize: 12, padding: '6px 11px', borderRadius: 20, border: `0.5px solid ${on ? '#1D9E75' : '#E5E5E5'}`, cursor: 'pointer', background: on ? '#E1F5EE' : '#fff', color: on ? '#085041' : '#555' }}>
                {p}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#555' }}>Any other notes for students?</div>
          <textarea rows={2} placeholder="e.g. Business casual dress code, bring your resume..."
            style={{ width: '100%', fontSize: 13, padding: '9px 11px', borderRadius: 10, border: '0.5px solid #E5E5E5', background: '#fff', color: '#111', fontFamily: 'inherit', resize: 'none' }} />
          <div style={{ fontSize: 11, color: '#999' }}>Optional · Will appear at the bottom of the event page</div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: '0.5px solid #E5E5E5', padding: '12px 14px 20px', display: 'flex', gap: 10, zIndex: 10 }}>
        <div style={{ fontSize: 13, color: '#666', border: '0.5px solid #E5E5E5', borderRadius: 10, padding: '11px 14px', cursor: 'pointer' }}>Save draft</div>
        <div onClick={handlePublish}
          style={{ flex: 1, background: publishing ? '#999' : '#B31B1B', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 500, padding: 11, cursor: 'pointer', textAlign: 'center' }}>
          {publishing ? 'Publishing...' : 'Publish event'}
        </div>
      </div>
    </div>
  );
}