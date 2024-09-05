# 1. Wähle das Basis-Image
FROM node:22.8.0

# 2. Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Kopiere die package.json und package-lock.json Dateien
COPY package*.json ./

# 4. Installiere die Abhängigkeiten
RUN npm install

# 5. Kopiere den restlichen Quellcode in den Container
COPY . .

# 6. Exponiere den Port, auf dem deine App laufen wird
EXPOSE 3000

# 7. Starte die Node.js-Anwendung
CMD ["node", "index.js"]