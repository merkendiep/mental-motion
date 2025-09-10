// Static events data for the application
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  created: string;
  updated: string;
}

export const staticEvents: Event[] = [
  {
    id: "1",
    title: "Verbinden in een wereld vol Prikkels",
    date: "2025-10-30",
    time: "11:00-13:00",
    location: "MentalMotion, Wolff en Dekenplein 5, 3532 XH",
    description:
      '<p>We leven in een tijd waarin er continu prikkels op ons afkomen. Deadlines, studie, sociale media, verwachtingen van anderen – het kan voelen alsof je nooit écht op adem komt. Hoe houd je in zo’n wereld de regie over je eigen leven?</p><p>Tijdens <strong>"verbinden in een wereld vol prikkels"</strong> nemen we je mee in twee inspirerende workshops vol herkenning, praktische handvatten en open gesprekken. Geen college, geen zware theorie – wél interactie, inzichten en samen ontdekken hoe jij meer balans kunt vinden.</p><p>Dit event wordt georganiseerd door <strong>MentalMotion</strong>, in samenwerking met <strong>Motivation Hunters</strong> en <strong>Better Together Coaching</strong>.</p><h3>Programma in het kort</h3><p><strong>11:00 – Zet je leven op jouw ritme</strong><br>Hoe leef je meer op jouw eigen tempo en maak je keuzes die écht bij je passen?</p><p><strong>11:45 – (A)sociale media: Verbinden of verdwalen?</strong><br>Wat doet eindeloos scrollen met je focus en hoe zet je socials bewust in?</p><p><strong>12:30 – Gezamenlijke lunch</strong><br>Ontmoet nieuwe mensen en praat na in een ontspannen sfeer.</p><p>👥 <strong>Voor wie:</strong> Studenten die meer grip willen op hun tijd en socials<br>💶 <strong>Kosten:</strong> €15<br>⚡ <strong>Beperkt aantal plekken</strong></p>',
    created: "2024-12-01T10:00:00Z",
    updated: "2024-12-01T10:00:00Z",
  },
];

// Helper functions to interact with static events data
export const eventsService = {
  // Get all events sorted by date
  async getAllSorted(): Promise<Event[]> {
    // Sort events by date (ascending)
    return staticEvents
      .filter((event) => new Date(event.date) >= new Date()) // Only future events
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },

  // Get event by ID
  async getById(id: string): Promise<Event | null> {
    return staticEvents.find((event) => event.id === id) || null;
  },

  // Get all events (including past ones)
  async getAll(): Promise<Event[]> {
    return staticEvents.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  },
};
