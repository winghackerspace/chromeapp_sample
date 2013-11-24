
#include <Servo.h> 

Servo myservo1;
Servo myservo2;
Servo myservo3;
Servo myservo4;
Servo myservo5;

void setup()
{
  Serial.begin(9600);

  myservo1.attach(13);  // attaches the servo on pin 8 to the servo object
  myservo2.attach(12);
  myservo3.attach(11);
  myservo4.attach(10);
  myservo5.attach(9);
}


void loop()
{
  char s,b;

  while(Serial.available() ==0);

//a very simple protocol, just receive 2 bytes, first byte is the servo motor, second byte is
//the positio(range from 0 to 9)

  if(Serial.available() == 2)
  {
    s = Serial.read();
    b = Serial.read();
    int d = (b - '0') * 18;

    switch (s)
    {
        case 49:
            myservo1.write(d);
            break;
        case 50:
            myservo2.write(d);
            break;
        case 51:
            myservo3.write(d);
            break;
        case 52:
            myservo4.write(d);
            break;
        case 53:
            myservo5.write(d);
            break;
        }

  }//if(Serial.available() >0)
}
