module.exports = {
    apps: [
        {
            name: 'ssr',
            script: './server/server.js',
            watch: [
                // 监控变化的目录，一旦变化，自动重启
                'src',
                'server',
                'config',
            ],
            ignore_watch: [
                // 忽视这些目录的变化
                'node_modules',
                'dist',
            ],
            exec_mode: 'cluster_mode',
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],

    deploy: {
        production: {
            // 服务器用户名
            user: 'root',
            // 服务器IP地址
            host: '45.32.33.18',
            // 要拉取的git分支
            ref: 'origin/master',
            // git仓库地址
            repo: 'https://github.com/amandakelake/vue-ssr',
            // 拉取到服务器的哪个目录下
            path: '/root/projects/vue-ssr',
            // 自动将 github 加入远程服务器的信任列表
            ssh_options: 'StrictHostKeyChecking=no',
            'pre-deploy-local': '',
            // 部署前执行
            'pre-deploy': 'git fetch --all',
            // 部署后执行 自动重启
            'post-deploy': 'yarn --ignore-engines && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
            env: {
                NODE_ENV: 'production',
            },
        },
    },
};
