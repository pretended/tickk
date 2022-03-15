import {addDoc, collection} from "firebase/firestore";
import {db} from "@/firebase/index";

export async function createNewGroup(groupName, revealDate, creatorUID) {
    const group = {
        creatorUId: creatorUID,
        created: new Date(),
        revealDate: new Date(revealDate),
        users: [creatorUID],
        groupName: groupName
    }
    const groupCollection = collection(db, 'group')
    return (await addDoc(groupCollection, group)).id;
}
