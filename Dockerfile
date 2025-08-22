FROM node:latest AS builder

WORKDIR /app

#复制package.json文件 和 pnpm-lock.yaml文件
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN npm config set registry https://registry.npmmirror.com/

#安装依赖
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install

#复制项目文件
COPY . .

#构建项目
RUN pnpm run build

FROM node:latest AS runner

WORKDIR /app

RUN npm install -g pnpm

RUN npm config set registry https://registry.npmmirror.com/

ENV NODE_ENV=production
ENV VISUAL_CROSSING_API_KEY=your_api_key_here

# 从builder复制package.json和lock文件
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
# 复制 .next 文件夹
COPY --from=builder /app/.next ./.next
# 复制 public 文件夹
COPY --from=builder /app/public ./public
# 只安装生产依赖
RUN --mount=type=cache,target=/root/.pnpm-store pnpm install --prod

EXPOSE 3000

CMD ["pnpm", "start"]