
var eventSetterFunctions = []

/* 
 * STICKY NAV
 * */

function setStickyNav() {
  const body = document.getElementsByTagName("body")[0];
  const header = document.getElementsByTagName("header")[0];
  const headerNav = header.getElementsByClassName("header-nav")[0];
  window.addEventListener('scroll', function(){
    let deltaT = body.getBoundingClientRect().top;
    let triggerPoint = -header.offsetHeight + headerNav.offsetHeight;
    if(deltaT < triggerPoint ){
      header.classList.add("header--fixed");
    }else {
      header.classList.remove("header--fixed");
    }
  });
};

eventSetterFunctions.push(setStickyNav);

/*
 * STICKY SIDEBAR
 */

function setScrollingSidebar() {
  const sidebarRoot = document.querySelector("[data-js-scroll-sidebar='root']");
  const sidebar = sidebarRoot.querySelector("[data-js-scroll-sidebar='sidebar']");
  console.log(sidebarRoot); 
	console.log(sidebar);
  window.addEventListener('scroll', function(){
          let boundingClientRect = sidebarRoot.getBoundingClientRect();
          let t = boundingClientRect.top;
	  let deltaB = boundingClientRect.bottom - sidebar.offsetHeight;
          console.log("top: ", t, "deltaB: ", deltaB);
	  if(deltaB <= 0){
	    sidebar.classList.add("sidebar--bottom-anchored");
	    sidebar.classList.remove("sidebar--scrolling-active");
	  }else if(t < 0){
            sidebar.classList.add("sidebar--scrolling-active");
	    sidebar.classList.remove("sidebar--bottom-anchored");
	  }else{
            sidebar.classList.remove("sidebar--scrolling-active");
            sidebar.classList.remove("sidebar--scrolling-active")
	  };

  });
};

eventSetterFunctions.push(setScrollingSidebar);

/* 
 * TABS
 * */
function returnTabTarget(tabEl){
  const targetClass = tabEl.dataset["jsTarget"];
  console.log("js-target is: ", targetClass);  
  return document.getElementsByClassName(targetClass)[0];
};

function setTabEvents(){
  const tabs = document.getElementsByClassName("tab");
  console.log(tabs);
  let targets = [];
  for (let tab of tabs) {
    targets.push(returnTabTarget(tab));
  }

  console.log(targets);
  for(let i = 0; i < tabs.length; i++){
    const target = returnTabTarget(tabs[i]);
    tabs[i].addEventListener('click', function(){
	    targets.forEach(x => x.classList.add("hidden"));
	    target.classList.remove("hidden");
	    for(let tab of tabs){ tab.classList.remove("tab--active") };
            this.classList.add("tab--active");
	});
   };
};

eventSetterFunctions.push(setTabEvents);

window.addEventListener('load', function(){ eventSetterFunctions.forEach(f => f())});
