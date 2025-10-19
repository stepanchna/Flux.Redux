import planeIcon from '../assets/plane.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../app/store';
import {
  loadTickets,
  selectFilteredSortedTickets,
  selectTicketsError,
  selectTicketsStatus,
} from '../features/tickets/ticketsSlice';
import Filters from './Filters';
import SortBar from './SortBar';
import TicketCard from './TicketCard';
import css from './App.module.css';
import './tokens.css';
import MobileFilters from './MobileFilters'; 

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectTicketsStatus);
  const error = useSelector(selectTicketsError);
  const items = useSelector(selectFilteredSortedTickets);

  const [visible, setVisible] = useState(5);
  const visibleItems = items.slice(0, visible);

  useEffect(() => { dispatch(loadTickets()); }, [dispatch]);
  useEffect(() => { setVisible(5); }, [items.length]);

  return (
    <div className={css.container}>
      <header className={css.header}>
      <img className={css.logo} src={planeIcon} alt="Самолёт" width={50} height={50} />

        <h1 className={css.title}>Поиск авиабилетов</h1>
      </header>


      <div className={css.grid}>
        <aside>
          <Filters />
        </aside>

        <main className={css.main} aria-live="polite">
          <div className={css.tabsContainer}>
            <div className={css.tabs}>
              <SortBar />
            </div>
          </div>
          <MobileFilters /> 

          {status === 'loading' && <p>Загрузка…</p>}

          {status === 'failed' && (
            <div style={{ display: 'grid', gap: 12 }}>
              <p role="alert">Ошибка: {error}</p>
              <button className={css.loadMore} onClick={() => dispatch(loadTickets())}>
                Повторить
              </button>
            </div>
          )}

          {status !== 'failed' && (
            <>
              <section className={css.list}>
                {visibleItems.map((t) => (
                  <TicketCard key={t.id} t={t} />
                ))}
              </section>

              {status === 'succeeded' && items.length === 0 && (
                <p style={{ marginTop: 12, color: 'var(--muted)' }}>
                  Ничего не найдено. Измените фильтры.
                </p>
              )}

              {items.length > visible && (
                <div className={css.actions}>
                  <button className={css.loadMore} onClick={() => setVisible((v) => v + 5)}>
                    Загружать ещё билеты
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
