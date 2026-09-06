import React from 'react';

/**
 * Draws the picture a question refers to.
 *
 * Many questions ask "Pukul berapakah ini?" or "Berapakah pecahan berlorek?"
 * without ever showing anything, which makes them unanswerable. Each such
 * question now carries a `visual` object describing what to draw, and this
 * component turns that description into an SVG.
 *
 * Every shape is drawn on a 0..100 viewBox so the whole thing scales cleanly
 * from a phone to a tablet.
 */

const INK = '#1F2933';
const PAPER = '#FFFFFF';
const ACCENT = '#F4581E';
const SHADE = '#FFB703';
const COOL = '#3A86FF';

function Frame({ label, children, ratio = 1 }) {
  return (
    <div
      style={{
        // The drawing sits directly on the exercise-book page rather than in
        // a second card, so the panel does not read as a card inside a card.
        background: 'transparent',
        padding: '4px 0 10px',
        margin: '0 auto 14px',
        maxWidth: 300
      }}
    >
      <svg
        viewBox={`0 0 100 ${100 * ratio}`}
        role="img"
        aria-label={label}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <title>{label}</title>
        {children}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- clock -- */

function Clock({ hour, minute }) {
  const cx = 50;
  const cy = 50;
  const r = 42;
  const minuteAngle = (minute / 60) * 360;
  const hourAngle = ((hour % 12) / 12) * 360 + (minute / 60) * 30;

  const hand = (angle, length, width, color) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return (
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(rad) * length}
        y2={cy + Math.sin(rad) * length}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
    );
  };

  const ticks = [];
  for (let i = 0; i < 12; i += 1) {
    const rad = ((i * 30 - 90) * Math.PI) / 180;
    const outer = r - 4;
    const inner = r - (i % 3 === 0 ? 7.5 : 5.5);
    ticks.push(
      <line
        key={i}
        x1={cx + Math.cos(rad) * inner}
        y1={cy + Math.sin(rad) * inner}
        x2={cx + Math.cos(rad) * outer}
        y2={cy + Math.sin(rad) * outer}
        stroke={INK}
        strokeWidth={i % 3 === 0 ? 2.6 : 1.4}
        strokeLinecap="round"
      />
    );
  }

  // Drawn after the hands with a white halo, so a hand sweeping past a
  // numeral never makes it unreadable.
  const numerals = [12, 3, 6, 9].map((n, i) => {
    const rad = ((i * 90 - 90) * Math.PI) / 180;
    return (
      <text
        key={n}
        x={cx + Math.cos(rad) * (r - 13)}
        y={cy + Math.sin(rad) * (r - 13) + 3.4}
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="800"
        fill={INK}
        stroke="#FFF8EC"
        strokeWidth="2.6"
        paintOrder="stroke"
      >
        {n}
      </text>
    );
  });

  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="#FFF8EC" stroke={INK} strokeWidth="3.4" />
      {ticks}
      {hand(hourAngle, 19, 4.4, INK)}
      {hand(minuteAngle, 27, 3, ACCENT)}
      <circle cx={cx} cy={cy} r="3.4" fill={INK} />
      {numerals}
    </>
  );
}

/* ---------------------------------------------------------------- money -- */

const NOTE_STYLE = {
  1: { fill: '#3F7ED9', text: '#FFFFFF' },
  5: { fill: '#3EA96B', text: '#FFFFFF' },
  10: { fill: '#D94F3F', text: '#FFFFFF' },
  20: { fill: '#E58A2E', text: '#FFFFFF' },
  50: { fill: '#3FA9A0', text: '#FFFFFF' },
  100: { fill: '#8E44AD', text: '#FFFFFF' }
};

const COIN_STYLE = {
  5: '#C0902F',
  10: '#B9BEC4',
  20: '#B9BEC4',
  50: '#B9BEC4'
};

