# Test Login Credentials

## Test the login functionality with these demo accounts:

### Admin User
- **Email:** admin@rxrush.com
- **Password:** admin123
- **Expected Redirect:** /admin (Admin Dashboard)

### Customer User
- **Email:** customer@example.com
- **Password:** customer123
- **Expected Redirect:** / (Home page)

### Pharmacy User
- **Email:** pharmacy@rxrush.com
- **Password:** pharmacy123
- **Expected Redirect:** /admin/inventory (Pharmacy Dashboard)

### Additional Customer
- **Email:** jane@example.com
- **Password:** test123
- **Expected Redirect:** / (Home page)

## Testing Steps:
1. Open http://localhost:3000/login
2. Try logging in with each account
3. Verify that each user is redirected to the appropriate dashboard
4. Check that the authentication persists on page reload
5. Test logout functionality

## Features to Verify:
- ✅ RxRush branding and styling
- ✅ Working login form with validation
- ✅ Role-based authentication
- ✅ Proper redirects for each user type
- ✅ Loading states and error handling
- ✅ Clean professional login interface
