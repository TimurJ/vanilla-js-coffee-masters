const Router = {
  init: () => {
    //Event handler for navigating the paths through nav button clicks
    document.querySelectorAll('a.navlink').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        //different ways to get the url of the navigation link that was clicked
        // const url1 = a.href
        // const url2 = a.getAttribute('href')
        // const url3 = event.target.href
        const url = event.target.getAttribute('href')
        Router.go(url)
      })
    })

    //Event handler for URL changes eg through forward and back mouse buttons
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false)
    })

    //Check the initial URL
    Router.go(location.pathname)
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to route: ${route}`)

    if (addToHistory) {
      history.pushState({ route }, null, route)
    }

    let pageElement = null

    switch (route) {
      case '/':
        pageElement = document.createElement('menu-page')
        break
      case '/order':
        pageElement = document.createElement('order-page')
        break
      default:
        if (route.startsWith('/product-')) {
          pageElement = document.createElement('details-page')
          const paramId = route.substring(route.lastIndexOf('-') + 1)
          pageElement.dataset.productId = paramId
        }
    }

    if (pageElement) {
      const cache = document.querySelector('main')
      cache.innerHTML = ''
      cache.appendChild(pageElement)
      //reset the scroll values in case the user has scrolled down on the previous page
      window.scrollX = 0
      window.scrollY = 0
    }
  },
}

export default Router
