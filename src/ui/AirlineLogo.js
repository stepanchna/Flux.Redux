import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import s from './AirlineLogo.module.css';
export default function AirlineLogo({ name, size = 'md' }) {
    const n = name.toLowerCase();
    if (n.includes('pobeda')) {
        return (_jsxs("div", { className: `${s.wrap} ${s.pobeda} ${s[size]}`, "aria-label": "\u041F\u043E\u0431\u0435\u0434\u0430", children: [_jsx("span", { className: s.word, children: "\u043F\u043E\u0431\u0435\u0434\u0430" }), _jsxs("span", { className: s.dots, children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {})] })] }));
    }
    if (n === 's7' || n.includes('s7')) {
        return (_jsxs("div", { className: `${s.wrap} ${s.s7} ${s[size]}`, "aria-label": "S7 Airlines", children: [_jsx("span", { className: s.badge, children: "S7" }), _jsx("span", { className: s.word, children: "Airlines" })] }));
    }
    if (n.includes('aeroflot')) {
        return (_jsxs("div", { className: `${s.wrap} ${s.aeroflot} ${s[size]}`, "aria-label": "\u0410\u044D\u0440\u043E\u0444\u043B\u043E\u0442", children: [_jsx("span", { className: s.word, children: "\u0410\u044D\u0440\u043E\u0444\u043B\u043E\u0442" }), _jsx("span", { className: s.wing })] }));
    }
    if (n.includes('utair')) {
        return (_jsx("div", { className: `${s.wrap} ${s.utair} ${s[size]}`, "aria-label": "Utair", children: _jsx("span", { className: s.word, children: "UTair" }) }));
    }
    if (n.includes('ural')) {
        return (_jsxs("div", { className: `${s.wrap} ${s.ural} ${s[size]}`, "aria-label": "Ural Airlines", children: [_jsx("span", { className: s.word, children: "URAL" }), _jsx("span", { className: s.wordThin, children: "Airlines" })] }));
    }
    return (_jsx("div", { className: `${s.wrap} ${s[size]}`, "aria-label": name, children: _jsx("span", { className: s.word, children: name }) }));
}
