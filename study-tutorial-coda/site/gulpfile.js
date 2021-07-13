/*
Build file to concat & minify files, compile SCSS and so on.
*/
// grab our gulp packages
var gulp  = require("gulp");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var fileinclude = require("gulp-file-include");
var notify = require("gulp-notify");

gulp.task("sass", function() {
	return gulp.src(["**/*.scss", "!node_modules/**", "!sources/**"])
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(rename({ extname: ".css" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("."))
		.pipe(notify("<%= file.relative %> done!"));
});

gulp.task("html", function() {
	gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/",
			context: {
				condition: 1
			}
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename(function (path) {
			path.basename += "-1";
		}))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
		.pipe(notify({
			message: "HTML done!",
			onLast: true
		}));

	gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/",
			context: {
				condition: 2
			}
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename(function (path) {
			path.basename += "-2";
		}))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
		.pipe(notify({
			message: "HTML done!",
			onLast: true
		}));


	gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/",
			context: {
				condition: 3
			}
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename(function (path) {
			path.basename += "-3";
		}))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
		.pipe(notify({
			message: "HTML done!",
			onLast: true
		}));

	gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/",
			context: {
				condition: 4
			}
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename(function (path) {
			path.basename += "-4";
		}))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
		.pipe(notify({
			message: "HTML done!",
			onLast: true
		}));


});

gulp.task("build", function() {
	gulp.src(["**/*.html", "!**/*.tpl.html", "!node_modules/**/*.*", "**/*.css", "**/*.map", "**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.jfif", "**/*.svg", "**/*.docx", "**/*.zip", "**/*.mp4"])
		.pipe(gulp.dest("../../site/"))
});

gulp.task("watch", function() {
	//gulp.watch(["../mavo/dist/*"], ["update"]);
	gulp.watch(["**/*.scss"], ["sass"]);
	gulp.watch(["**/*.tpl.html", "./templates/*.html"], ["html"]);
});

gulp.task("default", ["sass", "html"]);
