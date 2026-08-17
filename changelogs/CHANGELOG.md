# Rogue! Mayhem | v0.17

## MAJOR CHANGES ( ''' )
* optimized armor set effect checks
* optimized pet sync tick checks
* optimized quest tick checks

### THE TEMPORARELY LOST DATA
* What could have ended up in this update if I had my files back:
	* Better Loot: Many changes to loot and loottable injection
	* Better Ore Vein Generation
	* Many Quest Chapter Overhauls
	* Dungeon Crawl Variation Overhaul

## MINOR CHANGES ( '' )
* new changable Parameter: doResourcefulChecking (Determines how the coef checking is executed)
	* false = the coef value of a player is being checked every minute for every player and each time the player is granted an achievement
	* true = the coef value of a player is only being checked each time the player is granted an achievement

* new Server Mode: MAYHEM (located in "INSTANCE/kubejs/server_scripts/settings.js")
	* Chance of Skeletons spawning with special arrows are increased
	* Uses HARD mob spawning scaler for Multiplayer
	* Steeper scaling curve — difficulty rises faster for the same attribute gains
	* Mob speed maximum increased
	* Non-hostiles including tamed mobs get -50% reduced attributes (Otherwise: -33%)
	* BASE_MAX_COEF increased to 80
	* Pet Sync Heal decreased to 15% (Otherwise: 25%)

### Mob Scaling
* Pet Syncing no longer fully heals a tamed pet: Now only heals 25% of the tamed max health each Sync
* switched to dynamic search range: More players equal less initial range (does nothing in Singleplayer)
* New Auto Sync Tamed Mobs:
	* Loyal Zombies summoned by the Zombie Scepter
	* Sealed Chaos summoned by the Scepter of Sealed Chaos
	* All Servant type mobs by Goety and Goety Cataclysm

### Skill Tree Changes
* Resetting one Skill Tree no longer resets all Abilities of every tree

New Abilities:
* Afflicted
* Hellborne

New Available Skill attributes:
* Apothic Crafting
* Spell Crit Chance
* Spell Crit Damage
* Scroll Keep Chance

Overall changes:
* increased Overheal attribute amount
* reduced Tamed Resistance attribute amount
* reduced Dark Hail Ability damage
* increased Warding Impulse ability cooldown by +10 seconds
* reduced multiple Attack Speed attributes
* increased stunlocked to last 10 seconds (before: 6 seconds)
* reduced Overhealth gained by Overbite to 30% (before: 50%)

### Resources added ( °+ )
* Frostbite and Brimstone
* GTBC's Geomancy Plus Reimagined
* Icons - Numerals
* Immersive Engineering: Reimmersed
* Iron's Spells Armor Reimagined
* Vanilla Lootr

### Resources removed ( °- )
* Assorted Allays x Fresh Animations
* Emissives for xali's Potions
* Updated Engineering

### Resources updated ( °~ )
* Abnormally Fresh
* Aether Regenerated v1.3
* Assorted Allays
* Assorted Allays x FA
* Better SB Upgrades
* Better Sophisticated
* Cataclysm Reimagined
* Cataclysmic Tunes
* Ender IO: Into the Void
* EnderEyes
* Enhanced Boss Bars
* FA Emmisive
* Fresh Animations
* GrandmaPorksEmissives
* Pinnacle
* Retextures o' Plenty
* Updated Engineering
* Fresh Waystones Texture
* xali's Potions

### Shaders updated ( <~ )
* Complementary Reimagined

