#!/bin/bash

# Baixa a imagem
docker pull mongo

# Remove o container, se existir
docker stop node-hapijs
docker container rm node-hapijs

# Gera o container
docker run --name node-hapijs -p 27017:27017 -d mongo
