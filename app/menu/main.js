define({
    menuView: {
        render: {
            template: { module: 'text!app/menu/template.html' }
        },
        insert: { first: 'menuContent' }
    },

    // Wire.js plugins
    plugins: [
        { module: 'wire/dom', classes: { init: 'loading' } },
        { module: 'wire/dom/render' },
        { module: 'wire/on' }
    ]
});
