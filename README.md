# STEP 1: Initialize the node project

create a folder `mkdir project name`
run the command `npm init -y` to setup `package.json` file
install all the dev dependencies 

    npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express @types/compression @types/cors @types/morgan

install all the dependencies

    npm i express dotenv module-alias mongoose compression cors morgan helmet envalid joi bcrypt jsonwebtoken

create `.gitignore` file and add the following folders to ignore

    dist
    node_modules
    .env

# STEP 2: Initialize typescript to the node project

run the command `npx tsc --init`, this will create a `tsconfig.json` file. which has all the rules related to typescript of the project.
go to the newly created `tsconfig.json` file and make the following changes

    ...
    
    "baseUrl": "./src",  
    "paths": {
      "@resources/*": ["resources/*"],
      "@utils/*": ["utils/*"],
      "@middlewares/*": ["middlewares/*"]
    },
    "outDir": "dist",
    
    ...

# STEP 3: add scripts for in `package.json` file

navigate to `package.json` file and add the following scripts and module alias

    ...
    
    "scripts": {
      "start": "node dist/index.js",
      "build":"tsc",
      "postinstall": "npm run build",
      "dev": "tsc-watch --onSuccess \"node ./dist/index.js\""
    },
    "_moduleAliases": {
      "@resources": "dist/resources",
      "@utils": "dist/utils",
      "@middlewares": "dist/middlewares"
    }
    ...

# STEP 4: Adding eslint and prettier config

create files `.eslintrc.js` and `.prettierrc.js`
open file `.eslintrc.js` and add the eslint rules and extensions

    module.exports = {
      parse: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      rules: {
        'no-unused-vars': ['error'],
      },
    };

open file `.prettierrc.js` and add prettier rules as below, we can add few more as per the requirements

    module.exports = {
      tabWidth: 2,
      singleQuote: true,
      semi: true,
    };

# STEP 5: Create folders and start app logic

create a folder `src`
navigate to `src` folder
add folders `middlewares`, `resources` and `utils` folders
add files `app.ts` and `index.ts`

refer [Typescript Node Boilerplate](https://github.com/karthikwebdev/tsc-node-boilerplate)
