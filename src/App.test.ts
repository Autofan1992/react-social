import ReactDOM from 'react-dom'
import SocialApp from './App'
import { ReactComponent } from '*.svg'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(ReactElement<SocialApp>, div)
    ReactDOM.unmountComponentAtNode(div)
})
