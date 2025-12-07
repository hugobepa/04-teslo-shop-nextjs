https://gist.github.com/ilyar/9374463


We can’t automatically merge this pull request.

Use the command line to resolve conflicts before continuing.

Checkout via command line If you cannot merge a pull request automatically here, you have the option of checking it out via command line to resolve conflicts and perform a manual merge.

Step 1: From your project repository, check out a new branch and test the changes.

git checkout -b new_branch master
git pull repository.git branch

Step 2: Merge the changes and update on origin.

git checkout master
git merge new_branch
git push origin master

