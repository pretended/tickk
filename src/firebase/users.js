import {
    collection,
    doc,
    getDoc,
    query,
    getDocs,
    orderBy,
    startAt,
    endAt,
    arrayUnion,
    setDoc,
    arrayRemove
} from 'firebase/firestore'
import {db} from "@/firebase/index";

export async function isUsernameAvailable(username) {
    if (username) {
        username = username.toLowerCase().trim()
        const exists = (await getDoc(doc(collection(db, "usernames"), username))).exists()
        return !exists
    }
    return false;
}
export async function hasUsername(uid) {
   let res= (await getDoc(doc(collection(db, "users"), uid))).data()
    if (res === undefined) {
        return false;
    } else {
        const username = res.username;
        return !!username
    }
}
export async function getFriendRequests(uid) {
    const document = await getDoc(doc(db, 'friendRequest', uid))
    if (document.exists()) {
        return document.data()
    } else {
        return []
    }
}
export async function getFriendsFromUser(uid) {
    const document = await getDoc(doc(db, 'friends', uid))
    if (document.exists()) {
        return document.data()
    } else {
        return []
    }
}
export async function querySearchForUsernameOrDisplayName(text) {
    console.log(text)
    if (text) {
        const usersRef = collection(db, "users");
        const usernameQuery = query(usersRef, orderBy("username"), startAt(text),endAt(text + '~') )
        const nameQuery = query(usersRef, orderBy("displayName"), startAt(text),endAt(text + '~') )
        const usernameSnapshot = await getDocs(usernameQuery);
        const nameSnapshot = await getDocs(nameQuery);
        let res = []
        usernameSnapshot.forEach((user) => {
            res.push(user.data())
        })
        nameSnapshot.forEach((user) => {
            res.push(user.data())
        })
        return res;
    } else {
        return []
    }
}

export async function sendFriendRequest(fromUserInfo, toUid) {
    try {
        const docRef = doc(db, 'friendRequest', toUid)
        await setDoc(docRef, {
            requests: arrayUnion(fromUserInfo)
        }, {merge: true})
    } catch (e) {
        throw new Error(e);
    }
}

export async function acceptFriendRequest(fromUserInfo, toUserInfo) {
    const fromUid = fromUserInfo.uid;
    const toUid = toUserInfo.uid;

    try {
        const friendRequestRef = doc(db, 'friendRequest', fromUid);
        await setDoc(friendRequestRef, {
            requests: arrayRemove(toUserInfo)
        }, {merge: true})
        const friendsFromRef = doc(db, 'friends', fromUid);
        const friendsToRef = doc(db, 'friends', toUid);
        await setDoc(friendsFromRef, {
            friends: arrayUnion(toUserInfo)
        }, {merge: true});
        await setDoc(friendsToRef, {friends: arrayUnion(fromUserInfo)}, {merge: true});
    }
    catch (e) {
        throw new Error(e);
}
}


export async function rejectFriendRequest(fromUserInfo, toUserInfo) {
    const fromUid = fromUserInfo.uid;

    try {
        const friendRequestRef = doc(db, 'friendRequest', fromUid);
        await setDoc(friendRequestRef, {
            requests: arrayRemove(toUserInfo)
        }, {merge: true})
   }
    catch (e) {
        throw new Error(e);
    }
}
