// 生成した Prisma Client をインポート
// schema.prismaのgeneratorで指定したoutputのパスと対応しておるぞ
import { PrismaClient } from "./generated/prisma/client";

// PrismaClientのインスタンスを作成する
const prisma = new PrismaClient({
  // この設定で、実行されたSQLクエリがコンソールに表示されるようになる
  log: ['query'],
});

// データベース操作を行うメインの非同期関数
async function main() {
  console.log("Prisma Client を初期化しました。");

  // 既存の全ユーザーを取得して表示
  const usersBefore = await prisma.user.findMany();
  console.log("Before ユーザー一覧:", usersBefore);

  // 新しいユーザーを作成
  const newUser = await prisma.user.create({
    data: {
      name: `新しいユーザー ${new Date().toISOString()}`,
    },
  });
  console.log("新しいユーザーを追加しました:", newUser);

  // 再度、全ユーザーを取得して表示
  const usersAfter = await prisma.user.findMany();
  console.log("After ユーザー一覧:", usersAfter);
}

// main関数を実行する
main()
  .catch(e => {
    // エラーが発生したらコンソールに出力
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 処理が終了したら（成功しても失敗しても）、データベース接続を切断する
    await prisma.$disconnect();
    console.log("Prisma Client を切断しました。");
  });