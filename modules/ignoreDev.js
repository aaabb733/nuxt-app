module.exports = function() {
    this.nuxt.hook("generate:extendRoutes", routes => {
        newRoutes = routes.filter(page => !page.route.match(/^\/dev/))
        routes.splice(0, routes.length, ...newRoutes)
    })
}