### Mods added ( ++ )
* AE2 Buddycards
* Alex's Mobs: Tweaks [Performance Optimization]
* Apothic Extensions
* Book of Familiars
* Botania Shader Fix
* Bye?Pregen!
* Can't Sleep Clowns Will Eat Me
* Cataclysmic Combat
* Cataclysm x YUNG's Better Nether Fortresses Compat
* Create Buddycards
* Delightful Buddycards
* Dolphin Fix
* Easy Magic + Apotheosis Compat
* Elemental Craft Crash Fix
* EMIAccelerator
* Enhanced Boss Bars
* Enhanced Celestials 2: Core
* Enhanced Celestials 2: Default Lunar Events
* Enhanced Celestials 2: Shader Support
* Fallen Gems & Affixes
* Fast Noise
* FTB Chunks x Xaero's Compat
* FTB Quests Entity Visualization
* FPS Reducer
* GeckolibBetterFPS
* GTBC's Cataclysmic Boss UI
* GTBC's Geomancy Plus - Iron's Spells Addon
* GTBC's SpellLib/API
* Ice And Fire Community Edition
* Icterine
* Immersive Petroleum
* Iotic Spellbooks
* Iris Caves
* Just Enough Immersive Multiblocks
* Jumbo Furnace
* Leaderboards
* Legendary Monsters
* Legendary Spellbooks
* Locator Bar
* Multi Mob
* Mutant More
* NaNny Reforked
* Nature's Aura Plus+
* Obscure Tooltips
* Obscure Tooltips Fix
* Primitive Mobs (Reforged)
* Raids Enhanced
* Reliable EMI
* Spell Descriptions (ISS)
* Straw Golem Updated
* Thief
* Thirst Was Reclaimed
* T.O Magic 'n Extras - Iron's Spells Addon
* Trials Backport
* Umbral Skies
* Wind's Spellbooks
* Xaero's Minimap
* Xaero's Minimap & World Map - Waystones Compatibility
* Xaero's World Map

### Mods disabled temporarely ( °° )
* Just Enough Advancements (JEA)
* Just Enough Archaeology
* Just Enough Beacons Reforged
* Just Enough Immersive Multiblocks
* Multi Mob
* Primitive Mobs (Reforged)
* Reliable EMI (REMI)
* T.O Magic 'n Extras - Iron's Spells Addon

### Mods removed ( -- )
* Ally Effect
* Apothic Curios
* Blueprint Texture Issue Fix
* Bocchium
* Cerulean
* Chunk Sending
* Connectible Chains
* Controllable
* Cupboard
* Cyanide
* Dave's Potioneering
* Distraction Free Recipes (EMI / REI / JEI)
* DoesPotatoTick?
* Eating Animation
* Enhanced Celestials - Blood, Blue, & Harvest (Super) Moons
* Environmental
* FTB Chunks - Modded Support
* Game Stages
* GPUTape
* GroovyModLoader (GML)
* Hexerei
* Iglee's Library
* Instrumental Mobs
* Item Production Lib
* MES - Moog's End Structures
* Modern Inhibited
* Moog's Structure Lib (moogs_structures)
* Necronomicon API
* Quests Freeze Fix
* Structure Essentials
* Thirst Was Taken
* TxniLib
* Undergarden/Tetra Patch
* Variable Spawner Hardness
* What Are You Voting For? 2023
* Yoyos

