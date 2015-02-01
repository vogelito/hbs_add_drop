/*
 * This utility will go to the add drop screen and add the course selected in the index
 * 
 *
 */

var page = new WebPage(), testindex = 0, loadInProgress = false;
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
page.settings.resourceTimeout = 10000000; // Sometimes it can take a really long time for things to process, thus the large timeout
var mail = "someone@mba20xx.hbs.edu"; // Enter your e-mail address
var password = "yourpassword"; // Enter your password

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open("http://beech.hbs.edu/preregAddDrop/student/addDropRequests.do");
  },
  function() {
    //Enter Credentials
    page.evaluate(function() {
      document.getElementById("username").value = mail;
      document.getElementById("password").value = password;
      document.getElementById("submit-button").click();
      console.log("step 1");
    });
  },
  function() {
    //Re enter password
    page.evaluate(function() {
      document.getElementsByName("passwd")[0].value = password;
      document.getElementsByName("Submit")[0].click();
      console.log("step 2");
    });
  }, 
  function() {
    // Go to add drop summary page
    page.evaluate(function() {
      document.body.children[2].children[0].children[0].click();
      console.log("step 3");
    });
  },
  function() {
    // Go to add drop screen
    page.evaluate(function() {
      document.body.children[1].children[0].children[11].children[0].children[1].click()
      console.log("step 4");
    });
  },
  function() {
    // Select LTV
    page.evaluate(function() {
      document.getElementsByName("addCourseSectionId")[0].selectedIndex = 55; // This index might change depending on where LTV is located
      document.getElementsByName("priority")[0].selectedIndex = 2;
      document.body.children[1].children[3].children[4].children[0].children[0].children[0].children[1].click();
      console.log("final click....");
    });
  },
  function() {
    // Select LTV
    page.evaluate(function() {
      console.log(document.querySelectorAll('html')[0].outerHTML);
    });
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    phantom.exit();
  }
}, 50);
