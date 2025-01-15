#docker build -t my-next-js .
#docker run -d --name my-next-js -p 3000:3000 my-next-js    // 외부:내부

# 1. Base image
FROM node:18-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Copy project files
COPY . .

# 4. Install dependencies (Yarn Berry + PnP)  
RUN corepack enable      
RUN corepack prepare yarn@4.6.0 --activate
RUN yarn set version berry
RUN yarn install --immutable

# 5. Build the Next.js project
RUN yarn build
RUN rm -rf ./.next/cache

# 6. Create production image
FROM node:18-alpine AS production

RUN corepack enable      
RUN corepack prepare yarn@4.6.0 --activate
RUN yarn set version berry

# 7. Set working directory
WORKDIR /app

# 8. Copy only necessary files from the build step
COPY --from=base /app/.next .next
COPY --from=base /app/package.json package.json
COPY --from=base /app/yarn.lock yarn.lock
COPY --from=base /app/.yarn .yarn
COPY --from=base /app/.yarnrc.yml .yarnrc.yml
COPY --from=base /app/.pnp.loader.mjs .pnp.loader.mjs
COPY --from=base /app/.pnp.cjs .pnp.cjs

# 9. Expose the application port
EXPOSE 3000

ENV NODE_OPTIONS="--require ./.pnp.cjs"  

# 10. Run the application
CMD ["yarn", "start"]