### Mods updated ( ~~ )
* [EMF] Entity Model Features [Fabric & Forge]
* [ETF] Entity Texture Features - [Fabric & Forge]
* Ad Astra: Giselle Addon
* Additional Banners
* Advanced Loot Info
* Aetherworks Refracted
* Alshanex's Familiars
* Amendments
* Applied Botanics Addon
* Applied Flux
* Aquaculture 2
* Aquamirae [Forge Edition]
* Ars Elemental
* Artifacts
* Arts & Crafts
* AttributeFix
* BadOptimizations
* Balm
* Baubley Heart Canisters
* Better Advancements
* Better Burning
* Better Combat [Fabric & Forge]
* Better Fog
* Biomancy
* BiomeSpy
* Blood Magic 
* Blueprint
* Bookshelf
* Botania
* Botany Pots
* Botany Trees
* Buddycards
* Caverns & Chasms
* Chat Heads
* Chimes
* Chisels & Bits - For Forge
* Citadel
* Cluttered
* CodeChicken Lib 1.8.+
* Cognition (Experience Obelisk)
* Cold Sweat
* Collective
* Colorful Lighting (Sodium Compat)
* Colorwheel
* Colorwheel Patcher
* Companion 🐕 (Neo/Forge)
* Controllable
* Cooking for Blockheads
* Cool Rain Reforged
* CorgiLib
* CraftPresence
* Create Better FPS
* Create Stock Bridge
* Create Ultimine
* Create: Central Kitchen
* Create: Enchantment Industry
* Create: Some Assembly Required
* Create: Steam 'n' Rails
* CreativeCore
* Critters and Companions
* Crust
* Cull Leaves
* Cupboard
* Cyclops Core
* Dank Storage
* Dark Utilities
* Darker Depths
* Data Anchor
* Delightful
* DoesPotatoTick?
* Domum Ornamentum
* Dramatic Doors
* Drippy Loading Screen
* Dungeon Now Loading 2%
* Duplicationless
* e4mc
* Eccentric Tome
* Ecologics
* Eidolon : Repraised
* Embers Rekindled
* EMI
* EMI Ores
* Enchantment Descriptions
* Ender IO
* Ender's Delight
* Enhanced Celestials - Blood, Blue, & Harvest (Super) Moons
* Entity Culling Fabric/Forge
* Euphoria Patches
* EvilCraft
* Explorer's Compass
* Explorify – Dungeons & Structures
* ExtendedAE
* Extreme sound muffler - (Neo)Forge
* FancyMenu
* Farmer's Delight
* Fast IP Ping
* FastSuite
* Feywild
* Flerovium
* FLIB
* Fossils and Archeology: Revival
* Fragmentum [Forge Edition]
* FramedBlocks
* Framework
* Friendly Fire
* FTB Chunks (NeoForge)
* FTB Essentials (Forge & Fabric)
* FTB Library (NeoForge)
* FTB Quests (NeoForge)
* FTB Quests Optimizer
* FTB Teams (NeoForge)
* FTB Ultimine (NeoForge)
* Functional Storage
* Fusion (Connected Textures)
* Fzzy Config
* Galosphere
* Gardens of the Dead
* GeckoLib
* Geophilic – Vanilla Biome Overhauls
* Goety - The Dark Arts
* Goety Cataclysm
* GuideME
* Hearth and Harvest
* Illagers Wear Armor
* ImmediatelyFast
* Immersive Aircraft
* Immersive Fixes
* Immersive Optimization
* In Control!
* Industrial Foregoing
* Integrated API
* Integrated Crafting
* Integrated Dungeons and Structures
* Integrated Dynamics
* Integrated Terminals
* Integrated Villages
* Inventory Essentials
* Iris/Oculus Shader Folder
* Iron's Lib
* Iron's Rpg Tweaks
* Iron's Spells 'n Spellbooks
* Iris/Oculus Shader Folder
* Jade Addons
* Jellyfishing
* Just Enough Breeding (JEBr)
* Kiwi 🥝
* Kotlin for Forge
* KubeJS
* KubeJS EnderIO
* KubeJS Nature's Aura
* KubeJS Thermal
* L_Ender 's Cataclysm
* Legendary Creatures
* Legendary Tabs
* Lionfish API
* Loot Beams: Refork
* Loot Journal: Pickup Notifier [Forge Edition]
* LootJS: KubeJS Addon
* Lootr (Forge & NeoForge)
* Lychee (Neo/Forge)
* Macaw's Bridges
* Macaw's Doors
* Macaw's Fences and Walls
* Macaw's Lights and Lamps
* Macaw's Paintings
* Macaw's Windows
* Mantle
* Map Atlases
* Max Health Fix
* ME Requester
* Meet Your Fight
* MES - Moog's End Structures
* MidnightLib
* MmmMmmMmmMmm (Target Dummy)
* Mobtimizations - Entity Performance Fixes
* ModernFix
* Modonomicon
* Moonlight Lib
* More Jellyfish
* Mowzie's Cataclysm
* Mowzie's Mobs
* mutil
* Mystic's Biomes
* Nature's Compass
* Nirvana Library
* Not Enough Animations
* Nyf's Spiders
* Occultism
* Orbital Railgun Reforged
* Packet Fixer
* Particle Core
* Patchouli
* Pig Pen Cipher
* Platform
* PneumaticCraft: Repressurized
* Pufferfish's Attributes [Fabric & Forge & NeoForge]
* Pufferfish's Skills [Fabric & Forge & NeoForge]
* Real Camera
* Rebind Narrator
* Rechiseled
* Rechiseled: Create
* Relics
* Reliquary Reincarnations
* Repurposed Structures (Neoforge/Forge)
* Ribbits
* Runelic
* Save My Shaky Network
* Scholar
* Shield Expansion
* Simple Voice Chat
* Snow! Real Magic! ⛄ (Neo/Forge)
* Sooty Chimneys
* Sophisticated Backpacks
* Sophisticated Backpacks Create Integration
* Sophisticated Core
* Special AI
* Special Mobs
* Structure Essentials
* Structurify - Structure Control
* Stylish Effects
* Subtle Effects
* SuperMartijn642's Core Lib
* Supplementaries
* Supplementaries Squared
* TACT - Tiny Alex's Caves Tweaks
* Tetra
* tetracelium
* Tetranomicon
* Text Animator
* The Bumblezone (NeoForge/Forge)
* The New Shutters
* The Outer End
* Theurgy
* Tinkers Construct
* Tinkers Integrations and Tweaks
* Tips
* Titanium
* Tome of Blood: Rebirth
* Tool Belt
* TooManyRecipeViewers (TMRV)
* Trample No More
* TrashSlot
* Twilight's Flavors & Delight
* UniLib
* Unusual End
* Vanilla Backport
* Variants&Ventures
* Visuality: Reforged
* Wares
* Waystones
* Whaleborne
* Withering Boon for Tetra
* Zeta

