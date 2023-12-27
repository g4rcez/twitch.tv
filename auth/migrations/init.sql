create table public.users
(
    id         uuid                                   not null
        constraint users_pk
            primary key,
    name       varchar(512)                           not null,
    email      varchar(512)                           not null
        constraint users_email
            unique,
    password   varchar(512)                           not null,
    created_at timestamp with time zone default now() not null
);

alter table public.users
    owner to postgres;

create unique index users__idindex
    on public.users (id);

create unique index users_email_uindex
    on public.users (email);

create table public.secrets
(
    id          uuid                                   not null
        constraint secrets_pk
            primary key,
    created_at  timestamp with time zone default now() not null,
    deleted_at  timestamp with time zone,
    passphrase  text,
    public_key  text,
    private_key text,
    type        varchar(16)                            not null
);

alter table public.secrets
    owner to postgres;

create index secrets_type_index
    on public.secrets (type);

