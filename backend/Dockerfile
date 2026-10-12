FROM python:3.12-slim

WORKDIR /app

RUN useradd --create-home appuser
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY --chown=appuser:appuser . .

USER appuser

CMD ["daphne","-b","0.0.0.0","-p","8000","config.asgi:application"]
