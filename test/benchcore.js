var Buffer = require("buffer/").Buffer;
var should = require("should");
var bench = require("../index.js");

describe("BenchCore JS", function () {

	it("should be ok", function () {
		(bench).should.be.ok;
	});

	it("should be object", function () {
		(bench).should.be.type("object");
	});

	it("should have properties", function () {
		var properties = ["transaction", "signature", "vote", "delegate", "crypto"];

		properties.forEach(function (property) {
			(bench).should.have.property(property);
		});
	});

});
