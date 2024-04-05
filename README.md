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

Adicionar o `.env` em `./front`

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
- Criar na raíz um `api.env` com a senha do banco de dados na nuvem
- Buildar a imagem da API com `docker build -t rafnak1/labengsoft:api --secret id=DB_PASSWORD,src=./api.env .`
- Adicionar o `.env` em `./front`
- Mudar a variável `REACT_APP_PROTOCOL_HOSTNAME_PORT` para `https://localhost`
- Rodar o back com orquestração: `docker compose up`
- Rodar o front sem docker, com `npm install` e `npm start`