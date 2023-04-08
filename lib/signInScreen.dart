// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:kentrides/loginScreen.dart';

const double kBaseFontSize = 10.0;

class SignInScreen extends StatefulWidget {
  @override
  _SignInScreenState createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  bool _obscureText = true;

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    final scaleFactor = screenWidth > screenHeight ? 1.5 : 1.0;
    final fontSize = kBaseFontSize * scaleFactor;
    return Scaffold(
      backgroundColor: const Color(0xFFB008080),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: 20),
            Image.asset(
              'assets/images/logopng.png',
              height: 80,
            ),
            SizedBox(height: 10),
            Text('Kent Rides',
                style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                    fontWeight: FontWeight.bold)),
            Expanded(
              flex: 1,
              child: ConstrainedBox(
                constraints: BoxConstraints(maxWidth: 600),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildTextField('yourself@gmail.com', 'Email ID'),
                      SizedBox(height: 20),
                      _buildPasswordField('Password', "Password"),
                      SizedBox(height: 20),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                              onPressed: () {},
                              child: Text('SignIn'),
                              style: ElevatedButton.styleFrom(
                                  elevation: 4,
                                  backgroundColor: Colors.green[700],
                                  minimumSize: Size(200, 48),
                                  padding: EdgeInsets.symmetric(vertical: 20),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(50),
                                  ))),
                        ),
                      ),
                    ]),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Already have an account? ",
                  style: TextStyle(
                    fontSize: fontSize,
                    color: Colors.white,
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => LoginScreen()),
                    );
                  },
                  child: Text(
                    'Click here to LoginIn',
                    style: TextStyle(
                      fontSize: fontSize,
                      color: Colors.white,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(String label, txt) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(50),
      ),
      child: Row(
        children: [
          SizedBox(width: 10),
          Text(
            txt,
            style: TextStyle(color: Colors.grey, fontSize: 12),
          ),
          // SizedBox(width: 5),
          Container(
            color: Colors.black,
            width: 5,
          ),
          SizedBox(width: 5),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: label,
              ),
              style: TextStyle(fontSize: 15),
            ),
          ),
          SizedBox(width: 10),
        ],
      ),
    );
  }

  Widget _buildPasswordField(String label, txt) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(50),
      ),
      child: Row(
        children: [
          SizedBox(width: 10),
          Text(
            txt,
            style: TextStyle(color: Colors.grey, fontSize: 12),
          ),
          SizedBox(width: 10),
          Expanded(
            child: TextField(
              obscureText: _obscureText,
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: label,
              ),
              style: TextStyle(fontSize: 15),
            ),
          ),
          IconButton(
            onPressed: () {
              setState(() {
                _obscureText = !_obscureText;
              });
            },
            icon: Icon(
              _obscureText ? Icons.visibility_off : Icons.visibility,
            ),
            color: Colors.grey,
          ),
          SizedBox(width: 10),
        ],
      ),
    );
  }
}
