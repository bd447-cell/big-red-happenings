import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rsvped, setRsvped] = useState(false);
  const [calAdded, setCalAdded] = useState(false);
  const [following, setFollowing] = useState(false);
  const [bannerOn, setBannerOn] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  async function fetchEvent() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.error(error);
    else setEvent(data);
    setLoading(false);
  }

  if (loading) return (
    <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>Loading event...</div>
  );

  if (!event) return (
    <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>Event not found.</div>
  );

  const avatarColors = ['#E1F5EE', '#EEEDFE', '#FAEEDA', '#E6F1FB', '#FCEBEB'];
  const avatarText = ['AK', 'JS', 'MR', 'TL', '+'];

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh', paddingBottom: 90, maxWidth: 390, margin: '0 auto' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 210, overflow: 'hidden', background: event.accent_color || '#B31B1B' }}>
        {bannerOn && event.banner_url && (
          <img src={event.banner_url} alt="banner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.6))' }} />
        <div onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 14, left: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 2, fontSize: 16 }}>←</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 14px 16px', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            {event.badges && event.badges.map(b => (
              <div key={b} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', color: '#fff' }}>{b}</div>
            ))}
          </div>
          <div style={{ fontSize: 19, fontWeight: 500, color: '#fff', lineHeight: 1.3, marginBottom: 4 }}>{event.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Hosted by {event.club_name}</div>
        </div>
      </div>

      {/* Banner toggle */}
      {event.banner_url && (
        <div onClick={() => setBannerOn(!bannerOn)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#999', padding: 8, cursor: 'pointer', borderBottom: '0.5px solid #E5E5E5', background: '#fff' }}>
          {bannerOn ? '✕ Remove banner preview' : '📷 Tap to preview with event banner'}
        </div>
      )}

      <div style={{ padding: '0 14px' }}>

        {/* Info card */}
        <div style={{ background: '#fff', border: '0.5px solid #E5E5E5', borderRadius: 14, padding: 14, margin: '12px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '📅', label: 'Date & Time', val: `${event.date} · ${event.start_time?.slice(0,5)} – ${event.end_time?.slice(0,5)}`, sub: event.doors_open ? `Doors open at ${event.doors_open?.slice(0,5)}` : null },
            { icon: '📍', label: 'Location', val: event.location, sub: event.location_sub },
            { icon: '🎟️', label: 'Admission', val: event.admission, sub: null },
          ].map((row, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: '0.5px', background: '#E5E5E5', margin: '0 0 12px' }} />}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{row.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: '#111', fontWeight: 500 }}>{row.val}</div>
                  {row.sub && <div style={{ fontSize: 12, color: '#666' }}>{row.sub}</div>}
                </div>
              </div>
            </div>
          ))}
          <div style={{ background: '#F5F5F5', border: '0.5px solid #E5E5E5', borderRadius: 10, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#999' }}>📍 Map preview · Tap for directions</div>
        </div>

        {/* Attendees */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <div style={{ display: 'flex' }}>
            {avatarText.map((a, i) => (
              <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid #F5F5F5', marginLeft: i === 0 ? 0 : -8, background: avatarColors[i], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: '#555' }}>{a}</div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            <strong style={{ color: '#111' }}>{event.attending} students</strong> are going
          </div>
        </div>

        {/* Description */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#111', margin: '16px 0 8px' }}>About this event</div>
        <div style={{ fontSize: 13, color: '#666', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{event.description}</div>

        {/* Notes */}
        {event.notes && (
          <div style={{ background: '#FAFAFA', border: '0.5px solid #E5E5E5', borderRadius: 10, padding: '10px 12px', margin: '14px 0', fontSize: 12, color: '#666' }}>
            📌 {event.notes}
          </div>
        )}

        {/* Club card */}
        <div style={{ fontSize: 13, fontWeight: 500, color: '#111', margin: '16px 0 8px' }}>Hosted by</div>
        <div style={{ background: '#fff', border: '0.5px solid #E5E5E5', borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{event.club_emoji || '🎓'}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{event.club_name}</div>
            <div style={{ fontSize: 12, color: '#666' }}>Upcoming events · Members</div>
          </div>
          <div onClick={() => setFollowing(!following)}
            style={{ marginLeft: 'auto', fontSize: 12, color: following ? '#fff' : '#B31B1B', background: following ? '#B31B1B' : 'transparent', border: '0.5px solid #B31B1B', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {following ? '✓ Following' : 'Follow'}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: '0.5px solid #E5E5E5', padding: '12px 14px 20px', display: 'flex', gap: 10, zIndex: 10 }}>
        <div onClick={() => setCalAdded(true)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 13, color: calAdded ? '#1D9E75' : '#B31B1B', border: `0.5px solid ${calAdded ? '#1D9E75' : '#B31B1B'}`, borderRadius: 10, padding: '11px 14px', cursor: 'pointer', flexShrink: 0 }}>
          {calAdded ? '✓ Added' : '+ Google Cal'}
        </div>
        <div onClick={() => setRsvped(!rsvped)}
          style={{ flex: 1, background: rsvped ? '#1D9E75' : '#B31B1B', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500, padding: 11, cursor: 'pointer', textAlign: 'center' }}>
          {rsvped ? '✓ You\'re going!' : 'RSVP · Going'}
        </div>
      </div>
    </div>
  );
}