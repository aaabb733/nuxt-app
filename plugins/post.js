export default async({$db}, inject) => {
    const posts = {
        async getPostsFromUser(identifier) {
            return await $db.collection("posts").find({author: identifier}, {}).sort({date: -1}).toArray()
        },
        deletePost(_id) {
            $db.collection("posts").remove({_id})
        }
    }
    inject("posts", posts)
}