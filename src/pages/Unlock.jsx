import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  redeem, isUnlocked, getLicence, formatCode, formatExpiry, hasExpiredLicence,
  FREE_LEVELS, OPEN_ACCESS, HARGA, PERANTI
} from '../services/licenceService';
// Satu nombor sahaja untuk seluruh app, jadi jualan dan maklum balas tidak
// boleh terpisah apabila nombor itu bertukar suatu hari nanti.
import { WHATSAPP } from '../services/maklumBalasService';

const RALAT = {
  'tidak-sah': 'Kod ini tidak sah. Periksa semula setiap huruf dan nombor.',
  luput: 'Kod ini sudah tamat tempoh. Hubungi kami untuk kod baharu.',
  simpanan: 'Peranti ini tidak membenarkan penyimpanan. Cuba matikan mod menyamar.'
};

function Unlock() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const back = params.get('dari') || '/hub';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(isUnlocked());
  const expired = hasExpiredLicence();

  const submit = (e) => {
    e.preventDefault();
    const result = redeem(code);
    if (result.ok) {
      setError('');
      setDone(true);
      return;
    }
    setError(RALAT[result.reason] || RALAT['tidak-sah']);
  };

  // Semasa tempoh ujian terbuka tiada kod wujud, jadi halaman jualan akan
  // mengelirukan penguji dan memaparkan kod kosong. Tunjukkan nota ringkas.
  if (OPEN_ACCESS) {
    return (
      <div className="page">
        <div className="paper center">
          <div style={{ fontSize: '2.6rem', marginBottom: 8 }}>🎁</div>
          <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Semua aras terbuka</h1>
          <p className="muted" style={{ marginBottom: 18 }}>
            Ini versi ujian percuma. Keempat-empat aras bagi setiap bab, Tahun 1
            hingga Tahun 6, sudah terbuka. Tiada kod diperlukan.
          </p>
          <button className="btn btn--go btn--block" onClick={() => navigate(back)}>
            Teruskan belajar
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="page">
        <div className="paper center">
          <div style={{ fontSize: '2.6rem', marginBottom: 8 }}>🔓</div>
          <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Semua aras sudah terbuka</h1>
          <p className="muted" style={{ marginBottom: 6 }}>
            Kod pada peranti ini: <strong>{formatCode(getLicence() || '')}</strong>
          </p>
          <p className="muted" style={{ marginBottom: 6 }}>
            Sah sehingga <strong>{formatExpiry(getLicence())}</strong>
          </p>
          <p className="muted" style={{ marginBottom: 18, fontSize: '0.86rem' }}>
            Simpan kod ini. Kamu perlukannya semula kalau tukar peranti atau
            bersihkan pelayar, dan kod yang sama boleh dipakai pada {PERANTI} peranti
            dalam keluarga kamu.
          </p>
          <button className="btn btn--go btn--block" onClick={() => navigate(back)}>
            Teruskan belajar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back" onClick={() => navigate(back)}>← Kembali</button>

      <div className="page__head">
        <div className="grow">
          <h1 className="page__title">Buka semua aras</h1>
          <div className="page__sub">Aras Cabaran dan Ultra untuk semua bab dan semua tahun</div>
        </div>
      </div>

      <section className="paper" style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>Apa yang percuma</h2>
        <p className="muted" style={{ marginBottom: 12 }}>
          Aras {FREE_LEVELS.map((n) => (n === 1 ? 'Mudah' : 'Sederhana')).join(' dan ')} untuk
          setiap bab, Tahun 1 hingga Tahun 6, percuma selamanya. Itu 600 soalan
          dengan langkah kerja penuh.
        </p>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>Apa yang perlu kod</h2>
        <p className="muted" style={{ marginBottom: 12 }}>
          Aras Cabaran dan Ultra, iaitu 600 soalan lagi. Satu kod membuka semua
          tahun, Darjah 1 hingga Darjah 6.
        </p>
        <div className="terms">
          <div className="terms__row"><span>Harga</span><strong>{HARGA}</strong></div>
          <div className="terms__row"><span>Peranti</span><strong>{PERANTI} peranti</strong></div>
          <div className="terms__row"><span>Darjah</span><strong>1 hingga 6</strong></div>
        </div>
      </section>

      {expired && (
        <section className="paper" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: '1.05rem', marginBottom: 8 }}>Kod kamu sudah tamat</h2>
          <p className="muted">
            Kod {formatCode(getLicence() || '')} tamat pada {formatExpiry(getLicence())}.
            Kemajuan dan bintang anak kamu masih tersimpan. Masukkan kod baharu
            untuk membuka semula aras Cabaran dan Ultra.
          </p>
        </section>
      )}

      <form className="paper" onSubmit={submit}>
        <label className="field__head" htmlFor="kod">Masukkan kod</label>
        <input
          id="kod"
          className="answer-input"
          type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder="MK-XXXX-XXXX-XXXX"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(''); }}
          style={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
        />
        {error && (
          <div className="verdict verdict--wrong" style={{ marginTop: 12 }}>
            <div className="verdict__working">{error}</div>
          </div>
        )}
        <button className="btn btn--go btn--block" type="submit" style={{ marginTop: 14 }}>
          Buka
        </button>
      </form>

      <div className="center" style={{ marginTop: 18 }}>
        <a
          className="btn btn--quiet btn--small"
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Saya nak beli kod Matematik Kilat')}`}
          target="_blank"
          rel="noreferrer"
        >
          Dapatkan kod melalui WhatsApp
        </a>
      </div>
    </div>
  );
}

export default Unlock;
