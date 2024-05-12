-- Table: public.tokens

-- DROP TABLE IF EXISTS public.tokens;

CREATE TABLE IF NOT EXISTS public.tokens
(
    id integer NOT NULL DEFAULT nextval('tokens_id_seq'::regclass),
    token_address character varying(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tokens_pkey PRIMARY KEY (id),
    CONSTRAINT tokens_token_address_key UNIQUE (token_address)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tokens OWNER to postgres;

-- SCRIPTS
SELECT id, token_address FROM public.tokens;
INSERT INTO public.tokens(id, token_address) VALUES (?, ?);
UPDATE public.tokens SET id=?, token_address=? WHERE <condition>;
DELETE FROM public.tokens WHERE <condition>;
