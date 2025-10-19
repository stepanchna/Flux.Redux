import { http, HttpResponse, delay } from 'msw';
import { generateTickets } from './mockData';

export const handlers = [
  http.get('/api/tickets', async () => {
    await delay(600);
    if (Math.random() < 0.1) {
      return HttpResponse.json({ message: 'Network error' }, { status: 503 });
    }
    return HttpResponse.json(generateTickets());
  }),
];
