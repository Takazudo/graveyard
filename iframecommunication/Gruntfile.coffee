module.exports = (grunt) ->
  
  grunt.task.loadTasks 'gruntcomponents/tasks'
  grunt.task.loadNpmTasks 'grunt-contrib-coffee'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig

    growl:

      ok:
        title: 'COMPLETE!!'
        msg: '＼(^o^)／'

    coffee:

      base:
        src: 'files/coffee/base.coffee'
        dest: 'files/js/base.js'
      inner:
        src: 'files/coffee/inner.coffee'
        dest: 'files/js/inner.js'
      outer:
        src: 'files/coffee/outer.coffee'
        dest: 'files/js/outer.js'

    watch:

      base:
        files: '<%= coffee.base.src %>'
        tasks: [ 'default' ]
      inner:
        files: '<%= coffee.inner.src %>'
        tasks: [ 'default' ]
      outer:
        files: '<%= coffee.outer.src %>'
        tasks: [ 'default' ]

  grunt.registerTask 'default', [
    'coffee'
    'growl:ok'
  ]

