FROM node:16.14.0
USER root
RUN apt update -y
WORKDIR /app
COPY package.json .

RUN npm install 
COPY . . 

RUN npx prisma generate

#RUN npm run build

EXPOSE 3000

ADD start.sh /
RUN chmod +x /start.sh
CMD ["npm", "start"]
CMD ["/start.sh"]
