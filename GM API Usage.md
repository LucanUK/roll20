# GM API Usage Guide

This is the guide for GM's to use API functions

## General Command Overview

### To Run Group Init, select a group of tokens, and then use this command 
* ```!group-init```

### To Re-roll a group Init
* ```!group-init --reroll```

### To make a Dexterity save with GroupCheck, select a group of tokens and enter this command:
* ```!group-check --Dexterity Save```

### Group Combat Simple DC Check:

* ```!group-check --whisper --Dexterity Save```

## Macro's to Setup

### Name: group-init
* ```!group-init```

### Name: group-init-reroll
* ```!group-init --reroll```

### Name: group-DC-check
* ```!group-check --whisper {{ --?{Save|Dexterity|Constitution|Wisdom} Save --process --subheader vs DC ?{DC} --button ApplyDamage !apply-damage ~dmg [[?{Damage}]] ~type ?{Damage on Save|Half,half|None,none} ~DC ?{DC} ~saves RESULTS(,) ~ids IDS(,) }}```

### Name: group-init-reroll
**Show as Token Action - True**
* ```!delete-dead --ids @{selected|token_id} --force 1```

