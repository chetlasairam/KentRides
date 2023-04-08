// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:kentrides/navScreen.dart';

const double kBaseFontSize = 10.0;

class NameScreen extends StatefulWidget {
  @override
  _NameScreenState createState() => _NameScreenState();
}

class _NameScreenState extends State<NameScreen> {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    final scaleFactor = screenWidth > screenHeight ? 1.5 : 1.0;
    final fontSize = kBaseFontSize * scaleFactor;
    return Scaffold(
      backgroundColor: const Color(0xFFB008080),
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: 30),
              Image.asset(
                'assets/images/logopng.png',
                height: 100,
              ),
              SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.only(bottom: 8.0),
                child: Text('Kent Rides',
                    style: TextStyle(
                        fontSize: 20,
                        color: Colors.white,
                        fontWeight: FontWeight.bold)),
              ),
              Expanded(
                flex: 1,
                child: ConstrainedBox(
                  constraints: BoxConstraints(maxWidth: 600),
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildTextField('enter name', 'Name'),
                        SizedBox(height: 20),
                        Container(
                          child: Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 20.0),
                            child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Expanded(
                                      child: Container(
                                          color: Colors.white, height: 1)),
                                  Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8.0),
                                    child: Text(
                                      "or",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontSize: 15,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                  Expanded(
                                      child: Container(
                                          color: Colors.white, height: 1))
                                ]),
                          ),
                        ),
                        SizedBox(height: 20),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 4.0),
                          child: buttonGrid(),
                        ),
                        Expanded(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 20),
                                child: SizedBox(
                                  width: double.infinity,
                                  child: ElevatedButton(
                                      onPressed: () {},
                                      child: Text('Next'),
                                      style: ElevatedButton.styleFrom(
                                          elevation: 4,
                                          backgroundColor: Colors.green[700],
                                          minimumSize: Size(200, 48),
                                          padding: EdgeInsets.symmetric(
                                              vertical: 20),
                                          shape: RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(50),
                                          ))),
                                ),
                              )
                            ],
                          ),
                        ),
                      ]),
                ),
              ),
              SizedBox(height: 16),
            ],
          ),
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

  Widget buttonGrid() {
    {
      return Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              buildButton('David'),
              buildButton('David'),
              buildButton('David'),
            ],
          ),
          SizedBox(height: 20),
        ],
      );
    }
  }

  Widget buildButton(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: Colors.white,
          onPrimary: Colors.grey[800],
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(50),
          ),
        ),
        onPressed: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 5),
          child: Text(
            text,
            style: TextStyle(fontSize: 20),
          ),
        ),
      ),
    );
  }
}
