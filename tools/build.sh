tsc && npx rollup -c rollup.config.ts
rm ./dist/*.d.ts
mv "./dist/todoist-rest-api" ./dist/index.d.ts
