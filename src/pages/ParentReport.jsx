import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';

/**
 * Satu-satunya skrin yang ditulis untuk orang yang membayar.
 *
 * Ibu bapa tidak boleh melihat apa yang anak buat dalam app, jadi mereka tidak
 * tahu duit mereka pergi ke mana. Skrin ini menjawab tiga soalan sahaja: dia
 * buat berapa banyak, dia rajin tak, dan bab mana dia lemah.
 */

// Dua huruf, kerana Selasa dan Sabtu berkongsi huruf pertama.
const DAY_LETTER = ['Ah', 'Is', 'Se', 'Ra', 'Kh', 'Ju', 'Sa'];

function minutesText(mins) {
  if (mins < 60) return `${mins} minit`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} jam ${m} minit` : `${h} jam`;
}

function ParentReport({ profile }) {
  const navigate = useNavigate();
  const ps = getProfileService();
  const report = ps.getReport(profile.id, 7);
  const streak = ps.getStreak(profile.id);

  const peak = Math.max(1, ...report.byDay.map((d) => d.questions));

  return (
    <div className="page">
      <button className="back" onClick={() => navigate('/hub')}>← Kembali</button>

      <div className="page__head">
        <div className="grow">
          <h1 className="page__title">Laporan {profile.name}</h1>
          <div className="page__sub">Tujuh hari lepas</div>
        </div>
      </div>

      <div className="stats" style={{ marginBottom: 14 }}>
        <div className="stat">
          <div className="stat__num">{report.questions}</div>
          <div className="stat__label">Soalan dijawab</div>
        </div>
        <div className="stat">
          <div className="stat__num">{report.activeDays}</div>
          <div className="stat__label">Hari aktif</div>
        </div>
        <div className="stat">
          <div className="stat__num">{report.avgScore}%</div>
          <div className="stat__label">Purata markah</div>
        </div>
        <div className="stat">
          <div className="stat__num">{streak.days}</div>
          <div className="stat__label">Hari berturut</div>
        </div>
      </div>

      <section className="paper paper--plain" style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 4 }}>Soalan setiap hari</h2>
        <p className="muted" style={{ fontSize: '0.85rem', marginBottom: 14 }}>
          Jumlah masa minggu ini {minutesText(report.minutes)}.
        </p>

        <div className="daybars">
          {report.byDay.map((d) => {
            const day = new Date(`${d.d}T00:00:00`);
            const height = d.questions ? Math.max(8, Math.round((d.questions / peak) * 100)) : 0;
            return (
              <div className="daybar" key={d.d}>
                <div className="daybar__value">{d.questions || ''}</div>
                <div className="daybar__track" title={`${d.d}: ${d.questions} soalan`}>
                  <div className="daybar__fill" style={{ height: `${height}%` }} />
                </div>
                <div className="daybar__day">{DAY_LETTER[day.getDay()]}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="paper paper--plain" style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 4 }}>Bab yang perlu diulang</h2>
        <p className="muted" style={{ fontSize: '0.85rem', marginBottom: 12 }}>
          Dinilai dari markah terbaik setiap aras, bukan dari percubaan terakhir.
        </p>

        {report.weak.length ? (
          <div className="stack" style={{ gap: 10 }}>
            {report.weak.map((c) => (
              <div className="weak" key={`${c.tahun}_${c.chapter}`}>
                <div className="grow">
                  <div className="weak__title">{c.title}</div>
                  <div className="weak__meta">Tahun {c.tahun}</div>
                </div>
                <div className="weak__score">{c.avg}%</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            Tiada bab di bawah 80% setakat ini. Semua yang dicuba sudah kukuh.
          </p>
        )}
      </section>

      <section className="paper paper--plain">
        <h2 style={{ fontSize: '1.05rem', marginBottom: 12 }}>Sesi terkini</h2>
        {report.recent.length ? (
          <div className="sessions">
            {report.recent.map((h, i) => (
              <div className="session" key={i}>
                <div className="grow">
                  <div className="session__title">{h.ct || `Bab ${h.c}`}</div>
                  <div className="session__meta">
                    Tahun {h.t}, aras {h.l}, {h.d}
                  </div>
                </div>
                <div className="session__score">{h.s}%</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">Belum ada sesi direkodkan.</p>
        )}
      </section>
    </div>
  );
}

export default ParentReport;