function Money({ notes = [], coins = [] }) {
  const items = [
    ...notes.map((v) => ({ kind: 'note', v })),
    ...coins.map((v) => ({ kind: 'coin', v }))
  ];
  const perRow = items.length > 4 ? 4 : Math.max(items.length, 1);
  const rows = Math.ceil(items.length / perRow);
  const cellW = 100 / perRow;
  const cellH = 26;

  return (
    <>
      {items.map((it, i) => {
        const col = i % perRow;
        const row = Math.floor(i / perRow);
        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2 + 4;

        if (it.kind === 'note') {
          const st = NOTE_STYLE[it.v] || NOTE_STYLE[1];
          const w = Math.min(cellW - 6, 30);
          const h = 17;
          return (
            <g key={i}>
              <rect
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx="2.4"
                fill={st.fill}
                stroke={INK}
                strokeWidth="1.6"
              />
              <text
                x={x}
                y={y + 3.2}
                textAnchor="middle"
                fontSize="8"
                fontWeight="800"
                fill={st.text}
              >
                {it.v}
              </text>
            </g>
          );
        }
        const rad = 8.6;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={rad}
              fill={COIN_STYLE[it.v] || '#B9BEC4'}
              stroke={INK}
              strokeWidth="1.6"
            />
            <text
              x={x}
              y={y + 3}
              textAnchor="middle"
              fontSize="7.4"
              fontWeight="800"
              fill={INK}
            >
              {it.v}
            </text>
          </g>
        );
      })}
      <text x="50" y={rows * cellH + 14} textAnchor="middle" fontSize="6.6" fill="#667">
        nota dalam RM · syiling dalam sen
      </text>
    </>
  );
}

/* ------------------------------------------------------------- fraction -- */

function FractionCircle({ parts, shaded }) {
  const cx = 50;
  const cy = 50;
  const r = 38;
  const slices = [];
  for (let i = 0; i < parts; i += 1) {
    const a0 = ((i / parts) * 360 - 90) * (Math.PI / 180);
    const a1 = (((i + 1) / parts) * 360 - 90) * (Math.PI / 180);
    const large = 1 / parts > 0.5 ? 1 : 0;
    const d =
      parts === 1
        ? null
        : `M ${cx} ${cy} L ${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} ` +
          `A ${r} ${r} 0 ${large} 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} Z`;
    slices.push(
      d ? (
        <path key={i} d={d} fill={i < shaded ? SHADE : PAPER} stroke={INK} strokeWidth="2" />
      ) : (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={shaded > 0 ? SHADE : PAPER}
          stroke={INK}
          strokeWidth="2"
        />
      )
    );
  }
  return <>{slices}</>;
}

function FractionBar({ parts, shaded }) {
  const w = 88;
  const h = 34;
  const x0 = 6;
  const y0 = 33;
  const cw = w / parts;
  const cells = [];
  for (let i = 0; i < parts; i += 1) {
    cells.push(
      <rect
        key={i}
        x={x0 + i * cw}
        y={y0}
        width={cw}
        height={h}
        fill={i < shaded ? SHADE : PAPER}
        stroke={INK}
        strokeWidth="2"
      />
    );
  }
  return <>{cells}</>;
}

function FractionGroup({ parts, shaded }) {
  const perRow = parts > 5 ? Math.ceil(parts / 2) : parts;
  const rows = Math.ceil(parts / perRow);
  const cw = 100 / perRow;
  const rh = 100 / (rows + 1);
  const items = [];
  for (let i = 0; i < parts; i += 1) {
    const col = i % perRow;
    const row = Math.floor(i / perRow);
    items.push(
      <circle
        key={i}
        cx={col * cw + cw / 2}
        cy={row * rh + rh / 2 + 18}
        r={Math.min(cw, rh) * 0.34}
        fill={i < shaded ? SHADE : PAPER}
        stroke={INK}
        strokeWidth="2.4"
      />
    );
  }
  return <>{items}</>;
}

/* --------------------------------------------------------------- base10 -- */

function Base10({ hundreds = 0, tens = 0, ones = 0 }) {
  // Each place value gets its own centred row, and empty places take no space,
  // so "23" fills the frame instead of hiding in a corner.
  const rows = [];
  if (hundreds) rows.push({ place: 'ratus', n: hundreds, w: 20, gap: 3, h: 20 });
  if (tens) rows.push({ place: 'puluh', n: tens, w: 4, gap: 2.6, h: 20 });
  if (ones) rows.push({ place: 'sa', n: ones, w: 6, gap: 2.6, h: 6 });

  const rowH = 30;
  const els = [];

  rows.forEach((row, ri) => {
    const total = row.n * row.w + (row.n - 1) * row.gap;
    const x0 = (100 - total) / 2;
    const yMid = ri * rowH + rowH / 2 + 4;
    const y = yMid - row.h / 2;

    for (let i = 0; i < row.n; i += 1) {
      const x = x0 + i * (row.w + row.gap);
      if (row.place === 'ratus') {
        els.push(
          <g key={`h${i}`}>
            <rect x={x} y={y} width="20" height="20" fill={COOL} stroke={INK} strokeWidth="1.6" />
            {[1, 2, 3, 4].map((k) => (
              <line key={`c${k}`} x1={x + k * 4} y1={y} x2={x + k * 4} y2={y + 20}
                stroke="#FFFFFF" strokeWidth="0.7" />
            ))}
            {[1, 2, 3, 4].map((k) => (
              <line key={`r${k}`} x1={x} y1={y + k * 4} x2={x + 20} y2={y + k * 4}
                stroke="#FFFFFF" strokeWidth="0.7" />
            ))}
          </g>
        );
      } else if (row.place === 'puluh') {
        els.push(
          <g key={`t${i}`}>
            <rect x={x} y={y} width="4" height="20" fill={ACCENT} stroke={INK} strokeWidth="1.2" />
            {[1, 2, 3, 4].map((k) => (
              <line key={k} x1={x} y1={y + k * 4} x2={x + 4} y2={y + k * 4}
                stroke="#FFFFFF" strokeWidth="0.7" />
            ))}
          </g>
        );
      } else {
        els.push(
          <rect key={`o${i}`} x={x} y={y} width="6" height="6" fill="#2ECC71"
            stroke={INK} strokeWidth="1.1" />
        );
      }
    }
  });

  return <>{els}</>;
}

