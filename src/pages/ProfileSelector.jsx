import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileService } from '../services/profileService';
import KilatMark from '../components/KilatMark';
import KilatAvatar from '../components/KilatAvatar';

/**
 * Skrin pertama yang dilihat sesiapa pun.
 *
 * Ia pernah dibina dengan gaya dalam baris sendiri, jadi ia satu-satunya
 * halaman yang tidak mengikut tema: tajuk gelap atas latar gelap, kad kelabu
 * dan bukan kertas krim, dan avatar emoji dan bukan avatar yang budak reka.
 * Semuanya kini datang daripada tema yang sama seperti halaman lain.
 *
 * Butang padam dahulunya duduk terus di sebelah nama anak, sama menonjol
 * dengan tindakan memilih profil. Sekarang ia bersembunyi di belakang mod
 * "Urus", jadi budak yang mencari namanya tidak boleh memadam adiknya.
 */

function ProfileSelector({ onProfileChange }) {
  const navigate = useNavigate();
  const ps = getProfileService();

  const [profiles, setProfiles] = useState([]);
  const [showNewProfile, setShowNewProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [error, setError] = useState('');
  const [managing, setManaging] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    const all = ps.getAllProfiles();
    setProfiles(all);
    if (all.length === 0) setShowNewProfile(true);
  }, [ps]);

  const selectProfile = (profile) => {
    if (managing) return;
    ps.switchProfile(profile.id);
    onProfileChange(profile);
    navigate('/hub');
  };

  const createProfile = (e) => {
    e.preventDefault();
    setError('');

    if (!newProfileName.trim()) {
      setError('Sila masukkan nama dahulu.');
      return;
    }

    try {
      const created = ps.createProfile(newProfileName.trim());
      setProfiles([...profiles, created]);
      setNewProfileName('');
      setShowNewProfile(false);
      onProfileChange(created);
      navigate('/avatar');
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProfile = (id) => {
    ps.deleteProfile(id);
    const left = profiles.filter((p) => p.id !== id);
    setProfiles(left);
    setConfirmId(null);
    if (!left.length) {
      setManaging(false);
      setShowNewProfile(true);
    }
  };

  return (
    <div className="page page--centre">
      <div className="card card--primary center" style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <KilatMark size={76} />
        </div>
        <h1 style={{ fontSize: '1.6rem' }}>Matematik Kilat</h1>
        <p style={{ marginTop: 6 }}>Siapa nak belajar?</p>
      </div>

      {profiles.length > 0 && (
        <section style={{ marginBottom: 18 }}>
          <div className="picker__head">
            <h2 className="picker__title">Pilih profil</h2>
            <button
              className="btn btn--quiet btn--small"
              onClick={() => { setManaging(!managing); setConfirmId(null); }}
            >
              {managing ? 'Selesai' : 'Urus'}
            </button>
          </div>

          <div className="picker__list">
            {profiles.map((profile) => {
              const stars = ps.getTotalStars(profile.id);
              const confirming = confirmId === profile.id;

              return (
                <div key={profile.id} className="picker__row">
                  <button
                    className="picker__pick"
                    onClick={() => selectProfile(profile)}
                    disabled={managing}
                  >
                    <span className="picker__face">
                      <KilatAvatar profile={profile} size={44} />
                    </span>
                    <span className="picker__who">
                      <span className="picker__name">{profile.name}</span>
                      <span className="picker__meta">
                        {stars ? `${stars} bintang` : 'Belum mula'}
                      </span>
                    </span>
                  </button>

                  {managing && !confirming && (
                    <button
                      className="btn btn--quiet btn--small"
                      onClick={() => setConfirmId(profile.id)}
                    >
                      Padam
                    </button>
                  )}

                  {confirming && (
                    <div className="picker__confirm">
                      <button className="btn btn--danger btn--small" onClick={() => deleteProfile(profile.id)}>
                        Padam {profile.name}
                      </button>
                      <button className="btn btn--secondary btn--small" onClick={() => setConfirmId(null)}>
                        Batal
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {managing && (
            <p className="on-ink-muted" style={{ marginTop: 10, fontSize: '0.85rem' }}>
              Memadam profil membuang semua bintang dan kemajuannya. Ia tidak
              boleh dikembalikan.
            </p>
          )}
        </section>
      )}

      {showNewProfile ? (
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 14 }}>Profil baru</h2>
          <form onSubmit={createProfile}>
            <label className="field__head" htmlFor="nama">Nama</label>
            <input
              id="nama"
              className="answer-input"
              type="text"
              value={newProfileName}
              onChange={(e) => { setNewProfileName(e.target.value); setError(''); }}
              placeholder="Masukkan nama"
              maxLength={20}
              enterKeyHint="go"
              autoFocus
            />
            {error && (
              <div className="verdict verdict--wrong" style={{ marginTop: 12 }}>
                <div className="verdict__working">{error}</div>
              </div>
            )}
            <button type="submit" className="btn btn--go btn--block" style={{ marginTop: 14 }}>
              Buat profil
            </button>
            {profiles.length > 0 && (
              <button
                type="button"
                className="btn btn--secondary btn--block"
                style={{ marginTop: 8 }}
                onClick={() => { setShowNewProfile(false); setError(''); }}
              >
                Batal
              </button>
            )}
          </form>
        </div>
      ) : (
        <button className="btn btn--go btn--block" onClick={() => setShowNewProfile(true)}>
          + Profil baru
        </button>
      )}
    </div>
  );
}

export default ProfileSelector;
