var config = {
    apiKey: "AIzaSyAij5cJMyfiiwCGa8DptFJVgx2mNkR0rrE",
    authDomain: "hotdropauth.firebaseapp.com",
    databaseURL: "https://hotdropauth.firebaseio.com",
    projectId: "hotdropauth",
    storageBucket: "hotdropauth.appspot.com",
    messagingSenderId: "1053617876000"
  };

  firebase.initializeApp(config);
  
  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();
  // update firestore settings


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
     firebase.auth.FacebookAuthProvider.PROVIDER_ID
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: 'index.html'
  };

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

  var onAuth = auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      $("#login").hide()
    } else {
      console.log('user logged out');
      $("#login").show()
      $("#login")
    }
    console.log(user)
  })
  
  //logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });






















  // listen for auth status changes

  
 
//   // signup
//   const signupForm = document.querySelector('#signup-form');
//   signupForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // get user info
//     const email = signupForm['signup-email'].value;
//     const password = signupForm['signup-password'].value;
  
//     // sign up the user
//     auth.createUserWithEmailAndPassword(email, password).then(cred => {
//       // close the signup modal & reset form
//       const modal = document.querySelector('#modal-signup');
//       M.Modal.getInstance(modal).close();
//       signupForm.reset();
//     });
//   });
  
//   // logout
//   const logout = document.querySelector('#logout');
//   logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut();
//   });
  
//   // login
//   const loginForm = document.querySelector('#login-form');
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // get user info
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;
  
//     // log the user in
//     auth.signInWithEmailAndPassword(email, password).then((cred) => {
//       // close the signup modal & reset form
//       const modal = document.querySelector('#modal-login');
//       M.Modal.getInstance(modal).close();
//       loginForm.reset();
//     });
  
//   });