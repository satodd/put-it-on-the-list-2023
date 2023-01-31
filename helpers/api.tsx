import {
    getFirestore, collection, doc, addDoc, getDocs, getDoc, where, query,
} from 'firebase/firestore';

const db = getFirestore();

export async function getLists() {
    const listsRef = collection(db, 'lists');
    const docSnap = await getDocs(listsRef);

    const rawLists = [];

    docSnap.forEach((doc) => {
        let rawData = {
            id: doc.id,
            data: doc.data()
        }
        rawLists.push(rawData);
    });

    return rawLists;
}

export async function getTag(tag) {
    const docSnap = await getDoc(tag);
    return docSnap.data();
}

export async function getListItems(listID) {
    const listItemsRef = await collection(db, 'listItems')
    const q = await query(listItemsRef, where("parent", "==", listID));

    // const q = query(collection(db, "listItems"), where("parent", "==", listID));
    const querySnapshot = await getDocs(q);
    let items = []

    querySnapshot.forEach((doc) => {
        let rawData = {
            id: doc.id,
            data: doc.data()
        }
        items.push(rawData);
    });

    return items
}