import './style.css';

//----------------------------------------------------------------------------
  //Parameters

  //SVG parameters
  let width = 1200;                   //1080 pixels horizontal
  let height = 800;                   //720 pixels vertical
  let svgBackgroundColor = "white";

  //Background image parameters
  let imagePositionX = 0;
  let imagePositionY = 0;
  let imageWidth = 1200;
  let imageHeight = 800;
  let imageRatio = imageWidth/imageHeight;
  let imageURL = "https://diy-magazine.s3.amazonaws.com/d/diy/Artists/K/Kendrick-Lamar/_1200x800_crop_center-center_82_line/84914/Screen-Shot-2015-04-16-at-14.19.05.jpg";
  let imageMaskColor = "black";
  let imageDarkMaskOpacity = 0.11;
  let blurEffect = false;
  let blurCloneEffect = false;
  let blurAmount = 10;
  let shadowOpacity = 1;
  let imageShadowEffect = false;
  let imageShadowBlurAmount = 4;
  let imageShadowShiftX = 8;
  let imageShadowShiftY = 8;
  let imageShadowColor = imageMaskColor;

  //Quote parameters
  let quotePositionX = 524;
  let quotePositionY = 140;
  let quoteBackgroundColor = "#4C5355";
  let quoteBackgroundOpacity = 1;
  let lineSeparation = 72;
  let linePaddingX = 4;
  let linePaddingY = 6;
  let quoteShadowEffect = false;
  let quoteShadowBlurAmount = 4;
  let quoteShadowShiftX = 8;
  let quoteShadowShiftY = 8;
  let quoteShadowColor = imageMaskColor;
  let lines = [ "I pray to God you actually pray when somebody dies",
                "Thoughts and prayers, way better-off timelines",
                "False claimin' not cute, I'm mortified",
                "The new Earth in hot pursuit, two-hundred lives"];

  //Text parameters
  let fontFamilyCustom = "Varela Round";
  let fontSizeCustom = 18;
  let fontWeightCustom = 400;
  let fontColor = "#EDE7DC";
  let quoteCharacterSize = 114;
  let quoteCharacterColor = quoteBackgroundColor;
  let quoteCharacterShiftX = -80;
  let quoteCharacterShiftY = 70;
  let quoteCharacterFontFamily = "Nunito Sans";

  //Song info parameters
  let infoPaddingFromBottom = 260;
  let infoShiftX = 0;
  let infoTextColor = quoteBackgroundColor;
  let infoFontSize = 22;
  let infoFontWeight = 600;
  let infoFontFamily = "Nunito Sans";
  let infoText = 'KENDRICK LAMAR  "RICH SPIRIT"'

  //Save file parameters
  let saveFile = false;                //Save SVG file? true -> yes, false -> no
  let filename = "Card";
  let loadFilename = filename + "_settings";

  //----------------------------------------------------------------------------
  //Main

  //Download button response
  const saveSVGButton = document.getElementById("save-svg");
  saveSVGButton.onclick = function() {
      const currentFilename = document.getElementsByName("save-filename")[0].value;
      if (currentFilename.replace(/\s/g, '') !== ""){
          filename = currentFilename;
      }
      downloadSVG();
  };

  //Download settings file response
  const saveSettingsButton = document.getElementById("save-settings");
  saveSettingsButton.onclick = function() {
      const currentSettingsFilename = document.getElementsByName("save-settings-filename")[0].value;
      if (currentSettingsFilename.replace(/\s/g, '') !== ""){
          loadFilename = currentSettingsFilename;
      }
      saveSVGParameters();
  };

  const imageHeightToRatioButton = document.getElementById("image-height-to-ratio");
  imageHeightToRatioButton.onclick = function() {
      console.log(parseInt(document.getElementsByName("image-width")[0].value));
      imageHeight = parseInt(document.getElementsByName("image-width")[0].value)/imageRatio;
      document.getElementsByName("image-height")[0].value = imageHeight;
      createSVG();
  };

  const imageWidthToRatioButton = document.getElementById("image-width-to-ratio");
  imageWidthToRatioButton.onclick = function() {
      //console.log(parseInt(document.getElementsByName("image-height")[0].value));
      imageWidth = parseInt(document.getElementsByName("image-height")[0].value)*imageRatio;
      document.getElementsByName("image-width")[0].value = imageWidth;
      createSVG();
  };

  const imageCenterXButton = document.getElementById("image-center-X");
  imageCenterXButton.onclick = function() {
      imagePositionX = (width - imageWidth)/2;
      document.getElementsByName("image-position-X")[0].value = imagePositionX;
      createSVG();
  };


  const imageCenterYButton = document.getElementById("image-center-Y");
  imageCenterYButton.onclick = function() {
      imagePositionY = (height - imageHeight)/2;
      document.getElementsByName("image-position-Y")[0].value = imagePositionY;
      createSVG();
  };

  const quoteColorPickerButton = document.getElementById('quote-color-picker');
  quoteColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          quoteBackgroundColor = result.sRGBHex;
          document.getElementsByName("quote-color")[0].value = quoteBackgroundColor;
          createSVG();
      });
  };

  const fontColorPickerButton = document.getElementById('font-color-picker');
  fontColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          fontColor = result.sRGBHex;
          document.getElementsByName("font-color")[0].value = fontColor;
          createSVG();
      });
  };

  const maskColorPickerButton = document.getElementById('mask-color-picker');
  maskColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          imageMaskColor = result.sRGBHex;
          document.getElementsByName("mask-color")[0].value = imageMaskColor;
          createSVG();
      });
  };

  const backgroundColorPickerButton = document.getElementById('background-color-picker');
  backgroundColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          svgBackgroundColor = result.sRGBHex;
          document.getElementsByName("background-color")[0].value = svgBackgroundColor;
          createSVG();
      });
  };

  const glyphColorPickerButton = document.getElementById('glyph-color-picker');
  glyphColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          quoteCharacterColor = result.sRGBHex;
          document.getElementsByName("glyph-color")[0].value = quoteCharacterColor;
          createSVG();
      });
  };

  const footerColorPickerButton = document.getElementById('footer-color-picker');
  footerColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          infoTextColor = result.sRGBHex;
          document.getElementsByName("footer-color")[0].value = infoTextColor;
          createSVG();
      });
  };

  const quoteShadowColorPickerButton = document.getElementById('quote-shadow-color-picker');
  quoteShadowColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          quoteShadowColor = result.sRGBHex;
          document.getElementsByName("quote-shadow-color")[0].value = quoteShadowColor;
          createSVG();
      });
  };

  const imageShadowColorPickerButton = document.getElementById('image-shadow-color-picker');
  imageShadowColorPickerButton.onclick =  function() {
      if (!window.EyeDropper) {
        console.log('Your browser does not support the EyeDropper API');
        return;
      }

      const eyeDropper = new EyeDropper();
      eyeDropper.open().then(result => {
          imageShadowColor = result.sRGBHex;
          document.getElementsByName("image-shadow-color")[0].value = imageShadowColor;
          createSVG();
      });
  };

  const blurEffectCheckbox =   document.getElementsByName("blurred-back-effect")[0];
  blurEffectCheckbox.onchange = function() {
      blurEffect = document.getElementsByName("blurred-back-effect")[0].checked;
      let inputs = document.getElementsByClassName("image-blur");
      if (blurEffect && blurCloneEffect){
          blurCloneEffect = false;
          document.getElementsByName("blurred-back-clone-effect")[0].checked = blurCloneEffect;
      }
      else if (blurCloneEffect || blurEffect){
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#212121";
          }
      }
      else {
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#bbbbbb";
          }
      }
      createSVG();
  };

  const blurCloneEffectCheckbox =   document.getElementsByName("blurred-back-clone-effect")[0];
  blurCloneEffectCheckbox.onchange = function() {
      blurCloneEffect = document.getElementsByName("blurred-back-clone-effect")[0].checked;
      let inputs = document.getElementsByClassName("image-blur");
      if (blurCloneEffect && blurEffect){
          blurEffect = false;
          document.getElementsByName("blurred-back-effect")[0].checked = blurEffect;
      }
      else if (blurCloneEffect || blurEffect){
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#212121";
          }
      }
      else {
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#bbbbbb";
          }
      }
      createSVG();
  };

  const quoteShadowEffectCheckbox =   document.getElementsByName("quote-shadow-effect")[0];
  quoteShadowEffectCheckbox.onchange = function() {
      quoteShadowEffect = document.getElementsByName("quote-shadow-effect")[0].checked;

      let inputs = document.getElementsByClassName("quote-shadow");
      if (quoteShadowEffect){
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#212121";
          }
      }
      else {
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#bbbbbb";
          }
      }

      console.log(quoteShadowEffect);
      createSVG();
  };

  const imageShadowEffectCheckbox =   document.getElementsByName("image-shadow-effect")[0];
  imageShadowEffectCheckbox.onchange = function() {
      imageShadowEffect = document.getElementsByName("image-shadow-effect")[0].checked;

      let inputs = document.getElementsByClassName("image-shadow");
      if (imageShadowEffect){
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#212121";
          }
      }
      else {
          for (let step = 0; step < inputs.length; step++){
              inputs[step].style.color = "#bbbbbb";
          }
      }

      console.log(imageShadowEffect);
      createSVG();
  };

  //Load settings button response
  let picker = document.getElementsByName("load-settings-filename")[0];

  picker.onchange = () => {
      // (B1) GET SELECTED CSV FILE
      let selected = picker.files[0];

      // (B2) READ CSV INTO ARRAY
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        // (B2-1) SPLIT ROWS & COLUMNS
        let parameters = new Object();
        let data = reader.result.split("\r\n");
        for (let i in data) {
            parameters[data[i].split(",")[0]] = decodeURIComponent(data[i].split(",")[1]);
        }

        setParameters(parameters);
        setFormPlaceholders();
        createSVG();
      });
      reader.readAsText(selected);
  };

  document.getElementById("save-form").onkeydown = (event) => update(event);
  document.getElementById("background-form").onkeydown = (event) => update(event);
  document.getElementById("quote-form").onkeydown = (event) => update(event);
  document.getElementById("text-form").onkeydown = (event) => update(event);
  document.getElementById("footer-form").onkeydown = (event) => update(event);
  document.getElementById("advanced-form").onkeydown = (event) => update(event);

  console.log(document.fonts.keys());

  //Initial run
  setFormPlaceholders();

  renderSVG();
  setTimeout(() => createSVG(), 40);

  document.getElementById("LyricCard").contentEditable = true;

  //----------------------------------------------------------------------------
  //Function definitions
  function saveSVGParameters(){
      const rows = [
          ["background-color", encodeURIComponent(svgBackgroundColor)],
          ["blur-amount", blurAmount],
          ["blurred-back-clone-effect", blurCloneEffect],
          ["blurred-back-effect", blurEffect],
          ["font-color", encodeURIComponent(fontColor)],
          ["font-family", fontFamilyCustom],
          ["font-size", fontSizeCustom],
          ["font-weight", fontWeightCustom],
          ["footer-color",encodeURIComponent(infoTextColor)],
          ["footer-font-family", infoFontFamily],
          ["footer-shift-X", infoShiftX],
          ["footer-text", infoText],
          ["glyph-color",encodeURIComponent(quoteCharacterColor)],
          ["glyph-font-family", quoteCharacterFontFamily],
          ["glyph-shift-X", quoteCharacterShiftX],
          ["glyph-shift-Y", quoteCharacterShiftY],
          ["glyph-size", quoteCharacterSize],
          ["image-url", imageURL],
          ["image-position-X", imagePositionX],
          ["image-position-Y", imagePositionY],
          ["image-width", imageWidth],
          ["image-height", imageHeight],
          ["info-padding", infoPaddingFromBottom],
          ["info-size", infoFontSize],
          ["info-weight", infoFontWeight],
          ["lines", encodeURIComponent(lines.join('\\'))],
          ["line-padding-X", linePaddingX],
          ["line-padding-Y", linePaddingY],
          ["line-separation", lineSeparation],
          ["quote-box-opacity", quoteBackgroundOpacity],
          ["quote-color", encodeURIComponent(quoteBackgroundColor)],
          ["quote-position-X", quotePositionX],
          ["quote-position-Y", quotePositionY],
          ["mask-opacity", imageDarkMaskOpacity],
          ["mask-color", encodeURIComponent(imageMaskColor)],
          ["svg-width", width],
          ["svg-height", height],
          ["quote-shadow-effect", quoteShadowEffect],
          ["quote-shadow-blur-amount", quoteShadowBlurAmount],
          ["quote-shadow-shift-X", quoteShadowShiftX],
          ["quote-shadow-shift-Y", quoteShadowShiftY],
          ["quote-shadow-color", encodeURIComponent(quoteShadowColor)],
          ["image-shadow-effect", imageShadowEffect],
          ["image-shadow-blur-amount", imageShadowBlurAmount],
          ["image-shadow-shift-X", imageShadowShiftX],
          ["image-shadow-shift-Y", imageShadowShiftY],
          ["image-shadow-color", encodeURIComponent(imageShadowColor)]
      ];

      let csvContent = "data:text/csv;charset=utf8,";
      rows.forEach(function(rowArray) {
          let row = rowArray.join(",");
          csvContent += row + "\r\n";
      });

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", loadFilename + ".csv");
      document.body.appendChild(link); // Required for FF

      link.click();
  }

  function downloadSVG(){
      let canvasH = document.createElement('canvas');
      canvasH.id = "canvas";
      canvasH.width = width;
      canvasH.height = height;
      document.body.appendChild(canvasH);

      const element = document.createElement("a");
      let svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");

      let DOMURL = self.URL || self.webkitURL || self;

      let svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
      element.href = DOMURL.createObjectURL(svg);
      element.download = filename + ".svg";
      document.body.appendChild(element);
      element.click();
      canvas.remove();
  }

  function setImageParameters(url, setDimensions) {
    var img = new Image();
    img.onload = function() {
        if (setDimensions){
          imageWidth = parseInt(this.width);
          imageHeight = parseInt(this.height);
        }
        imageRatio = parseInt(this.width)/parseInt(this.height);
    };
    img.src = url;
  }

  function setParameters(obj){

        width = parseInt(obj["svg-width"]);
        height = parseInt(obj["svg-height"]);
        svgBackgroundColor = obj["background-color"];
        imagePositionX = parseInt(obj["image-position-X"]);
        imagePositionY = parseInt(obj["image-position-Y"]);
        imageWidth = parseInt(obj["image-width"]);
        imageHeight = parseInt(obj["image-height"]);
        imageRatio = imageWidth/imageHeight;
        imageURL = obj["image-url"];
        imageDarkMaskOpacity = obj["mask-opacity"];
        blurEffect = (obj["blurred-back-effect"] === "true");
        blurCloneEffect = (obj["blurred-back-clone-effect"] === "true");
        blurAmount = parseInt(obj["blur-amount"]);
        quotePositionX = parseInt(obj["quote-position-X"]);
        quotePositionY = parseInt(obj["quote-position-Y"]);
        quoteBackgroundColor = obj["quote-color"];
        quoteBackgroundOpacity = obj["quote-box-opacity"];
        lineSeparation = parseInt(obj["line-separation"]);
        linePaddingX = parseInt(obj["line-padding-X"]);
        linePaddingY = parseInt(obj["line-padding-Y"]);
        lines = obj["lines"].split("\\");
        fontFamilyCustom = obj["font-family"];
        fontSizeCustom = parseInt(obj["font-size"]);
        fontWeightCustom = parseInt(obj["font-weight"]);
        fontColor = obj["font-color"];
        quoteCharacterSize = parseInt(obj["glyph-size"]);
        quoteCharacterShiftX = parseInt(obj["glyph-shift-X"]);
        quoteCharacterShiftY = parseInt(obj["glyph-shift-Y"]);
        infoPaddingFromBottom = parseInt(obj["info-padding"]);
        infoFontSize = parseInt(obj["info-size"]);
        infoFontWeight = parseInt(obj["info-weight"]);
        infoText = obj["footer-text"];
        imageMaskColor = obj["mask-color"];
        quoteCharacterColor = obj["glyph-color"];
        infoTextColor = obj["footer-color"];
        quoteCharacterFontFamily = obj["glyph-font-family"];
        infoFontFamily = obj["footer-font-family"];
        infoShiftX = parseInt(obj["footer-shift-X"]);
        imageShadowEffect = (obj["image-shadow-effect"] === "true");
        imageShadowBlurAmount = parseInt(obj["image-shadow-blur-amount"]);
        imageShadowShiftX = parseInt(obj["image-shadow-shift-X"]);
        imageShadowShiftY = parseInt(obj["image-shadow-shift-Y"]);
        imageShadowColor = obj["image-shadow-color"];
        quoteShadowEffect = (obj["quote-shadow-effect"] === "true");
        quoteShadowBlurAmount = parseInt(obj["quote-shadow-blur-amount"]);
        quoteShadowShiftX = parseInt(obj["quote-shadow-shift-X"]);
        quoteShadowShiftY = parseInt(obj["quote-shadow-shift-Y"]);
        quoteShadowColor = obj["quote-shadow-color"];

  }

  //The following function Constructs the SVG
  function renderSVG(){
      //Create empty SVG element
      var canvas = Snap("#LyricCard");
      canvas.attr({id: "LyricCard", width: width, height: height});
      // var canvas = Snap(width, height);
      // canvas.attr({id: "LyricCard"});

      // //Adding nice google fonts for later use
      // var frag = Snap.parse('<style>@import url("https://fonts.googleapis.com/css2?family=Varela+Round");@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900");</style>')
      // canvas.append( frag )

      //Setting up blur and shadow effects
      var blurFilter = canvas.filter(Snap.filter.blur(blurAmount, blurAmount));
      var quoteShadowFilter = canvas.filter(Snap.filter.shadow(quoteShadowShiftX, quoteShadowShiftY, quoteShadowBlurAmount, quoteShadowColor, parseFloat(shadowOpacity)));
      var imageShadowFilter = canvas.filter(Snap.filter.shadow(imageShadowShiftX, imageShadowShiftY, imageShadowBlurAmount, imageShadowColor, parseFloat(shadowOpacity)));

      //Setting up SVG background color
      var svgBackground = canvas.rect(0,0, width, height);
      svgBackground.attr({fill: svgBackgroundColor});

      //Setting up background image with "dimming" mask and blur effects
      if (blurCloneEffect){
          let blurredHeight = height;
          let blurredWidth = width;
          if(width/height > imageRatio){
              blurredWidth = width + 2*blurAmount;
              blurredHeight = blurredWidth/imageRatio;
          }
          else {
              blurredHeight = height + 2*blurAmount;
              blurredWidth = blurredHeight*imageRatio;
          }
          var backgroundBlurredImage = canvas.image(imageURL, (width - blurredWidth)/2, (height - blurredHeight)/2, blurredWidth, blurredHeight);

          backgroundBlurredImage.attr({filter: blurFilter});

          var mask = canvas.rect(0,0, width, height);
          mask.attr({fill: imageMaskColor});
          mask.attr({opacity: imageDarkMaskOpacity});

          let backgroundImage = canvas.image(imageURL, imagePositionX, imagePositionY, imageWidth, imageHeight);

          if (imageShadowEffect){
              backgroundImage.attr({filter: imageShadowFilter});
          }
      }
      else{
          let backgroundImage = canvas.image(imageURL, imagePositionX, imagePositionY, imageWidth, imageHeight);

          var mask = canvas.rect(0,0, width, height);
          mask.attr({fill: imageMaskColor});
          mask.attr({opacity: imageDarkMaskOpacity});

          if(blurEffect){
              backgroundImage.attr({filter: blurFilter});
          }
      }

      var quoteGroup = canvas.group();

      for (let step = 0; step < lines.length; step++) {

          let linePositionX = quotePositionX + 1.2*linePaddingX;
          let linePositionY = quotePositionY + linePaddingY + step*lineSeparation;
          let lineText = canvas.text(linePositionX, linePositionY, lines[step])
          lineText.attr({fontFamily: fontFamilyCustom});
          lineText.attr({fontSize: ""+fontSizeCustom+"pt"});
          lineText.attr({fill: fontColor});
          lineText.attr({fontWeight: fontWeightCustom})

          let blockWidth = lineText.getBBox().width;
          let blockHeight = lineText.getBBox().height;
          let lineBlock = canvas.rect(quotePositionX, quotePositionY + step*lineSeparation - 0.72*blockHeight - 0.09*linePaddingY, blockWidth + 2*linePaddingX, blockHeight + 2*linePaddingY)
          lineBlock.attr({fill: quoteBackgroundColor});
          lineBlock.attr({opacity: quoteBackgroundOpacity});

          quoteGroup.add(lineBlock, lineText)
      }

      let quoteCharacter = canvas.text(quotePositionX + quoteCharacterShiftX, quotePositionY + quoteCharacterShiftY, "“");
      quoteCharacter.attr({fontFamily: quoteCharacterFontFamily});
      quoteCharacter.attr({fontSize: ""+quoteCharacterSize+"pt"});
      quoteCharacter.attr({fill: quoteCharacterColor});
      quoteGroup.add(quoteCharacter);

      if (quoteShadowEffect){
          quoteGroup.attr({filter: quoteShadowFilter});
      }

      let infoTextElement = canvas.text(quotePositionX + infoShiftX, height - infoPaddingFromBottom, infoText);
      infoTextElement.attr({fontFamily: infoFontFamily});
      infoTextElement.attr({fontSize: ""+infoFontSize+"pt"});
      infoTextElement.attr({fill: infoTextColor});
      infoTextElement.attr({fontWeight: infoFontWeight});
      quoteGroup.add(infoTextElement);

      //Saving SVG file
      if(saveFile){
          downloadSVG();
      }

      //let bufferSpace = document.createElement('div');
      //bufferSpace.className = 'end-buffer-space';
      //document.body.append(bufferSpace);
  }

  /** This function provides a place for doing things before
      and after generating the SVG.
  **/
  function createSVG(){
      //First remove current SVG (and other elements previously generated) that is to be replaced
      let svgElement = document.getElementsByTagName("svg")[0];
      // empty contents of svgElement
      svgElement.innerHTML = '';

      // // remove svgElement
      // svgElement.remove();

      //let bufspace = document.getElementsByClassName("end-buffer-space")[0];
      //bufspace.remove();

      //Generated new SVG
      renderSVG();
  }

  function setFormPlaceholders(){
      //SVG section
      document.getElementsByName("svg-width")[0].placeholder = width;
      document.getElementsByName("svg-height")[0].placeholder = height;

      document.getElementsByName("svg-width")[0].defaultValue = width;
      document.getElementsByName("svg-height")[0].defaultValue = height;

      //Background image section
      document.getElementsByName("image-url")[0].placeholder = imageURL;
      document.getElementsByName("image-position-X")[0].placeholder = imagePositionX;
      document.getElementsByName("image-position-Y")[0].placeholder = imagePositionY;
      document.getElementsByName("image-width")[0].placeholder = imageWidth;
      document.getElementsByName("image-height")[0].placeholder = imageHeight;

      document.getElementsByName("image-position-X")[0].defaultValue = imagePositionX;
      document.getElementsByName("image-position-Y")[0].defaultValue = imagePositionY;
      document.getElementsByName("image-width")[0].defaultValue = imageWidth;
      document.getElementsByName("image-height")[0].defaultValue = imageHeight;

      //Quote section
      document.getElementsByName("quote-position-X")[0].placeholder = quotePositionX;
      document.getElementsByName("quote-position-Y")[0].placeholder = quotePositionY;
      document.getElementsByName("line-padding-X")[0].placeholder = linePaddingX;
      document.getElementsByName("line-padding-Y")[0].placeholder = linePaddingY;
      document.getElementsByName("line-separation")[0].placeholder = lineSeparation;
      document.getElementsByName("quote-color")[0].placeholder = quoteBackgroundColor;

      document.getElementsByName("quote-position-X")[0].defaultValue = quotePositionX;
      document.getElementsByName("quote-position-Y")[0].defaultValue = quotePositionY;
      document.getElementsByName("line-padding-X")[0].defaultValue = linePaddingX;
      document.getElementsByName("line-padding-Y")[0].defaultValue = linePaddingY;
      document.getElementsByName("line-separation")[0].defaultValue = lineSeparation;
      document.getElementsByName("quote-color")[0].defaultValue = quoteBackgroundColor;

      let linesPlaceholder = "";
      for (let step = 0; step < lines.length; step++){
          if (step != 0){
              linesPlaceholder += "\\";
          }
            linesPlaceholder += lines[step];
      }
      document.getElementsByName("lines")[0].placeholder = linesPlaceholder;

      //Text section
      document.getElementsByName("font-family")[0].placeholder = fontFamilyCustom;
      document.getElementsByName("font-size")[0].placeholder = fontSizeCustom;
      document.getElementsByName("font-color")[0].placeholder = fontColor;

      document.getElementsByName("font-family")[0].defaultValue = fontFamilyCustom;
      document.getElementsByName("font-size")[0].defaultValue = fontSizeCustom;
      document.getElementsByName("font-color")[0].defaultValue = fontColor;

      //Footer
      document.getElementsByName("info-padding")[0].placeholder = infoPaddingFromBottom;
      document.getElementsByName("info-size")[0].placeholder = infoFontSize;
      document.getElementsByName("footer-text")[0].placeholder = infoText;

      document.getElementsByName("info-padding")[0].defaultValue = infoPaddingFromBottom;
      document.getElementsByName("info-size")[0].defaultValue = infoFontSize;

      //Advanced section
      document.getElementsByName("glyph-size")[0].placeholder = quoteCharacterSize;
      document.getElementsByName("info-weight")[0].placeholder = infoFontWeight;
      document.getElementsByName("font-weight")[0].placeholder = fontWeightCustom;
      document.getElementsByName("quote-box-opacity")[0].placeholder = quoteBackgroundOpacity;
      document.getElementsByName("glyph-size")[0].placeholder = quoteCharacterSize;
      document.getElementsByName("mask-opacity")[0].placeholder = imageDarkMaskOpacity;
      document.getElementsByName("glyph-shift-X")[0].placeholder = quoteCharacterShiftX;
      document.getElementsByName("glyph-shift-Y")[0].placeholder = quoteCharacterShiftY;
      document.getElementsByName("background-color")[0].placeholder = svgBackgroundColor;
      document.getElementsByName("mask-color")[0].placeholder = imageMaskColor;
      document.getElementsByName("blur-amount")[0].placeholder = blurAmount;
      document.getElementsByName("glyph-color")[0].placeholder = quoteCharacterColor;
      document.getElementsByName("footer-color")[0].placeholder = infoTextColor;
      document.getElementsByName("footer-font-family")[0].placeholder = infoFontFamily;
      document.getElementsByName("glyph-font-family")[0].placeholder = quoteCharacterFontFamily;
      document.getElementsByName("footer-shift-X")[0].placeholder = infoShiftX;
      document.getElementsByName("quote-shadow-shift-X")[0].placeholder = quoteShadowShiftX;
      document.getElementsByName("quote-shadow-shift-Y")[0].placeholder = quoteShadowShiftY;
      document.getElementsByName("quote-shadow-blur-amount")[0].placeholder = quoteShadowBlurAmount;
      document.getElementsByName("quote-shadow-color")[0].placeholder = quoteShadowColor;
      document.getElementsByName("image-shadow-shift-X")[0].placeholder = imageShadowShiftX;
      document.getElementsByName("image-shadow-shift-Y")[0].placeholder = imageShadowShiftY;
      document.getElementsByName("image-shadow-blur-amount")[0].placeholder = imageShadowBlurAmount;
      document.getElementsByName("image-shadow-color")[0].placeholder = imageShadowColor;

      document.getElementsByName("glyph-size")[0].defaultValue = quoteCharacterSize;
      document.getElementsByName("info-weight")[0].defaultValue = infoFontWeight;
      document.getElementsByName("font-weight")[0].defaultValue = fontWeightCustom;
      document.getElementsByName("quote-box-opacity")[0].defaultValue = quoteBackgroundOpacity;
      document.getElementsByName("glyph-size")[0].defaultValue = quoteCharacterSize;
      document.getElementsByName("mask-opacity")[0].defaultValue = imageDarkMaskOpacity;
      document.getElementsByName("glyph-shift-X")[0].defaultValue = quoteCharacterShiftX;
      document.getElementsByName("glyph-shift-Y")[0].defaultValue = quoteCharacterShiftY;
      document.getElementsByName("background-color")[0].defaultValue = svgBackgroundColor;
      document.getElementsByName("mask-color")[0].defaultValue = imageMaskColor;
      document.getElementsByName("blurred-back-effect")[0].defaultChecked = blurEffect;
      document.getElementsByName("blurred-back-clone-effect")[0].defaultChecked = blurCloneEffect;
      document.getElementsByName("blur-amount")[0].defaultValue = blurAmount;
      document.getElementsByName("glyph-color")[0].defaultValue = quoteCharacterColor;
      document.getElementsByName("footer-color")[0].defaultValue = infoTextColor;
      document.getElementsByName("footer-font-family")[0].defaultValue = infoFontFamily;
      document.getElementsByName("glyph-font-family")[0].defaultValue = quoteCharacterFontFamily;
      document.getElementsByName("quote-shadow-effect")[0].defaultChecked = quoteShadowEffect;
      document.getElementsByName("quote-shadow-shift-X")[0].defaultValue = quoteShadowShiftX;
      document.getElementsByName("quote-shadow-shift-Y")[0].defaultValue = quoteShadowShiftY;
      document.getElementsByName("quote-shadow-blur-amount")[0].defaultValue = quoteShadowBlurAmount;
      document.getElementsByName("quote-shadow-color")[0].defaultValue = quoteShadowColor;
      document.getElementsByName("image-shadow-effect")[0].defaultChecked = imageShadowEffect;
      document.getElementsByName("image-shadow-shift-X")[0].defaultValue = imageShadowShiftX;
      document.getElementsByName("image-shadow-shift-Y")[0].defaultValue = imageShadowShiftY;
      document.getElementsByName("image-shadow-blur-amount")[0].defaultValue = imageShadowBlurAmount;
      document.getElementsByName("image-shadow-color")[0].defaultValue = imageShadowColor;


      //Save
      document.getElementsByName("save-filename")[0].placeholder = filename;
      document.getElementsByName("save-settings-filename")[0].placeholder = loadFilename;
  }

  function update(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Otherwise the form will be submitted

            //Responding to input from Save section
            console.log(e.target)
            const saveForm = document.getElementById('save-form');
            const saveFormData = new FormData(saveForm);
            for (const [key, value] of saveFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                    if(key == "svg-width"){
                        width = parseInt(value);
                    }
                    else if (key == "save-filename"){
                        filename = value;
                    }
                    else if (key == "save-settings-filename"){
                        loadFilename = value;
                    }
                    else if (key == "svg-height") {
                        height = parseInt(value);
                    }
                }
            }

            //Responding to input from Background section
            const backgroundForm = document.getElementById('background-form');
            const backgroundFormData = new FormData(backgroundForm);
            for (const [key, value] of backgroundFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                      if(key == "image-url"){
                          imageURL = value;
                          setImageParameters(value, false);
                      }
                      else if (key == "image-position-X"){
                          imagePositionX = parseInt(value);
                      }
                      else if (key == "image-position-Y"){
                          imagePositionY = parseInt(value);
                      }
                      else if (key == "image-width"){
                          imageWidth = parseInt(value);
                      }
                      else if (key == "image-height"){
                          imageHeight = parseInt(value);
                          console.log("entered image");
                      }
                }
            }

            //Responding to input from Quote section
            const quoteForm = document.getElementById('quote-form');
            const quoteFormData = new FormData(quoteForm);
            for (const [key, value] of quoteFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                      if(key == "lines"){
                          lines = value.split("\\");
                      }
                      else if (key == "quote-position-X"){
                         quotePositionX = parseInt(value);
                      }
                      else if (key == "quote-position-Y"){
                         quotePositionY = parseInt(value);
                      }
                      else if (key == "line-separation"){
                         lineSeparation = parseInt(value);
                      }
                      else if(key == "quote-color"){
                          quoteBackgroundColor = value;
                      }
                }
            }

            //Responding to input from Text section
            const textForm = document.getElementById('text-form');
            const textFormData = new FormData(textForm);
            for (const [key, value] of textFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                      if (key == "font-color"){
                         fontColor = value;
                      }
                      else if (key == "font-family"){
                         fontFamilyCustom = value;
                      }
                      else if (key == "font-size"){
                         fontSizeCustom = parseInt(value);
                      }

                      createSVG();     // rerendering SVG because of bug where boxes are not resized correctly (to fit new text size) on first render.
                }
            }

            //Responding to input from Footer section
            const footerForm = document.getElementById('footer-form');
            const footerFormData = new FormData(footerForm);
            for (const [key, value] of footerFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                      if (key == "footer-text"){
                         infoText = value;
                      }
                      else if (key == "info-size"){
                         infoFontSize = parseInt(value);
                      }
                      else if (key == "info-padding"){
                         infoPaddingFromBottom = parseInt(value);
                      }
                }
            }

            //Responding to input from Advanced section
            const advancedForm = document.getElementById('advanced-form');
            const advancedFormData = new FormData(advancedForm);
            for (const [key, value] of advancedFormData) {
                if (value == ""){
                    //console.log("empty value for " + key);
                }
                else {
                      if (key == "glyph-size"){
                         quoteCharacterSize = parseInt(value);
                      }
                      else if (key == "mask-opacity"){
                          imageDarkMaskOpacity = value;
                      }
                      else if (key == "quote-box-opacity"){
                          quoteBackgroundOpacity = value;
                      }
                      else if (key == "info-weight"){
                         infoFontWeight = parseInt(value);
                      }
                      else if (key == "font-weight"){
                         fontWeightCustom = parseInt(value);
                      }
                      else if (key == "info-padding"){
                         infoPaddingFromBottom = parseInt(value);
                      }
                      else if (key == "glyph-shift-X"){
                         quoteCharacterShiftX = parseInt(value);
                      }
                      else if (key == "glyph-shift-Y"){
                         quoteCharacterShiftY = parseInt(value);
                      }
                      else if (key == "background-color"){
                          svgBackgroundColor = value;
                      }
                      else if (key == "blur-amount"){
                         blurAmount = parseInt(value);
                      }
                      else if (key == "mask-color"){
                          imageMaskColor = value;
                      }
                      else if (key == "glyph-color"){
                          quoteCharacterColor = value;
                      }
                      else if (key == "footer-color"){
                          infoTextColor = value;
                      }
                      else if (key == "glyph-font-family"){
                          quoteCharacterFontFamily = value;
                      }
                      else if (key == "footer-font-family"){
                          infoFontFamily = value;
                      }
                      else if (key == "footer-shift-X"){
                         infoShiftX = parseInt(value);
                      }
                      else if (key == "line-padding-X"){
                         linePaddingX = parseInt(value);
                      }
                      else if (key == "line-padding-Y"){
                         linePaddingY = parseInt(value);
                      }
                      else if (key == "image-shadow-blur-amount"){
                         imageShadowBlurAmount = parseInt(value);
                      }
                      else if (key == "image-shadow-shift-X"){
                         imageShadowShiftX = parseInt(value);
                      }
                      else if (key == "image-shadow-shift-Y"){
                         imageShadowShiftY = parseInt(value);
                      }
                      else if (key == "image-shadow-color"){
                          imageShadowColor = value;
                      }
                      else if (key == "quote-shadow-blur-amount"){
                         quoteShadowBlurAmount = parseInt(value);
                      }
                      else if (key == "quote-shadow-shift-X"){
                         quoteShadowShiftX = parseInt(value);
                      }
                      else if (key == "quote-shadow-shift-Y"){
                         quoteShadowShiftY = parseInt(value);
                      }
                      else if (key == "quote-shadow-color"){
                          quoteShadowColor = value;
                      }

                }
            }

            console.log("FORM WAS SUBMITTED");
            createSVG();
        }
        else {
            console.log("keyCode: " + e.keyCode);
        }
  }

