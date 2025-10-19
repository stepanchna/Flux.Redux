import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCompaniesAvailable, selectFilters, selectStopsAvailable, setCompanies, setStops, resetFilters, } from '../features/tickets/ticketsSlice';
import s from './Filters.module.css';
export default function Filters() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectFilters);
    const companies = useAppSelector(selectCompaniesAvailable);
    const stops = selectStopsAvailable();
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
    return (_jsxs("div", { className: s.stack, children: [_jsxs("section", { className: `${s.card} ${s.cardStops}`, "aria-label": "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043E\u043A", children: [_jsx("h2", { className: s.h, children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0435\u0440\u0435\u0441\u0430\u0434\u043E\u043A" }), _jsx("div", { className: s.group, children: stops.map((n) => (_jsxs("label", { className: s.row, children: [_jsx("input", { className: s.control, type: "checkbox", checked: filters.stops.includes(n), onChange: () => toggleStop(n) }), _jsx("span", { className: s.labelText, children: n === 0 ? 'Без пересадок' : n === 1 ? '1 пересадка' : `${n} пересадки` })] }, n))) })] }), _jsxs("section", { className: `${s.card} ${s.cardCompanies}`, "aria-label": "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438", children: [_jsx("h2", { className: s.h, children: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx("div", { className: s.group, children: companies.map((c) => (_jsxs("label", { className: s.row, children: [_jsx("input", { className: s.control, type: "checkbox", checked: filters.companies.includes(c), onChange: () => toggleCompany(c) }), _jsx("span", { className: s.labelText, children: c })] }, c))) }), _jsx("div", { className: s.footer, children: _jsx("button", { className: s.btn, onClick: () => dispatch(resetFilters()), children: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C" }) })] })] }));
}
