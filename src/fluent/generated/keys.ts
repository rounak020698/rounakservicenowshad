import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '809f3ef88ba94b62b52a6cc32f4d0b61'
                    }
                    'index.build.css': {
                        table: 'sys_ux_theme_asset'
                        id: '77e391cf4d7245ceadddf314b11c5509'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '097cec3a57f44367bcdd34f33e017523'
                    }
                    'shadcn-ui-kit-template': {
                        table: 'sys_ui_page'
                        id: '2ceb1d1917f24aad97b48ae7c4fa260e'
                    }
                    'x_1835748_react/assets/shadcn-dark.png': {
                        table: 'db_image'
                        id: 'e60ef99f999049809f62671e976ac393'
                    }
                    'x_1835748_react/assets/shadcn-light.png': {
                        table: 'db_image'
                        id: '39e4e2e0f74f416ea30adc118a5589e5'
                    }
                    'x_1835748_react/assets/tailwind-dark.png': {
                        table: 'db_image'
                        id: '4e7f819b006e4820acdf5517b367c82e'
                    }
                    'x_1835748_react/assets/tailwind-light.png': {
                        table: 'db_image'
                        id: '5ce9eda6e8014470a13c57fde8e0c25d'
                    }
                    'x_1835748_react/main': {
                        table: 'sys_ux_lib_asset'
                        id: '9531c0534ce9439987126a3ca5bd3b6b'
                    }
                }
            }
        }
    }
}
