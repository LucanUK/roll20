# Macros for player use

## Suggested Macros

### Name: Crtical-Hit
**Show in Macro Bar - True**
* ```/r 1t[Critical-Hits]```

### Name: Fumble
**Show in Macro Bar - True**
* ```/r 1t[Critical-Miss]```

### Name: Quick-Init
**Show as Token Action - True**
* ```@{selected|token_name}'s Initiative Roll: [[1d20+@{selected|Initiative_bonus} &{tracker}]]```

### Name: Blind-Roll
**Show in Macro Bar - True**
* ```!broll ?{Number Of Dice|1}?{Dice Type|d4|d8|d10|d20|d100}+?{Modifier|0} Blind```

## Optional Macro Examples

### Name: Lockpick-Selected
**Show as Token Action - True**
* ```!broll 1d20+@{selected|dexterity_mod}+@{selected|pb} For Lockpicking```

### Name: Lockpick-Rogue
**Show in Macro Bar - True**
* ```!broll 1d20+@{Carric Laidon|dexterity_mod}+@{Carric Laidon|pb} For Lockpicking```

### Name: Check-Traps
**Show as Token Action - True**
* ```!broll 1d20+@{selected|perception_bonus} Checking for traps!```
