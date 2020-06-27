# Group Combat (GM)

## Add From Script Library:
* TokenNameNumber
* GroupInitiative
* GroupCheck
* Combat Master v2.0

## Manually Add:
* ApplyDamage.js (This Repo)

### Setup Group Initiative (once Only):

* !group-init --del-group 1
* !group-init --add-group --Bare initiative_bonus|current
* !group-init --add-group --Bare npcd_dexterity_mod|current

### Disable some Combat Master Commands (once Only):

* !cmaster --config,timer,key=useTimer,value=false --show,timer
* !cmaster --config,announcements,key=announceTurn,value=false --show,announce

Or run the following to use the menu system

* !cmaster --main


### To Run Group Init, select a group of tokens, and then use this command (or make it a macro)
* !group-init

### To Re-roll a group Init
* !group-init --reroll

### To make a Dexterity save with GroupCheck, select a group of tokens and enter this command:
* !group-check --Dexterity Save

### Group Combat Check:

* !group-check {{
--?{Save|Dexterity|Constitution|Wisdom} Save
--process
--subheader vs DC ?{DC}
--button ApplyDamage !apply-damage
~dmg [[?{Damage}]]
~type ?{Damage on Save|Half,half|None,none}
~DC ?{DC}
~saves RESULTS(,)
~ids IDS(,)
}}
	
