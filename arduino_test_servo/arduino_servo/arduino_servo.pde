#include <Servo.h> 

Servo myservo;  // create servo object to control a servo
                // a maximum of eight servo objects can be created

void setup()
{
  Serial.begin(9600);

  myservo.attach(8);  // attaches the servo on pin 8 to the servo object
}


void loop()
{
  if (Serial.available() >0)
  {
    char b = Serial.read();
    if (b>= '0' && b<= '9')
      {
         int d = (b - '0') * 18;
          myservo.write(d);
      }
  }
}
