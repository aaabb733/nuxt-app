export const state = () => ({
    user: null,
    scroll: true
})

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setScroll(state, scroll) {
        state.scroll = scroll
    }
}