const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const ENCRYPTION_PEPPER = import.meta.env.VITE_ENCRYPTION_PEPPER;

export const ENCRYPTION_CONFIG = {
  keySize: 256,
  iterations: 100000,
  key: ENCRYPTION_KEY || 'default-key-2024',
  pepper: ENCRYPTION_PEPPER || 'kaw-2024',
  algorithm: 'aes-256-gcm'
} as const;