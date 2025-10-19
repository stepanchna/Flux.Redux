// src/types.ts
export interface TicketTime {
    startTime: string;
    endTime: string;
  }
  
  export type Currency = 'RUB';
  
  export interface Ticket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    currency: Currency;
    time: TicketTime;
    duration: number;
    date: string;
    connectionAmount: number | null;
  }
  
  export type SortKey = 'price' | 'duration' | 'stops';
  export type SortDir = 'asc' | 'desc';
  