// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

process.env.REACT_APP_B2C_CLIENT_ID = '123';
process.env.REACT_APP_B2C_API_SCOPE = 'Test/Scope';
process.env.REACT_APP_B2C_AUTHORITY = 'test.authority';
process.env.REACT_APP_B2C_SIGNUP_SIGNIN = 'SignUpSignIn';
process.env.REACT_APP_B2C_EDIT_PROFILE = 'EditProfile';
process.env.REACT_APP_B2C_RESET_PASSWORD = 'ResetPassword';
