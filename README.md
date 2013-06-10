# tempanswer

App for temporarily answering Twilio calls with dialtones

## Usage

tempanswer is for configuring any temporary responder for a service that
requires a confirmation number be dialed.

For example, to associate a Twilio number with Google Voice:

1. Go to your Twilio number's configuration, set it to use URLs and not
   applications, and set the Voice Request URL to
   http://tempanswer.herokuapp.com/incoming (POST).
2. Go to https://www.google.com/voice#phones and click "Add a number".
3. Once the number has been added and Google says you need to verify your
   phone, start the process. When given the number that you will need to dial
   to verify your phone, go to http://tempanswer.herokuapp.com/,
   enter your Twilio phone number and the two-digit confirmation code Google
   Voice is displaying that it will prompt for, then press "Connect" on the
   Google Voice screen.
4. Once Google Voice succesfully calls your number and gets the response it was
   looking for, uncheck the box that marks the new phone for general call
   forwarding on Google Voice, then set up groups and rules to forward calls to
   Twilio as you desire.
