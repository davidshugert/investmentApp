import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
};

class Firebase {
  constructor() {
    this.firebase = app;
    this.firebase.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
      signInSuccessUrl: "/",
      // We will display Github as the auth provider.
      signInOptions: [this.firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (user) => {
          window.location.reload();
          return false;
        },
      },
    };
    this.isSignedIn = this.firebase.auth().currentUser ? true : false;
  }
  get currentUser() {
    return this.auth.currentUser;
  }
  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        this.isSignedIn = user ? true : false;
        resolve();
      });
    });
  }
  logout() {
    return this.auth.signOut();
  }
  saveInvestments(investments) {
    if (!this.currentUser) {
      return alert("Not Signed In");
    }
    return this.db.doc(`userInvestments/${this.currentUser.uid}`).set({
      investments,
    });
  }
  async getInvestments() {
    if (!this.currentUser) {
      return alert("Not Signed In");
    }
    const investments = await this.db
      .doc(`userInvestments/${this.currentUser.uid}`)
      .get();
    return investments.get("investments");
  }
}
export default Firebase;
