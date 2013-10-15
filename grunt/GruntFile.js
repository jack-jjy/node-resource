module.exports = function(grunt) {
  var jsFiles = "src/scripts/**/*.js",
    cssFiles = "src/styles/**/*.css",
	coffeeFiles = "**/*.coffee",
	coffeeDest = "src/scripts/dest";
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     clean: {
          dist: [
              '<%= concat.distjs.dest %>',
              '<%= concat.distcss.dest %>',
              '<%= cssmin.dist.dest %>',
              '<%= uglify.dist.dest %>'
          ],
          server: ['.tmp']
      },
    concat: {
      options: {
        //separator: '/*file end*/;',
        process: function(src, filepath) {
             if(/css$|js$/.test(filepath)){
                return '\n/* Source: ' + filepath + ' */\n' +   //文件前面加文件名
                    src + '\n/* Source: ' + filepath + ' end */\n';
            }else{
                return src;
            }
        }
      },
      distjs: {
        src: [jsFiles],
        dest: 'dest/app.js'
      },
      distcss: {
        src: [cssFiles],
        dest: 'dest/app.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist:{
        src:'<%= concat.distjs.dest %>',
        dest: 'dest/app.min.js'
      }
    },
    cssmin:{
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist:{
        src:'<%= concat.distcss.dest %>',
        dest: 'dest/app.min.css'
      }
    },
    jshint: {
      files: ['gruntfile.js', jsFiles],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
	coffee:{
		dist:{
			expand: true, 
			cwd: "src/scripts/coffee",
			src: [coffeeFiles],
			dest: coffeeDest,
			//flatten:true,若为true,没有层次结构~
			ext: '.js'
		}
	},
    watch: {
      scripts:{
        files: ['coffee/src/*.coffee'],
        tasks: ['coffee'],
        options: {
           dateFormat: function(time) {
            grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
            grunt.log.writeln('Waiting for more changes...');
          }
        }
      }
    }
  });

/*   grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat'); */
  //loadTask so easy ~
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('develop',['clean','jshint', 'coffee','concat']);//开发时不压缩
  grunt.registerTask('min',['uglify','cssmin']);
  grunt.registerTask('default', ['develop','min']);
  //grunt.registerTask('runcoffee', ['coffee']);//warn:任务名不能和后面的某个名字一致，如不能叫coffee.因为默认注册了


};