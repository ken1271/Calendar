echo "pre-commit start"
error="0"

for file in $(git diff --cached --name-only | grep -E '\.(ts|tsx)$')
do
	# we only want to lint the staged changes, not any un-staged changes
	git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file"
	if [ $? -ne 0 ]; then
		error="1"
	fi
done

if [ "$error" == "1" ]; then
	echo "ESLint failed on staged files. Please check your code and try again. You can run ESLint manually via yarn lint."
	exit 1
fi

echo "pre-commit success"
