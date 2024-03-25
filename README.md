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

# Rodar com Docker
- Gerar certificado e chaves TLS:
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout tls.key -out tls.crt
```
- Buildar a imagem do proxy com `docker build -t rafnak1/labengsoft:proxy ./proxy`
- Atribuir a senha do banco de dados a uma variável de ambiente: `export DB_PASSWORD=<senha do banco>`
- Buildar a imagem da API com `docker build -t rafnak1/labengsoft:api --build-arg DB_PASSWORD=$DB_PASSWORD .`
- Rodar o front sem docker, de acordo com a seção "Developer setup"
- Rodar com orquestração: `docker compose up`