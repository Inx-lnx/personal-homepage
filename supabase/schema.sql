-- ============================================================
-- 访客反馈表 + 权限策略（Supabase）
-- 使用方法：在 Supabase 控制台 → SQL Editor → 粘贴本脚本 → Run
-- 需要提前：在 supabase.com 注册并新建一个 Project。
-- ============================================================

-- 0) 清理：确保重跑时干净（该表此前未创建成功，无数据可损失）
drop table if exists public.feedback;

-- 1) 创建反馈表
create table public.feedback (
  id          bigint generated always as identity primary key,
  name        text not null,                 -- 访客姓名
  relation    text,                          -- 与我的关系（同学/朋友/老师/同事/家人/其他）
  message     text not null,                 -- 反馈内容
  created_at  timestamptz not null default current_timestamp
);

-- 2) 开启行级安全（RLS）
alter table public.feedback enable row level security;

-- 3) 允许“匿名访客”写入反馈（无需登录）
create policy "public_anon_insert_feedback"
  on public.feedback
  for insert
  to anon
  with check (true);

-- 4) 重要：这里【没有】给 anon 创建 select 策略。
--    因为 RLS 默认拒绝读取，所以访客只能写入、不能偷看别人的反馈。
--    你通过 Supabase 控制台（用你的登录身份）查看和管理反馈，
--    这样访客侧不会暴露任何反馈内容。
