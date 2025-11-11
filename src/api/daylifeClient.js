import { format } from 'date-fns';

const memoryStore = new Map();

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readStorage(key, fallback) {
  if (isBrowser()) {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (err) {
      console.warn('Failed to parse storage value for', key, err);
      return fallback;
    }
  }
  if (!memoryStore.has(key)) {
    memoryStore.set(key, fallback);
    return fallback;
  }
  return memoryStore.get(key);
}

function writeStorage(key, value) {
  if (isBrowser()) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    memoryStore.set(key, value);
  }
}

function removeStorage(key) {
  if (isBrowser()) {
    window.localStorage.removeItem(key);
  } else {
    memoryStore.delete(key);
  }
}

function generateId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

const CURRENT_USER_KEY = 'daylife_current_user';
const USERS_KEY = 'daylife_users';
const DREAMS_KEY = 'daylife_dreams';
const MILESTONES_KEY = 'daylife_milestones';
const REFLECTIONS_KEY = 'daylife_reflections';
const QUOTES_KEY = 'daylife_quotes';
const SLOGANS_KEY = 'daylife_slogans';

const defaultUser = {
  id: 'current-user',
  email: 'explorer@daylife.app',
  full_name: 'DAYLIFE Explorer',
  total_stars: 0,
  streak_days: 0,
  last_login_date: null,
  life_calculation_mode: '30000_days'
};

const defaultQuotes = [
  { id: 'quote-1', text: "The future depends on what you do today." },
  { id: 'quote-2', text: "Do something today that your future self will thank you for." },
  { id: 'quote-3', text: "Little by little, one travels far." }
];

const defaultSlogans = [
  { id: 'slogan-1', text: 'Every day counts. Make yours extraordinary.' },
  { id: 'slogan-2', text: 'Dream. Act. Reflect. Repeat.' },
  { id: 'slogan-3', text: 'Create the life you imagine, one day at a time.' }
];

function ensureSeedData() {
  const quotes = readStorage(QUOTES_KEY, null);
  if (!quotes) {
    writeStorage(QUOTES_KEY, defaultQuotes);
  }
  const slogans = readStorage(SLOGANS_KEY, null);
  if (!slogans) {
    writeStorage(SLOGANS_KEY, defaultSlogans);
  }
  const users = readStorage(USERS_KEY, null);
  if (!users) {
    writeStorage(USERS_KEY, [defaultUser]);
  }
  const user = readStorage(CURRENT_USER_KEY, null);
  if (!user) {
    writeStorage(CURRENT_USER_KEY, defaultUser);
  }
}

ensureSeedData();

function sortByField(items, sortField) {
  if (!sortField) return items;
  const descending = sortField.startsWith('-');
  const field = descending ? sortField.slice(1) : sortField;
  return [...items].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (aValue === bValue) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;
    if (aValue < bValue) return descending ? 1 : -1;
    if (aValue > bValue) return descending ? -1 : 1;
    return 0;
  });
}

function updateUsersCollection(updatedUser) {
  const users = readStorage(USERS_KEY, [defaultUser]);
  const index = users.findIndex((u) => u.id === updatedUser.id);
  const nextUsers = [...users];
  if (index >= 0) {
    nextUsers[index] = updatedUser;
  } else {
    nextUsers.push(updatedUser);
  }
  writeStorage(USERS_KEY, nextUsers);
}

const daylifeClient = {
  auth: {
    async me() {
      return readStorage(CURRENT_USER_KEY, defaultUser);
    },
    async updateMe(updates) {
      const current = await this.me();
      const updated = {
        ...current,
        ...updates,
        id: current.id || 'current-user'
      };
      writeStorage(CURRENT_USER_KEY, updated);
      updateUsersCollection(updated);
      return updated;
    },
    logout() {
      removeStorage(CURRENT_USER_KEY);
    }
  },
  entities: {
    Dream: {
      async list(sortField) {
        const dreams = readStorage(DREAMS_KEY, []);
        return sortByField(dreams, sortField);
      },
      async create(data) {
        const dream = {
          id: generateId('dream'),
          created_date: format(new Date(), 'yyyy-MM-dd'),
          status: 'in_progress',
          color: 'blue',
          ...data
        };
        const dreams = readStorage(DREAMS_KEY, []);
        const next = [...dreams, dream];
        writeStorage(DREAMS_KEY, next);
        return dream;
      },
      async update(id, data) {
        const dreams = readStorage(DREAMS_KEY, []);
        const next = dreams.map((dream) => (dream.id === id ? { ...dream, ...data, id } : dream));
        writeStorage(DREAMS_KEY, next);
        return next.find((dream) => dream.id === id);
      },
      async delete(id) {
        const dreams = readStorage(DREAMS_KEY, []);
        writeStorage(DREAMS_KEY, dreams.filter((dream) => dream.id !== id));
      }
    },
    Milestone: {
      async list(sortField) {
        const milestones = readStorage(MILESTONES_KEY, []);
        return sortByField(milestones, sortField);
      },
      async create(data) {
        const milestone = {
          id: generateId('milestone'),
          created_at: new Date().toISOString(),
          status: 'to_do',
          ...data
        };
        const milestones = readStorage(MILESTONES_KEY, []);
        writeStorage(MILESTONES_KEY, [...milestones, milestone]);
        return milestone;
      },
      async update(id, data) {
        const milestones = readStorage(MILESTONES_KEY, []);
        const next = milestones.map((milestone) =>
          milestone.id === id ? { ...milestone, ...data, id } : milestone
        );
        writeStorage(MILESTONES_KEY, next);
        return next.find((milestone) => milestone.id === id);
      },
      async delete(id) {
        const milestones = readStorage(MILESTONES_KEY, []);
        writeStorage(MILESTONES_KEY, milestones.filter((milestone) => milestone.id !== id));
      }
    },
    Reflection: {
      async list(sortField) {
        const reflections = readStorage(REFLECTIONS_KEY, []);
        return sortByField(reflections, sortField);
      },
      async create(data) {
        const reflection = {
          id: generateId('reflection'),
          created_at: new Date().toISOString(),
          ...data
        };
        const reflections = readStorage(REFLECTIONS_KEY, []);
        writeStorage(REFLECTIONS_KEY, [...reflections, reflection]);
        return reflection;
      },
      async update(id, data) {
        const reflections = readStorage(REFLECTIONS_KEY, []);
        const next = reflections.map((reflection) =>
          reflection.id === id ? { ...reflection, ...data, id } : reflection
        );
        writeStorage(REFLECTIONS_KEY, next);
        return next.find((reflection) => reflection.id === id);
      },
      async delete(id) {
        const reflections = readStorage(REFLECTIONS_KEY, []);
        writeStorage(
          REFLECTIONS_KEY,
          reflections.filter((reflection) => reflection.id !== id)
        );
      }
    },
    Quote: {
      async list() {
        return readStorage(QUOTES_KEY, defaultQuotes);
      }
    },
    Slogan: {
      async list() {
        return readStorage(SLOGANS_KEY, defaultSlogans);
      }
    },
    User: {
      async list() {
        return readStorage(USERS_KEY, [defaultUser]);
      }
    }
  },
  integrations: {
    Core: {
      async UploadFile() {
        return {
          file_url: 'https://source.boringavatars.com/marble/120/Daylife?colors=4a6cf7,b06cf7,ff7abf'
        };
      },
      async GenerateImage({ prompt }) {
        const encoded = encodeURIComponent(prompt || 'profile portrait');
        return {
          url: `https://source.unsplash.com/featured/400x400?${encoded}`
        };
      }
    }
  }
};

export { daylifeClient };
