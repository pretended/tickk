import {collection, doc, getDoc, query, getDocs, orderBy, startAt, endAt} from 'firebase/firestore'
import {db} from "@/firebase/index";

export async function isUsernameAvailable(username) {
    if (username) {
        username = username.toLowerCase().trim()
        const exists = (await getDoc(doc(collection(db, "usernames"), username))).exists()
        return !exists
    }
    return false;
}
export async function isGoogleUserRegistered(uid) {
    if (uid) {
        return (await getDoc(doc(collection(db, "users"), uid))).exists()
    } else {
        return false;
    }
}
export async function querySearchForUsernameOrDisplayName(text) {
    console.log(text)
    if (text) {
        text = text.toLowerCase().trim()
        const usersRef = collection(db, "users");
        const usernameQuery = query(usersRef, orderBy("username"), startAt(text),endAt(text + '~') )
        const nameQuery = query(usersRef, orderBy("displayName"), startAt(text),endAt(text + '~') )
        const usernameSnapshot = await getDocs(usernameQuery);
        const nameSnapshot = await getDocs(nameQuery);
        let res = []
        usernameSnapshot.forEach((user) => {
            console.log(user.data())
            res.push(user.data())
        })
        nameSnapshot.forEach((user) => {
            console.log(user.data())
            res.push(user.data())
        })
        return res;
    } else {
        return []
    }
}
