# Developer setup

Em um terminal:

git clone https://github.com/LuizBudeu/LabEngSoft2.git

python -m venv env

/env/Scripts/Activate.ps1

cd LabEngSoft2

pip install -r requirements.txt

python manage.py runserver

Outro terminal:

cd front

npm install

npm start

Utilização:

Backend API em `http://127.0.0.1:8000/`

Frontend em `http://localhost:3000/`

# Rodar com Docker localmente
- Gerar certificado e chaves TLS dentro de `./proxy`:
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt
```
- Buildar a imagem do proxy com `docker build -t rafnak1/labengsoft:proxy ./proxy`
- Buildar a imagem da API com `docker build -t rafnak1/labengsoft:api --build-arg DB_PASSWORD=<SENHA DO BD NA NUVEM> .`
- Criar no `./front` um `.env` com `REACT_APP_PROTOCOL_HOSTNAME_PORT=https://localhost`
- Rodar o front sem docker, mas dessa vez com `npm install` e `npm run start-docker`
- Rodar com orquestração: `docker compose up`