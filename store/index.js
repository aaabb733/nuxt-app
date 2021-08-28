// export const actions = {
//     nuxtServerInit({commit}) {
//         commit("setUsers", [
//             {
//                 id: 0,
//                 name: "ayumin",
//                 desc: "pokemon streamer"
//             }
//         ])
//         console.log("nuxtServerInit")
//     }
// }

// export const mutations = {
//     setUsers(state, users) {
//         state.users = users
//     }
// }

export const state = () => ({
    users: [
        {
            id: 0,
            name: "ayumin",
            desc: "Pokemon game streamer"
        },
        {
            id: 1,
            name: "katou junichi",
            desc: "game streamer"
        },
        {
            id: 2,
            name: "mokou",
            desc: "game streamer"
        }
    ]
})