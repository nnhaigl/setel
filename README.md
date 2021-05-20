# Setel
### Sytem design
 - ```order-service``` and ```payment-service``` communicate by NATS
 - ```order-service``` and ```api-gateway``` communicate by gRPC
 - ```web``` and ```api-gateway``` communicate by REST API
In order to setting up status of order will be updated after x second if confirmed, I used job on REDIS

### How to run 
```docker-compose up```

### Unit test
Unit only is written on order-service
``cd order-service && npm test``