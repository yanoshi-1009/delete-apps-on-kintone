# 特定範囲の AppId のアプリを順次削除していくツール

1. `npm install`
2. src > js > config.js の startId と endId を変更する
3. node ./src/js/index.js で実行する
4. ブラウザが立ち上がるので立ち上がって 5 分以内にログイン名とパスワードを入力してログインボタンを押す
5. startId から順に削除処理が実行される
