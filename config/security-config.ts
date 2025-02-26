export const securityConfig = {
  // Session and cookie settings
  sessionMaxAge: 60 * 60, // 1 hour in seconds
  
  // Password requirements
  passwordMinLength: 8,
  passwordRequiresUppercase: true,
  passwordRequiresLowercase: true,
  passwordRequiresNumber: true,
  passwordRequiresSpecialChar: true,
  
  // Rate limiting
  maxLoginAttemptsPerMinute: 5,
  maxRequestsPerMinute: 60,
  accountLockoutDuration: 15 * 60 * 1000, // 15 minutes in milliseconds
  
  // Security headers
  strictCSP: true,
  enableHSTS: true,
} 