# Rogue! Mayhem | v0.16.2

## MAJOR CHANGES ( ''' )
* multiple tick optimizations for quests and assisted crafting improvements
* added new rare ore veins (can be viewed with EMI)
	* Starfall Vein - consists of 10 different rare ores
	* Radioactive Vein - consists of radioactive ores found only within the Toxic Caves
	
### Forge updated to 47.4.12 ( ⬆️ )

## MINOR CHANGES ( '' )
* overhauled ore vein chance and distribution
* fixed Glitched boxes not summoning Gateways, having debug code and displaying coef wrongly
* optimised level entity detection quests
	* now requires a condition before detecting nearby entities
* fixed sound when finishing an assisted craft
* reduced "maxPlayerSearchRange" by 64 blocks, now: 128 blocks; has no impact on singleplayer
* fixed Nothingness not teleporting properly caused by Mystic's Monstrosity Fixes
* removed Feywild's forge and blacksmith structures

### Mob Scaling
* Summoner's Scrolls now scale properly

### Mods added ( ++ )
* Structurify

### Mods removed ( -- )
* Mystic's Monstrosity Fixes
* Trials Chambers Backport (has been removed by the author)

### Mods updated ( ~~ )
* [EMF] Entity Model Features [Fabric & Forge]
* Data Anchor
* Duplicationless
* Embers Rekindled
* FancyMenu
* FTB Quests
* Integrated Dynamics
* Integrated Terminals
* Macaw's Furniture
* Macaw's Trapdoors
* MidnightLib
* Special Mobs
* TooManyRecipeViewers (TMRV)

---
# Rogue! Mayhem | v0.16.1

## MAJOR CHANGES ( ''' )
* removed spawn unlocking

