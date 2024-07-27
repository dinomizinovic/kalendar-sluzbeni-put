## Project setup
```

IMPORTANT!

Before installing project dependencies, ensure that you have the correct version of Node.js. This project requires Node.js version 14.18.3. Follow these steps to install and set up Node.js using NVM (Node Version Manager).

Steps to Install NVM on Windows:
Download the NVM installer:

Visit the NVM releases page on GitHub: https://github.com/coreybutler/nvm-windows/releases
Download the latest nvm-setup.exe file.

For macOS and Linux:

In the Terminal run:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

or

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

Activate NVM:

Add the following lines to your ~/.bashrc, ~/.zshrc, or ~/.profile file:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

Then run:

source ~/.bashrc  # or ~/.zshrc or ~/.profile

Verify Installation: 

nvm --version or nvm -v

Install Node.js Version 14.18.3:

nvm install 14.18.3

Use Node.js Version 14.18.3:

nvm use 14.18.3

Set Node.js Version 14.18.3 as Default (Optional):

nvm alias default 14.18.3

Verify Node version: 

node --version or node -v

Then hit this command to install the Vue project:

npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Addition Dependencies

```vue-textarea-autosize``` as a dependency. See the following for installation instructions: https://www.npmjs.com/package/vue-textarea-autosize