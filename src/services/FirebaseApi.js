import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDrZoNohb_cY-TN2thdHtXQlHdDQTcFTac",
    authDomain: "tasklist-e2c0a.firebaseapp.com",
    databaseURL: "https://tasklist-e2c0a.firebaseio.com",
    projectId: "tasklist-e2c0a",
    storageBucket: "tasklist-e2c0a.appspot.com",
    messagingSenderId: "772623171731"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async(email, password) => {
    const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
};

export async function signInOnFirebaseAsync(email, password){
    const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    return user;
}

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => {
                resolve(user);
            },(error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}
export const deletetaskOnFirebaseAsync = async(task) =>{
    const user = await currentFirebaseUser();
    
    var taskReference = firebase
        .database()
        .ref(user.uid);

    
    const id = task.id ?
        taskReference
            .child('tasks')
            .remove(id)
            .id
        :
        taskReference
            .child('tasks')
            //.remove()
            .id;

    return await taskReference
        .child(`tasks/${id}`)
        .update(task);
}

export const writeTaskOnFirebaseAsync = async(task) => {
    const user = await currentFirebaseUser();
    
    var taskReference = firebase
        .database()
        .ref(user.uid);
    
    const key = task.key ?
        task.key:
        taskReference
            .child('tasks')
            .push()
            .key;

    return await taskReference
        .child(`tasks/${key}`)
        .update(task);
}

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();

    var taskReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');

    taskReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);

            });
            listener(tasks);
        });
}

