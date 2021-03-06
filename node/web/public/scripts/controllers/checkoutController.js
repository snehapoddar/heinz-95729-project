Hilary.scope('heinz').register({
    name: 'checkoutController',
    dependencies: ['newGidgetModule', 'GidgetRoute', 'locale', 'viewEngine','Checkout', 'Checkouts','Products', 'jQuery'],
    factory: function ($this, GidgetRoute, locale, viewEngine, Checkout, Checkouts, Products, $) {
        'use strict';
        
        
        $this.get['/payment/:userId'] = function () {
            viewEngine.setVM({
                template: 't-checkout-payment'
            });
        };        
        
        $this.get['/checkout/:userId'] = new GidgetRoute({
            routeHandler: function (err, req) {
                $.ajax({
                    url: '/api/checkout/' + req.params.userId
                }).done(function (data) {
                    if(data){
                        var checkout = new Checkout(data);
                        
                        viewEngine.setVM({
                            template: 't-checkout',
                            data: { checkout: checkout }
                        });

                        recalculateCart();                        
                    } else {
                        viewEngine.setVM({
                            template: 't-checkout-empty'
                        });
                    }
                });
            }
        });

        return $this;
    }
});

