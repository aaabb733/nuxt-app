export default async ({store, $db}, inject) => {
    //auth module
    const auth = {
        async signIn(identifier, password) {
            return await $db.collection("users").findOne({identifier, password})
        },
        async signUp(identifier, password) {
            const user = await $db.collection("users").findOne({identifier, password})
            if (user) {
                return "that email or username is already taken"
            } else {
                $db.collection("users").insert({identifier, password})
            }
        },
        signOut() {
            store.commit("setUser", null)
            localStorage.removeItem("user")
        },
        updateProfile(identifier, password, profile) {
            $db.collection("users").update({identifier, password}, {$set: {profile}})
        },
        async getUser(identifier, mine=false) {
            return await $db.collection("users").findOne({identifier}, {password: 0, _id: 0})
        },
        async getAllUsers() {
            return await $db.collection("users").find({}, {password: 0, _id: 0}).toArray()
        },
        async getMyUser(identifier, password) {
            return await $db.collection("users").findOne({identifier, password})
        }
    }
    inject("auth", auth)

    //read localStorage and verify and set user
    const localUser = JSON.parse(localStorage.getItem("user"))
    if (localUser) {
        const user = await auth.signIn(localUser.identifier, localUser.password)
        user && store.commit("setUser", user)
    }
}