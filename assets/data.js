/* ============================================================================
   学習のすゝめ ― トランザクション  データ層
   出典: 「学習のすゝめ ― 不可分な一連の流れ」(Team ATLAS, CERN, 2018 / 小船幹生)
   ----------------------------------------------------------------------------
   ・window.TX      … トランザクションの実例(フォルダとして展開)
   ・window.WEEK    … 週間プラン『教科配置』(通常版 / 現役・毎日登校版)
   ・window.DAY     … 1日プラン『演習内容』(ロング / ショート)
   ・window.PRESETS … ビルダーの下敷き
   教材名は原資料に載っている例です。合計時間は各フェーズの分の和と一致します。
   ・「12時間」「6時間」は 1日あたりの目安（多い日は12時間／通学する日でも6時間確保）。
     週グリッドは「どの教科をどの曜日に置くか」の配置例で、週の総量を表すものではない。
   ・原資料 p8（Tx4）は最終ノードのラベルが "Trigger" と誤記だが、図柄は報酬袋・吹き出しは
     "スマホを見る" なので、ここでは reward（報酬）として正しく扱う。
   ============================================================================ */

/* ── トランザクションの実例 ────────────────────────────────────────────── */
window.TX = [
  {
    id: "tx1",
    no: 1,
    title: "1時間ルーティン",
    kind: "平日・すきま",
    total: 60,
    trigger: "メガネをかける",
    trigger_note: "身につけるものを合図に",
    reward: "SNSを20分見る",
    phases: [
      { subject: "英語", cat: "英文法",   book: "頻出英文法・語法問題1000",           min: 20 },
      { subject: "数学", cat: "演習問題", book: "新スタンダード演習", min: 30 },
      { subject: "古文", cat: "古文単語", book: "頻出古文単語400",   min: 10 }
    ]
  },
  {
    id: "tx2",
    no: 2,
    title: "1時間ルーティン",
    kind: "平日・すきま",
    total: 60,
    trigger: "ヤクルト1000を飲む",
    trigger_note: "口にするものを合図に",
    reward: "寝る",
    phases: [
      { subject: "英語", cat: "英文法",   book: "頻出英文法・語法問題1000",         min: 40 },
      { subject: "古文", cat: "古文文法", book: "古文上達 基礎編", min: 20 }
    ]
  },
  {
    id: "tx3",
    no: 3,
    title: "土日ルーティン",
    kind: "休日・まとまった時間",
    total: 200,
    trigger: "図書館へ行く",
    trigger_note: "場所・席を合図に",
    reward: "夜ご飯",
    phases: [
      { subject: "化学",   cat: "共テ対策", book: "基礎問題精講",         min: 75 },
      { subject: "世界史", cat: "論述",     book: "論述のトレーニング",   min: 75 },
      { subject: "現代文", cat: "読解",     book: "現代文と格闘する",     min: 50 }
    ]
  },
  {
    id: "tx4",
    no: 4,
    title: "本番ルーティン",
    kind: "入試本番の丸一日",
    total: 520,
    trigger: "メガネをかける",
    trigger_note: "身につけるものを合図に",
    reward: "スマホを見る",
    phases: [
      { subject: "国語", cat: "過去問演習", book: "東大過去問演習（古文）／漢文道場",  min: 100 },
      { subject: "数学", cat: "演習問題",   book: "新スタンダード演習",              min: 150 },
      { subject: "化学", cat: "過去問演習", book: "東大過去問演習",                  min: 75 },
      { subject: "物理", cat: "基礎・知識", book: "良問の風／知識の焦点",            min: 75 },
      { subject: "英語", cat: "読解・語法", book: "思考訓練のための英文読解／英頻", min: 120 }
    ]
  }
];

/* ── 週間プラン『教科配置』 ─────────────────────────────────────────────
   day = { date, dow(0=日..6=土), chips:[{subject, type:"long"|"short", alt?:[…]}] }
   alt は「AかB、どちらかを配置」の選択肢(現役版で使用)。                     */