// How tall the base-ten frame needs to be for the places actually drawn.
function base10Ratio(v) {
  const rows = [v.hundreds, v.tens, v.ones].filter(Boolean).length || 1;
  return (rows * 30 + 8) / 100;
}

/* --------------------------------------------------------------- shapes -- */

function Shape2D({ kind }) {
  const stroke = { fill: '#FFE7C2', stroke: INK, strokeWidth: 3 };
  switch (kind) {
    case 'bulatan':
      return <circle cx="50" cy="50" r="36" {...stroke} />;
    case 'segitiga':
      return <polygon points="50,12 88,84 12,84" {...stroke} />;
    case 'segiempat-sama':
      return <rect x="18" y="18" width="64" height="64" {...stroke} />;
    case 'segiempat-tepat':
      return <rect x="8" y="28" width="84" height="44" {...stroke} />;
    case 'pentagon':
      return <polygon points="50,10 89,38 74,84 26,84 11,38" {...stroke} />;
    case 'heksagon':
      return <polygon points="30,14 70,14 90,50 70,86 30,86 10,50" {...stroke} />;
    case 'oval':
      return <ellipse cx="50" cy="50" rx="40" ry="28" {...stroke} />;
    default:
      return <rect x="18" y="18" width="64" height="64" {...stroke} />;
  }
}

function Shape3D({ kind }) {
  const face = { fill: '#CBE0FF', stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round' };
  const top = { fill: '#EAF2FF', stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round' };
  const side = { fill: '#9EC2F5', stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round' };

  switch (kind) {
    case 'kubus':
      return (
        <>
          <polygon points="22,34 58,34 58,78 22,78" {...face} />
          <polygon points="22,34 38,18 74,18 58,34" {...top} />
          <polygon points="58,34 74,18 74,62 58,78" {...side} />
        </>
      );
    case 'kuboid':
      return (
        <>
          <polygon points="14,40 66,40 66,74 14,74" {...face} />
          <polygon points="14,40 30,24 82,24 66,40" {...top} />
          <polygon points="66,40 82,24 82,58 66,74" {...side} />
        </>
      );
    case 'sfera':
      return (
        <>
          <circle cx="50" cy="50" r="34" {...face} />
          <ellipse cx="50" cy="50" rx="34" ry="12" fill="none" stroke={INK} strokeWidth="1.8" />
        </>
      );
    case 'silinder':
      return (
        <>
          <rect x="24" y="26" width="52" height="48" {...face} stroke="none" />
          <line x1="24" y1="26" x2="24" y2="74" stroke={INK} strokeWidth="2.6" />
          <line x1="76" y1="26" x2="76" y2="74" stroke={INK} strokeWidth="2.6" />
          <ellipse cx="50" cy="74" rx="26" ry="9" {...face} />
          <ellipse cx="50" cy="26" rx="26" ry="9" {...top} />
        </>
      );
    case 'kon':
      return (
        <>
          <polygon points="50,14 76,72 24,72" {...face} />
          <ellipse cx="50" cy="72" rx="26" ry="9" {...top} />
        </>
      );
    case 'piramid':
      return (
        <>
          <polygon points="50,14 82,70 18,70" {...face} />
          <polygon points="50,14 82,70 50,82" {...side} />
        </>
      );
    default:
      return <circle cx="50" cy="50" r="34" {...face} />;
  }
}

/* ----------------------------------------------------------------- grid -- */

function GridShape({ cols, rows, cells }) {
  const filled = cells || [];
  const size = Math.min(88 / cols, 76 / rows);
  const x0 = (100 - size * cols) / 2;
  const y0 = (100 - size * rows) / 2;
  const isFilled = (r, c) =>
    filled.length === 0 || filled.some((p) => p[0] === r && p[1] === c);

  const rects = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={x0 + c * size}
          y={y0 + r * size}
          width={size}
          height={size}
          fill={isFilled(r, c) ? '#FFD9A8' : 'transparent'}
          stroke={isFilled(r, c) ? INK : '#D6DBE1'}
          strokeWidth={isFilled(r, c) ? 2 : 0.8}
        />
      );
    }
  }
  return <>{rects}</>;
}

