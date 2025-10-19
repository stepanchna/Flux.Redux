import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCompaniesAvailable,
  selectFilters,
  selectStopsAvailable,
  setCompanies,
  setStops,
  resetFilters,
} from '../features/tickets/ticketsSlice';
import s from './Filters.module.css';
import { formatStops } from './format';

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const companies = useAppSelector(selectCompaniesAvailable);
  const stops = selectStopsAvailable();

  const toggleStop = (n: number) => {
    const set = new Set(filters.stops);
    set.has(n) ? set.delete(n) : set.add(n);
    dispatch(setStops(Array.from(set).sort((a, b) => a - b)));
  };

  const toggleCompany = (c: string) => {
    const set = new Set(filters.companies);
    set.has(c) ? set.delete(c) : set.add(c);
    dispatch(setCompanies(Array.from(set)));
  };
  return (
    <div className={s.stack}>
      <section className={`${s.card} ${s.cardStops}`} aria-label="Количество пересадок">
        <h2 className={s.h}>Количество пересадок</h2>
        <div className={s.group}>
          {stops.map((n) => (
            <label key={n} className={s.row}>
              <input
                className={s.control}
                type="checkbox"
                checked={filters.stops.includes(n)}
                onChange={() => toggleStop(n)}
              />
              <span className={s.labelText}>
                {n === 0 ? 'Без пересадок' : n === 1 ? '1 пересадка' : `${n} пересадки`}
              </span>
            </label>
          ))}
        </div>
      </section>
    <section className={`${s.card} ${s.cardCompanies}`} aria-label="Компании">
      <h2 className={s.h}>Компании</h2>
      <div className={s.group}>
        {companies.map((c) => (
          <label key={c} className={s.row}>
            <input
              className={s.control}
              type="checkbox"
              checked={filters.companies.includes(c)}
              onChange={() => toggleCompany(c)}
            />
            <span className={s.labelText}>{c}</span>
          </label>
        ))}
      </div>
<div className={s.footer}>
        <button className={s.btn} onClick={() => dispatch(resetFilters())}>Сбросить</button>
      </div>
    </section>
  </div>
  );
}
