FROM node

RUN npm run build

CMD ["npm", "start:prod"]