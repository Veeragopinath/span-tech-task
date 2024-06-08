export default defineNuxtRouteMiddleware((to, from) => {
        debugger
    if (process.client) {
        const userToken = localStorage.getItem('userToken');
        let user = null;


            user = JSON.parse(userToken);


        // Check if the user is not authenticated and not already on the login page
        if (!user?.id && to.path !== '/login') {
            // Redirect to the login page
            return navigateTo('/login');
        }

        // If the user is authenticated and trying to access the login page, redirect to the home page
        if (user?.id && to.path === '/') {
            return navigateTo('/home');
        }
    }


});
