export default (_, inject) => {
    const tools = {
        log: console.log
    }
    inject("tools", tools)
}