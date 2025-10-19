import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCompaniesAvailable, selectFilters, selectStopsAvailable, setCompanies, setStops, } from '../features/tickets/ticketsSlice';
import s from './MobileFilters.module.css';
import { formatStops } from './format';
export default function MobileFilters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const companies = useAppSelector(selectCompaniesAvailable);
    const stops = selectStopsAvailable();
    const [open, setOpen] = useState(false);
    const summary = useMemo(() => {
        const comp = filters.companies.length ? filters.companies.join(', ') : 'Любая авиакомпания';
        const st = filters.stops.length ? filters.stops.map(n => formatStops(n)).join(', ') : 'любое кол-во пересадок';
        return `${comp}, ${st}`;
    }, [filters]);
    const toggleStop = (n) => {
        const set = new Set(filters.stops);
        set.has(n) ? set.delete(n) : set.add(n);
        dispatch(setStops(Array.from(set).sort((a, b) => a - b)));
    };
    const toggleCompany = (c) => {
        const set = new Set(filters.companies);
        set.has(c) ? set.delete(c) : set.add(c);
        dispatch(setCompanies(Array.from(set)));
    };
    return (_jsxs("div", { className: s.wrap, children: [_jsxs("button", { className: s.bar, onClick: () => setOpen(o => !o), "aria-expanded": open, children: [_jsx("span", { className: s.text, children: summary }), _jsx("span", { className: s.chev, children: open ? '▴' : '▾' })] }), open && (_jsx("div", { className: s.panel, role: "region", "aria-label": "\u0424\u0438\u043B\u044C\u0442\u0440\u044B", children: _jsxs("div", { className: s.columns, children: [_jsxs("div", { className: `${s.col} ${s.colCompanies}`, children: [_jsx("div", { className: s.h, children: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx("div", { className: s.group, children: companies.map(c => (_jsxs("label", { className: s.row, children: [_jsx("input", { className: s.control, type: "checkbox", checked: filters.companies.includes(c), onChange: () => toggleCompany(c) }), _jsx("span", { className: s.labelText, children: c })] }, c))) })] }), _jsxs("div", { className: `${s.col} ${s.colStops}`, children: [_jsx("div", { className: s.h, children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043E\u043A" }), _jsx("div", { className: s.group, children: stops.map(n => (_jsxs("label", { className: s.row, children: [_jsx("input", { className: s.control, type: "checkbox", checked: filters.stops.includes(n), onChange: () => toggleStop(n) }), _jsx("span", { className: s.labelText, children: n === 0 ? 'Без пересадок' : n === 1 ? '1 пересадка' : `${n} пересадки` })] }, n))) })] })] }) }))] }));
}
