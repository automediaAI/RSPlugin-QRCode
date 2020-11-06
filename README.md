# RSPlugin-QRCode
A React Studio plugin for an SVG based QR Code

# Instructions
1. Download from [here](https://github.com/automediaAI/RSPlugin-styled-image/releases/download/v1.0/styled-image.plugin.zip)
2. Access 'Components Plugin' folder from: React Studio Menu > Plugins > Show Plugin Manager > Show Plugins folder in Finder
3. Unzip and paste .plugin file in this folder
4. Click 'Reload Plugins' from Plugin Menu
5. You will see Styled Image component in the Components Menu

# How to use
1. Simply fill in the values in Plugin Parameters that you want to use for the QR code generation
2. You can change the default hex colors (white and black) for the light and dark squares in a QR code (a good resource for hex values is [here](https://www.color-hex.com/color/ffffff))
3. You can set the text you want to show in the QR code either in the Plugin Parameters, or
3. You can have the text as part of a data sheet and select the data sheet column under Data Runtime Linkage as well
	1. Please note that if you want to select a data sheet, you'll have to Carry the data sheet properties at the screen level

### For the style properties, you can
1. Put the style in the text block provided in the Plugin Parameters under the Style section
	1. Please notice the format of the styling. This format is derived from the CSS-in-JS style that React follows
	2. However, it's not a purely JSON object. It needs to be converted to JSON, and you need to pass a string to it
	3. Which means that while the JSON object looks like -
		```{display: "block"}```
	   You will need to pass -
	    ```{"display": "block"}```
	4. A very good tool to convert traditional CSS to CSS-in-JS is [CSS2JS found here](https://css2js.dotenv.dev/)

#### Please note that the Data Runtime Linkage properties will override the Plugin Parameters

# Dependencies
This plugin is based on the excellent [react-qr-svg component](https://www.npmjs.com/package/react-qr-svg)
