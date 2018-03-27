module.exports = function(grunt) {
	//The directory into which resources will be sent
	var dest = "../backEnd/public/";
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		jshint: {
			options:{
				laxcomma: true,
				smarttabs: true,
				debug: true,
				expr: true,
				loopfunc: true
			},
			all: [
				"src/**/*.js"
			]
		},
		concat: {
			options: {
				separator: "\n"
			},
			dist: {
				src: [
                    "lib/jquery.js",
                    "lib/highcharts.js",
                    "lib/jquery.dataTables.min.js",
					"lib/underscore.js",
                    "src/hw03.js",
                    "src/utils/inputValidator.js",
					"src/service/service.js",
					"src/controllers/controller.js",
					"src/controllers/home/homePage.js",
					"src/controllers/home/navbar.js",
                    "src/controllers/home/overview.js",
                    "src/controllers/home/account.js",
					"src/controllers/login/login.js",
                    "src/controllers/login/loginPage.js",
                    "src/controllers/login/signup.js"
				],
				dest: dest + "hw03.js"
			}
		},
		concatcss: {
			options: {
				separator: "\n"
			},
			dist: {
				src: [
					"css/*.css"
				],
				dest: dest + "style.css"
			}
		},
		/* This task has two purposes. The first being that it replaces the "@hw03_templateName" string in index.html with the content of the file that contains the partial.
		 * Next, it will move the result into /dest/html, which is the version the server will serve
		 */
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: "hw03_homePage",
							replacement: "<%= grunt.file.read('src/templates/home/homePage.html') %>"
						},
						{
							match: "hw03_navbar",
							replacement: "<%= grunt.file.read('src/templates/home/navbar.html') %>"
						},
						{
							match: "hw03_loginPage",
							replacement: "<%= grunt.file.read('src/templates/login/loginPage.html') %>"
						},
						{
							match: "hw03_login",
							replacement: "<%= grunt.file.read('src/templates/login/login.html') %>"
						},
						{
							match: "hw03_signup",
							replacement: "<%= grunt.file.read('src/templates/login/signup.html') %>"
						},
                        {
                            match: "hw03_overview",
                            replacement: "<%= grunt.file.read('src/templates/home/overview.html') %>"
                        },
                        {
                            match: "hw03_account",
                            replacement: "<%= grunt.file.read('src/templates/home/account.html') %>"
                        }
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: ["html/index.html"],
						dest: dest + "html"
					}
				]
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						flatten: true,
						src: ["css/images/**.*"],
						dest: dest + "images"
					}
				]
			}
		},
        copyBadPath: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ["html/badPath.html"],
                        dest: dest + "html"
                    }
                ]
            }
        }
	});
	
	//Load taks from plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-replace");
	grunt.loadNpmTasks("grunt-contrib-copy");
	
	//Load the default task
	grunt.registerTask("default", ["debug"]);
	grunt.registerTask("debug", ["concat", "concatcss", "copy", "copyBadPath", "replace", "jshint"]);

	//This task just changes the arguments for the concat task and then runs it.
	grunt.registerTask("concatcss", function() {
		var task = grunt.config("concatcss");
		var src = task.dist.src;
		var dist = task.dist;
		var options = task.options;
		grunt.config.set("concat", {
			options: options,
			dist: dist
		});
		grunt.task.run("concat");
	});
    grunt.registerTask("copyBadPath", function() {
        var task = grunt.config("copyBadPath");

        grunt.config.set("copy", {
            main: task.main
        });
        grunt.task.run("copy");
    });
	
};