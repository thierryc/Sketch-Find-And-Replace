#Find and replace for Sketch 3

Finds text in selected layer(s) and all layers contained within - and replaces it with different text.  Now updated to do partial, case sensitive and full-document matching.

##Installation
Download and unzip, then double-click on the .sketchplugin file to copy it to the plugins folder and install automatically into Sketch 3. 

##Usage
**Menu** - You can access it from the menu **Plugins -> Find And Replace -> Find and Replace** 
**Keyboard** - Alternatively, use the keyboard shortcut **cmd + shift + f**

##Options
**Scope** - *Document* or *selected layer(s)*.  If you have select layers to search in, then *Selected layers* will be chosen automatically.  If you haven't, then *Document* is your only choice and it will search every layer in every artboard in every page of your document.

**Case sensitive** - *No* by default ("john" will match "John", but if you choose *Yes* it will match exactly as you typed it ("john" won't match "John").

**Match** - Whole text will match your Find text against a text item if it is exactly the same (excluding whitespace at the start or end, which it ignores (example "John Smith" will only match text items that say "John Smith").  Anywhere will do a partial match (example "Smith" will match against "John Smith" and replace the word "Smith" only).
