Package.describe({
	name: "velocity:test-proxy",
	summary: "Dynamically created package to expose test files to mirrors",
	version: "0.0.4",
	debugOnly: true
});

Package.on_use(function (api) {
	api.add_files("tests/mocha/server/sampleServerTest.js",["server"]);
	api.add_files("tests/mocha/client/sampleClientTest.js",["client"]);
});