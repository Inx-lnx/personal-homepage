-- ============================================================
-- 访客反馈表 + 权限策略（Supabase）
--
-- 目标：任何人都能「提交」反馈，但任何人都不能「读取」别人的反馈；
--       只有你本人（登录 Supabase 控制台）能看到反馈内容。
--
-- 使用方法：Supabase 控制台 → 左侧 SQL Editor → 粘贴本脚本全文 → Run
--
-- ⚠️ 本脚本是【幂等】的，可以反复执行，不会影响已有数据。
--    注意：绝不使用 `drop table` 来「重建」——那会把已有反馈一起删掉。
-- ============================================================

-- 1) 建表（已存在则跳过，不会动已有数据）
create table if not exists public.feedback (
  id          bigint generated always as identity primary key,
  name        text not null,                 -- 访客姓名
  relation    text,                          -- 与我的关系（同学/朋友/老师/同事/家人/其他）
  message     text not null,                 -- 反馈内容
  created_at  timestamptz not null default current_timestamp
);

-- 1.1) 内容长度上限：防止有人塞超大文本把数据库撑爆
alter table public.feedback drop constraint if exists feedback_length_check;
alter table public.feedback
  add constraint feedback_length_check check (
    char_length(name) <= 60
    and char_length(coalesce(relation, '')) <= 30
    and char_length(message) <= 2000
  );

-- 2) 开启行级安全（RLS）—— 「读不到」的根本保障
--    一旦开启 RLS，没有显式授权的操作一律被拒绝。
alter table public.feedback enable row level security;

-- 3) 权限层面再收一道：先把匿名身份的全部权限收回
--    （Supabase 默认会给 anon 授予整张表的 ALL 权限，只靠 RLS 拦；
--      这里连底层权限一起收回，形成双保险。）
revoke all on table public.feedback from anon, authenticated;

-- 4) 只把「写入」这一项交出去，其余一律不给
grant usage on schema public to anon;
grant insert on table public.feedback to anon;

-- 5) 唯一的策略：允许匿名访客提交，且只能提交
drop policy if exists "public_anon_insert_feedback" on public.feedback;
create policy "public_anon_insert_feedback"
  on public.feedback
  for insert
  to anon
  with check (true);

-- 6) 关键：这里【不】创建任何 select / update / delete 策略。
--    RLS 默认拒绝，所以访客既能提交，又永远读不到、改不了、删不掉别人的反馈。

-- ------------------------------------------------------------
-- 你自己怎么看反馈：
--   Supabase 控制台 → Table Editor → feedback 表
--   （控制台使用的是高权限身份，不受上面这些限制）
--   或在 SQL Editor 里执行：
--     select * from public.feedback order by created_at desc;
--
-- 改完本脚本后，建议用 tools/verify_feedback_privacy.py 实测一次，
-- 确认「匿名读不到」这条真的生效。
-- ------------------------------------------------------------
