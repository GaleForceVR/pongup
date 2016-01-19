# Requirements

## Personas

#### Player

This is the Table Tennis player

##### Organizer

The player who starts a new ladder

##### Challenger

The lower ranked player who challenges a higher ranked player to a match

##### Champion

The higher ranked player who accepts challenges from a lower ranked player

##### Recruit

This is a player who does not yet have an account, but is being recruited
to play by an existing Player

#### Admin

Site administrator

#### Anonymous Visitor

This is a person interested in the site who is not registered yet

## Use Cases

### Signing up

Required to sign up
* Player
* Admin

Not Required to sign up
* Anonymous Visitor
* Recruit

### Starting a new Ladder

Player

##### Pre-conditions

* Organizer is a registered user

##### Steps

1. Visit the 'New Ladder' form
2. Submit the Ladder's name and info
3. Recieves an email with the Ladder info
  3.1 Ladder overview
  3.2 URLS
  3.3 Instructions on how to proceed

##### Post-conditions

1. Ladder is set up and ready for Players to join

### Join a Ladder

Player

##### Pre-conditions

* Player is registered

##### Steps

1. visit the 'Ladders' page and select a 'Ladder'
2. visit the 'Ladder Detail' page and press the 'Join Ladder' button
3. Recieves an email with Ladder info
  3.1 Ladder overview
  3.2 URLS
  3.3 Instructions on how to proceed

##### Post-conditions

1. Player is added to the Ladder

### Leave a Ladder

Player

##### Pre-Conditions

* Player is a member of said Ladder

##### Steps

1. visit the 'Ladders' page
2. click the 'Leave Ladder' button next to the Ladder in question
3. Recieve an email confirming release from ladder

##### Alternate Steps

1. visit the 'Ladders' page and select the Ladder
2. visit the 'Ladder Detail' page and click 'Leave Ladder' button next to your name
3. Recieve an email confirming release from ladder

##### Alternate Alternate Steps

1. violate the rules of the Ladder and be removed programatically
2. Recieve an email confirming release from ladder

##### Post-Conditions

* Player is removed from ladder
* data from competition in ladder is still stored in database

### Enter match results

Player

##### Pre-Conditions

* Player is scheduled for a match

##### Steps

1. visit the 'Ladder Detail' page
2. click form field next to players name and enter score
3. tab to other players form field and enter thier score

##### Post-Conditions

* Player match data and rating is updated
* All player ratings are updated
* Ladder Rankings are updated


