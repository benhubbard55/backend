NODE_ENV=development node app.js
NODE_ENV=production node app.js
sails_hooks\_\_grunt=false NODE_ENV=production node app.js

# Create User

use sails1demo
db.createUser(
{
user: "sails1demo",
pwd: "sails1demo123",
roles: [ "readWrite", "dbAdmin" ]
}
)

git init .
git remote add -t \* -f origin git@192.168.0.77:Templates/Sails1Template.git
git checkout -f master

#install ruby & sass
sudo apt install ruby
sudo apt install ruby-sass
npm install -g grunt-cli

OR
brew install ruby

# for grunt error

sudo gem install sass

# if still issue try

sudo gem install clean

npm install grunt-sails-linker --save-dev --save-exact

grunt buildProd
grunt buildProd --build=prod --force

# to create ADMIN user

# password is 123546

=> type 'sails console' then paste this line
=> Admin.create({firstName: 'Super', lastName: 'Admin',email:'admin@admin.com',password:'$2a$10$4Nc8PvwLgiJWcE4mcibv9uIpdlz7yYbu2wkpQXkdyhFbjzlwZOYBS'}).fetch().exec(console.log)

#to start job
=> node worker.js

# to start radis server

=> redis-server --daemonize yes

Generator commands

Create Helper

sails generate helper folder/helpername

Create Actions

sails generate action folder/actionname

Create Api

sails generate api name

Create Model

sails generate model identity

localise

sails.\_\_('Welcome');

// With default usage:
await sails.helpers.fileUploads.contractFileUpload(…, …);

// With named parameters:
await sails.helpers.fileUploads.contractFileUpload.with({
someInput: …,
someOtherInput: …
});

First download and install GraphicsMagick or ImageMagick. In Mac OS X, you can simply use Homebrew and do:

brew install imagemagick
brew install graphicsmagick
OR
sudo apt-get install imagemagick
sudo apt-get install graphicsmagick

If you want WebP support with ImageMagick, you must add the WebP option:

brew install imagemagick --with-webp

Used Packages:
https://github.com/ghaiklor/sails-hook-cron
https://www.npmjs.com/package/@logisticinfotech/sails-hook-job-queue
https://www.npmjs.com/package/sails-seed
