import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setSort } from '../features/tickets/ticketsSlice';
import type { SortKey, SortDir } from '../types';
import s from './SortBar.module.css';

const options: { key: SortKey; label: string }[] = [
  { key: 'price', label: 'Самый дешевый' },
  { key: 'duration', label: 'Самый быстрый' },
  { key: 'stops', label: 'Самый оптимальный' },
];

export default function SortBar(){
  const dispatch = useDispatch();
  const { sort } = useSelector(selectFilters);
  const setKey = (key: SortKey) => dispatch(setSort({ key, dir: 'asc' }));
  const setDir = (dir: SortDir) => dispatch(setSort({ key: sort.key, dir }));

  return (
    <div className={s.bar}>
      {options.map(o => (
        <button
          key={o.key}
          className={`${s.tab} ${sort.key===o.key? s.active:''}`}
          onClick={()=>setKey(o.key)}
        >
          {o.label}
        </button>
      ))}
      <button style={{display:'none'}} onClick={()=>setDir(sort.dir==='asc'?'desc':'asc')} />
    </div>
  );
}
