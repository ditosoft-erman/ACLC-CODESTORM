import 'package:flutter/material.dart';
import 'package:client_mobile/src/services/api_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final ApiService _apiService = ApiService();

  // Initialize the variables to avoid null issues
  String _firstname = '';
  String _lastname = '';
  String _email = '';
  String _phone = '';
  String _password = '';
  String _confirmPassword = '';

  void _register() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState?.save();
      try {
        final response = await _apiService.register(
          _firstname,
          _lastname,
          _email,
          _phone,
          _password,
          _confirmPassword,
        );
        print('Response: $response'); // Add debugging line
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Registration successful')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e')), // Update error message
        );
        print('Error: $e'); // Add debugging line
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFE8F5E9), // Background Light
      appBar: AppBar(
        title: Text('Register'),
        backgroundColor: Color(0xFF4CAF50), // Primary Green
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              children: <Widget>[
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'First Name',
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
                      _firstname = value ?? '', // Ensure non-null assignment
                  validator: (value) => value?.isEmpty ?? true
                      ? 'Please enter your first name'
                      : null,
                ),
                SizedBox(height: 20),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Last Name',
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
                      _lastname = value ?? '', // Ensure non-null assignment
                  validator: (value) => value?.isEmpty ?? true
                      ? 'Please enter your last name'
                      : null,
                ),
                SizedBox(height: 20),
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
                  validator: (value) =>
                      value?.isEmpty ?? true ? 'Please enter your email' : null,
                ),
                SizedBox(height: 20),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Phone',
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
                      _phone = value ?? '', // Ensure non-null assignment
                  validator: (value) => value?.isEmpty ?? true
                      ? 'Please enter your phone number'
                      : null,
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
                  validator: (value) =>
                      value?.isEmpty ?? true ? 'Please enter a password' : null,
                ),
                SizedBox(height: 20),
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Confirm Password',
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
                  onSaved: (value) => _confirmPassword =
                      value ?? '', // Ensure non-null assignment
                  validator: (value) => value?.isEmpty ?? true
                      ? 'Please confirm your password'
                      : null,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _register,
                  child: Text('Register'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF4CAF50), // Primary Green
                    minimumSize: Size(double.infinity, 50), // Full-width button
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
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
