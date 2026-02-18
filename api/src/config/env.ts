/**
 * Environment variable validation.
 * Validates required vars at startup and fails fast with clear errors.
 */

const REQUIRED = [
  { key: 'DATABASE_URL', description: 'PostgreSQL connection URL' },
  { key: 'RESEND_API_KEY', description: 'Resend API key for OTP emails' },
  { key: 'SUPABASE_URL', description: 'Supabase project URL (for storage)' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', description: 'Supabase service role key (for storage)' },
] as const;

function validateEnv(): void {
  const missing: string[] = [];

  for (const { key, description } of REQUIRED) {
    const value = process.env[key];
    if (value === undefined || value === '') {
      missing.push(`  ${key} - ${description}`);
    }
  }

  if (missing.length > 0) {
    const message = [
      'Missing required environment variables:',
      '',
      ...missing,
      '',
      'Set these in .env or your environment before starting the server.',
    ].join('\n');
    throw new Error(message);
  }
}

/**
 * Validates required env vars. Call at app startup.
 * Throws if any required var is missing.
 */
export function validateEnvOnStartup(): void {
  validateEnv();
}
