(function(curl) {

    var config = {
        paths: {
            theme: 'theme'
        },

        packages: [
            // Define application-level packages
            { name: 'styles', location: 'bower_components/foundation/css' },
            { name: 'modernizr', location: 'bower_components/modernizr/modernizr' },

            // Add third-party packages here
            { name: 'curl', location: 'bower_components/curl/src/curl' },
            { name: 'wire', location: 'bower_components/wire', main: 'wire' },
            { name: 'msgs', location: 'bower_components/msgs', main: 'msgs' },
            { name: 'when', location: 'bower_components/when', main: 'when' },
            { name: 'meld', location: 'bower_components/meld', main: 'meld' },
            { name: 'd3', location: 'bower_components/d3', main: 'd3' }
        ],

        locale: false
    };

    curl(config, ['wire!app/main,app/menu/main,app/timeline/main']).then(success, fail);

    // Success! curl.js indicates that your app loaded successfully!
    function success () {
        var msg;
        // When using wire, the success callback is typically not needed since
        // wire will compose and initialize the app from the main spec.
        // However, this callback can be useful for executing startup tasks
        // you don't want inside of a wire spec, such as this:
        msg = 'Looking good! '
            + 'Did you get a 404 for bundle.js? '
            + 'Check README.md to find out why!';
        console.log(msg);
    }

    // Oops. curl.js indicates that your app failed to load correctly.
    function fail (ex) {
        var el, msg;
        // There are many ways to handle errors. This is just a simple example.
        // Note: you cannot rely on any specific library or shim to be
        // loaded at this point.  Therefore, you must use standard DOM
        // manipulation and legacy IE equivalents.
        console.log('an error happened during loading :\'(');
        console.log(ex.message);
        if (ex.stack) console.log(ex.stack);
        el = document.getElementById('errout');
        msg = 'An error occurred while loading: '
            + ex.message
            + '. See the console for more information.';
        if (el) {
            // inject the error message
            if ('textContent' in el) el.textContent = msg;
            else el.innerText = msg;
            // clear styling that may be hiding the error message
            el.style.display = '';
            document.documentElement.className = '';
        }
        else {
            throw msg;
        }
    }

})(curl);
