create sequence "public"."Recipes_id_seq";

create table "public"."Recipes" (
    "id" integer not null default nextval('"Recipes_id_seq"'::regclass),
    "title" text not null,
    "ingredients" text[] not null,
    "instructions" text
);


create table "public"."User" (
    "email" text not null,
    "display_name" text not null,
    "first_name" text,
    "last_name" text,
    "description" text,
    "avatar_url" text,
    "created_at" timestamp with time zone,
    "stripe_customer_id" text,
    "id" uuid not null
);


alter table "public"."User" enable row level security;

alter sequence "public"."Recipes_id_seq" owned by "public"."Recipes"."id";

CREATE UNIQUE INDEX "Recipes_pkey" ON public."Recipes" USING btree (id);

CREATE UNIQUE INDEX "User_display_name_key" ON public."User" USING btree (display_name);

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);

CREATE UNIQUE INDEX "User_pkey" ON public."User" USING btree (id);

alter table "public"."Recipes" add constraint "Recipes_pkey" PRIMARY KEY using index "Recipes_pkey";

alter table "public"."User" add constraint "User_pkey" PRIMARY KEY using index "User_pkey";

alter table "public"."User" add constraint "User_display_name_key" UNIQUE using index "User_display_name_key";

alter table "public"."User" add constraint "User_email_key" UNIQUE using index "User_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public."User" (id,email,display_name,first_name,last_name, avatar_url)
  values (new.id,new.email,new.raw_user_meta_data->>'display_name',new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;

grant delete on table "public"."Recipes" to "anon";

grant insert on table "public"."Recipes" to "anon";

grant references on table "public"."Recipes" to "anon";

grant select on table "public"."Recipes" to "anon";

grant trigger on table "public"."Recipes" to "anon";

grant truncate on table "public"."Recipes" to "anon";

grant update on table "public"."Recipes" to "anon";

grant delete on table "public"."Recipes" to "authenticated";

grant insert on table "public"."Recipes" to "authenticated";

grant references on table "public"."Recipes" to "authenticated";

grant select on table "public"."Recipes" to "authenticated";

grant trigger on table "public"."Recipes" to "authenticated";

grant truncate on table "public"."Recipes" to "authenticated";

grant update on table "public"."Recipes" to "authenticated";

grant delete on table "public"."Recipes" to "service_role";

grant insert on table "public"."Recipes" to "service_role";

grant references on table "public"."Recipes" to "service_role";

grant select on table "public"."Recipes" to "service_role";

grant trigger on table "public"."Recipes" to "service_role";

grant truncate on table "public"."Recipes" to "service_role";

grant update on table "public"."Recipes" to "service_role";

grant delete on table "public"."User" to "anon";

grant insert on table "public"."User" to "anon";

grant references on table "public"."User" to "anon";

grant select on table "public"."User" to "anon";

grant trigger on table "public"."User" to "anon";

grant truncate on table "public"."User" to "anon";

grant update on table "public"."User" to "anon";

grant delete on table "public"."User" to "authenticated";

grant insert on table "public"."User" to "authenticated";

grant references on table "public"."User" to "authenticated";

grant select on table "public"."User" to "authenticated";

grant trigger on table "public"."User" to "authenticated";

grant truncate on table "public"."User" to "authenticated";

grant update on table "public"."User" to "authenticated";

grant delete on table "public"."User" to "service_role";

grant insert on table "public"."User" to "service_role";

grant references on table "public"."User" to "service_role";

grant select on table "public"."User" to "service_role";

grant trigger on table "public"."User" to "service_role";

grant truncate on table "public"."User" to "service_role";

grant update on table "public"."User" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."User"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."User"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."User"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));



