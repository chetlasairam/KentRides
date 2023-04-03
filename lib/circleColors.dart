import 'package:flutter/material.dart';
import 'dart:math' as math;

class ColorWheel extends StatefulWidget {
  final ValueChanged<Color> onColorSelected;

  const ColorWheel({Key? key, required this.onColorSelected}) : super(key: key);

  @override
  _ColorWheelState createState() => _ColorWheelState();
}

class _ColorWheelState extends State<ColorWheel> {
  List<Color> _colors = [
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.green,
    Colors.teal,
    Colors.blue,
    Colors.purple,
    Colors.pink,
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.green,
    Colors.teal,
    Colors.blue,
    Colors.purple,
    Colors.pink,
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.green,
    Colors.teal,
    Colors.blue,
    Colors.purple,
    Colors.pink
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
      double radius = constraints.maxWidth / 2;

      return GestureDetector(
        onTapDown: (details) {
          Offset center = Offset(radius, radius);
          Offset position = details.localPosition - center;
          double angle = math.atan2(position.dy, position.dx);
          if (angle < 0) {
            angle += 2 * math.pi;
          }
          int colorIndex = (angle / (2 * math.pi) * _colors.length).floor();
          widget.onColorSelected(_colors[colorIndex]);
        },
        child: CustomPaint(
          size: Size.fromRadius(radius),
          painter: _ColorWheelPainter(colors: _colors),
        ),
      );
    });
  }
}

class _ColorWheelPainter extends CustomPainter {
  final List<Color> colors;

  _ColorWheelPainter({required this.colors});

  @override
  void paint(Canvas canvas, Size size) {
    double radius = size.width / 2;
    Offset center = Offset(radius, radius);
    double anglePerPart = 2 * math.pi / colors.length;
    for (int i = 0; i < colors.length; i++) {
      Paint paint = Paint()
        ..color = colors[i]
        ..style = PaintingStyle.fill;

      Path path = Path()
        ..moveTo(center.dx, center.dy)
        ..arcTo(Rect.fromCircle(center: center, radius: radius),
            i * anglePerPart - math.pi / 2, anglePerPart, false)
        ..close();

      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Color _currentColor = Colors.white;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ColorWheel(
                onColorSelected: (color) {
                  setState(() {
                    _currentColor = color;
                  });
                },
              ),
              SizedBox(height: 50),
              Text(
                'Selected Color: ${_currentColor.toString()}',
                style: TextStyle(fontSize: 10),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}