/* -------------------------------------------------------------- pattern -- */

const SWATCH = {
  merah: '#E4572E',
  biru: '#3A86FF',
  kuning: '#FFBE0B',
  hijau: '#2ECC71',
  ungu: '#8E44AD',
  jingga: '#F4581E'
};

const PATTERN_RATIO = 0.44;

function Pattern({ items = [] }) {
  const n = items.length;
  const cw = 100 / n;
  const cy = (100 * PATTERN_RATIO) / 2;
  return (
    <>
      {items.map((it, i) => {
        const x = i * cw + cw / 2;
        const r = Math.min(cw * 0.34, 100 * PATTERN_RATIO * 0.36);
        if (it === '?') {
          return (
            <g key={i}>
              <rect
                x={x - r}
                y={cy - r}
                width={r * 2}
                height={r * 2}
                rx="4"
                fill={PAPER}
                stroke={INK}
                strokeWidth="2.4"
                strokeDasharray="5 4"
              />
              <text
                x={x}
                y={cy + r * 0.42}
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill={INK}
              >
                ?
              </text>
            </g>
          );
        }
        if (SWATCH[it]) {
          return (
            <circle key={i} cx={x} cy={cy} r={r} fill={SWATCH[it]} stroke={INK} strokeWidth="2.4" />
          );
        }
        return (
          <g key={i}>
            <rect
              x={x - r}
              y={cy - r}
              width={r * 2}
              height={r * 2}
              rx="4"
              fill="#FFE7C2"
              stroke={INK}
              strokeWidth="2.4"
            />
            <text x={x} y={cy + r * 0.4} textAnchor="middle" fontSize="12" fontWeight="800" fill={INK}>
              {it}
            </text>
          </g>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------- dispatch -- */

function QuestionVisual({ visual }) {
  if (!visual || !visual.type) return null;
  const v = visual;

  switch (v.type) {
    case 'clock':
      return (
        <Frame label={`Muka jam menunjukkan pukul ${v.hour}:${String(v.minute).padStart(2, '0')}`}>
          <Clock hour={v.hour} minute={v.minute} />
        </Frame>
      );

    case 'money':
      return (
        <Frame
          label="Kumpulan wang kertas dan syiling"
          ratio={Math.max(0.5, Math.ceil(((v.notes || []).length + (v.coins || []).length) / 4) * 0.3)}
        >
          <Money notes={v.notes} coins={v.coins} />
        </Frame>
      );

    case 'fraction': {
      const label = `${v.shaded} daripada ${v.parts} bahagian berlorek`;
      if (v.shape === 'bar') {
        return (
          <Frame label={label}>
            <FractionBar parts={v.parts} shaded={v.shaded} />
          </Frame>
        );
      }
      if (v.shape === 'group') {
        return (
          <Frame label={label}>
            <FractionGroup parts={v.parts} shaded={v.shaded} />
          </Frame>
        );
      }
      return (
        <Frame label={label}>
          <FractionCircle parts={v.parts} shaded={v.shaded} />
        </Frame>
      );
    }

    case 'base10':
      return (
        <Frame
          label={`${v.hundreds || 0} ratus, ${v.tens || 0} puluh, ${v.ones || 0} sa`}
          ratio={base10Ratio(v)}
        >
          <Base10 hundreds={v.hundreds} tens={v.tens} ones={v.ones} />
        </Frame>
      );

    case 'shape2d':
      return (
        <Frame label={`Bentuk dua dimensi: ${v.kind}`}>
          <Shape2D kind={v.kind} />
        </Frame>
      );

    case 'shape3d':
      return (
        <Frame label={`Bentuk tiga dimensi: ${v.kind}`}>
          <Shape3D kind={v.kind} />
        </Frame>
      );

    case 'grid':
      return (
        <Frame label={`Bentuk di atas grid, ${v.cols} lajur kali ${v.rows} baris`}>
          <GridShape cols={v.cols} rows={v.rows} cells={v.cells} />
        </Frame>
      );

    case 'pattern':
      return (
        <Frame label={`Corak: ${(v.items || []).join(', ')}`} ratio={PATTERN_RATIO}>
          <Pattern items={v.items} />
        </Frame>
      );

    default:
      return null;
  }
}

export default QuestionVisual;
