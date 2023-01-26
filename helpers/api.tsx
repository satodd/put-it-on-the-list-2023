import {
    getFirestore, collection, doc, addDoc, getDocs, getDoc,
} from 'firebase/firestore';

const db = getFirestore();

export async function getLists() {
    const docRef = collection(db, 'lists');
    const docSnap = await getDocs(docRef);

    const rawLists = [];

    docSnap.forEach((doc) => {
        rawLists.push(doc.data());
    });

    return rawLists;
}

export async function getTag(tag) {
    const docSnap = await getDoc(tag);
    return docSnap.data();
}
