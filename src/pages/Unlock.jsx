import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redeem, isUnlocked, getLicence, formatCode, FREE_LEVELS } from '../services/licenceService';

// Tukar nombor ini kepada nombor WhatsApp jualan sebenar sebelum melancarkan.
const WHATSAPP = '60000000000';
const HARGA = 'RM30 setahun';

function Unlock() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const back = params.get('dari') || '/hub';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(isUnlocked());

  const submit = (e) => {
    e.preventDefault();
    if (redeem(code)) {
      setError('');
      setDone(true);
      return;
    }
    setError('Kod ini tidak sah. Periksa semula setiap huruf dan nombor.');
  };

  if (done) {
    return (
      <div className="page">
        <div className="paper center">
          <div style={{ fontSize: '2.6rem', marginBottom: 8 }}>🔓</div>
          <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Semua aras sudah terbuka</h1>
          <p className="muted" style={{ marginBottom: 6 }}>
            Kod pada peranti ini: <strong>{formatCode(getLicence() || '')}</strong>
          </p>
          <p className="muted" style={{ marginBottom: 18, fontSize: '0.86rem' }}>
            Simpan kod ini. Kamu perlukannya semula kalau tukar peranti atau bersihkan pelayar.
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
          setiap bab, Tahun 1 hingga Tahun 6, percuma selamanya. Itu lebih 400 soalan
          dengan langkah kerja penuh.
        </p>
        <h2 style={{ fontSize: '1.05rem', marginBottom: 10 }}>Apa yang perlu kod</h2>
        <p className="muted">
          Aras Cabaran dan Ultra. Satu kod membuka semua tahun pada peranti ini, {HARGA}.
        </p>
      </section>

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
