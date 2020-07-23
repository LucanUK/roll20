# Macros for player use

## Suggested Macros

### Name: Critical-Hit
**Show in Macro Bar - True**
* ```/r 1t[Critical-Hits]```

### Name: Fumble
**Show in Macro Bar - True**
* ```/r 1t[Critical-Miss]```

### Name: Quick-Init
**Show as Token Action - True**
* ```@{selected|token_name}'s Initiative Roll: [[1d20+@{selected|Initiative_bonus} &{tracker}]]```

### Name: Roll-HitDice
**Show as Token Action - True**
* ```!hitdice-mc```

### Name: Blind-Roll
**Show in Macro Bar - True**
* ```!broll ?{Number Of Dice|1}?{Dice Type|d4|d6|d8|d10|d12|d20|d100}+?{Modifier|0} Blind```

## Optional Macro Examples

### Name: Lockpick-Selected
**Show as Token Action - True**
* ```!broll 1d20+@{selected|dexterity_mod}+@{selected|thieves'_tools_prof} For Lockpicking```

### Name: Lockpick-Rogue
**Show in Macro Bar - True**
* ```!broll 1d20+@{Carric Laidon|dexterity_mod}+@{Carric Laidon|thieves'_tools_prof} For Lockpicking```

### Name: Check-Traps
**Show as Token Action - True**
* ```!broll 1d20+@{selected|perception_bonus} Checking for traps!```
