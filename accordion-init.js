  //Open and collapse sections
  let panelMaxHeight = 500;
  let acc = document.getElementsByClassName("accordion");
  let i;

  for (i = 0; i < acc.length; i++) {
    /* loop will continue to run till the length of accordion element */
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      panel.style.overflowY = "hidden";
      panel.style.paddingRight = "30px";
      panel.style.paddingLeft = "30px";
      if (panel.style.maxHeight) {
        //panel.style.overflowY = "hidden";
        panel.style.maxHeight = null;
      } else {
        //panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.maxHeight = panelMaxHeight + "px";
        if (panel.scrollHeight > panelMaxHeight){
            panel.style.overflowY = "auto";
            panel.style.paddingRight = "9px";
            //panel.style.paddingLeft = "29px";
        }
      }
    });
  }