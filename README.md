#Find and replace for Sketch 3

Finds text in selected layer(s) and all layers contained within - and replaces it with different text.  Now updated to do partial, case sensitive and full-document matching.

##Installation
Download and unzip, then double-click on the .sketchplugin file to copy it to the plugins folder and install automatically into Sketch 3. 

##Usage
**Menu** - You can access it from the menu **Plugins -> Find And Replace -> Find and Replace** 
**Keyboard** - Alternatively, use the keyboard shortcut **cmd + shift + f**

##Options
**Scope** - How much of your document it will actually search  
* If you have selected layers to search in, then *Selected layers* will be chosen automatically.  
* If you haven't, then *Document* is your only choice and it will search every layer in every artboard in every page of your document.

**Case sensitive** - Whether it matches exactly as you typed or not
* *No* by default ("john" will match "John") 
* *Yes* it will match exactly as you typed it ("john" won't match "John").

**Match text layer** - Where in your text layer it should match the search term
* *Complete* will match your Find text against a text layer if it is *exactly* the same - excluding whitespace at the start or end (example "John Smith" will match text layers that read "John Smith").
* *Anywhere* will do a partial match (example "Smith" will match against "John Smith" and replace the word "Smith" only).
* *At start* will only match at the start of the text layer ("John" will match against "John Smith", but "Smith" won't)
* *At end* will only match at the end of the text layer ("Smith" will match against "John Smith", but "John" won't)

**Match whole words only** - Whether it matches whole or partial words
* *Yes* (default) will match whole words ("oh" will not match "John")
* *No* will match partial words ("oh" will match "John", if you wanted to change him to "Joan" for example)

##Future
* **Default find text** - If you have a text field selected, use that text as the default find text
* **Search in current page** - Will add a new scope of current page only
* **Search in current artboard** - Will add a new scope of current artboard only
* **Persist settings** - Remember your settings for next time you do a find/replace

##Issues or ideas
If you have any problems, or ideas, please open an issue.
***
*Disclaimer.  I take no responsibility for what you find and replace, or for any changes made unintentionally due to this software erroring.  I do test it before I release it so the chances of bugs are minimised, but still, use wisely and completely at your own risk. Remember, cmd-z is your saviour.*