## MINOR CHANGES ( '' )
* removed nuggets and ingots from urn loot
* fixed missing Quest Rewards and descriptions
* renamed SET_MAYHEM_MODE to SET_SERVER_MODE

### Mods added ( ++ )
* Better Fog

### Mods removed ( -- )
* Fog
* M.R.U

### Mods updated ( ~~ )
* Blood Magic 
* Cull Leaves
* DoesPotatoTick?
* Hex Casting
* MidnightLib
* Pufferfish's Skills

---
# Rogue! Mayhem | v0.16

## MAJOR CHANGES ( ''' )
* overhauled Mob Scaling if played on server with more than 1 player

### Forge updated to 47.4.11 ( ⬆️ )

## MINOR CHANGES ( '' )
* increased Nothingness spot finding speed significantly
* added Hearth and Harvest drinkables and food to quench Thirst
* removed certain blocks to not be broken by idle mobs
* overhauled Companionship chapter
* disabled force-loaded Spawn Chunks
* improved level checking for Special Quests

### Mob Scaling
* improved random arrow modifier for entities that use bows - now use the same logic as mob scaling
* Mob Scaling Enhancement for Servers
	* Now searches all nearby Players around a spawning mob in a specified radius, thereby determining mob scaling based on the selected mode.
	* If only one player is nearby the spawned entity, the mob scales regularly
	* Mode can be change manually within "kubejs/server_scripts/server_modes.js"
* added 2 MODES for servers: BALANCED, HARD; Default Mode: BALANCED
	* HARD: When a mob is spawned close to multiple players, picks the player with the highest coefficient near that mob.
	* BALANCED: When a mob is spawned close to multiple players, divides total coefficient by the amount of nearby players.
* Spectres by Species now sync attributes properly when summoned by it's sword

### Resources added ( °+ )
* Abnormally Fresh
* Cataclysmic tunes
* Chaotix Apotheotic Tweaks
* Fresh Moves
* L_Ender 's Cataclysm Reimagined

### Resources removed ( °- )
* Fresh Animations
* Fusion Emissive Ores
* More Mob Variants x Fresh Animations

### Resources updated ( °~ )
* Powah Pyxal-ated

### Mods added ( ++ )
* Abnormals Delight
* Ally Effect
* Archery Expansion
* Archery Expansion Squared
* BadOptimizations
* Better Clouds Reforged
* Better F3
* Better World Loading
* Bocchium
* BiomeSpy
* Caverns & Chasms
* Clean Tooltips
* Cognition
* Colorful Lighting
* Common Networking
* Cool Rain Reforged
* Create Better FPS
* Darker Depths
* Dynamic Crosshair
* Ender Trigon
* Fire Spread Tweaks
* Flerovium
* Fossils and Archelogy: Revival
* Freeze the Happy Ghasts
* GPUTape
* Great Scrollable Tooltips
* Illager Invasion
* Illagers Wear Armor
* Immersive Fixes
* Integrated Villages
* KubeJS EnderIO
* Loot Beams: Refork
* MES - Moog's End Structures
* Mowzie's Cataclysm
* Mystic's Monstrosity Fixes
* Nirvana Lib
* Orbital Railgun Reforged
* Particle Core
* Particle Effects Reforged
* Platform
* PVP Flagging
* Quests Kill Task Tweaks
* Responsive Shields
* Save My Shaky Network
* Summoner Scrolls
* Tetratic Combat Expanded
* Unusual End
* Whaleborne
* Vanilla Backport: Chase the Skies, The Garden Awakens

### Mods removed ( -- )
* Happy Ghasts Backport
* Loot Beams: Relooted!
* Lucent
* Noisium

