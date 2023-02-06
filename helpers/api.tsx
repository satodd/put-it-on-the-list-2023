import {
    getFirestore, collection, doc, addDoc, getDocs, getDoc, where, query, orderBy, deleteDoc
} from 'firebase/firestore';

const db = getFirestore();

export async function getLists() {
    const q = query(collection(db, "lists"), orderBy("creationDateTime", "desc"));
    const docs = await getDocs(q);

    const rawLists = [];

    docs.forEach((doc) => {
        let rawData = {
            id: doc.id,
            data: doc.data()
        }
        rawLists.push(rawData);
    });

    return rawLists;
}

export async function addList(name:string, desc:string, selectedTags:Array<any>) {
    let creationDateTime = Date.now()
    
    let tagRefs = selectedTags.map((tag) => {
        return doc(db, 'tags/' + tag.id)
    })
        
    const docRef = await addDoc(collection(db, 'lists'), {
        name: name,
        desc: desc,
        tags: tagRefs,
        creationDateTime: creationDateTime
    });

    return
}

export async function getAllTags() {
    const tagsRef = collection(db, 'tags');
    const docSnap = await getDocs(tagsRef);

    const rawTags = [];

    docSnap.forEach((doc) => {
        let rawData = {
            id: doc.id,
            data: doc.data()
        }
        rawTags.push(rawData);
    });

    return rawTags
}

export async function getTag(tag) {
    const docSnap = await getDoc(tag);
    return docSnap.data();
}

export async function getListItems(listID) {
    const listItemsRef = await collection(db, 'listItems')
    const q = await query(listItemsRef, where("parent", "==", listID), orderBy("creationDateTime"));

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

export async function deleteListItem(listID:string) {
    await deleteDoc(doc(db, "listItems", listID));

    return 
}