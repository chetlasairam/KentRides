// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';

class NavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer();
  }
}

class CustHomeScreen extends StatefulWidget {
  const CustHomeScreen({Key? key}) : super(key: key);

  @override
  _CustHomeScreenState createState() => _CustHomeScreenState();
}

class _CustHomeScreenState extends State<CustHomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _offsetAnimation;

  var tog = 0;
  var _number_tickets_total;

  @override
  void initState() {
    super.initState();
    _controller =
        AnimationController(duration: Duration(milliseconds: 500), vsync: this);
    _offsetAnimation = Tween<Offset>(begin: Offset(-1, 0), end: Offset(0, 0))
        .animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    return Scaffold(
      drawer: NavBar(),
      backgroundColor: const Color(0xFFB005959),
      appBar: AppBar(
        backgroundColor: const Color(0xFFB008080),
        shadowColor: Colors.transparent,
        leading: IconButton(
          icon: Icon(Icons.menu),
          onPressed: () {
            if (tog == 0) {
              _controller.forward();
              tog = 1;
            } else {
              _controller.reverse();
              tog = 0;
            }
          },
        ),
        actions: [
          PopupMenuButton(
            itemBuilder: (BuildContext context) => <PopupMenuEntry>[
              const PopupMenuItem(
                child: Text('Option 1'),
              ),
              const PopupMenuItem(
                child: Text('Option 2'),
              ),
              const PopupMenuItem(
                child: Text('Option 3'),
              ),
            ],
          ),
        ],
        title: Text('Example Screen'),
      ),
      body: Center(
        child: Stack(
          children: [
            Center(
              child: Column(
                children: [
                  Row(
                    children: [
                      Text(
                        "Date: ",
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 0, horizontal: 8),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.black)),
                        child: DropdownButton<int>(
                            hint: Text("MM"),
                            value: _number_tickets_total,
                            items: <int>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                .map((int value) {
                              return new DropdownMenuItem<int>(
                                value: value,
                                child: new Text(value.toString()),
                              );
                            }).toList(),
                            onChanged: (newVal) {
                              setState(() {
                                _number_tickets_total = newVal;
                              });
                            }),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 0, horizontal: 8),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.black)),
                        child: DropdownButton<int>(
                            hint: Text("DD"),
                            value: _number_tickets_total,
                            items: <int>[
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7,
                              8,
                              9,
                              10,
                              11,
                              12,
                              13,
                              14,
                              15,
                              16,
                              17,
                              18,
                              19,
                              20,
                              21,
                              22,
                              23,
                              24,
                              25,
                              26,
                              27,
                              28,
                              29,
                              30
                            ].map((int value) {
                              return new DropdownMenuItem<int>(
                                value: value,
                                child: new Text(value.toString()),
                              );
                            }).toList(),
                            onChanged: (newVal) {
                              setState(() {
                                _number_tickets_total = newVal;
                              });
                            }),
                      )
                    ],
                  ),
                  Row(
                    children: [
                      Text(
                        "Date: ",
                        style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 0, horizontal: 8),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.black)),
                        child: DropdownButton<int>(
                            hint: Text("MM"),
                            value: _number_tickets_total,
                            items: <int>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                .map((int value) {
                              return new DropdownMenuItem<int>(
                                value: value,
                                child: new Text(value.toString()),
                              );
                            }).toList(),
                            onChanged: (newVal) {
                              setState(() {
                                _number_tickets_total = newVal;
                              });
                            }),
                      ),
                      Container(
                        padding:
                            EdgeInsets.symmetric(vertical: 0, horizontal: 8),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.black)),
                        child: DropdownButton<int>(
                            hint: Text("DD"),
                            value: _number_tickets_total,
                            items: <int>[
                              1,
                              2,
                              3,
                              4,
                              5,
                              6,
                              7,
                              8,
                              9,
                              10,
                              11,
                              12,
                              13,
                              14,
                              15,
                              16,
                              17,
                              18,
                              19,
                              20,
                              21,
                              22,
                              23,
                              24,
                              25,
                              26,
                              27,
                              28,
                              29,
                              30
                            ].map((int value) {
                              return new DropdownMenuItem<int>(
                                value: value,
                                child: new Text(value.toString()),
                              );
                            }).toList(),
                            onChanged: (newVal) {
                              setState(() {
                                _number_tickets_total = newVal;
                              });
                            }),
                      )
                    ],
                  )
                ],
              ),
            ),
            SlideTransition(
              position: _offsetAnimation,
              child: Container(
                  color: Colors.white,
                  width: MediaQuery.of(context).size.width * 0.5,
                  height: MediaQuery.of(context).size.height,
                  child: GestureDetector(
                    onTap: () {},
                    child: ListView(children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: 20,
                          horizontal: 8.0,
                        ),
                        child: Center(
                            child: Text(
                          'Requested Rides',
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.bold),
                        )),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: 20,
                          horizontal: 8.0,
                        ),
                        child: Center(
                            child: Text(
                          'Requested Rides',
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.bold),
                        )),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          vertical: 20,
                          horizontal: 8.0,
                        ),
                        child: Center(
                            child: Text(
                          'Requested Rides',
                          style: TextStyle(
                              fontSize: 15, fontWeight: FontWeight.bold),
                        )),
                      )
                    ]),
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