### Mods updated ( ~~ )
* [EMF] Entity Model Features
* [ETF] Entity Texture Features
* Advanced Loot Info
* AllTheLeaks (Memory Leak Fix)
* Amendments
* Chat Heads
* Common Capabilities
* Create
* Create Crafts & Additions
* Create Slice & Dice
* Create: Filters Anywhere
* Create: Pattern Schematics
* Create: Steam 'n' Rails
* Crust
* Cyclops Core
* Drippy Loading Screen
* Eidolon : Repraised
* Embers Rekindled
* Euphoria Patches
* ExtendedAE
* EvilCraft
* Forgiving Void
* Fragmentum
* FTB Quests
* Goety - The Dark Arts
* Integrated Crafting
* Integrated Dynamics
* Integrated Terminals
* Integrated Tunnels
* Inventory Essentials
* Mutant Monsters
* Packet Fixer
* Platform
* Ponder for KubeJS
* Sophisticated Backpacks
* Sophisticated Backpacks Create Integration
* Sophisticated Core
* Special AI
* Special Mobs
* Supplementaries Squared
* The Bumblezone

---
# Rogue! Mayhem | v0.15.2

## MAJOR CHANGES ( ''' )
* fixed Pufferfish abilities not triggering if not playing on server

## MINOR CHANGES ( '' )
* fixed Rogue Meter updating when no player is available

### Mods removed ( -- )
* CurioEnchantment
* EMI Trades (Villager Trading EMI Plugin)
* FastBoot

---
# Rogue! Mayhem | v0.15.1

## MAJOR CHANGES ( ''' )
* Changed event firing to not crash when played on servers

### Resources updated ( °~ )
* EnderIO - Refrubished!
---
# Rogue! Mayhem | v0.15

