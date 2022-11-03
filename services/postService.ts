import { Post } from "../models/post"

export async function getPosts(): Promise<Post[]> {
    const posts = new Array<Post>();
    posts.push({id: "001", title: "My First Post", description: "Here is the content...", author: 1});
    posts.push({id: "002", title: "My Second Post", description: "Here is the content...", author: 2});
    posts.push({id: "003", title: "My Third Post", description: "Here is the content...", author: 3});
    
    
    //#region Code to get data from Firestore
    // const db = getFirestore(app);
    // const postsSnapshot = await getDocs(collection(db, '/posts'));
  
    // postsSnapshot.forEach((doc) => {
    //     const post = doc.data() as Post
    //     posts.push({ ...post, id: doc.id } )
    // })
    //#endregion
  
    return posts;
  }