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

# Copy application code
COPY --chown=$USERNAME:$USERNAME . $WORKPATH

RUN chown -R ${USER_ID}:${GROUP_ID} $WORKPATH

USER $USERNAME

ENV PYTHONPATH=$WORKPATH

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]