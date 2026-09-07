import React, { useMemo, useState } from 'react';
import { ringkasanRasa, susunMesej, pautanWhatsApp } from '../services/maklumBalasService';

/**
 * Ruangan maklum balas untuk ibu bapa, di hujung skrin Laporan.
 *
 * Diletak di sini dan bukan di skrin sendiri kerana ini satu-satunya tempat ibu
 * bapa sudah pun melihat kemajuan anak. Orang memberi maklum balas apabila
 * mereka baru sahaja melihat sesuatu, bukan apabila terpaksa mencari borang.
 *
 * Butang membuka WhatsApp dengan mesej sudah terisi. Tiada apa-apa dihantar
 * secara automatik, dan ibu bapa masih boleh menyunting setiap perkataan
 * sebelum menekan hantar di dalam WhatsApp. Ringkasan anak ditunjukkan di skrin
 * ini juga, supaya tiada seorang pun terkejut melihat angka anaknya di dalam
 * mesej yang dia sendiri hantar.
 */
function MaklumBalasIbuBapa({ profile, laporan }) {
  const [pesanan, setPesanan] = useState('');
  const ringkasan = useMemo(() => ringkasanRasa(profile.id), [profile.id]);

  const boleh = pesanan.trim().length > 0;

  const buka = () => {
    if (!boleh) return;
    const mesej = susunMesej({
      nama: profile.name,
      laporan,
      ringkasan,
      pesanan
    });
    window.open(pautanWhatsApp(mesej), '_blank', 'noopener');
  };

  return (
    <section className="paper paper--plain" style={{ marginTop: 14 }}>
      <h2 style={{ fontSize: '1.05rem', marginBottom: 4 }}>Hantar maklum balas</h2>
      <p className="muted" style={{ fontSize: '0.85rem', marginBottom: 12 }}>
        Apa yang membantu anak anda, dan apa yang menyusahkan dia? Butang di
        bawah membuka WhatsApp dengan mesej sudah tertulis. Anda boleh baca dan
        sunting dahulu sebelum menghantarnya.
      </p>

      <textarea
        className="maklum__teks"
        rows={4}
        value={pesanan}
        onChange={(e) => setPesanan(e.target.value)}
        placeholder="Contoh: anak saya suka aras Mudah tetapi terus berhenti bila sampai soalan berayat."
        aria-label="Pesanan anda"
      />

      <div className="maklum__sertakan">
        <div className="eyebrow" style={{ marginBottom: 8 }}>Dihantar bersama pesanan anda</div>
        <ul className="maklum__senarai">
          <li>Nama anak: {profile.name}</li>
          <li>
            Tujuh hari lepas: {laporan.questions} soalan, {laporan.activeDays} hari
            aktif, purata {laporan.avgScore} peratus
          </li>
          {ringkasan.jumlah > 0 ? (
            <li>
              Rasa anak selepas main: seronok {ringkasan.kira.seronok}, biasa{' '}
              {ringkasan.kira.biasa}, bosan {ringkasan.kira.bosan}
            </li>
          ) : (
            <li>Anak belum menekan muka selepas habis main, jadi tiada rasa direkodkan</li>
          )}
          {ringkasan.bosan.length > 0 && (
            <li>
              Bab yang anak tanda bosan:{' '}
              {ringkasan.bosan.slice(0, 4).map((b) => b.tajuk).join(', ')}
            </li>
          )}
        </ul>
        <p className="muted" style={{ fontSize: '0.82rem', margin: '10px 0 0' }}>
          Tiada nombor telefon atau emel diambil daripada peranti ini. Kami hanya
          nampak nombor anda kerana anda sendiri yang menghantar mesej itu.
        </p>
      </div>

      <button
        type="button"
        className="btn btn--go btn--block"
        style={{ marginTop: 14 }}
        onClick={buka}
        disabled={!boleh}
      >
        Buka WhatsApp dengan mesej ini
      </button>

      {!boleh && (
        <p className="muted" style={{ fontSize: '0.82rem', marginTop: 8, textAlign: 'center' }}>
          Tulis sekurang-kurangnya satu ayat dahulu.
        </p>
      )}
    </section>
  );
}

export default MaklumBalasIbuBapa;
