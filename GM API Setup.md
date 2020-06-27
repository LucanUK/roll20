# GM API Setup Guide

This is the guide for the Creator & GM's to setup API Scripts

## API Scripts to Add

### Add From Script Library:
* TokenNameNumber
* GroupInitiative
* GroupCheck
* Combat Master v2.0

### Manually Add:
* ApplyDamage.js (This Repo) https://raw.githubusercontent.com/LucanUK/roll20/master/Group%20Combat/ApplyDamage.js
* DeleteDead.js (This Repo) https://raw.githubusercontent.com/LucanUK/roll20/master/Group%20Combat/DeleteDead.js
* BlindRoll.js (This Repo) https://raw.githubusercontent.com/LucanUK/roll20/master/BlindRoll/BlindRoll.js

## Commands to run ingame

### Setup Group Initiative (run once Only):

* ```!group-init --del-group 1```
* ```!group-init --add-group --Bare initiative_bonus|current```
* ```!group-init --add-group --Bare npcd_dexterity_mod|current```

### Disable some Combat Master Commands (run once Only):

* ```!cmaster --config,timer,key=useTimer,value=false --show,timer```
* ```!cmaster --config,announcements,key=announceTurn,value=false --show,announce```

### Group Combat setup (run once Only):

* ```!group-check-config --import 5E-OGL```

