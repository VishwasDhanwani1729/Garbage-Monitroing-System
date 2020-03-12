// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzB3zuT35AXScP80UaFu7atuajANJlXn8",
    authDomain: "blog-cf3c2.firebaseapp.com",
    databaseURL: "https://blog-cf3c2.firebaseio.com",
    projectId: "blog-cf3c2",
    storageBucket: "blog-cf3c2.appspot.com",
    messagingSenderId: "294882570911",
    appId: "1:294882570911:web:7447b6c4151f098d10a8aa",
    measurementId: "G-B51YYEYVEG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  firebase.auth.Auth.Persistence.LOCAL;
  $("#btn-signin").click(function() {
    var email = $("#emailin").val();
    var pass = $("#passwordin").val();
    if (email != "" && pass != "") {
      var result = firebase.auth().signInWithEmailAndPassword(email, pass);
      result.catch(function(error) {
        var errorcode = error.code;
        var errormsg = error.message;
        console.log(errorcode);
        console.log(errormsg);
        window.alert("Message :" + errormsg);
      });
    } else {
      window.alert("Please fill out all fields.");
    }
  });
  

  //next button before sign up
  $("#btn-signup").click(function() {
    var email = $("#emailup").val();
    var pass = $("#passwordup").val();
    var cpass = $("#confirmPasswordup").val();
    if (email != "" && pass != "" && cpass != "") {
      if (pass == cpass) {
        var result = firebase.auth().createUserWithEmailAndPassword(email, pass);
        result.catch(function(error) {
          var errorcode = error.code;
          var errormsg = error.message;
          console.log(errorcode);
          console.log(errormsg);
          window.alert("Message :" + errormsg);
        });
      } else {
        window.alert("Password does not match with confirm password.");
      }
    } else {
      window.alert("Please fill out all fields.");
    }
  });
  
  $("#btn-resetpassword").click(function() {
    var auth = firebase.auth();
    var email = $("#email").val();
    if (email != "") {
      auth
        .sendPasswordResetEmail(email)
        .then(function() {
          window.alert("Email has been send to you, please check and verify.");
        })
        .catch(function(error) {
          var errorcode = error.code;
          var errormsg = error.message;
          console.log(errorcode);
          console.log(errormsg);
          window.alert("Message :" + errormsg);
        });
    } else {
      window.alert("Please enter your email address.");
    }
    window.location.href = "Home2d.html";
  });
  
const dbRef = firebase.database().ref();

const usersRef = dbRef.child('Users');
  $("#btn-update").click(function() {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var fname = $("#firstname").val();
    var lname = $("#lastname").val();
    var gender = $("#gender").val();
    var bio = $("#bio").val();
  
    var rootRef
    
    = firebase
      .database()
      .ref()
      .child("Users");
    var userid = firebase.auth().currentUser.uid;
    var userref = rootRef.child(userid);
    if (
      fname != "" &&
      lname != "" &&
      phone != "" &&
      address != "" &&
      bio != "" &&
      gender != ""
    ) {
      var userdata = {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName": fname,
        "lastName": lname,
        "gender": gender
      };
      userref.set(userdata, function(error) {
        if (error) {
          var errorcode = error.code;
          var errormsg = error.message;
          console.log(errorcode);
          console.log(errormsg);
          window.alert("Message :" + errormsg);
        } else {
          window.location.href = "MainPage.html";
        }
      });
    } else {
      window.alert("Please fill out all fields.");
    }
  });
  $("#btn-logout").click(function() {
    firebase.auth().signOut();
  });