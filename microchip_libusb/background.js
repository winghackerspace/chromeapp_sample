chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		bounds: {
			width: 400,
			height: 400,
		},
		singleton: true,
		id: "ChromeApps-PIC-Test"
	});
});
