git config --global user.name "Song Z"
git config --global user.email "goldstar0906@outlook.com"

Create a new repository
git clone git@gitlab.com:bj2020_workspace/lava_0208/18_2020_06_28_angular-to-vue.git
cd 18_2020_06_28_angular-to-vue
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Push an existing folder
cd existing_folder
git init
git remote add origin git@gitlab.com:bj2020_workspace/lava_0208/18_2020_06_28_angular-to-vue.git
git add .
git commit -m "Initial commit"
git push -u origin master

Push an existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin git@gitlab.com:bj2020_workspace/lava_0208/18_2020_06_28_angular-to-vue.git
git push -u origin --all
git push -u origin --tags