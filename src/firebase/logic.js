import {auth, db, storage} from "@/firebase/index";
import {doc, getDoc, setDoc, } from "firebase/firestore";
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
    const user = {
        email: res.user.email,
        uid: res.user.uid,
        emailVerified: false,
        photoUrl: null,
        googleLogin: false,
        username: username,
        displayName: userInfo.displayName,
        displayName_lowerCase: userInfo.displayName.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
        friends: [],
        friendRequests: []
    }
    await writeDB('users', res.user.uid, user)
    localStorage.setItem('user', JSON.stringify(user))
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
    console.log(additionalInfo)
    if (additionalInfo.isNewUser) {
       const imageUrl = await getAndUploadImageUrl(res.user.photoURL, res.user.uid);
       const user = {
           email: res.user.email,
           uid: res.user.uid,
           photoUrl: imageUrl,
           emailVerified: res.user.emailVerified,
           googleLogin: true,
           displayName: res.user.displayName,
           displayName_lowerCase: res.user.displayName.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
           friends: [],
           friendRequests: []
       }
        await writeDB('users', res.user.uid, user  )
        localStorage.setItem('user', JSON.stringify(user))
        return false;
    } else {
        const userHasUsername = await hasUsername(res.user.uid)
        if (localStorage.getItem('user') == 'undefined' || localStorage.getItem('user') == null) {
            const auth = getAuth()
            const currentUser = auth.currentUser;
            if (currentUser) {
                localStorage.setItem('user', JSON.stringify(currentUser))
            } else {
                localStorage.setItem('user', JSON.stringify(await getFromDB('users', res.user.uid)))
            }

        }
        return userHasUsername
    }
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

export async function updateUsername(username, uid) {
    username = username.toLowerCase().trim()
    let usernamesObjectHandler = {}
    usernamesObjectHandler[username] = uid
    await setDoc(doc(db, "usernames",username), usernamesObjectHandler, )
}
export async function signOutFromAccount() {
    await signOut(getAuth());
}
