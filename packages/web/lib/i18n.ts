export const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: 'Welcome to VouchAI',
    login: 'Login',
    dashboard: 'Dashboard',
    payments: 'Payments',
    profile: 'Profile',
    logout: 'Logout',
    createContract: 'Create Contract',
  },
  hi: {
    welcome: 'VouchAI में आपका स्वागत है',
    login: 'लॉग इन',
    dashboard: 'डैशबोर्ड',
    payments: 'भुगतान',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
    createContract: 'अनुबंध बनाएं',
  },
  es: {
    welcome: 'Bienvenido a VouchAI',
    login: 'Iniciar sesión',
    dashboard: 'Panel',
    payments: 'Pagos',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    createContract: 'Crear contrato',
  }
};

export function t(key: string, lang: string = 'en'): string {
  return translations[lang]?.[key] || translations['en'][key] || key;
}