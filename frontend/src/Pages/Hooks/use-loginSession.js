import { useEffect, useState } from "react"
import db, { auth } from "../../firebase";

const useLoginSession = () => {
    const [useUserType, setUseUserType] = useState("visitor");
    const [useUserSignedIn, setUseUserSignedIn] = useState(false);
    const [useUserUid, setUseUserUid] = useState("")
    const users = db.collection('users')

    const loginSession = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              setUseUserUid(uid)
              setUseUserSignedIn(true)
            } else {
                // console.log(user)
                setUseUserUid("")
                setUseUserType("visitor")
                setUseUserSignedIn(false)
            }
        });
        if (useUserUid !== "") { 
            users
            .where('user_uid', '==', useUserUid) // does not need index
            //.where('score', '<=', 10)    // needs index
            //.orderBy('owner', 'asc')
            //.limit(3)
            .onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
                // setScholarshipOfficerProfile(items);
                console.log(items[0].user_type)
                setUseUserType(items[0].user_type)
            });
        }
        

        // if (useUserUid !== "") {
        //     var docRef = db.collection("users").doc(useUserUid);
        
        //     // Get a document, forcing the SDK to fetch from the offline cache.
        //     docRef.get().then((doc) => {
        //         // Document was found in the cache. If no cached document exists,
        //         // an error will be returned to the 'catch' block below.
        //         // console.log("Cached document data:", doc.data());
        //         // console.log("Document Data User Type: ", doc.data().user_type)
        //         setUseUserType(doc.data().user_type)
        //         console.log(doc.data().user_type)
        //     }).catch((error) => {
        //         console.log("Error getting cached document:", error);
        //     });
        // }
    }

    useEffect(() => {
        loginSession()
        
        return () => {
            loginSession()
        }
      }, [useUserUid, useUserType, useUserSignedIn])
    
    useEffect(() => {

    }, [useUserUid, useUserType, useUserSignedIn])

    return { useUserType,
             useUserSignedIn, 
             useUserUid, 
             setUseUserType }
}

export default (useLoginSession);