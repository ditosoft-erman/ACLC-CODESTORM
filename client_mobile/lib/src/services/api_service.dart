import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Update baseUrl to match the correct IP and port
  final String baseUrl = 'http://192.168.1.49:5000/auth';

  Future<Map<String, dynamic>> register(
      String firstname,
      String lastname,
      String email,
      String phone,
      String password,
      String confirmPassword) async {
    final url = Uri.parse('$baseUrl/register');
    try {
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'firstname': firstname,
          'lastname': lastname,
          'email': email,
          'phone': phone,
          'password': password,
          'confirmPassword': confirmPassword,
        }),
      );

      if (response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        print('Response body: ${response.body}');
        if (response.body.startsWith('<')) {
          throw Exception(
              'Unexpected HTML response. Check if the API endpoint is correct.');
        }
        throw Exception(
            'Failed to register user: ${jsonDecode(response.body)['error']}');
      }
    } catch (e) {
      print('Error: $e');
      throw Exception('Failed to connect to the server: $e');
    }
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');
    try {
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        print('Response body: ${response.body}');
        if (response.body.startsWith('<')) {
          throw Exception(
              'Unexpected HTML response. Check if the API endpoint is correct.');
        }
        throw Exception(
            'Failed to login: ${jsonDecode(response.body)['error']}');
      }
    } catch (e) {
      print('Error: $e');
      throw Exception('Failed to connect to the server: $e');
    }
  }
}
