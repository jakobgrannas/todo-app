var gulp = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
	path = require('path'),
    sass = require('gulp-sass'),
    webpack = require('webpack'),
    server = require('./server.js'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    bourbon = require('node-bourbon'),
    basePath = './public',
    paths = {
		scripts: {
			src: basePath + '/js',
			dest: basePath + '/dist/js'
		},
        sass: {
            src: basePath + '/sass/**/*.scss',
            dest: basePath + '/dist/css'
        },
        images: {
            src: basePath + '/images/**/*',
            dest: basePath + '/dist/images'
        }
    };


gulp.task('scripts', function(callback) {
    webpack({
        entry: {
			app: paths.scripts.src + "/app.js",
			vendors: ['react', 'flux', 'react-dnd']
		},
        output: {
            path: __dirname,
            filename: paths.scripts.dest + "/bundle.js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
                }
            ]
        },
		plugins: [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.CommonsChunkPlugin('vendors', paths.scripts.dest + '/vendor.js')
			/*new webpack.optimize.UglifyJsPlugin({
				mangle: {
					except: ['$super', '$', 'exports', 'require']
				}
			})*/
		],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    })

});

gulp.task('sass', function() {
    var atomicPaths = ['utils', 'atoms', 'molecules', 'organisms', 'templates'],
        includePaths = atomicPaths.concat(bourbon.includePaths);

    return gulp.src(paths.sass.src)
        .pipe(sass({
            imagePath: '../images',
            includePaths: includePaths,
            sourceComments: 'map',
            sourceMap: 'sass',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(gulp.dest(paths.sass.dest))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.sass.dest))
});


gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('clean', function(callback) {
    del([
		paths.sass.dest + '/**/*.css',
		paths.scripts.dest + '/**/*.js'
	], callback);
});

var changeEvent = function(evt, src) {
    gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

gulp.task('watch', function() {
    gulp.watch(paths.scripts.src + '/**/*.js', ['scripts']);
    gulp.watch(paths.images.src, ['images']);
    gulp.watch(paths.sass.src, ['sass']).on('change', function(evt) {
        changeEvent(evt, 'sass/');
    });
});

gulp.task('start', function (callback) {
    return nodemon({
        script: 'server.js',
        ext: 'html js',
        env: { 'NODE_ENV': 'development' }
    })
        .on('restart', ['scripts'])
    .on('start', function () {
        callback();
    });
});

gulp.task('default', ['clean', 'sass', 'images', 'scripts', 'watch']);
