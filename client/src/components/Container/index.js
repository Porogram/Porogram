import { Container } from 'unstated'

export default class extends Container {
    state = { mobileOpen: false }
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }
}
