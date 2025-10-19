export function formatStops(n) {
    if (n === 0)
        return 'Без пересадок';
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11)
        return `${n} пересадка`;
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14))
        return `${n} пересадки`;
    return `${n} пересадок`;
}
