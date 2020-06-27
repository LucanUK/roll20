# Macros for player use

## Suggested Macros

### Name: Crtical-Hit
* /r 1t[Critical-Hits]

### Name: Fumble
* /r 1t[Critical-Miss]

### Name: Quick-Init
* @{selected|token_name}'s Initiative Roll: [[1d20+@{selected|Initiative_bonus} &{tracker}]]

### Name: Blind-Roll
* !broll [[?{Number Of Dice}?{Dice Type|d4|d8|d10|d20|d100}+?{Modifer|0}]] Blind

## Option Macro Examples

### Name: Lockpick-Selected
* !broll 1d20+@{selected|dexterity_mod}+@{selected|pb} For Lockpicking

### Name: Lockpick-Rogue
#### note the space after the character name
* !broll 1d20+@{Carric Laidon |dexterity_mod}+@{Carric Laidon |pb} For Lockpicking

### Name: Check-Traps
* !broll 1d20+@{selected|perception_bonus} Checking for traps!