import {auth, db} from "@/firebase/index";
import {doc, setDoc, } from "firebase/firestore";
import {createUserWithEmailAndPassword,  getAuth, signInWithRedirect,signOut, GoogleAuthProvider  } from "firebase/auth";
export async function newUserWithEmailAndPassword(email, password, userInfo) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const username = userInfo.username;
    await updateUsername(username)
    await setDoc(doc(db, "users", res.user.uid), {
        email: email,
        username: username,
        uid: res.user.uid,
    })
    let usernamesObjectHandler = {}
    usernamesObjectHandler[username.toLowerCase().trim()] = res.user.uid
    await setDoc(doc(db, "usernames",username), usernamesObjectHandler)
}
export async function newUserWithGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithRedirect(auth, provider)
    await setDoc(doc(db, "users", res.user.uid), {
        email: res.user.email,
        uid: res.user.uid,
    })
}
export async function getCurrentUser() {
    return auth.currentUser;
}
export async function updateUsername(username) {
    const user = auth.currentUser;
    let usernamesObjectHandler = {}
    usernamesObjectHandler[username.toLowerCase().trim()] = user.uid
    await setDoc(doc(db, "usernames",username), usernamesObjectHandler)
}
export async function GoogleSignOut() {
    await signOut(getAuth());
}

