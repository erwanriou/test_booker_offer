# CHECK IF ENV LOCAL EXIST
if
  [ ! -f .npmrc ]
then
  echo "registry=https://registry.npmjs.org" > .npmrc
  echo "semi: false \ntrailingComma: \"none\" \narrowParens: \"avoid\" \nprintWidth: 150" > .prettierrc.yml
fi
