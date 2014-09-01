define({

    styles: { module: 'css!styles/foundation.css' },
    theme: { module: 'css!theme/basic.css' },

    menuContent: { $ref: 'dom!menu-content' },

    timelineContent: { $ref: 'dom!timeline-content' },

    plugins: [
        { module: 'wire/dom', classes: { init: 'loading' } }
    ]

});
