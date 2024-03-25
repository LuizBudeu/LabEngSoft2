FROM python:3

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN bash install_odbc.sh

ENV DJANGO_SETTINGS_MODULE=plataforma_digital.settings_prod
ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD
EXPOSE 8000/tcp
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]