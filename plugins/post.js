export default async({$db}, inject) => {
    const posts = {
        async getPostsFromUser(identifier) {
            return await $db.collection("posts").find({author: identifier}, {}).sort({date: -1}).toArray()
        },
        async getAllPosts() {
            return await $db.collection("posts").find({}, {}).sort({date: -1}).toArray()
        },
        deletePost(_id) {
            $db.collection("posts").remove({_id})
        },
        post(author, content) {
            $db.collection("posts").insert({author, content, date: new Date()})
        }
    }
    inject("posts", posts)
}