## Notes ( !! )
* Update may cause worlds to break! If you still want to play inside your old world you need to re-download [ShineaL's Prehistoric Expansion](https://www.curseforge.com/minecraft/mc-mods/shineals-prehistoric-expansion/files/all?page=1&pageSize=20&version=1.20.1&showAlphaFiles=show)  manually - it uses bad datapack injection. 

## MAJOR CHANGES ( ''' )
* MCreator mod cleanup
* Ability cooldowns now decrement per tick, not per second
* removed PlayerEvents.inventoryChanged event to custom filters for better quest item checking

## Mob Scaling
* nerfed starting [Arrow Damage]
* slightly nerfed starting [Attack Damage]
* nerfed starting [Armor] and [Armor Toughness]

## MINOR CHANGES ( '' )
* balanced Brawler skill tree attribute distribution
* fixed lag when using Nothingness item
* added Multiservo recipe for ingot to plate option
* disabled shake effects caused by Warden spawning in
* fixed offset recipe category for Assisted Crafting

## Ability Changes
* Brute Force trigger chance reduced from 1% to 0.5%. Now cooldown is tied to the ability's level.
* Dark Hail cooldown increased from 15s to 40s
* Crit Damage slightly reduced
* Catabolic Link cost reduced to 1 point

### Resources added ( °+ )
* Creeper Overhaul x Fresh Animations
* Fresh Animations: Emissive
* Fusion Emissive Ores

### Resources removed ( °- )
* Assorted Wardens

### Resources updated ( °~ )
* Pixel Consistent Ghast

### Shaderpacks added ( <+ )
* Complementary Shaders - Unbound

### Shaderpacks removed ( <- )
* MakeUp - Ultra Fast | Shaders

### Mods added ( ++ )
* Chunk Sending
* CurioEnchantment
* Environmental
* Happy Ghast Backport
* Overflowing Bars
* Unsafe World Random Access Detector

### Mods removed ( -- )
* Aether Delight (A Farmer's Delight Add-on)
* Alex's Caves: Stuff & Torpedoes
* Aquaculture Delight (A Farmer's Delight Add-on)
* Copperworks
* Create: Numismatics
* Ender Wyrmlings
* Mobs of Sins: Alex's Mobs Integration
* Nether's Exoticism
* Overloaded Armor Bar
* ShineaL's Prehistoric Expansion
* Tinkers Delight (A Farmer's Delight Add-on)
* Quark Delight
* Wither Spawn Animation

### Mods updated ( ~~ )
* Advanced Loot Info
* AE2: Crafting Tree
* AllTheLeaks (Memory Leak Fix)
* Aquamirae
* Cluttered
* Cold Sweat
* DoesPotatoTick?
* Domum Ornamentum
* Dungeon Now Loading 2%
* Enchant With Mob
* Ender IO
* Entity Culling
* Euphoria Patches
* Fragmentum
* Goety - The Dark Arts
* Grimoire of Gaia
* Inventory Essentials
* Just Enough Breeding (JEBr)
* Macaw's Furniture
* ModernFix
* Moonlight Lib
* Obscure API
* Ponder for KubeJS
* Pufferfish's Attributes
* Some Assembly Required
* Sophisticated Backpacks
* Sophisticated Backpacks Create Integration
* Sophisticated Core
* Text Animator
* The Bumblezone
* Tinkers Integrations and Tweaks

---
# ROGUE! MAYHEM | v0.14d
* redecleration error fix

---
# ROGUE! MAYHEM | v0.14c
* Modpack format fix for server files
* Startup event fix for server files

---
# ROGUE! MAYHEM | v0.14b
* Cold Sweat rename fix for Skill tree validation

---
# ROGUE! MAYHEM | v0.14

## Major Changes ( ''' )

### Forge updated to 47.4.10 ( ⬆️ )

### DYNAMIC SCALING
* Readjusts mobs to your current COEF/DIFFICULTY modifier (seen bottom left)
* Non-hostile mobs get -33% reduction of attributes given
* Tamed mobs have been given a [Sync Health System]: 
* Right-click tamed mobs to sync to current DIFFICULTY modifier - sets [Attribute Sync] on cooldown

### UNIFIED ORE PROCESSING
* All ores can now be processed using different methods

### MAJOR REWRITE OF SCRIPTS
* Most script have been rewritten and refined for better overview

### SKILLTREE OVERHAUL
* All 3 skill trees have been overhauled
* Abilities have been overhauled

## Minor Changes ( '' )
* fixed Angel Ring and general flight options
* Mutant Monsters no longer count as bosses to the scaling system
* Removed Torn Pocket & Orb Of Clearance

### Resources added ( °+ )
* Assorted Wardens
* EnderIO - Refurbished!
* Pixel Consistent Ghast
* Powah Pyxal-ated
* Twilight Forest: JAPPA Pack

### Resources updated ( °~ )
* Assorted Allays
* Assorted Allays x Fresh Animations
* Bee's Fancy Crops
* Blinking Ender Eyes
* Fresh Animations
* Fresh Animations: Extensions
* Fresh Waystones Texture

### Shaderpacks updated ( <~ )
* Complementary Shaders - Reimagined
* MakeUp - Ultra Fast

### Mods added ( ++ )
* Advanced Loot Info
* Buddycards
* Cerulean
* Colorwheel
* Colorwheel Patcher
* Companion
* Create Stock Bridge
* Create Ultimine
* Create: Filters Anywhere
* Create: Pattern Schematics
* Critters and Companions
* Distraction Free Recipes
* EMIffect (Status Effects EMI Plugin)
* Exposure
* Fast Item Frames
* FastSuite
* FTB Chunks - Modded Support
* Goety Cataclysm
* Hearth and Harvest
* I'm Fast
* Immersive Optimization
* Integrated Cataclysm
* Iris/Oculus Shader Folder
* KubeJS Nature's Aura
* Legendary Creatures
* Legendary Tabs
* Load My F***ing Tags
* Mobtimizations - Entity Performance Fixes
* Mini Utilities Y
* Nature's Aura Render Fix
* Perception
* Psi
* Psionic Utilities
* Rebind Narrator
* Sophisticated Backpacks Create Integration
* Sparse Structures
* Special AI
* Species
* Subtle Effects
* Symbols 'n' Stuff

### Mods removed ( -- )
* Allayed
* Graveyard
* Icterine
* Inventory Tweaks - ReFoxed
* Just Enough Resources
* Mini Utilities
* More Mob Variants
* Sparse Structures Reforged

### Mods updated ( ~~ )
* [EMF] Entity Model Features
* [ETF] Entity Texture Features
* Ad Astra: Giselle Addon
* Aetherworks Refracted
* AllTheLeaks (Memory Leak Fix)
* Amendments
* Applied Botanics Addon
* Applied Energistics 2
* Applied Flux
* Aquamirae
* AzureLib
* Balm
* Bagus Lib
* Baubley Heart Canisters
* Better Smithing Table
* Bigger AE2
* Biomancy
* Blinking Ender Eyes
* Botania
* Botany Trees
* Building Gadgets
* Caupona
* Chat Heads
* Cold Sweat
* Collective
* Common Capabilities
* Cooking for Blockheads
* CraftPresence
* Create Crafts & Additions
* Create Slice & Dice
* Create: Central Kitchen
* Create: Steam 'n' Rails
* Crust
* Cyclops Core
* Deep Aether
* Delightful
* Dimensional Dungeons
* Domum Ornamentum
* Dungeon Now Loading 2%
* Eidolon: Repraised
* Embers Rekindled
* Ender IO
* Entity Culling
* Euphoria Patches
* EvilCraft
* Explorify – Dungeons & Structures
* ExtendedAE
* FancyMenu
* Farmer's Delight
* Farming for Blockheads
* FindMe
* Forgiving Void
* FTB Library
* FTB Ultimine
* FTB Quests
* Fusion (Connected Textures)
* Fzzy Config
* GeckoLib
* Geophilic – Vanilla Biome Overhauls
* Goblin Traders
* Goety
* GuideME
* Hearths
* Iglee's Library
* ImmediatelyFast
* Immersive Aircraft
* Immersive Optimization
* In Control!
* Industrial Foregoing
* Integrated Crafting
* Integrated Dungeons and Structures
* Integrated Terminals
* Integrated Tunnels
* Inventory Essentials
* Iron's Rpg Tweaks
* Iron's Spells 'n Spellbooks
* Jade 🔍
* Jellyfishing
* Just Enough Breeding (JEBr)
* Kiwi 🥝
* L_Ender 's Cataclysm
* Loot Journal
* Lootr
* Lychee
* Macaw's Paths and Pavings
* Macaw's Windows
* Mantle
* Map Atlas
* Meet Your Fight
* MmmMmmMmmMmm (Target Dummy)
* Moderately Enough Effect Descriptions (MEED)
* ModernFix
* Modonomicon
* Moonlight Lib
* Not Enough Animations
* Occultism
* Packet Fixer
* PneumaticCraft: Repressurized
* Potacore
* Powah! (Rearchitected)
* Pro Placer
* Pufferfish's Skills
* Pufferfish's Attributes
* Puzzles Lib
* Real Camera
* Relics
* Relics: Artifacts Compat
* Reliquary Reincarnations
* Savage & Ravage
* Scholar
* ShineaL's Prehistoric Expansion
* Simple Voice Chat
* Snow! Real Magic! ⛄
* Sophisticated Backpacks
* Sophisticated Core
* Sound Physics Remastered
* Sophisticated Backpacks
* Some Assembly Required
* Structured Crafting
* Supplementaries
* Supplementaries Squared
* TACT - Tiny Alex's Caves Tweaks
* Tesseract
* Tetra
* Text Animator
* The Bumblezone
* The New Shutters
* The Outer End
* Thermaloot
* Theurgy
* Tinkers Integrations and Tweaks
* TooManyRecipeViewers (TMRV)
* UniLib
* Waystones
