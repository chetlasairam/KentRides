import 'package:flutter/material.dart';
import 'package:kentrides/splashScreen.dart';
import 'package:kentrides/navScreen.dart';
import 'package:kentrides/loginScreen.dart';
import 'package:kentrides/signInScreen.dart';
import 'package:kentrides/nameScreen.dart';
import 'package:kentrides/custHomeScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Your App',
      debugShowCheckedModeBanner: false,

      home: CustHomeScreen(), // Set the splash screen as the initial route
      routes: {
        '/home': (context) => HomeScreen(), // Define your home screen route
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Screen'),
      ),
      body: Center(
        child: Text('Welcome to your app!'),
      ),
    );
  }
}
