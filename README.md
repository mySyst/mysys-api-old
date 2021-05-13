# backend

"heroku-prebuild": "export YARN_CONFIG_PRODUCTION=false; export NODE_ENV=; YARN_CONFIG_PRODUCTION=false NODE_ENV=development yarn install --only=dev --dev",
    "heroku-postbuild": "export YARN_CONFIG_PRODUCTION=true; export NODE_ENV=production;",