// @ts-nocheck
import {createAuth}          from '@websanova/vue-auth/src/v3.js';
import driverAuthBearer      from '@websanova/vue-auth/src/drivers/auth/bearer.js';
import driverHttpAxios       from '@websanova/vue-auth/src/drivers/http/axios.1.x.js';
import driverRouterVueRouter from '@websanova/vue-auth/src/drivers/router/vue-router.2.x.js';
import driverOAuth2Google    from '@websanova/vue-auth/src/drivers/oauth2/google.js';
import driverOAuth2Facebook  from '@websanova/vue-auth/src/drivers/oauth2/facebook.js';

driverOAuth2Google.url = 'https://accounts.google.com/o/oauth2/v2/auth';
driverOAuth2Google.params.client_id = '477747725912-9hbnd6n7vmc581o21b7e46djqp8uph4n.apps.googleusercontent.com';
driverOAuth2Google.params.scope = 'https://www.googleapis.com/auth/userinfo.profile'
driverOAuth2Google.params.access_type = 'offline'
driverOAuth2Google.params.redirect_uri = 'http://localhost:3000/auth/login?type=google'
driverOAuth2Facebook.params.client_id = '627553015637766';
driverOAuth2Facebook.params.redirect_uri = 'http://localhost:3000/auth/login?type=facebook';

export default (app: any) => {
    app.use(createAuth({
        plugins: {
            http: app.axios,
            router: app.router,
        },
        drivers: {
            http: driverHttpAxios,
            auth: driverAuthBearer,
            router: driverRouterVueRouter,
            oauth2: {
                google: driverOAuth2Google,
                facebook: driverOAuth2Facebook,
            }
        },
        options: {
            rolesKey: 'role',
            notFoundRedirect: {name: 'NotFound'},
            authRedirect: {name: 'Login'},
            forbiddenRedirect: '/',
            loginData: {
                url: '/auth/login'
            },
            fetchData: {
                url: '/auth/user'
            }
        }
    }));
}