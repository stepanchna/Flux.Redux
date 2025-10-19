import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setSort } from '../features/tickets/ticketsSlice';
import s from './SortBar.module.css';
const options = [
    { key: 'price', label: 'Самый дешевый' },
    { key: 'duration', label: 'Самый быстрый' },
    { key: 'stops', label: 'Самый оптимальный' },
];
export default function SortBar() {
    const dispatch = useDispatch();
    const { sort } = useSelector(selectFilters);
    const setKey = (key) => dispatch(setSort({ key, dir: 'asc' }));
    const setDir = (dir) => dispatch(setSort({ key: sort.key, dir }));
    return (_jsxs("div", { className: s.bar, children: [options.map(o => (_jsx("button", { className: `${s.tab} ${sort.key === o.key ? s.active : ''}`, onClick: () => setKey(o.key), children: o.label }, o.key))), _jsx("button", { style: { display: 'none' }, onClick: () => setDir(sort.dir === 'asc' ? 'desc' : 'asc') })] }));
}
