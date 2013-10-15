module.exports = function(grunt) {
  var jsFiles = "src/scripts/**/*.js",
    cssFiles = "src/styles/**/*.css",
	coffeeFiles = "**/*.coffee",
	coffeeDest = "src/scripts/dest";
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: { //删除文件
          dist: [
              '<%= concat.distjs.dest %>',
              '<%= concat.distcss.dest %>',
              '<%= cssmin.dist.dest %>',
              '<%= uglify.dist.dest %>',
              '<%= copy.imgs.files[0].dest %>'
          ]
    },
    copy: {//复制文件
      imgs: {
        files: [//只有expend为true时，参数cwd才有用
          {expand: true,cwd:'src/',src: ['imgs/**'], dest: 'dest/'}
        ]
      }
    },
    concat: { //删除文件
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
    uglify: {//压缩js
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist:{
        src:'<%= concat.distjs.dest %>',
        dest: 'dest/app.min.js'
      }
    },
    cssmin:{//压缩css
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist:{
        src:'<%= concat.distcss.dest %>',
        dest: 'dest/app.min.css'
      }
    },
    jshint: {//验证js
      //files: ['gruntfile.js', jsFiles],
      files: [jsFiles],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
	  coffee:{//编译coffee
		  dist:{
  			expand: true, 
  			cwd: "src/scripts/coffee",
  			src: [coffeeFiles],
  			dest: coffeeDest,
  			//flatten:true,若为true,没有层次结构~
  			ext: '.js'
  		}
	  },
    watch: {//监视coffee的变化
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
  grunt.registerTask('develop',['clean','jshint', 'coffee','concat','copy']);//开发时不压缩
  grunt.registerTask('min',['uglify','cssmin']);
  grunt.registerTask('default', ['develop','min']);
  //grunt.registerTask('runcoffee', ['coffee']);//warn:任务名不能和后面的某个名字一致，如不能叫coffee.因为默认注册了


};