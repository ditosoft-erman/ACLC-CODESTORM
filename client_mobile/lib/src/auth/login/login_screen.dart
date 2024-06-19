import 'package:flutter/material.dart';
import 'package:client_mobile/src/auth/register/register_screen.dart';
import 'package:client_mobile/src/auth/login/login_service.dart'; // Import the API service

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';
  final ApiService _apiService = ApiService(); // Instantiate the API service

  void _login() async {
    if (_formKey.currentState?.validate() ?? false) {
      _formKey.currentState?.save();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Logging in with email: $_email')),
      );

      try {
        final response = await _apiService.login(_email, _password);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login successful!')),
        );
        print('Response: $response'); // You can handle the response here
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed: $e')),
        );
        print('Error: $e'); // Print error to console for debugging
      }
    }
  }

  void _navigateToRegister() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => RegisterScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFE8F5E9), // Background Light
      appBar: AppBar(
        title: Text('Login'),
        backgroundColor: Color(0xFF4CAF50), // Primary Green
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Email',
                    border: OutlineInputBorder(
                      borderSide:
                          BorderSide(color: Color(0xFF2E7D32)), // Dark Green
                    ),
                    filled: true,
                    fillColor: Color(0xFFFFFFFF),
                    labelStyle:
                        TextStyle(color: Color(0xFF1B5E20)), // Dark Text
                  ),
                  onSaved: (value) =>
                      _email = value ?? '', // Ensure non-null assignment
                  validator: (value) => (value?.isEmpty ?? true)
                      ? 'Please enter your email'
                      : null, // Use null-aware operator and provide default
                ),
                SizedBox(height: 20),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(
                      borderSide:
                          BorderSide(color: Color(0xFF2E7D32)), // Dark Green
                    ),
                    filled: true,
                    fillColor: Color(0xFFFFFFFF),
                    labelStyle:
                        TextStyle(color: Color(0xFF1B5E20)), // Dark Text
                  ),
                  obscureText: true,
                  onSaved: (value) =>
                      _password = value ?? '', // Ensure non-null assignment
                  validator: (value) => (value?.isEmpty ?? true)
                      ? 'Please enter your password'
                      : null, // Use null-aware operator and provide default
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _login,
                  child: Text('Login'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF4CAF50), // Primary Green
                    minimumSize: Size(double.infinity, 50), // Full-width button
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                ),
                SizedBox(height: 20),
                TextButton(
                  onPressed: _navigateToRegister,
                  child: Text(
                    'Don\'t have an account? Register',
                    style: TextStyle(color: Color(0xFF2E7D32)), // Dark Green
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