window.WEEK = {
  normal: {
    label: "通常版",
    note: "多い日は1日で合計12時間ほどを目安にした、1週間の配置例です。",
    days: [
      { date: 28, dow: 0, chips: [ {subject:"英語", type:"long"}, {subject:"化学", type:"long"} ] },
      { date: 29, dow: 1, chips: [ {subject:"数学", type:"long"}, {subject:"物理", type:"long"} ] },
      { date: 30, dow: 2, chips: [ {subject:"物理", type:"short"}, {subject:"英語", type:"short"}, {subject:"化学", type:"short"}, {subject:"化学", type:"short"} ] },
      { date: 31, dow: 3, chips: [ {subject:"国語", type:"long"}, {subject:"数学", type:"short"} ] },
      { date: 1,  dow: 4, chips: [ {subject:"数学", type:"long"}, {subject:"英語", type:"short"} ] },
      { date: 2,  dow: 5, chips: [ {subject:"数学", type:"short"}, {subject:"英語", type:"short"}, {subject:"化学", type:"short"}, {subject:"国語", type:"short"} ] },
      { date: 3,  dow: 6, chips: [ {subject:"物理", type:"long"}, {subject:"物理", type:"short"}, {subject:"物理", type:"short"} ] }
    ],
    rules: [
      "ロングは1週間で全教科を配置したいところです（1日あたり最大でも2教科）。",
      "ショートはできればロングの後、2日以内に置きます。必要に応じて随時変えてかまいません（最大でも3〜4教科）。",
      "ロングだけは1週間のペースメーカーとして固定で守ると、バランスが取れます。",
      "4教科5科目の場合は、とくに理科・社会をロングもショートも多めにします（→「理科社会は裏切らない」）。"
    ]
  },
  genneki: {
    label: "現役・毎日登校版",
    note: "どうしても通学する日がある場合の配置例です。通学日でも、1日6時間を目標にします。",
    days: [
      { date: 28, dow: 0, chips: [ {subject:"英語", type:"long"}, {subject:"数学", type:"long"} ] },
      { date: 29, dow: 1, chips: [ {subject:"国語", type:"long", alt:[{subject:"数学",type:"short"},{subject:"英語",type:"short"}]} ] },
      { date: 30, dow: 2, chips: [ {subject:"化学", type:"long", alt:[{subject:"数学",type:"short"},{subject:"国語",type:"short"}]} ] },
      { date: 31, dow: 3, chips: [ {subject:"物理", type:"long", alt:[{subject:"化学",type:"short"},{subject:"物理",type:"short"}]} ] },
      { date: 1,  dow: 4, chips: [ {subject:"化学", type:"short"}, {subject:"物理", type:"short"}, {subject:"英語", type:"short"} ] },
      { date: 2,  dow: 5, chips: [ {subject:"化学", type:"short"}, {subject:"物理", type:"short"}, {subject:"英語", type:"short"} ] },
      { date: 3,  dow: 6, chips: [ {subject:"英語", type:"long"}, {subject:"数学", type:"short"}, {subject:"数学", type:"short"} ] }
    ],
    rules: [
      "ロングは1週間で全教科を配置したいところです（1日あたり最大でも2教科）。",
      "ショートはできればロングの後、2日以内に置きます。時間の都合でロングを週の初め、ショートを週の終わりに置き、1週間のリズムを作るのも一つの手です。ただし各教科でロング↔ショートの流れを作りたいので、なるべく近い日にショートを置くほうが効果的です。",
      "ロングだけは1週間のペースメーカーとして固定で守ると、バランスが取れます。",
      "4教科5科目の場合は、とくに理科・社会のショートを多めにします（→「理科社会は裏切らない」）。"
    ]
  }
};

/* ── 1日プラン『演習内容』(例: 東大英語の過去問演習) ─────────────────── */
window.DAY = {
  long: {
    label: "ロング",
    span: "5〜6時間",
    caption: "各教科の過去問演習の流れ",
    total_note: "休憩や合間の一息も込みで、時間を先に決めておきます。演習そのものは5時間、休憩や移動を含めて、5〜6時間のひとまとまり（1トランザクション）として先に枠を取ります。",
    phases: [
      { icon: "pencil", min: 120, text: "実際の時間に合わせて、過去問を解く" },
      { icon: "check",  min: 30,  text: "答え合わせ。記述の場合は厳しめに" },
      { icon: "review", min: 75,  text: "解けなかった問題の振り返り" },
      { icon: "gather", min: 75,  text: "これまでの教材から、まとめや類題を集める" }
    ]
  },
  short: {
    label: "ショート",
    span: "2〜3時間",
    caption: "各教科の演習の流れ",
    total_note: "休憩や合間の一息も込みで、時間を先に決めておきます。演習そのものは3時間、休憩も含めて、3時間ほどのひとまとまり（1トランザクション）として先に枠を取ります。",
    phases: [
      { icon: "pencil", min: 75, text: "過去問の類題・関連題を解く（自分がすでに繰り返し解いているものから）" },
      { icon: "check",  min: 30, text: "答え合わせ。記述の場合は厳しめに" },
      { icon: "review", min: 50, text: "解けなかった問題の振り返り" },
      { icon: "match",  min: 25, text: "解いた問題と過去問を再度照らし合わせる" }
    ]
  }
};

