function pick(arr, i) {
    return arr[i % arr.length];
}
const COMPANIES = ['Aeroflot', 'S7', 'Ural', 'Pobeda', 'Utair'];
const FROM = ['MOW', 'LED', 'SVX'];
const TO = ['AER', 'KZN', 'OVB'];
const STOPS = [0, 1, 2, 3];
export function generateTickets(count = 40) {
    return Array.from({ length: count }, (_, i) => {
        const price = 3500 + Math.round(Math.random() * 25000);
        const duration = 60 + Math.round(Math.random() * 720);
        const stops = pick(STOPS, Math.floor(Math.random() * STOPS.length));
        const start = new Date();
        start.setDate(start.getDate() + (i % 7));
        start.setHours(6 + (i % 14), (i * 7) % 60, 0, 0);
        const end = new Date(start.getTime() + duration * 60000);
        return {
            id: i + 1,
            from: pick(FROM, i),
            to: pick(TO, i),
            company: pick(COMPANIES, i),
            price,
            currency: 'RUB',
            time: { startTime: start.toISOString(), endTime: end.toISOString() },
            duration,
            date: start.toISOString().slice(0, 10),
            connectionAmount: stops,
        };
    });
}
