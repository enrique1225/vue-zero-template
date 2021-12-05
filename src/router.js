import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: "/dashboard",
            component: () =>
                import ("@/view/layout/Layout"),
            children: [{
                    path: "/dashboard",
                    name: "dashboard",
                    component: () =>
                        import ("@/view/pages/Dashboard.vue")
                },
                {
                    path: "/ideas",
                    name: "ideas",
                    component: () =>
                        import ("@/view/pages/Ideas.vue")
                },
                {
                    path: "/demo",
                    name: "demo",
                    component: () =>
                        import ("@/view/pages/Demo.vue")
                },


                {
                    path: "/administration",
                    name: "administration",
                    component: () =>
                        import ("@/view/pages/administration/Administration.vue"),
                    children: [{
                            path: "organization_units",
                            name: "organization_units",
                            component: () =>
                                import ("@/view/pages/administration/Organization_units.vue")
                        },
                        {
                            path: "roles",
                            name: "roles",
                            component: () =>
                                import ("@/view/pages/administration/Roles.vue")
                        },
                        {
                            path: "users",
                            name: "users",
                            component: () =>
                                import ("@/view/pages/administration/Users.vue")
                        },
                        {
                            path: "languages",
                            name: "languages",
                            component: () =>
                                import ("@/view/pages/administration/Languages.vue")
                        },
                        {
                            path: "audit_logs",
                            name: "audit_logs",
                            component: () =>
                                import ("@/view/pages/administration/Audit_logs.vue")
                        },
                        {
                            path: "maintenance",
                            name: "maintenance",
                            component: () =>
                                import ("@/view/pages/administration/Maintenance.vue")
                        },
                        {
                            path: "subscriptions",
                            name: "subscriptions",
                            component: () =>
                                import ("@/view/pages/administration/Subscriptions.vue")
                        },
                        {
                            path: "visual_settings",
                            name: "visual_settings",
                            component: () =>
                                import ("@/view/pages/administration/Visual_settings.vue")
                        },
                        {
                            path: "webhook_subscriptions",
                            name: "webhook_subscriptions",
                            component: () =>
                                import ("@/view/pages/administration/Webhook_subscriptions.vue")
                        },
                        {
                            path: "dynamic_parameter",
                            name: "dynamic_parameter",
                            component: () =>
                                import ("@/view/pages/administration/Dynamic_parameter.vue")
                        },
                        {
                            path: "entity_dynamic_parameter",
                            name: "entity_dynamic_parameter",
                            component: () =>
                                import ("@/view/pages/administration/Entity_dynamic_parameter.vue")
                        },
                        {
                            path: "settings",
                            name: "settings",
                            component: () =>
                                import ("@/view/pages/administration/Settings.vue")
                        },
                    ]
                },
            ]
        },
        // ... administration page

        {
            path: "/",
            component: () =>
                import ("@/view/pages/auth/Auth"),
            children: [{
                    name: "login",
                    path: "/login",
                    component: () =>
                        import ("@/view/pages/auth/Login")
                },
                {
                    name: "register",
                    path: "/register",
                    component: () =>
                        import ("@/view/pages/auth/Register")
                },
                {
                    name: "email-activation",
                    path: "/email-activation",
                    component: () =>
                        import ("@/view/pages/auth/Email")
                },
                {
                    name: "forgot-password",
                    path: "/forgot-password",
                    component: () =>
                        import ("@/view/pages/auth/Forgot")
                }
            ]
        },
        {
            path: "*",
            redirect: "/404"
        },
        {
            // the 404 route, when none of the above matches
            path: "/404",
            name: "404",
            component: () =>
                import ("@/view/pages/error/Error.vue")
        }
    ]
});