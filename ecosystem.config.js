module.exports = {
    apps: [{
      name: 'pomodoro',
      script: './server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-54-184-193-102.us-west-2.compute.amazonaws.com',
        key: '~/.ssh/pomodoro.pem',
        ref: 'origin/master',
        repo: 'git@github.com:Michael-Fernandes/productivityvis.git',
        path: '/home/ubuntu/pomodoro',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }