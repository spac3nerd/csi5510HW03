
# Deployment guide

## Required technologies:
* Node.js
* npm (node package manager)
* any web browser

## Guide:

1. Install Node.js, the Node Package Manager (npm) and mysql

1. import mysql schemas:

    * using something like phpmyadmin, or cmdline tools:

        * Create a database named 'csi5510_hw03'
        * import the table schema file located in the repo:
            * `<project root>/dbExports/user_table.sql`

1. Change to the root of the project directory

1. Install grunt globally. Grunt is used to package and minimize the front-end files.

    npm install grunt -g

1. Install dependencies:

    cd backEnd
    npm install
    cd ../frontEnd
    npm install

1. Run grunt (you should still be in the `frontEnd` directory):

    grunt

This will have generated a `public` directory in `backEnd` that has the html/js/css resources ready to be served by the server

1. Run the server

    cd ../backEnd
    node init.js

1. View the client by pointing a browser at localhost:8080
