import {auth, db, storage} from "@/firebase/index";
import {doc, getDoc, setDoc,} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {hasUsername} from "@/firebase/users";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

export async function newUserWithEmailAndPassword(email, password, userInfo) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const username = userInfo.username.toLowerCase().trim();
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
export async function signInWithEmailAndPwd(email, password) {
    try {
        const res = await  signInWithEmailAndPassword(auth, email, password)
        return res.user;
    } catch (e) {
        console.log(e)
    }

}
export async function getAndUploadImageUrl(url, uid) {
    const imgRef = await ref(storage, 'users/' + uid + '/profile_image.jpg')
    const response = await fetch(url);
    const blob = await response.blob()
    await uploadBytes(imgRef, blob, {contentType: 'image/jpeg'});
    return await getDownloadURL(imgRef);
}
export async function newUserWithGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const res = await signInWithPopup(auth, provider)
    const additionalInfo = getAdditionalUserInfo(res);

    if (additionalInfo.isNewUser) {
       const imageUrl = await getAndUploadImageUrl(res.user.photoURL, res.user.uid);
        await writeDB('users', res.user.uid,{
            email: res.user.email,
            uid: res.user.uid,
            photoUrl: imageUrl,
            emailVerified: res.user.emailVerified,
            googleLogin: true,
            displayName: res.user.displayName
        },  )
        return false;
    } else {
        return await hasUsername(res.user.uid)
    }
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
export async function signOutFromAccount() {
    await signOut(getAuth());
}
