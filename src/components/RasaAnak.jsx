import React, { useState } from 'react';
import { RASA, rekodRasa } from '../services/maklumBalasService';
import feedback from '../services/feedbackService';

/**
 * Satu soalan untuk anak, di skrin keputusan.
 *
 * Tiga muka sahaja, tiada tempat menaip. Budak Darjah 1 tidak akan menulis
 * ayat, tetapi dia akan menekan muka, dan muka itu sudah cukup untuk memberitahu
 * kami bab mana yang membosankan.
 *
 * Selepas ditekan, blok ini bertukar menjadi satu baris terima kasih dan bukan
 * hilang begitu sahaja. Butang yang lenyap selepas disentuh membuatkan budak
 * menyangka dia tersilap tekan.
 */
function RasaAnak({ profile, subject, tahun, chapter, chapterTitle, level }) {
  const [dipilih, setDipilih] = useState(null);

  const pilih = (rasa) => {
    if (dipilih) return;
    setDipilih(rasa);
    feedback.tap();
    rekodRasa({
      profileId: profile.id,
      subject,
      tahun,
      chapter,
      chapterTitle,
      level,
      rasa
    });
  };

  const jawapan = RASA.find((r) => r.id === dipilih);

  return (
    <section className="paper paper--plain" style={{ marginBottom: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Untuk kamu</div>

      {jawapan ? (
        <p style={{ margin: 0, fontSize: '1.02rem' }}>
          <span style={{ fontSize: '1.4rem', marginRight: 8 }} aria-hidden="true">
            {jawapan.emoji}
          </span>
          Terima kasih. Kami simpan supaya bab ini boleh dibaiki.
        </p>
      ) : (
        <>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 12 }}>
            Seronok tak main tadi?
          </h2>
          <div className="choices">
            {RASA.map((r) => (
              <button
                key={r.id}
                type="button"
                className="choice"
                onClick={() => pilih(r.id)}
                aria-label={r.label}
              >
                <span style={{ fontSize: '1.25rem', marginRight: 7 }} aria-hidden="true">
                  {r.emoji}
                </span>
                {r.label}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default RasaAnak;
