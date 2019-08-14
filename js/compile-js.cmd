@ECHO OFF
SETLOCAL
TITLE JavaScript Compiler Batch
:: Run this to compile and minify the individual javascript documents into one
:: Will need to change the name of the compiler .jar from time to time as newer versions come out
::
:: Compilation levels. BUNDLE puts all into one without minifying, best for debugging. SIMPLE is what is used for minifying the project.
SET bundle=BUNDLE
SET whitespace=WHITESPACE_ONLY
SET simple=SIMPLE
SET advanced=ADVANCED
:: Name of the minified output javascript file
SET outputname=marchingbuddy.js
:: Compilation level, from one of the 4 options listed above
SET compilationlevel=%simple%
:: Name of the .jar for the closure compiler.
SET jarname=closure-compiler-v20190618.jar
:: Need to add on names of javascript files as the project becomes larger. Order matters when files reference other files.
java -jar .\%jarname% --compilation_level %compilationlevel% --js_output_file %outputname% --js .\helper.js .\coordinate.js .\field.js .\input.js .\movement.js .\interactor.js
PAUSE
