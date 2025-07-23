# Frontend.

## Running the app on your device using expo (Recommended so you dont have issues)

1. Change directory to frontend and then cd to celar.
2. install the dependencies using any runtime i prefer bun for speed so enter this command >>bun install or if using yarn type yarn or npm install.
3. Then on your terminal type bun start ,yarn start or npm start and the project will bootstrap.
4. Scan the app on your phone using expo app from playstore.

## Running on emulator

1. Once installed the dependencies. Based on <b>platform eg android/ios</b> Run bun android or npm run android or yarn android on your terminal

## Running app on device by installation (debug apk) not recommended

<b>Note i dont recomend this since once you have buld the apk, and the ngrok link was not set up then the apk wont work so make sure you generate the ngrok link first then paste it in axios folder as {baseurl}/api/v1/user then proceed with building the apk
</b>

1. Change directory to frontend and then cd to celar.
2. install the dependencies using any runtime i prefer bun for speed so enter this command >>bun install or if using yarn type yarn or npm install.
3. makesure you have connected your device by usb cable.( counter check by entering adb devices on linux to show devices attached)
4. run on your terminal cd android then ./gradlew clean && ./gradlew assembleRelease
5. The app will be generated in the outputs and you can install the apk.

# Backend.

1. change directory to backend.
2. Run bun install or npm install or yarn.
3. run bun dev or npm run dev or yarn dev
4. Project starts up on port 3000 (http)

# Adding Https for mobile since Http wont work

For using the https I recommend using ngrok
To use ngrok if you already have ngrok installed type on your terminal - ngrok http 3000 and then it will forward to a https link for testing or development.
Then copy the link move to frontend and locate a file axios and add the link to base url as so {baseurl}/api/v1/user
Then boom you can test the app.

# Storage.
Pstgres.
sample .env
DATABASE_URL="postgresql://user:password@localhost:5432/db-name?schema=public"
JWT_SECRET="random characters" generated using openssl 
- openssl rand -base64 16

# Transactions.

1. Transactions allow debt for new users for up to 1000 so testing can be done

# Technologies.

## frontend

. Expo
. React Native
. NativeWind (Tailwind CSS styling for RN)
. Zustand (State management)
. React Query (Data caching)
. React Hook Form
. AsyncStorage
. Moment.js
. React Native Toast

Expo Drawer Navigation (via Expo Router)

## backend

. Bun Runtime
. Express.js
. Typescript
. JWT Auth
. Prisma ORM
. PostgreSQL

# File structure.

### Frontend



### Bakcend

backend/
├── errors/ // Custom error handlers
├── generated/ // Prisma-generated client files
├── middleware/ // Express middleware (auth, validation)
├── node_modules/
├── prisma/ // Schema and migrations
├── routes/ // Express routes (modularized)
├── utils/ // Utility/helper functions
├── index.ts // App entrypoint
├── .env
├── package.json
└── tsconfig.json
