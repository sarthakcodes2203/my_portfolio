/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction(){
    let menuBtn = document.getElementById("myNavMenu");
  
    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }


//   // Add this to your JavaScript file
// const navMenuBtn = document.querySelector('.nav-menu-btn');
// const navMenu = document.querySelector('.nav-menu');
// navMenuBtn.addEventListener('click', () => {
//   navMenu.classList.toggle('show');
// });





  
  /* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};
  
  function headerShadow() {
    const navHeader =document.getElementById("header");
  
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {
  
      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";
  
    } else {
  
      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";
  
    }
  }
  
  /* ----- TYPING EFFECT ----- */
  let typingEffect = new Typed(".typedText",{
    strings : ["Designer.","Developer.","Analyst.","Entreprenuer."],
    loop : true,
    typeSpeed : 100,
    backSpeed : 80,
    backDelay : 2000
  })
  
  /* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
  const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true
  })
  
  /* -- HOME -- */
  sr.reveal('.featured-text-card',{})
  sr.reveal('.featured-name',{delay: 100})
  sr.reveal('.featured-text-info',{delay: 200})
  sr.reveal('.featured-text-btn',{delay: 200})
  sr.reveal('.social_icons',{delay: 200})
  sr.reveal('.featured-image',{delay: 300})
  
  /* -- PROJECT BOX -- */
  sr.reveal('.project-box',{interval: 200})
  
  /* -- HEADINGS -- */
  sr.reveal('.top-header',{})
  
  /* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */
  
  /* -- ABOUT INFO & CONTACT INFO -- */
  const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
  })
  
  srLeft.reveal('.about-info',{delay: 100})
  srLeft.reveal('.contact-info',{delay: 100})
  
  /* -- ABOUT SKILLS & FORM BOX -- */
  const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
  })
  
  srRight.reveal('.skills-box',{delay: 100})
  srRight.reveal('.form-control',{delay: 100})
  
  /* ----- CHANGE ACTIVE LINK ----- */
  
  const sections = document.querySelectorAll('section[id]')
  function scrollActive() {
  const scrollY = window.scrollY;
  
  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')
  
    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
  
        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
  
    }  else {
  
      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
  
    }
  })
  }
  
  window.addEventListener('scroll', scrollActive)
  



















  // <!-- By writing the cotent in a google sheet -->
    const scriptURL = 
    'https://script.google.com/macros/s/AKfycbysAsrhGhVi0nlyGzkb5KXsP5vO-n6Jx37V7KyDc1ev9cmN4yTPRxmjPOONSnvXCdCK_Q/exec'
    const form = document.forms['google-sheet']
  
    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
        .catch(error => console.error('Error!', error.message))
    })
    
// For Extensions>Apps Script:-

// var sheetName = 'Sheet1'
// 		var scriptProp = PropertiesService.getScriptProperties()

// 		function intialSetup () {
// 		  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
// 		  scriptProp.setProperty('key', activeSpreadsheet.getId())
// 		}

// 		function doPost (e) {
// 		  var lock = LockService.getScriptLock()
// 		  lock.tryLock(10000)

// 		  try {
// 			var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
// 			var sheet = doc.getSheetByName(sheetName)

// 			var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
// 			var nextRow = sheet.getLastRow() + 1

// 			var newRow = headers.map(function(header) {
// 			  return header === 'timestamp' ? new Date() : e.parameter[header]
// 			})

// 			sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

// 			return ContentService
// 			  .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
// 			  .setMimeType(ContentService.MimeType.JSON)
// 		  }

// 		  catch (e) {
// 			return ContentService
// 			  .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
// 			  .setMimeType(ContentService.MimeType.JSON)
// 		  }

// 		  finally {
// 			lock.releaseLock()
// 		  }
// 		}














// <!-- By Downloading a file in computer -->
//   function handleSubmit(event) {
//     event.preventDefault();

//     const form = event.target;
//     const name = form.name.value;
//     const email = form.email.value;
//     const message = form.message.value;

//     const fileContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n`;
//     const blob = new Blob([fileContent], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `submission_${Date.now()}.txt`;
//     a.click();

//     URL.revokeObjectURL(url);
// }

