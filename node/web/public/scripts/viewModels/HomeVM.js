Hilary.scope('heinz').register({
    name: 'HomeVM',
    dependencies: ['jQuery', 'ko', 'router'],
    factory: function ($, ko, router) {
        'use strict';

        var HomeVM;

        HomeVM = function () {
            var self = {
                    searchString: undefined,
                    go: undefined,
                    onSearchInputChanged: undefined,
                    test: undefined,
                    testVal: ko.observable('hello')
                },
                oldSearchString;

            self.searchString = ko.observable('');
            self.go = function () {
                if (self.searchString().length) {
                    router.navigate('/search/?q=' + self.searchString());
                    oldSearchString = self.searchString();
                } else {
                    router.navigate('/');
                }
            };

            // subscribe to self.searchString, and auto-search when it changes
            self.onSearchInputChanged = ko.computed(function () {
                if (self.searchString() !== oldSearchString) {
                    self.go();
                }
            });

            // but don't auto-search more than twice per second
            self.onSearchInputChanged.extend({ rateLimit: 500 });

            self.test = function () {
                console.log(self.testVal());
                self.testVal('hello world!');
                console.log(self.testVal());
            };

            return self;
        };

        return HomeVM;
    }
});
