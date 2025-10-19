import type { Ticket } from '../types';
import s from './TicketCard.module.css';
import AirlineLogo from './AirlineLogo';
import { formatStops } from './format';
const fmtTime = (d: Date) => d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'});
const fmtDur = (min: number) => `${Math.floor(min/60)} ч ${min%60} мин`;
export default function TicketCard({ t }: { t: Ticket }) {
  const start = new Date(t.time.startTime);
  const end = new Date(t.time.endTime);
  return (
    <article className={s.card}>
      <div className={s.top}>
        <div className={s.price}>{t.price.toLocaleString('ru-RU')} ₽</div>
        <AirlineLogo name={t.company} />
      </div>
      <div className={s.sep} />
      <div className={s.bottom}>
        <div className={s.block}>
          <div className={s.label}>{t.from} → {t.to}</div>
          <div>{fmtTime(start)} — {fmtTime(end)}</div>
        </div>
        <div className={s.block}>
          <div className={s.label}>В пути</div>
          <div>{fmtDur(t.duration)}</div>
        </div>
        <div className={s.block}>
  <div className={s.label}>Пересадки</div>
  <div>{formatStops(t.connectionAmount ?? 0)}</div>
</div>
      </div>
    </article>
  );
}
