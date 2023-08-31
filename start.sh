#!/bin/bash

#npx prisma generate
npx prisma migrate deploy

npm start
#npm run dev
