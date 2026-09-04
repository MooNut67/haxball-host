# Dockerfile
FROM node:18-bullseye

# Cài các dependency cần thiết cho Chromium
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    wget \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files và cài node modules
COPY package*.json ./
RUN npm ci --only=production

# Tải Playwright browsers đầy đủ trong build
RUN npx playwright install --with-deps chromium

# Copy source
COPY . .

# Đặt biến để Playwright biết nơi lưu browser (không bắt buộc nhưng rõ ràng)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Start
CMD ["node", "server.js"]
