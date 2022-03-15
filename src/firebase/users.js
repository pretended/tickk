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
    arrayRemove,
    where
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
    return res === undefined ? false : !!res.username;
}
export async function querySearchForUsernameOrDisplayName(text) {
    if (text) {
        text = text.toLowerCase().trim()
        const usersRef = collection(db, "users");
        const usernameQuery = query(usersRef, orderBy("username"), startAt(text),endAt(text + '~') )
        const nameQuery = query(usersRef, orderBy("displayName_lowerCase"), startAt(text),endAt(text + '~') )
        const usernameSnapshot = await getDocs(usernameQuery);
        const nameSnapshot = await getDocs(nameQuery);
        let res = []
        usernameSnapshot.forEach((user) => {
            res.push(user.data())
        })
        nameSnapshot.forEach((user) => {
            res.push(user.data())
        })
        return removeDuplicateObjectsFromArray(res);
    } else {
        return []
    }
}
export async function removeDuplicateObjectsFromArray(arr) {
    return arr.filter((v,i,a)=>a.findIndex(t=>(t.uid===v.uid))===i)
}
export async function sendFriendRequest(fromUid, toUid) {
    try {
        const docFromRef = doc(db, 'users', fromUid)
        const docToRef = doc(db, 'users', toUid)
        const data = [{
            ref: docFromRef,
            obj : {
                type: 'sent',
                uid: toUid
            }
        },
            {
                ref: docToRef,
                obj : {
                    type: 'received',
                    uid: fromUid
                }
            }]
        for (const dc of data) {
            await setDoc(dc.ref, {friendRequests: arrayUnion(dc.obj)}, {merge: true})
        }
    } catch (e) {
        throw new Error(e);
    }
}

export async function acceptFriendRequest(fromUserInfo, toUserInfo) {
    // add to friends array on both users
    // delete from both uids de {} friendRequest object

    const fromUid = fromUserInfo.uid;
    const toUid = toUserInfo.uid;
    try {
        // Add to array
        const meIDRef = doc(db, 'users', fromUid);
        const toUniqueIDRef = doc(db, 'users', toUid);

        await setDoc(meIDRef, {
            friends: arrayUnion( toUid )
        }, {merge: true})
        await setDoc(toUniqueIDRef, {
            friends: arrayUnion( fromUid )
        }, {merge: true})

        // delete from friend requests
        await setDoc(meIDRef, {
            friendRequests: arrayRemove( { type: 'received', uid: toUid})
        }, {merge: true});
        await setDoc(toUniqueIDRef, {
            friendRequests: arrayRemove({ type: 'sent', uid: fromUid})
        }, {merge: true});
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

export async function getGroupsByUId(uid) {
    const groupsRef = collection(db, "group");
    const groupsQuery = query(groupsRef, where('users', 'array-contains', uid));
    const groupDocs = await getDocs(groupsQuery);
    const res = []
    groupDocs.forEach(doc => {
        const data = doc.data();
        res.push(data)
    })
    return res;

}

export async function getMultipleDocs(path, collectionRef, arrayUid) {
    if (arrayUid.length === 0) return []
    const ref = collection(db, path);
    const q = query(ref, where(collectionRef, 'in', arrayUid));
    const groupDocs = await getDocs(q);
    const res = []
    groupDocs.forEach(doc => {
        const data = doc.data();
        res.push(data)
    })
    return res;
}
