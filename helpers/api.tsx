import {
    getFirestore, collection, doc, addDoc, getDocs, getDoc, where, query, orderBy, deleteDoc,
    QuerySnapshot, DocumentData, CollectionReference, DocumentReference,
} from 'firebase/firestore';
import { ListProps, TagProps } from './types';

const db = getFirestore();

export function getDataFromReference(refs:QuerySnapshot<DocumentData>) {
    const rawLists:ListProps[] | TagProps[] = [];

    refs.forEach((item) => {
        const rawData:ListProps | TagProps = {
            id: item.id,
            data: item.data(),
        };
        rawLists.push(rawData);
    });

    return rawLists;
}

export async function getLists():Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(db, 'lists'), orderBy('creationDateTime', 'desc'));
    const docs = await getDocs(q);

    return docs;
}

export async function addList(name:string, desc:string, selectedTags:Array<CollectionReference>) {
    const creationDateTime:number = Date.now();

    const tagRefs:DocumentReference[] = selectedTags.map((tag) => doc(db, `tags/${tag.id}`));

    await addDoc(collection(db, 'lists'), {
        name,
        desc,
        tags: tagRefs,
        creationDateTime,
    });
}

export async function getAllTags() {
    const tagsRef = collection(db, 'tags');
    const docSnap = await getDocs(tagsRef);

    return docSnap;
}

export async function getTag(tag:DocumentReference) {
    const docSnap = await getDoc(tag);
    return docSnap.data();
}

export async function getListItems(listID: string) {
    const listItemsRef = collection(db, 'listItems');
    const q = query(listItemsRef, where('parent', '==', listID), orderBy('creationDateTime'));

    // const q = query(collection(db, "listItems"), where("parent", "==", listID));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
}

export async function deleteListItem(listID:string) {
    await deleteDoc(doc(db, 'listItems', listID));
}
