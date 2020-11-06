/*
 React Studio wrapper for the 'react-qr-svg' npm package.

 - 2020 / Nitin Khanna / @nitinthewiz / automedia.ai 

. v1.0

 */


// -- plugin info requested by host app --

this.describePlugin = function(id, lang) {
  switch (id) {
    case 'displayName':
      return "QRCode";

    case 'shortDisplayText':
      return "QRCode";

    case 'defaultNameForNewInstance':
      return "QRCode";
  }
}

// This is all data for the plugin 
// -- private variables --

this._data = {
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  level: 'Q',
  style: '{ "width": "130px" }', 
  value: 'Hello!',
};



// OFFICIAL dont touch 
// -- persistence, i.e. saving and loading --

this.persist = function() {
  return this._data;
}

this.unpersist = function(data) {  
	this._data = data;
}


// WHAT you see in settings in React Studio
// -- inspector UI --

this.reactWebDataLinkKeys = [
  "value"
];

this.inspectorUIDefinition = [
  {
    "type": "label",
    "text": "Set the color of the bright and dark squares. \nCommonly, the bright squares are white \nand the dark squares are black \nBut that's completely up to you! :)",
    "height": 40,
  },
  {
    "type": "label",
    "text": "Color of the bright squares:",
    "height": 20,
  },
  {
    "type": "textinput",
    "id": "bgColor",
    // "label": "Color of the bright squares",
    "actionBinding": "this.onUIChange"
  },
  {
    "type": "label",
    "text": "Color of the dark squares:",
    "height": 20,
  },
  {
    "type": "textinput",
    "id": "fgColor",
    // "label": "Color of the dark squares",
    "actionBinding": "this.onUIChange"
  },
  {
    "type": "label",
    "text": "Text to convert into QR Code: \n(note that Data Linkage can be used instead of this\nvalue and that will override anything set here)",
    "height": 40,
  },
  {
    "type": "textinput",
    "id": "value",
    // "label": "Text to convert into QR Code",
    "actionBinding": "this.onUIChange"
  },
  {
    "type": "label",
    "text": "Please ensure style follows the React in-line style \nJSON format, e.g.:\n{\n  \"width\": \"130px\"\n}",
    "height": 80,
  },
  {
    "type": "label",
    "text": "Style:",
    "height": 20,
  },
  {
    "type": "textinput",
    "id": "style", // MAKE SURE THIS is same as the variable name in this._data{}
    "label": "Style of the image",
    "actionBinding": "this.onUIChange",
    "multiline": true, 
    "height": 100,  // HEIGHT of component in RS
  },
];

// ACTUAL Settings declared 
this._uiTextFields = [ 'bgColor', 'fgColor', 'value', 'style' ];
this._uiCheckboxes = [];
this._uiNumberFields = [];
this._uiColorPickers = [];
this._uiComponentPickers = [];

this._accessorForDataKey = function(key) {
  if (this._uiTextFields.includes(key)) return 'text';
  else if (this._uiCheckboxes.includes(key)) return 'checked';
  else if (this._uiNumberFields.includes(key)) return 'numberValue';
  else if (this._uiColorPickers.includes(key)) return 'rgbaArrayValue';
  else if (this._uiComponentPickers.includes(key)) return 'componentName';
  return null;
}

this.onCreateUI = function() {
  var ui = this.getUI();
  for (var controlId in this._data) {
    var prop = this._accessorForDataKey(controlId);
    if (prop) {
      try {
      	ui.getChildById(controlId)[prop] = this._data[controlId];
      } catch (e) {
        console.log("** can't set ui value for key "+controlId+", prop "+prop);
      }
    }
  }
}

this.onUIChange = function(controlId) {
  var ui = this.getUI();
  var prop = this._accessorForDataKey(controlId);
  if (prop) {
    this._data[controlId] = ui.getChildById(controlId)[prop];
  } else {
    console.log("** no data property found for controlId "+controlId);
  }
}


// -- plugin preview --

this.renderIcon = function(canvas) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();
  if (this.icon == null) {
    // got the YouTube logo online
    var path = Plugin.getPathForResource("logo.png");  // LOGO image 
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();
};

// WHAT shows in the RS area after dragging component 
this.renderEditingCanvasPreview = function(canvas, controller) {
  this._renderPreview(canvas, controller);
}

// REAL preview if needed to show while in dev
this._renderPreview = function(canvas, controller) {
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  ctx.save();

  if (this.icon == null) {
    var path = Plugin.getPathForResource("logo.png");
    this.icon = Plugin.loadImage(path);
  }
  var iconW = this.icon.width;
  var iconH = this.icon.height;
  var aspectScale = Math.min(w/iconW, h/iconH);
  var scale = 0.9 * aspectScale; // add some margin around icon
  iconW *= scale;
  iconH *= scale;
  ctx.drawImage(this.icon, (w-iconW)*0.5, (h-iconH)*0.5, iconW, iconH);
  ctx.restore();

}


// ACTUALLY TELLING REACT WHERE TO PULL COMPONENT FROM 

// -- code generation, React web --

this.getReactWebPackages = function() {
  // Return dependencies that need to be included in the exported project's package.json file.
  // Each key is an npm package name that must be imported, and the value is the package version.
  
  return {
    "react-qr-svg": "^2.3.0"  // FROM NPM JS, name of package and version
  };
}

this.getReactWebImports = function(exporter) {
	var arr = [
    { varName: "{QRCode}", path: "react-qr-svg" }
  ];
	
	return arr;
}

this.writesCustomReactWebComponent = false;

this.getReactWebJSXCode = function(exporter) {  
  const bgColor = this._data.bgColor; // FROM Variable declared at top  
  const fgColor = this._data.fgColor; // FROM Variable declared at top  
  const level = this._data.level; // FROM Variable declared at top  
  const value = this._data.value; // FROM Variable declared at top  
  const style = this._data.style; // FROM Variable declared at top
  // Data Runtime Linkage overrides value from Plugin parameters
  var valueLinkage = exporter.getExpressionForLinkKey('value');

  var jsx = `<QRCode
              bgColor="${bgColor}" 
              fgColor="${fgColor}" 
              level="${level}" 
              style={${style}} `

  if (valueLinkage) {
    jsx += `value={${valueLinkage}} `;
  }
  else {
    jsx += `value="${value}" `;
  }

  jsx += ` />`;
  return jsx;
}

