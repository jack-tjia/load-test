# Raw NodeJS

Start server by `node index.js`

Test command
`ab -n 10000 -c 7 -k -s 1 http://localhost:6666/`

Result:
Concurrency Level:      7
Time taken for tests:   9.599 seconds
Complete requests:      100000
Failed requests:        0
Keep-Alive requests:    100000
Total transferred:      20500000 bytes
HTML transferred:       200000 bytes
Requests per second:    10417.69 [#/sec] (mean)
Time per request:       0.672 [ms] (mean)
Time per request:       0.096 [ms] (mean, across all concurrent requests)
Transfer rate:          2085.57 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    1   0.2      1      22
Waiting:        0    1   0.2      1      22
Total:          0    1   0.2      1      22

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      1
  90%      1
  95%      1
  98%      1
  99%      1
 100%     22 (longest request)

# With attillery

Install artillery by `npm install -g artillery`

# With Docker

Build image by `docker build -t loadtest-simpleexpressjs .`
Start container by `docker run -d -p 6666:6666 loadtest-simpleexpressjs`
Run same AB test `ab -n 10000 -c 7 -k -s 1 http://localhost:6666/`

Result:
Concurrency Level:      7
Time taken for tests:   25.582 seconds
Complete requests:      100000
Failed requests:        0
Keep-Alive requests:    100000
Total transferred:      20500000 bytes
HTML transferred:       200000 bytes
Requests per second:    3909.04 [#/sec] (mean)
Time per request:       1.791 [ms] (mean)
Time per request:       0.256 [ms] (mean, across all concurrent requests)
Transfer rate:          782.57 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    2   0.8      2      31
Waiting:        0    2   0.8      2      31
Total:          0    2   0.8      2      31

Percentage of the requests served within a certain time (ms)
  50%      2
  66%      2
  75%      2
  80%      2
  90%      3
  95%      3
  98%      3
  99%      4
 100%     31 (longest request)

# Check Profiling

Start server by `node --prof index.js`
Process Profiling Log `node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt` 

