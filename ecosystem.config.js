module.exports = {
    apps: [
        {
            script: './server/server.js',
            watch: [
                // 监控变化的目录，一旦变化，自动重启
                'src',
                'server',
                'build',
            ],
            ignore_watch: [
                // 忽视这些目录的变化
                'node_modules',
                'dist',
            ],
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],

    deploy: {
        production: {
            // 服务器用户名
            user: 'travis',
            // 服务器IP地址
            host: '45.32.33.18',
            // 要拉取的git分支
            ref: 'origin/deploy',
            // git仓库地址
            repo: 'https://github.com/amandakelake/vue-ssr',
            // 拉取到服务器的哪个目录下
            path: '/home/travis/vue-ssr',
            'pre-deploy-local': '',
            // 部署前执行
            'pre-deploy': 'git fetch --all',
            // 部署后执行
            'post-deploy': 'yarn && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
            env: {
                NODE_ENV: 'production',
            },
        },
    },
};
