#!/usr/bin/env sh
# остановить публикацию при ошибках
set -e
# build
npm run build
# navigate into the build output directory
git ck master
git br -D gh-pages
git ck -b gh-pages
git add dist
git cm -m 'adding dist subtree'
git subtree push --prefix dist origin gh-pages
rmdir dist
git ck master
cd -
