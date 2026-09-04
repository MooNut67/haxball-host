FROM node:18-bullseye

# Cài các dependency hệ thống cho Chromium
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

# Copy package files
COPY package*.json ./

# Cài node modules (sử dụng npm install để không cần package-lock.json)
RUN npm install --production --no-audit --no-fund

# ĐẶT biến môi trường trước khi cài browser để Playwright cài vào /ms-playwright
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Tải Playwright browsers đầy đủ trong build (và kèm deps nếu cần)
RUN npx playwright install --with-deps chromium

# Copy source
COPY . .

# Start
CMD ["node", "server.js"]


