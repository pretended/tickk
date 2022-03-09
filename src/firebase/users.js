import {collection,  doc,getDoc,} from 'firebase/firestore'
import {db} from "@/firebase/index";

export async function isUsernameAvailable(username) {
    if (username) {
        username = username.toLowerCase().trim()
        const exists = (await getDoc(doc(collection(db, "usernames"), username))).exists()
        return !exists
    }
    return false;
}
