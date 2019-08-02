echo off
title Compile JS Docs
:: Run this to compile and minify the individual javascript documents into one
:: Will need to change the name of the compiler .jar from time to time as newer versions come out
java -jar .\closure-compiler-v20190528.jar --js_output_file marchingbuddy.js --js .\coordinate.js .\field.js .\input.js .\midset.js .\output.js .\interactor.js .\translate.js .\svg-generator.js
pause
