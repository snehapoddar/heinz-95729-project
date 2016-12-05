Hilary.scope('heinz').register({
    name: 'Product',
    singleton: true,
    dependencies: ['router', 'ko', 'Blueprint', 'exceptions'],
    factory: function (router, ko, Blueprint, exceptions) {
        'use strict';

        var blueprint,
            Product;

        blueprint = new Blueprint({
            title: 'string',
            description: 'string',
            metadata: {
                type: 'object',
                required: false
            },
            price: 'money',
            images: {
                type: 'array',
                required: false
            },
            thumbnailLink: {
                type: 'string',
                required: false
            }
        });

        Product = function (product) {
            var self = {};

            if (!blueprint.syncSignatureMatches(product).result) {
                exceptions.throwArgumentException('A product argument is required to create a new Product', 'product', blueprint.syncSignatureMatches(product).errors);
                return;
            }

            product = product || {};

            var type = product.type || 'product';

            self.uid = ko.observable(product.uid);
            self.title = ko.observable(product.title || undefined);
            self.description = ko.observable(product.description || undefined);
            self.metadata = ko.observable(product.metadata || undefined);
            self.price = ko.observable(product.price || undefined);
            self.images = ko.observableArray();
            self.thumbnailLink = ko.observable(product.thumbnailLink || '/images/products/default.png');

            self.thumbnailAlt = ko.computed(function () {
                return 'thumbnail for ' + self.title();
            });
            self.detailsLink = ko.computed(function () {
                return '/' + type + '/' + self.uid();
            });

            // Ensure updates no more than once per 50-millisecond period
            self.thumbnailAlt.extend({ rateLimit: 50 });
            self.detailsLink.extend({ rateLimit: 50 });

            self.click = function () {
                router.navigate(self.detailsLink());
            };

            return self;
        };

        return Product;

    }
});
