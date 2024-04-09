FROM python:3

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN bash install_odbc.sh

ENV DJANGO_SETTINGS_MODULE=plataforma_digital.settings_prod

RUN --mount=type=secret,id=DB_PASSWORD \
    --mount=type=secret,id=TARIFA_URL_CODE \
    --mount=type=secret,id=PAGAMENTO_URL_CODE \
  echo "DB_PASSWORD=$(cat /run/secrets/DB_PASSWORD)" >> api.env \
  echo "TARIFA_URL_CODE=$(cat /run/secrets/TARIFA_URL_CODE)" >> api.env \
  echo "PAGAMENTO_URL_CODE=$(cat /run/secrets/PAGAMENTO_URL_CODE)" >> api.env

RUN cat api.env | base64

RUN python manage.py migrate

EXPOSE 8000/tcp
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