/* ── ビルダーの下敷き ───────────────────────────────────────────────── */
window.PRESETS = {
  hour: {
    label: "1時間ルーティン",
    trigger: "メガネをかける",
    reward: "SNSを20分見る",
    phases: [
      { subject: "英語", book: "頻出英文法・語法問題1000",           min: 20 },
      { subject: "数学", book: "新スタンダード演習", min: 30 },
      { subject: "古文", book: "頻出古文単語400",   min: 10 }
    ]
  },
  weekend: {
    label: "土日ルーティン",
    trigger: "図書館へ行く",
    reward: "夜ご飯",
    phases: [
      { subject: "化学",   book: "基礎問題精講",       min: 75 },
      { subject: "世界史", book: "論述のトレーニング", min: 75 },
      { subject: "現代文", book: "現代文と格闘する",   min: 50 }
    ]
  },
  blank: {
    label: "白紙",
    trigger: "",
    reward: "",
    phases: [
      { subject: "英語", book: "", min: 30 }
    ]
  }
};

/* ── 1日の組み込み例（モデルケース） ──────────────────────────────────────
   起床を固定の起点に、Tx（フル）と Short Tx を生活の合間に差し込む。
   type: tx=フルTx / short=ショートTx / fixed=学校など固定枠 / life=生活 / sleep=就寝
   min はブロックの長さ（分）。tx と short の分の和が「その日の自己学習」。       */
window.DAYMODEL = {
  weekday: {
    label: "平日",
    wake: "4:00",
    note: "朝4時起床を固定の起点に。朝は〈設計→実行〉のフル・トランザクション、通学の往復は Short Tx、帰宅後は長めのフル・トランザクション、寝る前に総仕上げを1本。",
    blocks: [
      { s:"4:00",  e:"4:15",  min:15,  type:"tx",    badge:"設計",     label:"今日の1セットを組む", sub:"科目の順番と時間を決める" },
      { s:"4:15",  e:"6:15",  min:120, type:"tx",    badge:"Tx①",      label:"朝のフル・トランザクション", sub:"組んだ1セットを一続きで実行" },
      { s:"6:15",  e:"6:30",  min:15,  type:"life",  badge:"",         label:"朝ごはん・支度", sub:"" },
      { s:"6:40",  e:"8:10",  min:90,  type:"short", badge:"Short Tx", label:"登校時間（往路）", sub:"単語・一問一答を耳と手で" },
      { s:"8:10",  e:"16:00", min:470, type:"fixed", badge:"固定",     label:"学校", sub:"" },
      { s:"16:00", e:"17:30", min:90,  type:"short", badge:"Short Tx", label:"下校時間（復路）", sub:"往路の復習＋今日の授業の整理" },
      { s:"17:30", e:"20:00", min:150, type:"tx",    badge:"Tx②",      label:"帰宅後のフル・トランザクション", sub:"学校の復習＋弱点の仕分けを一続きで" },
      { s:"20:00", e:"22:00", min:120, type:"life",  badge:"",         label:"夕食・入浴・休憩", sub:"" },
      { s:"22:00", e:"23:00", min:60,  type:"tx",    badge:"Tx③",      label:"寝る前に一度", sub:"今日の総仕上げを一続きで" },
      { s:"23:00", e:"4:00",  min:300, type:"sleep", badge:"",         label:"就寝（5時間）", sub:"" }
    ]
  },
  holiday: {
    label: "休日",
    wake: "4:00",
    note: "学校がない日は Tx が主役。長め（土日ルーティン）と短めを織り交ぜ、多い日は合計12時間ほど。",
    blocks: [
      { s:"4:00",  e:"6:00",  min:120, type:"tx",    badge:"Tx①",      label:"朝いちのフル・トランザクション", sub:"頭が冴えている時間に" },
      { s:"6:00",  e:"6:30",  min:30,  type:"life",  badge:"",         label:"朝食", sub:"" },
      { s:"6:30",  e:"9:30",  min:180, type:"tx",    badge:"Tx②",      label:"土日ルーティン（ロング）", sub:"過去問とじっくり向き合う" },
      { s:"9:30",  e:"10:00", min:30,  type:"life",  badge:"",         label:"休憩", sub:"" },
      { s:"10:00", e:"12:30", min:150, type:"tx",    badge:"Tx③",      label:"フル・トランザクション", sub:"" },
      { s:"12:30", e:"13:30", min:60,  type:"life",  badge:"",         label:"昼食", sub:"" },
      { s:"13:30", e:"16:30", min:180, type:"tx",    badge:"Tx④",      label:"フル・トランザクション", sub:"" },
      { s:"16:30", e:"18:00", min:90,  type:"life",  badge:"",         label:"休憩・軽い運動", sub:"" },
      { s:"18:00", e:"20:00", min:120, type:"tx",    badge:"Tx⑤",      label:"夕方のトランザクション", sub:"" },
      { s:"20:00", e:"21:30", min:90,  type:"life",  badge:"",         label:"夕食・入浴", sub:"" },
      { s:"21:30", e:"22:00", min:30,  type:"short", badge:"Short Tx", label:"寝る前の総ざらい", sub:"" },
      { s:"22:00", e:"4:00",  min:360, type:"sleep", badge:"",         label:"就寝（6時間）", sub:"" }
    ]
  }
};
