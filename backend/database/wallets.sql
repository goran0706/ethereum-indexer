-- Table: public.wallets

-- DROP TABLE IF EXISTS public.wallets;

CREATE TABLE IF NOT EXISTS public.wallets
(
    id integer NOT NULL DEFAULT nextval('wallets_id_seq'::regclass),
    wallet_address character varying(64) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT wallets_pkey PRIMARY KEY (id),
    CONSTRAINT wallets_wallet_address_key UNIQUE (wallet_address)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wallets OWNER to postgres;

SELECT id, wallet_address FROM public.wallets;
INSERT INTO public.wallets(id, wallet_address) VALUES (?, ?);
UPDATE public.wallets SET id=?, wallet_address=? WHERE <condition>;
DELETE FROM public.wallets WHERE <condition>;
