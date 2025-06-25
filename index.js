// node.jsの標準ライブラリであるhttpモジュールをインポートする
// "node:" をつけることで、コアモジュールであることを明示している
import http from 'node:http';

// URLを扱うためのURLオブジェクトをインポートする
import { URL } from 'node:url';

// サーバーが待ち受けるポート番号を設定する
// 環境変数PORTが設定されていればその値を、なければ8888を使う
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // アクセスされたURLをパースして、パス名やクエリパラメータを取得しやすくする
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // レスポンスのヘッダーに、文字コードがUTF-8であることを設定する
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // URLのパスによって処理を分岐する
  if (pathname === '/') {
    // ルートパス ("/") にアクセスされた場合
    console.log('/ にアクセスがありました');
    res.writeHead(200); // ステータスコード200 (成功) を返す
    res.end('こんにちは！');
  } else if (pathname === '/ask') {
    // "/ask" パスにアクセスされた場合
    console.log('/ask にアクセスがありました');
    const question = parsedUrl.searchParams.get('q'); // クエリパラメータ "q" の値を取得
    res.writeHead(200); // ステータスコード200 (成功) を返す
    res.end(`Your question is '${question}'`);
  } else {
    // それ以外のパスにアクセスされた場合
    console.log('不明なパスにアクセスがありました:', pathname);
    res.writeHead(404); // ステータスコード404 (見つからない) を返す
    res.end('Not Found');
  }
});

// 設定したポートでリクエストを待ち始める
server.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました: http://localhost:${PORT}`);
});