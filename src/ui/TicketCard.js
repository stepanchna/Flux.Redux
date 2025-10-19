import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import s from './TicketCard.module.css';
import AirlineLogo from './AirlineLogo';
import { formatStops } from './format';
const fmtTime = (d) => d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
const fmtDur = (min) => `${Math.floor(min / 60)} ч ${min % 60} мин`;
export default function TicketCard({ t }) {
    const start = new Date(t.time.startTime);
    const end = new Date(t.time.endTime);
    return (_jsxs("article", { className: s.card, children: [_jsxs("div", { className: s.top, children: [_jsxs("div", { className: s.price, children: [t.price.toLocaleString('ru-RU'), " \u20BD"] }), _jsx(AirlineLogo, { name: t.company })] }), _jsx("div", { className: s.sep }), _jsxs("div", { className: s.bottom, children: [_jsxs("div", { className: s.block, children: [_jsxs("div", { className: s.label, children: [t.from, " \u2192 ", t.to] }), _jsxs("div", { children: [fmtTime(start), " \u2014 ", fmtTime(end)] })] }), _jsxs("div", { className: s.block, children: [_jsx("div", { className: s.label, children: "\u0412 \u043F\u0443\u0442\u0438" }), _jsx("div", { children: fmtDur(t.duration) })] }), _jsxs("div", { className: s.block, children: [_jsx("div", { className: s.label, children: "\u041F\u0435\u0440\u0435\u0441\u0430\u0434\u043A\u0438" }), _jsx("div", { children: formatStops(t.connectionAmount ?? 0) })] })] })] }));
}
