# HTML Starter kit

Hi. This is a starter boilder plate for html template.

## Installation

### Requirements

it's requires the following dependencies:

- [Node.js](https://nodejs.org/)

### Quick Start

Clone or download this repository, change its name to something else (like, say, `demo-html`), and then you'll need to do a five-step to start working on.

1. Open package.json and update project name like `demo-html` it's **IMPORTANT**.
2. After that open this project in terminal and run `npm install` or `yarn install`
3. Then Open `./blocks/styles.html` and find `packageName__.css` and replace to `demo-html.css`
4. After That `./blocks/scripts.html` and find `packageName__.js` and replace to `demo-html.js`
5. Then Run Development Command `npm run dev` or `yarn dev` which will start dev server in `http://localhost:3000` also it will start watching `sass` and partial html files from `blocks/` and `pages/` from this html files main files are generated. all your `pages/` folder file will be a static file like index.html

### CSS/JS Loading

To load css or js please add your file to `assets/vendors/` Lets say you want to add owl-carousel so make a folder to `assets/vendors/owl-carousel` then put it's css and js file there add css file link to `blocks/styles.html` like `<link rel="stylesheet" href="assets/vendors/owl-carousel/owl-carousel.min.css" />` and add js file link to `blocks/scripts.html` like `<script src="assets/vendors/owl-carousel/owl-carousel.min.js"></script>`

## bundle

When you want to release package you have to run following command in terminal `npm run bundle` or `yarn bundle` which will generate your project zip file like `demo-html.zip` which contains all necessary files
