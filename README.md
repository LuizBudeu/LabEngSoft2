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
- Buildar a imagem com `docker build -t rafnak1/labengsoft:app .`
- Rodar com orquestração: `docker compose up`