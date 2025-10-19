import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import planeIcon from '../assets/plane.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTickets, selectFilteredSortedTickets, selectTicketsError, selectTicketsStatus, } from '../features/tickets/ticketsSlice';
import Filters from './Filters';
import SortBar from './SortBar';
import TicketCard from './TicketCard';
import css from './App.module.css';
import './tokens.css';
import MobileFilters from './MobileFilters';
export default function App() {
    const dispatch = useDispatch();
    const status = useSelector(selectTicketsStatus);
    const error = useSelector(selectTicketsError);
    const items = useSelector(selectFilteredSortedTickets);
    const [visible, setVisible] = useState(5);
    const visibleItems = items.slice(0, visible);
    useEffect(() => { dispatch(loadTickets()); }, [dispatch]);
    useEffect(() => { setVisible(5); }, [items.length]);
    return (_jsxs("div", { className: css.container, children: [_jsxs("header", { className: css.header, children: [_jsx("img", { className: css.logo, src: planeIcon, alt: "\u0421\u0430\u043C\u043E\u043B\u0451\u0442", width: 50, height: 50 }), _jsx("h1", { className: css.title, children: "\u041F\u043E\u0438\u0441\u043A \u0430\u0432\u0438\u0430\u0431\u0438\u043B\u0435\u0442\u043E\u0432" })] }), _jsxs("div", { className: css.grid, children: [_jsx("aside", { children: _jsx(Filters, {}) }), _jsxs("main", { className: css.main, "aria-live": "polite", children: [_jsx("div", { className: css.tabsContainer, children: _jsx("div", { className: css.tabs, children: _jsx(SortBar, {}) }) }), _jsx(MobileFilters, {}), status === 'loading' && _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026" }), status === 'failed' && (_jsxs("div", { style: { display: 'grid', gap: 12 }, children: [_jsxs("p", { role: "alert", children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", error] }), _jsx("button", { className: css.loadMore, onClick: () => dispatch(loadTickets()), children: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C" })] })), status !== 'failed' && (_jsxs(_Fragment, { children: [_jsx("section", { className: css.list, children: visibleItems.map((t) => (_jsx(TicketCard, { t: t }, t.id))) }), status === 'succeeded' && items.length === 0 && (_jsx("p", { style: { marginTop: 12, color: 'var(--muted)' }, children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B." })), items.length > visible && (_jsx("div", { className: css.actions, children: _jsx("button", { className: css.loadMore, onClick: () => setVisible((v) => v + 5), children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0442\u044C \u0435\u0449\u0451 \u0431\u0438\u043B\u0435\u0442\u044B" }) }))] }))] })] })] }));
}
