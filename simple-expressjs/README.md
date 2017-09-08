# Raw NodeJS

Start server by `node index.js`

Test command
`ab -n 10000 -c 7 -k -s 1 http://localhost:6666/`

__Result__:
```
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
```

# With attillery

Install artillery by `npm install -g artillery`

# With Docker

Build image by `docker build -t loadtest-simpleexpressjs .`

Start container by `docker run -d -p 6666:6666 loadtest-simpleexpressjs`

Run same AB test `ab -n 10000 -c 7 -k -s 1 http://localhost:6666/`

__Result__:
```
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
```
It's slower than raw nodejs, could be caused by the testing machine. Docker on Mac OS X is running on VM.

# Raw NodeJS on GCE n1-standard-1 (1 vCPU, 3.75 GB memory)

Tests sent from _tjiatest_ (us-central1-a 10.240.0.16) to _gke-load-test-default-pool-f4ec42e0-gwd3_ (us-central1-a 10.240.0.15) `ab -n 50000 -k http://10.240.0.15:6666/`

__Result:__
```
Concurrency Level:      1
Time taken for tests:   10.731 seconds
Complete requests:      50000
Failed requests:        0
Keep-Alive requests:    50000
Total transferred:      10250000 bytes
HTML transferred:       100000 bytes
Requests per second:    4659.42 [#/sec] (mean)
Time per request:       0.215 [ms] (mean)
Time per request:       0.215 [ms] (mean, across all concurrent requests)
Transfer rate:          932.79 [Kbytes/sec] received
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       2
Processing:     0    0   0.1      0       6
Waiting:        0    0   0.1      0       6
Total:          0    0   0.1      0       6
Percentage of the requests served within a certain time (ms)
  50%      0
  66%      0
  75%      0
  80%      0
  90%      0
  95%      0
  98%      0
  99%      1
 100%      6 (longest request)
```

With external IP, test sent from _gke-load-test-default-pool-f4ec42e0-gwd3_ (us-central1-a 10.240.0.15 / 104.198.203.123) to _tjiatest_ (us-central1-a 10.240.0.16 / 104.198.159.127) `ab -n 50000 -k http://104.198.159.127:6666/`

Result:
```
Concurrency Level:      1
Time taken for tests:   28.466 seconds
Complete requests:      50000
Failed requests:        0
Keep-Alive requests:    50000
Total transferred:      10250000 bytes
HTML transferred:       100000 bytes
Requests per second:    1756.49 [#/sec] (mean)
Time per request:       0.569 [ms] (mean)
Time per request:       0.569 [ms] (mean, across all concurrent requests)
Transfer rate:          351.64 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       4
Processing:     0    1   1.5      1     255
Waiting:        0    1   1.5      0     255
Total:          0    1   1.5      1     255

Percentage of the requests served within a certain time (ms)
  50%      1
  66%      1
  75%      1
  80%      1
  90%      1
  95%      1
  98%      1
  99%      2
 100%    255 (longest request)
```

# Using k8s/docker on GKE n1-standard-1 (1 vCPU, 3.75 GB memory)

Build image: `docker build -t gcr.io/onesnastaging/loadtest-simpleexpressjs:v1 .`

Push image `gcloud docker -- push gcr.io/onesnastaging/loadtest-simpleexpressjs:v1`

Retrieve kubectl credentials: `gcloud container clusters get-credentials load-test`

Start pod: `kubectl run loadtest-simpleexpressjs --image=gcr.io/onesnastaging/loadtest-simpleexpressjs:v1 --port 6666`

Create service: `kubectl expose deployment loadtest-simpleexpressjs --type=LoadBalancer --port 6666`

Test with `ab -n 50000 -k http://104.154.22.164:6666/`

__Result:__
```
Concurrency Level:      1
Time taken for tests:   26.273 seconds
Complete requests:      50000
Failed requests:        0
Keep-Alive requests:    50000
Total transferred:      10250000 bytes
HTML transferred:       100000 bytes
Requests per second:    1903.07 [#/sec] (mean)
Time per request:       0.525 [ms] (mean)
Time per request:       0.525 [ms] (mean, across all concurrent requests)
Transfer rate:          380.98 [Kbytes/sec] received
Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       2
Processing:     0    1   1.0      0     227
Waiting:        0    1   1.0      0     227
Total:          0    1   1.0      0     227
Percentage of the requests served within a certain time (ms)
  50%      0
  66%      1
  75%      1
  80%      1
  90%      1
  95%      1
  98%      1
  99%      1
 100%    227 (longest request)
```

Clean up and delete service: `kubectl delete service loadtest-simpleexpressjs`


# Check Profiling

Start server by `node --prof index.js`

Process Profiling Log `node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt` 
