Start Server
`node --prof index.js`

Test command
`ab -n 10000 -c 10 -k -s 1 http://localhost:6666/`

Process Profiling Log
`node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt` 

debug db wrapper
```
  console.log("\x1b[41m", 'db/execute/'+(scheme.modelName ? 'Model/' + scheme.modelName : (scheme.model && scheme.model.modelName ? 'Query/' + scheme.model.modelName : scheme)) + '/' + (typeof schemeMethod === 'function' && schemeMethod.name ? schemeMethod.name : schemeMethod), "\x1b[0m", Array.from(arguments).slice(2));
```


With attillery

Install artillery by `npm install -g artillery`

