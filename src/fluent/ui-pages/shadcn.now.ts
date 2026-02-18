import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import htmlPage from '../../client/index.html'

UiPage({
    $id: Now.ID['shadcn-ui-kit-template'],
    endpoint: 'x_1835748_react_temp.do',
    description: 'Subscription UI Kit Template',
    category: 'general',
    html: htmlPage,
    direct: true,
})