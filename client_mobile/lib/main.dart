// lib/main.dart
import 'package:flutter/material.dart';
import 'package:client_mobile/src/auth/login/login_screen.dart'; // Make sure to replace `your_project_name` with your actual project name or import path.

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(), // Set LoginScreen as the initial screen
    );
  }
}
