import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'food', label: '🍕 Free Food' },
  { id: 'networking', label: '🤝 Networking' },
  { id: 'professional', label: '💼 Professional' },
  { id: 'social', label: '🎉 Social' },
  { id: 'alumni', label: '🎓 Alumni Talks' },
  { id: 'panel', label: '🎙️ Panel' },
  { id: 'workshop', label: '🛠️ Workshop' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (error) console.error(error);
    else setEvents(data);
    setLoading(false);
  }

  const filtered = activeFilter === 'all'
    ? events
    : events.filter(e => e.categories && e.categories.includes(activeFilter));

  return (
    <div style={{ background: '#F5F5F5', minHeight: '100vh', paddingBottom: 80 }}>
      {/* Topbar */}
      <div style={{ background: '#fff', borderBottom: '0.5px solid #E5E5E5', padding: '14px 16px 10px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#B31B1B' }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: '#111' }}>Big Red Happenings</div>
              <div style={{ fontSize: 11, color: '#999' }}>Cornell University · {events.length} events this week</div>
            </div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#FCEBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 500, color: '#B31B1B' }}>BD</div>
        </div>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5F5F5', border: '0.5px solid #E5E5E5', borderRadius: 10, padding: '7px 10px', marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: '#999' }}>🔍</span>
          <span style={{ fontSize: 13, color: '#999' }}>Search events, clubs...</span>
        </div>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} onClick={() => setActiveFilter(cat.id)}
              style={{ flexShrink: 0, fontSize: 12, padding: '4px 11px', borderRadius: 20, border: '0.5px solid', cursor: 'pointer', whiteSpace: 'nowrap', background: activeFilter === cat.id ? '#B31B1B' : '#fff', color: activeFilter === cat.id ? '#fff' : '#555', borderColor: activeFilter === cat.id ? '#B31B1B' : '#E5E5E5' }}>
              {cat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ padding: '14px 12px 0', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>Upcoming Events</div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>Loading events...</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>No events found.</div>
      ) : (
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(event => (
            <div key={event.id} onClick={() => navigate(`/event/${event.id}`)}
              style={{ background: '#fff', border: '0.5px solid #E5E5E5', borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ height: 4, background: event.accent_color || '#B31B1B' }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#111', flex: 1, marginRight: 8 }}>{event.title}</div>
                  <div style={{ fontSize: 11, color: '#999', whiteSpace: 'nowrap' }}>{event.start_time?.slice(0, 5)}</div>
                </div>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{event.club_name}</div>
                <div style={{ display: 'flex', gap: 6, fontSize: 11, color: '#999', marginBottom: 8 }}>
                  <span>📍 {event.location}</span>
                  <span>·</span>
                  <span>👤 {event.attending} attending</span>
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {event.badges && event.badges.map(b => (
                    <div key={b} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: '#F5F5F5', color: '#555' }}>{b}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 390, background: '#fff', borderTop: '0.5px solid #E5E5E5', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px', zIndex: 10 }}>
        {[['🏠', 'Home'], ['📅', 'Calendar'], ['♥', 'Saved'], ['👤', 'Profile']].map(([icon, label]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, fontSize: 10, color: label === 'Home' ? '#B31B1B' : '#999', cursor: 'pointer' }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}