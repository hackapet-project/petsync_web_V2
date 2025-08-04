FROM python:3.13-bookworm

ARG USER_ID=1000
ARG GROUP_ID=1000

ENV USERNAME servo
ENV WORKPATH /opt/workdir
RUN addgroup --gid ${GROUP_ID} $USERNAME
RUN adduser --uid ${USER_ID} --gid ${GROUP_ID} --disabled-password --gecos '' $USERNAME
WORKDIR $WORKPATH

COPY --chown=$USERNAME:$USERNAME requirements.txt $WORKPATH
RUN pip install -r requirements.txt

RUN chown -R ${USER_ID}:${GROUP_ID} . $WORKPATH

USER $USERNAME

# ENV DJANGO_SETTINGS_MODULE=core.settings

# CMD ["python", "manage.py", "runserver", "0.0.0.0:9000"]
CMD ["gunicorn", "--bind", "0.0.0.0:9000", "core.wsgi:application"]