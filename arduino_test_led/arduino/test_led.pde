#define LED 13
void setup()
{
  // start serial port at 9600 bps:
  Serial.begin(9600); 
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
}

int inByte=0;
void loop()
{
    if (Serial.available() > 0) {

    // get incoming byte:
    inByte = Serial.read();
    
    if (inByte == '0')
    {
      digitalWrite(LED,HIGH);
    }else if (inByte == '1')
    {
      digitalWrite(LED, LOW);
    }
  
    Serial.write(inByte);
    
    }
}
