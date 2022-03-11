import {auth, db} from "@/firebase/index";
import {doc, getDoc, setDoc,} from "firebase/firestore";
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {isGoogleUserRegistered} from "@/firebase/users";

export async function newUserWithEmailAndPassword(email, password, userInfo) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const username = userInfo.username;
    await writeDB('users', res.user.uid,{
        email: res.user.email,
        uid: res.user.uid,
        username: username,
        emailVerified: false,
        photoUrl: null,
        googleLogin: false,
        displayName: userInfo.displayName
    } )
    await updateUsername(username, res.user.uid);
}
export async function newUserWithGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider)
    const isGoogleRegistered = await isGoogleUserRegistered(res.user.uid)
    if (!await isGoogleRegistered) {
       await writeDB('users', res.user.uid,{
            email: res.user.email,
            uid: res.user.uid,
            photoUrl: res.user.photoURL,
            emailVerified: res.user.emailVerified,
            googleLogin: true,
            displayName: res.user.displayName
        } )
        return false;
    }
    return true;
    // depends if it was already registered or not
}
export async function getFromDB(path, collection,) {
    const d  = doc(db, path, collection);
    return (await getDoc(d)).data();
}
export async function writeDB(path, collection, data, options = {}, ret = false) {
     await setDoc(doc(db, path, collection), data, options)
    if (ret) {
        return getFromDB(path, collection)
    }
}
export function getCurrentUser() {
    return auth.currentUser;
}
export async function updateUsername(username, uid) {
    username = username.toLowerCase().trim()
    let usernamesObjectHandler = {}
    usernamesObjectHandler[username] = uid
    await setDoc(doc(db, "usernames",username), usernamesObjectHandler, )
}
export async function GoogleSignOut() {
    await signOut(getAuth());
}
