Using Material Bootstrap Admin with a fresh, new design inspired by Google's Material Design.

Using Bootstrap framework and it comes with a couple of third-party plugins redesigned to fit in with the rest of the elements.

The general layout resembles sheets of paper following multiple different layers, so that the depth and order is obvious.

The navigation stays mainly on the left sidebar and the content is on the right inside the main panel. It makes use of light, surface and movement. 

Comes with 5 color filter choices for both the sidebar and the card headers (blue, green, orange, red and purple) and an option to have a background image on the sidebar.

## Table of Contents

* [File Structure](#file-structure)
* [Browser Support](#browser-support)

## File Structure

```
FrontEnd
├─ src
│  ├─ app
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.ts
│  │  ├─ app.module.ts
│  │  ├─ app.routing.ts
│  │  ├─ core
│  │  │  ├─ constants
│  │  │  ├─ core.module.ts
│  │  │  ├─ guards
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ module-import.guard.ts
│  │  │  │  └─ no-auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ api-prefix.interceptor.ts
│  │  │  │  ├─ error-handler.interceptor.ts
│  │  │  │  ├─ http.token.interceptor.ts
│  │  │  │  └─ token.interceptor.ts
│  │  │  ├─ logger.service.ts
│  │  │  └─ services
│  │  │     └─ auth.service.ts
│  │  ├─ data
│  │  │  ├─ data.module.ts
│  │  │  ├─ schema
│  │  │  │  └─ user.ts
│  │  │  └─ service
│  │  │     ├─ json
│  │  │     │  └─ data.json
│  │  │     ├─ json-api.service.ts
│  │  │     └─ user.service.ts
│  │  ├─ layout
│  │  │  ├─ admin-layout
│  │  │  │  ├─ admin-layout.component.html
│  │  │  │  ├─ admin-layout.component.scss
│  │  │  │  └─ admin-layout.component.ts
│  │  │  ├─ auth-layout
│  │  │  │  ├─ auth-layout.component.css
│  │  │  │  ├─ auth-layout.component.html
│  │  │  │  └─ auth-layout.component.ts
│  │  │  ├─ footer
│  │  │  │  ├─ footer.component.css
│  │  │  │  ├─ footer.component.html
│  │  │  │  └─ footer.component.ts
│  │  │  ├─ navbar
│  │  │  │  ├─ navbar.component.css
│  │  │  │  ├─ navbar.component.html
│  │  │  │  └─ navbar.component.ts
│  │  │  └─ sidebar
│  │  │     ├─ sidebar.component.css
│  │  │     ├─ sidebar.component.html
│  │  │     └─ sidebar.component.ts
│  │  ├─ modules
│  │  │  ├─ auth
│  │  │  │  ├─ auth.module.ts
│  │  │  │  ├─ auth.routing.ts
│  │  │  │  └─ page
│  │  │  │     ├─ login
│  │  │  │     │  ├─ login.component.css
│  │  │  │     │  ├─ login.component.html
│  │  │  │     │  └─ login.component.ts
│  │  │  │     └─ register
│  │  │  │        ├─ register.component.css
│  │  │  │        ├─ register.component.html
│  │  │  │        └─ register.component.ts
│  │  │  ├─ dashboard
│  │  │  │  ├─ dashboard.component.css
│  │  │  │  ├─ dashboard.component.html
│  │  │  │  └─ dashboard.component.ts
│  │  │  ├─ maps
│  │  │  │  ├─ maps.component.css
│  │  │  │  ├─ maps.component.html
│  │  │  │  └─ maps.component.ts
│  │  │  ├─ notifications
│  │  │  │  ├─ notifications.component.css
│  │  │  │  ├─ notifications.component.html
│  │  │  │  └─ notifications.component.ts
│  │  │  ├─ table-list
│  │  │  │  ├─ table-list.component.css
│  │  │  │  ├─ table-list.component.html
│  │  │  │  └─ table-list.component.ts
│  │  │  ├─ typography
│  │  │  │  ├─ typography.component.css
│  │  │  │  ├─ typography.component.html
│  │  │  │  └─ typography.component.ts
│  │  │  └─ user-profile
│  │  │     ├─ user-profile.component.css
│  │  │     ├─ user-profile.component.html
│  │  │     └─ user-profile.component.ts
│  │  └─ shared
│  │     ├─ components
│  │     │  ├─ control-messages
│  │     │  │  ├─ control-messages.component.css
│  │     │  │  ├─ control-messages.component.html
│  │     │  │  └─ control-messages.component.ts
│  │     │  └─ spinner
│  │     │     ├─ spinner.component.css
│  │     │     ├─ spinner.component.html
│  │     │     └─ spinner.component.ts
│  │     ├─ directives
│  │     │  └─ auth.directive.ts
│  │     ├─ material.module.ts
│  │     ├─ pipes
│  │     │  ├─ capitalize.pipe.ts
│  │     │  └─ safe.pipe.ts
│  │     ├─ service
│  │     │  └─ validation.service.ts
│  │     └─ shared.module.ts
│  ├─ assets
│  │  ├─ i18n
│  │  │  └─ en.json
│  │  ├─ img
│  │  └─ scss
│  ├─ environments
│  │  ├─ environment.prod.ts
│  │  └─ environment.ts
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ main.ts
│  ├─ polyfills.ts
│  ├─ public
│  │  └─ index.html
│  ├─ styles.css
│  ├─ test.ts
│  ├─ tsconfig.app.json
│  └─ tsconfig.spec.json
├─ tsconfig.json
└─ tslint.json

```

## Browser Support

<img src="https://cdn.icon-icons.com/icons2/2552/PNG/512/chrome_browser_logo_icon_153007.png" width="64" height="64"> <img src="https://cdn.icon-icons.com/icons2/2552/PNG/512/firefox_browser_logo_icon_152991.png" width="64" height="64"> <img src="https://cdn.icon-icons.com/icons2/2552/PNG/512/edge_browser_logo_icon_152998.png" width="64" height="64"> <img src="https://cdn.icon-icons.com/icons2/2552/PNG/512/safari_ios_browser_logo_icon_152966.png" width="64" height="64"> <img src="https://cdn.icon-icons.com/icons2/2552/PNG/512/opera_browser_logo_icon_152972.png" width="64" height="64">

