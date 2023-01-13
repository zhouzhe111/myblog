#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# # git remote remove origin
# git remote add zhouzhe111.github.io git@github.com:zhouzhe111/zhouzhe111.github.io.git
# git push -f master
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
# git push -f git@github.com:zhouzhe111/zhouzhe111.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:zhouzhe111/zhouzhe111.github.io.git master

cd ../../../
git init
git add .
git commit -m 'deploy'
git push -f git@github.com:zhouzhe111/myblog master

echo 按任意键继续
read -n 1
echo 继续运行

cd -