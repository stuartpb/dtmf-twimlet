# What is dtmf-twimlet?

dtmf-twimlet is a Heroku app patterned after Twilio Labs' [Twimlets][], that
returns a [TwiML][] response corresponding to a sequence of DTMF tones.

[Twimlets]: https://www.twilio.com/labs/twimlets
[TwiML]: https://www.twilio.com/docs/api/twiml

## How to use dtmf-twimlet

Direct your call flow to `https://dtmf-twimlet.herokuapp.com/`.

## Parameters to Send

The following parameters may/must be sent:

- Digits: The sequence of digits to play. Accepts (properly URL-encoded)
  '#' and '*', as well as 'w' to wait 0.5 seconds.

## Using dtmf-twimlet to add a Twilio number to a Google Voice account

1. Go to https://www.google.com/voice#phones and click "Add a number".
2. Once the number has been added and Google says you need to verify your
   phone, start the process.
3. Go to https://www.twilio.com/user/account/phone-numbers/incoming and go to
   the configuration for the Twilio number you want to associate with Google
   Voice.
4. Set the Voice Request URL for the number you're associating (you may need to
   switch the configuration from "Application" to "URLs") to
   `https://dtmf-twimlet.herokuapp.com/?Digits=` +  the two-digit confirmation
   code Google Voice is displaying that it will prompt for (so, for instance,
   if Google Voice is saying you should dial "42" when the call is answered,
   set it to `https://dtmf-twimlet.herokuapp.com/?Digits=42`).
5. Press "Connect" on the Google Voice screen.
6. Once Google Voice succesfully calls your number and gets the response it was
   looking for, if you don't want Twilio answering all your calls, uncheck the
   box that marks the new phone for general call forwarding on Google Voice,
   then set up groups and rules to forward calls to Twilio as you desire.
7. Reconfigure your Twilio number as you see fit.
