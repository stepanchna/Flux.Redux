import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCompaniesAvailable,
  selectFilters,
  selectStopsAvailable,
  setCompanies,
  setStops,
} from '../features/tickets/ticketsSlice';
import s from './MobileFilters.module.css';
import { formatStops } from './format';
export default function MobileFilters(){
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const companies = useAppSelector(selectCompaniesAvailable);
  const stops = selectStopsAvailable();
  const [open, setOpen] = useState(false);
  const summary = useMemo(() => {
    const comp = filters.companies.length ? filters.companies.join(', ') : 'Любая авиакомпания';
    const st = filters.stops.length ? filters.stops.map(n=>formatStops(n)).join(', ') : 'любое кол-во пересадок';
    return `${comp}, ${st}`;
  }, [filters]);
  const toggleStop = (n: number) => {
    const set = new Set(filters.stops);
    set.has(n) ? set.delete(n) : set.add(n);
    dispatch(setStops(Array.from(set).sort((a,b)=>a-b)));
  };
  const toggleCompany = (c: string) => {
    const set = new Set(filters.companies);
    set.has(c) ? set.delete(c) : set.add(c);
    dispatch(setCompanies(Array.from(set)));
  };
  return (
    <div className={s.wrap}>
      <button className={s.bar} onClick={()=>setOpen(o=>!o)} aria-expanded={open}>
        <span className={s.text}>{summary}</span>
        <span className={s.chev}>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className={s.panel} role="region" aria-label="Фильтры">
         
          <div className={s.columns}>
<div className={`${s.col} ${s.colCompanies}`}>
    <div className={s.h}>Компании</div>
    <div className={s.group}>
      {companies.map(c=>(
        <label key={c} className={s.row}>
          <input className={s.control} type="checkbox"
                 checked={filters.companies.includes(c)}
                 onChange={()=>toggleCompany(c)} />
          <span className={s.labelText}>{c}</span>
        </label>   
                ))}
              </div>
            </div>
<div className={`${s.col} ${s.colStops}`}>
    <div className={s.h}>Количество пересадок</div>
    <div className={s.group}>
      {stops.map(n=>(
        <label key={n} className={s.row}>
          <input className={s.control} type="checkbox"
                 checked={filters.stops.includes(n)}
                 onChange={()=>toggleStop(n)} />
          <span className={s.labelText}>
            {n === 0 ? 'Без пересадок' : n === 1 ? '1 пересадка' : `${n} пересадки`}
          </span>
        </label>

                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
