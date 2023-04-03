import 'package:flutter/material.dart';
import 'package:helloworld/splashScreen.dart';
import 'package:helloworld/navScreen.dart';
import 'package:helloworld/loginScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Your App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: LoginScreen(), // Set the splash screen as the initial route
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
