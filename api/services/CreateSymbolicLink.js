
// var Sails = require('sails');
sails.on('lifted', () => {
    var fs = require('fs');

    var assetsPath = require('path').resolve(sails.config.appPath, '.tmp/public/assets');
    var linkSourcePath = require('path').resolve(sails.config.appPath, 'assets/uploads');
    var linkDestinationPath = require('path').resolve(sails.config.appPath, '.tmp/public/assets/');

    setTimeout(() => {
        var oldmask = process.umask(0);
        process.umask(oldmask);


        function folderExists(folderPath) {
            try {
                // Check if the folder exists
                return fs.existsSync(assetsPath) && fs.statSync(assetsPath).isDirectory();
            } catch (err) {
                // Error occurred (folder doesn't exist or can't be accessed)
                return false;
            }
        }

        const folderPath = assetsPath;
        if (folderExists(assetsPath)) {
            console.log(`Folder '${folderPath}' exists.`);
        } else {
            fs.mkdirSync(assetsPath);
            var exec = require('child_process').exec;
            exec('ln -s ' + linkSourcePath + ' ' + linkDestinationPath, (errorCD, stdoutCD, stderrCD) => {
                if (errorCD) {
                    console.log('errorCD >>>>>>', errorCD);
                }
                if (stdoutCD) {
                    console.log('stdoutCD >>>>>>', stdoutCD);
                }
                if (stderrCD) {
                    console.log('stderrCD >>>>>', stderrCD);
                }
            });
        }

    }, 3000);
});
