import zango from "zangodb"

export default (_, inject) => {
    const db = new zango.Db("db", {users: [], posts: []})
    inject("db", db)
}