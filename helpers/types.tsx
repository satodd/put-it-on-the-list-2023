import { DocumentData, DocumentReference } from 'firebase/firestore';

export interface ListProps {
    id: string
    data: {
        name: string
        desc: string
        creationDateTime: {
            nanoseconds: number
            seconds: number
        }
        tags: DocumentReference[]
        converter: null
        type: string
    }
}

export interface ListItemProps {
    id: string
    data: {
        name: string
        desc: string
        creationDateTime: {
            nanoseconds: number
            seconds: number
        }
        tags: DocumentReference[]
        location: string
        currentlyConsuming: boolean
        parent: string
    }
}

export interface TagProps {
    id: string
    data: {
        color: string
        creationDateTime?: number
        name: string
    }
}

export interface ListingProps {
    list: ListProps
}

// export interface AddListItemScreenProps {
//     route: {
//         params: {
//             parentID: string,
//             currentData: ListItemProps
//         }
//     }
//     navigation: ReactNavigation.RootParamList
// }

// export interface ListScreenRouteProps {
//     route?: {
//         params: {
//             id: string
//             name: string
//             tags: TagProps[]
//         }
//     }
// }
