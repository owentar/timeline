define({
    timelineView: {
        create: {
            module: 'app/timeline/view',
            args: [{ $ref: 'data' }, { $ref: 'timelineContent' }]
        },
        ready: {
            show: [{ $ref: 'timelineContent' }]
        }
    },

    // Wire.js plugins
    plugins: [
        { module: 'wire/dom', classes: { init: 'loading' } },
        { module: 'wire/dom/render' },
        { module: 'wire/on' }
    ]
});
