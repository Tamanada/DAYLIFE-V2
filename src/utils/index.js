const routeMap = {
  Home: '/',
  Dreams: '/dreams',
  Reflections: '/reflections',
  Profile: '/profile'
};

export function createPageUrl(name) {
  return routeMap[name] ?? '/';
}

export function formatDateKey(date = new Date()) {
  return new Date(date).toISOString().split('T')[0];
}
