export interface TicketTime { startTime: string; endTime: string; }
export interface Ticket {
  id: number;
  from: string;
  to: string;
  company: string;
  price: number;
  currency: 'RUB';
  time: TicketTime;
  duration: number;
  date: string;
  connectionAmount: number | null;
}

export type SortKey = 'price' | 'duration' | 'stops';
export type SortDir = 'asc' | 'desc';