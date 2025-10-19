import s from './AirlineLogo.module.css';

type Props = { name: string; size?: 'sm' | 'md' | 'lg' };

export default function AirlineLogo({ name, size = 'md' }: Props) {
  const n = name.toLowerCase();

  if (n.includes('pobeda')) {
    return (
      <div className={`${s.wrap} ${s.pobeda} ${s[size]}`} aria-label="Победа">
        <span className={s.word}>победа</span>
        <span className={s.dots}><i/><i/><i/></span>
      </div>
    );
  }

  if (n === 's7' || n.includes('s7')) {
    return (
      <div className={`${s.wrap} ${s.s7} ${s[size]}`} aria-label="S7 Airlines">
        <span className={s.badge}>S7</span>
        <span className={s.word}>Airlines</span>
      </div>
    );
  }

  if (n.includes('aeroflot')) {
    return (
      <div className={`${s.wrap} ${s.aeroflot} ${s[size]}`} aria-label="Аэрофлот">
        <span className={s.word}>Аэрофлот</span>
        <span className={s.wing} />
      </div>
    );
  }

  if (n.includes('utair')) {
    return (
      <div className={`${s.wrap} ${s.utair} ${s[size]}`} aria-label="Utair">
        <span className={s.word}>UTair</span>
      </div>
    );
  }

  if (n.includes('ural')) {
    return (
      <div className={`${s.wrap} ${s.ural} ${s[size]}`} aria-label="Ural Airlines">
        <span className={s.word}>URAL</span><span className={s.wordThin}>Airlines</span>
      </div>
    );
  }

  return (
    <div className={`${s.wrap} ${s[size]}`} aria-label={name}>
      <span className={s.word}>{name}</span>
    </div>
  );
}
