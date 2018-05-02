Object.defineProperty(window, 'localStorage', {
     value: {
        store: {},
        getItem: function(key) {
            return this.store[key] || null;
        },
        setItem: function(key, value) {
            this.store[key] = value.toString();
        },
        clear: function() {
            this.store = {};
        }
    }
});